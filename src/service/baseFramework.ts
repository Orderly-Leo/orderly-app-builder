import { availablePages } from "@/data/pages";
import { IFramework } from "./framework";
import { CreateProjectInputs } from "./projectManager";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { Command } from "@tauri-apps/plugin-shell";
import { CustomError } from "@/types/customError";
import chroma from "chroma-js";

import postcss from "postcss";
import postcssjs from "postcss-js";
import { OrderlyConfig } from "./types";

interface GradientConfig {
  startColor: string;
  endColor: string;
  start: string;
  end: string;
  angle?: string;
}

interface ProcessedThemeData {
  colors: Record<string, string>;
  gradients: Record<string, GradientConfig>;
}

export abstract class BaseFrameworkHandler implements IFramework {
  constructor(projectPath: string, projectName: string) {
    this.projectPath = projectPath;
    this.projectName = projectName;
  }

  projectPath: string;
  projectName: string;
  name!: string;
  protected messages: string[] = [];
  protected errorMessages: string[] = [];
  abstract run(): void;
  abstract restart(): void;
  abstract stop(): void;
  abstract generateFiles(config: any): Promise<any>;
  abstract createProject(inputs: CreateProjectInputs): Promise<any>;
  // abstract createAppFromTemplate(inputs: CreateProjectInputs): Promise<any>;
  abstract updateProjectFiles(inputs: CreateProjectInputs): Promise<any>;
  abstract loadCSS(): Promise<any>;
  abstract collectPages(): Promise<any>;
  abstract generateOrderlyConfig(inputs: CreateProjectInputs): OrderlyConfig;
  abstract setCSSPath(cssPath: string): void;

  onData(data: string) {
    console.log("!!!", data);
    this.messages.push(data);
  }

  onError(data: string) {
    console.log("xxx", data);
    this.errorMessages.push(data);
  }

  clearMessages() {
    this.messages = [];
    this.errorMessages = [];
  }

  async readPkg() {
    const pkgPath = this.getPkgPath();
    const pkg = await readTextFile(pkgPath);
    return JSON.parse(pkg);
  }

  async writePkg(pkg: Record<string, any>) {
    const pkgPath = this.getPkgPath();
    await writeTextFile(pkgPath, JSON.stringify(pkg, null, 2));
  }

  private getPkgPath() {
    return `${this.projectPath}/${this.projectName}/package.json`;
  }

  protected get fullProjectPath() {
    return `${this.projectPath}/${this.projectName}`;
  }

  protected async clearPkg(
    inputs: CreateProjectInputs,
    pkg: Record<string, any>
  ) {
    let { pages } = inputs;

    if (!pkg.dependencies) return pkg;

    // Get all dependencies defined in availablePages
    const availablePagesDeps = new Set(
      availablePages.flatMap((page) => page.dependencies)
    );

    pages = pages.map((page) => {
      const pageData = availablePages.find((p) => p.id === page.id);
      return {
        ...page,
        dependencies: pageData?.dependencies,
      };
    });

    // Get required dependencies from selected pages
    const requiredDeps = pages.reduce((deps: Set<string>, page) => {
      const pageDeps = page.dependencies || [];
      pageDeps.forEach((dep: string) => deps.add(dep));
      return deps;
    }, new Set<string>());

    // Only filter dependencies that are defined in availablePages
    const filteredDeps: Record<string, string> = {};
    for (const [dep, version] of Object.entries(pkg.dependencies)) {
      if (!availablePagesDeps.has(dep) || requiredDeps.has(dep)) {
        filteredDeps[dep] = version as string;
      }
    }

    pkg.dependencies = filteredDeps;
    pkg.name = inputs.projectName;
    return pkg;
  }

  async installDependencies(/**inputs: CreateProjectInputs**/) {
    try {
      const command = Command.create("install-dependencies", ["install"], {
        cwd: this.fullProjectPath,
      });

      const result = await command.execute();

      if (result.code !== 0) {
        throw new CustomError(
          "install-dependencies",
          "Failed to install dependencies",
          result.stderr
        );
      }
    } catch (e: any) {
      throw new CustomError(
        "install-dependencies",
        "Failed to install dependencies",
        e.message
      );
    }
  }

  // protected generateOrderlyConfig(inputs: CreateProjectInputs): OrderlyConfig {
  //   return {
  //     paths: {
  //       src: "src",
  //       public: "public",
  //       theme: "theme",
  //     },
  //   };
  // }

  protected async readFile(path: string) {
    return await readTextFile(path);
  }

  protected async parseCSS(css: string) {
    const root = postcss.parse(css);
    const parsed = postcssjs.objectify(root);
    // convert cssdata to object

    let cssData = this.getCSSRoot(parsed);
    cssData = this.convertColorToHex(cssData);
    return cssData;
  }

  private getCSSRoot(obj: Record<string, any>) {
    return obj[":root"];
  }

  private convertColorToHex(data: Record<string, any>): ProcessedThemeData {
    const result: ProcessedThemeData = {
      colors: {},
      gradients: {},
    };

    // 处理普通颜色变量
    Object.keys(data).forEach((key) => {
      if (key.startsWith("--oui-color-")) {
        try {
          const colorValue = data[key];
          const color =
            typeof colorValue === "string" && colorValue.includes(" ")
              ? chroma(colorValue.split(" ").map(Number))
              : chroma(colorValue);
          result.colors[key] = color.hex();
        } catch (error) {
          console.warn(`Failed to convert color for key ${key}:`, error);
        }
      }
    });

    // 处理渐变变量
    const gradientGroups = new Set(
      Object.keys(data)
        .filter((key) => key.startsWith("--oui-gradient-"))
        .map((key) => key.replace("--", "").split("-")[2]) // 提取 brand, danger 等分组名称
    );

    console.log("gradientGroups", gradientGroups);

    gradientGroups.forEach((group) => {
      if (!group) return;

      const gradientConfig: GradientConfig = {
        startColor: "",
        endColor: "",
        start: "",
        end: "",
      };

      // 获取开始颜色
      const startColorKey = `--oui-gradient-${group}-start`;
      if (data[startColorKey]) {
        try {
          const colorValue = data[startColorKey];
          const color =
            typeof colorValue === "string" && colorValue.includes(" ")
              ? chroma(colorValue.split(" ").map(Number))
              : chroma(colorValue);
          gradientConfig.startColor = color.hex();
        } catch (error) {
          console.warn(`Failed to convert start color for ${group}:`, error);
        }
      }

      // 获取结束颜色
      const endColorKey = `--oui-gradient-${group}-end`;
      if (data[endColorKey]) {
        try {
          const colorValue = data[endColorKey];
          const color =
            typeof colorValue === "string" && colorValue.includes(" ")
              ? chroma(colorValue.split(" ").map(Number))
              : chroma(colorValue);
          gradientConfig.endColor = color.hex();
        } catch (error) {
          console.warn(`Failed to convert end color for ${group}:`, error);
        }
      }

      // 获取渐变起始位置
      const startStopKey = `--oui-gradient-${group}-stop-start`;
      if (data[startStopKey]) {
        gradientConfig.start = data[startStopKey].replace(/['"]/g, "");
      }

      // 获取渐变结束位置
      const endStopKey = `--oui-gradient-${group}-stop-end`;
      if (data[endStopKey]) {
        gradientConfig.end = data[endStopKey].replace(/['"]/g, "");
      }

      // 获取渐变角度（可选）
      const angleKey = `--oui-gradient-${group}-angle`;
      if (data[angleKey]) {
        gradientConfig.angle = data[angleKey].replace(/['"]/g, "");
      }

      result.gradients[group] = gradientConfig;
    });

    return result;
  }
}
