import { CustomError } from "@/types/customError";
import { BaseFrameworkHandler } from "./baseFramework";
import { CreateProjectInputs } from "./projectManager";
import { Command } from "@tauri-apps/plugin-shell";
import { CreateProjectIds } from "@/components/steps/types";
import { join } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/plugin-fs";
import { OrderlyConfig } from "./types";

export class Nextjs extends BaseFrameworkHandler {
  name = "next.js";
  #cssPath: string;
  constructor(
    projectPath: string,
    projectName: string,
    options?: {
      paths: {
        themeCSS: string;
      };
    }
  ) {
    super(projectPath, projectName);
    this.#cssPath = options?.paths?.themeCSS || "";
  }
  run(): void {
    throw new Error("Method not implemented.");
  }
  restart(): void {
    throw new Error("Method not implemented.");
  }
  stop(): void {
    throw new Error("Method not implemented.");
  }
  generateFiles(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async getFullCSSPath() {
    if (!this.#cssPath) return null;
    return await join(this.fullProjectPath, this.#cssPath);
  }
  async createProject(inputs: CreateProjectInputs): Promise<any> {
    /**
    call shell command to create a new nextjs project using npx create-next-app
    */
    // throw new Error("Method not implemented.");
    try {
      await this.createAppFromTemplate(inputs);
    } catch (e: any) {
      console.log(e);
      throw new CustomError(
        CreateProjectIds.CREATE_PROJECT,
        e.title,
        e.message
      );
    }
  }

  setCSSPath(path: string) {
    this.#cssPath = path;
  }

  private async createAppFromTemplate(inputs: CreateProjectInputs) {
    return new Promise((resolve, reject) => {
      const useNpm =
        inputs.npm === "pnpm"
          ? "--use-pnpm"
          : inputs.npm === "yarn"
          ? "--use-yarn"
          : "--use-npm";
      const cmd = Command.create(
        "run-npx",
        [
          "create-next-app@latest",
          "--example",
          "https://github.com/OrderlyNetwork/orderly-js-sdk-nextjs-template",
          inputs.projectName,
          "--skip-install",
          "--yes",
          useNpm,
        ],
        {
          cwd: inputs.projectPath,
        }
      );

      cmd.on("error", (error) => {
        console.error("error", error);

        reject(error);
      });

      cmd.on("close", (result) => {
        console.log("------close", result);
        if (result.code === 0) {
          resolve("Project created successfully"); // no error message
        } else {
          reject({
            title: "Create project failed",
            message:
              this.messages.join("") + "\n" + this.errorMessages.join(""),
          });

          this.clearMessages();
        }
      });

      cmd.stdout.on("data", (data) => {
        // console.log("data", data);
        this.onData(data);
      });

      cmd.stderr.on("data", (data) => {
        // console.log("data", data);
        this.onError(data);
      });
      console.log("start create project");

      cmd.spawn();
    });

    // console.log(result);
  }

  // edit some files based on the inputs
  async updateProjectFiles(inputs: CreateProjectInputs) {
    try {
      let pkg = await this.readPkg();

      pkg = await this.clearPkg(inputs, pkg);

      await this.writePkg(pkg);

      await this.clearPages();
      // const pkg =
    } catch (e: any) {
      throw new CustomError(
        CreateProjectIds.UPDATE_PROJECT,
        "Update template files failed",
        e
      );
    }
  }

  async loadCSS() {
    const cssPath = await this.getFullCSSPath();

    if (!cssPath) return;

    const css = await this.readFile(cssPath);

    const cssData = await this.parseCSS(css);

    return cssData;
  }

  private async clearPages() {} // inputs: CreateProjectInputs

  async collectPages() {
    // load Next.js project app structure
    try {
      const appPath = `${this.fullProjectPath}/src/app`;
      const routes: string[] = [];

      const walkDir = async (dir: string, baseRoute: string = "") => {
        const entries = await readDir(dir);

        for (const entry of entries) {
          const fullPath = await join(dir, entry.name);

          // Skip hidden and special files/folders
          if (entry.name.startsWith(".") || entry.name.startsWith("_")) {
            continue;
          }

          if (entry.isDirectory) {
            // Recursively walk subdirectories
            await walkDir(fullPath, `${baseRoute}/${entry.name}`);
          } else if (entry.name === "page.tsx" || entry.name === "page.ts") {
            // Found a page file, add its route
            routes.push(baseRoute || "/");
          }
        }
      };

      await walkDir(appPath);

      console.log("routes::::", routes);

      return routes;
    } catch (e: any) {
      console.log("e", e);
      throw new CustomError(
        "collect-pages",
        "Failed to collect pages",
        e.message
      );
    }
  }

  generateOrderlyConfig(/**inputs: CreateProjectInputs**/): OrderlyConfig {
    return {
      framework: "next.js",
      paths: {
        src: "src",
        public: "public",
        themeCSS: "src/styles/theme.css",
      },
    };
  }
}
