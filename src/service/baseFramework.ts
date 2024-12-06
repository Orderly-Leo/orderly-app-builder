import { availablePages } from "@/data/pages";
import { IFramework } from "./framework";
import { CreateProjectInputs } from "./projectManager";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { Command } from "@tauri-apps/plugin-shell";
import { CustomError } from "@/types/customError";

import postcss from "postcss";
import postcssjs from "postcss-js";
import { OrderlyConfig } from "./types";
import { convertColorToHex } from "./utils";
import {invoke} from "@tauri-apps/api/core";

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
  abstract writeCSS(css: string): Promise<any>;

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

      console.log("result", result);

      if (result.code !== 0) {
        throw new CustomError(
          "install-dependencies",
          "Failed to install dependencies",
          result.stdout
        );
      }
    } catch (e: any) {
      console.log("e", e);

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

  protected async writeFile(path: string, content: string) {
    return await writeTextFile(path, content);
  }

  protected async findComponentsByFile(components: string[]) {
    console.log('this.fullProjectPath',this.fullProjectPath)
   return invoke("get_route_by_component",{
      path: this.fullProjectPath,
      componentNames: components
    });
  }

  protected async parseCSS(css: string) {
    const root = postcss.parse(css);
    const parsed = postcssjs.objectify(root);
    // convert cssdata to object

    let cssData = this.getCSSRoot(parsed);
    cssData = convertColorToHex(cssData);
    return cssData;
  }

  private getCSSRoot(obj: Record<string, any>) {
    return obj[":root"];
  }
}
