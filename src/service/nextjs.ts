import { CustomError } from "@/types/customError";
import { BaseFrameworkHandler } from "./baseFramework";
import { CreateProjectInputs } from "./projectManager";
import { Command } from "@tauri-apps/plugin-shell";
import { CreateProjectIds } from "@/components/steps/types";
import { join } from "@tauri-apps/api/path";

export class Nextjs extends BaseFrameworkHandler {
  constructor(
    projectPath: string,
    projectName: string,
    options: {
      paths: {
        css: string;
      };
    }
  ) {
    super(projectPath, projectName);
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
  generateFiles(config: any): Promise<any> {
    throw new Error("Method not implemented.");
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

      await this.clearPages(inputs);
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
    const cssPath = await join(
      this.fullProjectPath,
      "src",
      "app",
      "globals.css"
    );
    const css = await this.readFile(cssPath);
    console.log(css);
  }

  private async clearPages(inputs: CreateProjectInputs) {}
}
