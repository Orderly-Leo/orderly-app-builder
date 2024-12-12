import { path } from "ramda";
import {
  onProgressEventHandle,
  ProjectManager,
  projectManager,
  ProjectManagerImpl,
} from "./projectManager";
import { OrderlyProjectConfig, OrderlyTheme } from "./types";
import { PROJECT_THEMES_KEY } from "./utils";
import { ConfigPipelineService } from "./configHandler/configPipeline";
import ProjectConfigHandler from "./configHandler/projectConfigHandler";
import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import generate from "@babel/generator";
import { PageConfig } from "@/types/page";

export class EditorService {
  private projectPath: string;
  #themes: OrderlyTheme[] = [];
  private projectConfig: any;
  projectManager: ProjectManager;
  private projectName: string;
  private cssWorker: Worker;
  private configPipelineService: ConfigPipelineService;
  private routes: any[] = [];
  private componentConfig: any;
  constructor(
    projectPath: string,
    projectName: string,
    options: {
      framework: string;
    }
  ) {
    this.projectPath = projectPath;
    this.projectName = projectName;
    this.projectManager = projectManager;
    this.updateProjectManager(options.framework);
    this.routes = [];

    this.configPipelineService = new ConfigPipelineService(
      this.projectManager,
      [new ProjectConfigHandler()]
    );

    this.cssWorker = new Worker(
      new URL("../workers/cssWorker.ts", import.meta.url),
      {
        type: "module",
      }
    );
  }

  updateProjectManager(framework: string) {
    if (
      this.projectManager.frameworkHandler?.name === framework &&
      this.projectManager.frameworkHandler?.projectPath === this.projectPath &&
      this.projectManager.frameworkHandler?.projectName === this.projectName
    )
      return;

    this.projectManager.setProjectPath(this.projectPath);
    this.projectManager.setProjectName(this.projectName);
    this.projectManager.setFrameworkHandler(
      ProjectManagerImpl.getFrameworkHandler({
        framework: framework,
        projectPath: this.projectPath,
        projectName: this.projectName,
      })
    );
  }

  get framework() {
    return this.projectManager.frameworkHandler;
  }

  get themes() {
    return this.#themes;
  }

  async restoreData(
    cb: (data: {
      config: OrderlyProjectConfig;
      themes: OrderlyTheme[];
      routes: any[];
      componentConfig: any;
    }) => void
  ) {
    // console.log("======== restore data ==========");
    // const orderlyFile = await this.loadOrderlyFile();
    // this.orderlyFileData = orderlyFile;

    this.projectConfig = await this.loadProjectConfig();

    // console.log("======== project config", this.projectConfig);

    const cssPath = path(["paths", "themeCSS"], this.projectConfig);

    if (cssPath) {
      this.framework?.setCSSPath(cssPath);
    }

    // load css file
    if (!!this.framework) {
      // await this.framework.loadCSS();

      this.#themes = await this.loadThemes();

      const routes = await this.framework.collectPages();

      if (Array.isArray(routes) && routes.length > 0) {
        this.routes = routes;
      }

      // const componentConfig = await this.framework.readComponentConfig();
      // configObject = this.parseComponentConfig(componentConfig);
      const ast = await this.loadComponentConfigToAst();

      this.componentConfig = this.parseComponentConfig(ast);
      // console.log("ast", ast);
    }

    cb({
      config: this.projectConfig,
      themes: this.#themes,
      routes: this.routes,
      componentConfig: this.componentConfig,
    });
  }

  get config() {
    return this.projectConfig;
  }

  private loadProjectConfig() {
    return this.projectManager.readOrderlyConfigFile();
  }

  private parseComponentConfig(ast: any) {
    const extractValue = (node: any): any => {
      if (
        t.isStringLiteral(node) ||
        t.isNumericLiteral(node) ||
        t.isBooleanLiteral(node)
      ) {
        return node.value;
      } else if (t.isArrayExpression(node)) {
        return node.elements.map((element) => extractValue(element));
      } else if (t.isObjectExpression(node)) {
        return extractObject(node);
      } else if (t.isJSXElement(node)) {
        // Handle JSX elements by returning a placeholder or simplified representation
        return {
          type: "JSX",
          elementType: (node.openingElement.name as any).name,
        };
      }
      return null;
    };

    const extractObject = (node: t.ObjectExpression): any => {
      const obj: any = {};
      node.properties.forEach((property) => {
        if (t.isObjectProperty(property)) {
          const key = t.isIdentifier(property.key)
            ? property.key.name
            : t.isStringLiteral(property.key)
            ? property.key.value
            : null;

          if (key !== null) {
            obj[key] = extractValue(property.value);
          }
        }
      });
      return obj;
    };

    let result: any = {};

    traverse(ast, {
      VariableDeclarator(path) {
        const init = path.node.init;
        if (t.isObjectExpression(init)) {
          result = extractObject(init);
        }
      },
    });

    console.log("Formatted JSON", result);
    return result;
  }

  private async loadComponentConfigToAst() {
    const configContent = await this.framework?.readComponentConfig();
    if (!configContent) return null;

    const ast = parse(configContent, {
      sourceType: "module",
      plugins: ["jsx", "typescript"],
    });

    return ast;
  }

  async updateComponentConfig(key: string, value: any) {
    const ast = await this.loadComponentConfigToAst();
    if (!ast) {
      console.error("Failed to load component config to ast");
      return;
    }

    const keyPaths = key.split(".");

    traverse(ast, {
      ObjectExpression(path) {
        const parent = path.parent;
        if (
          t.isVariableDeclarator(parent) &&
          t.isIdentifier(parent.id, { name: "config" })
        ) {
          let currentObject = path.node;
          let currentPath = path as NodePath<t.ObjectExpression>;

          // Navigate through the object properties based on keyPaths
          for (let i = 0; i < keyPaths.length - 1; i++) {
            const property = currentObject.properties.find(
              (p: any) =>
                t.isObjectProperty(p) &&
                ((t.isIdentifier(p.key) && p.key.name === keyPaths[i]) ||
                  (t.isStringLiteral(p.key) && p.key.value === keyPaths[i]))
            );

            if (
              property &&
              t.isObjectProperty(property) &&
              t.isObjectExpression(property.value)
            ) {
              const propertyIndex = currentObject.properties.indexOf(property);
              const propertyPath = currentPath.get("properties")[propertyIndex];

              if (propertyPath.isObjectProperty()) {
                currentObject = property.value;
                currentPath = propertyPath.get(
                  "value"
                ) as NodePath<t.ObjectExpression>;
              }

              // console.log("currentPath", currentPath);
            }
          }

          // Update the value of the final property
          const lastKey = keyPaths[keyPaths.length - 1];
          const targetProp = currentObject.properties.find(
            (p: any) =>
              t.isObjectProperty(p) &&
              ((t.isIdentifier(p.key) && p.key.name === lastKey) ||
                (t.isStringLiteral(p.key) && p.key.value === lastKey))
          );

          if (targetProp && t.isObjectProperty(targetProp)) {
            let newValue;
            if (typeof value === "string") {
              newValue = t.stringLiteral(value);
            } else if (typeof value === "number") {
              newValue = t.numericLiteral(value);
            } else if (typeof value === "boolean") {
              newValue = t.booleanLiteral(value);
            } else if (Array.isArray(value)) {
              newValue = t.arrayExpression(
                value.map((v) =>
                  typeof v === "string"
                    ? t.stringLiteral(v)
                    : t.numericLiteral(v)
                )
              );
            }

            if (newValue) {
              targetProp.value = newValue;
            }
          }
        }
      },
    });

    // Generate the updated code
    const updatedCode = generate(ast).code;

    // console.log("======== updatedCode", updatedCode);

    // Write back to the file
    await this.framework?.writeComponentConfig(updatedCode);
  }

  private async loadThemes() {
    const themes: OrderlyTheme[] = [];
    const currentTheme = await this.loadThemeFromCSSFile();

    if (currentTheme) {
      themes.push({
        name: "Default",
        theme: currentTheme,
        description: "Default theme",
      });
    }

    // load css items from localstorage

    // const themesStr = localStorage.getItem(PROJECT_THEMES_KEY);
    // if (themesStr) {
    //   const arr = JSON.parse(themesStr);

    //   for await (const theme of arr) {
    //     const [md5Str, sortedThemeStr] = await this.getThemeMD5(theme.theme);

    //     console.log(
    //       "????",
    //       sortedThemeStr,
    //       currentThemeMD5[1],
    //       md5Str,
    //       currentThemeMD5[0]
    //     );
    //   }

    //   themes.push(...arr);
    // }

    return themes;
  }

  // private async getThemeMD5(theme: Record<string, any>): Promise<string[]> {
  //   const sortedTheme = this.sortTheme(theme);
  //   const sortedThemeStr = JSON.stringify(sortedTheme)
  //     .replace(/\s*/g, "")
  //     .replace("\n", "");

  //   const md5Str: string = await invoke("get_str_md5", { str: sortedThemeStr });

  //   return [md5Str, sortedThemeStr];
  // }

  private async loadThemeFromCSSFile() {
    return await this.projectManager.frameworkHandler?.loadCSS();
  }

  // private sortTheme(theme: Record<string, any>) {
  //   // this.#themes.sort((a, b) => a.name.localeCompare(b.name));
  //   const keys = Object.keys(theme);
  //   keys.sort();
  //   return keys.reduce((acc, key) => {
  //     acc[key] = theme[key];
  //     return acc;
  //   }, {} as Record<string, any>);
  // }

  handleConfig(config: any, key: string, eventName: string) {
    this.projectConfig = this.configPipelineService.handle(
      config,
      key,
      eventName
    );
  }

  appendTheme(theme: OrderlyTheme) {
    this.#themes.unshift(theme);
    this.saveThemes();
  }

  deleteTheme(name: string) {
    this.#themes = this.#themes.filter((t) => t.name !== name);
    this.saveThemes();
  }

  private saveThemes() {
    localStorage.setItem(PROJECT_THEMES_KEY, JSON.stringify(this.#themes));
  }

  async themeToCSS(theme: Record<string, any>) {
    const cssInJs = {
      ":root": theme,
    };

    return new Promise<string>((resolve) => {
      const handleMessage = (e: MessageEvent) => {
        const { type, data } = e.data;
        if (type === "CSS_RESULT") {
          this.cssWorker.removeEventListener("message", handleMessage);
          resolve(data);
        }
      };

      this.cssWorker.addEventListener("message", handleMessage);
      this.cssWorker.postMessage({
        type: "THEME_TO_CSS",
        data: cssInJs,
      });
    });
  }

  async saveThemeAsCSS(theme: Record<string, any>) {
    const css = await this.themeToCSS(theme);
    if (css) {
      await this.framework?.writeCSS(css);
    }
    return css;
  }

  async addPage(page: PageConfig, onProgress: onProgressEventHandle) {
    console.log("======== page", page, this.framework);

    this.projectManager.addPage(page, onProgress);
  }

  destroy() {
    if (this.cssWorker) {
      this.cssWorker.terminate();
    }
  }
}
