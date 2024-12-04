import { open } from "@tauri-apps/plugin-dialog";
import { IFramework } from "./framework";
import { Nextjs } from "./nextjs";
import { CreateProjectIds } from "@/components/steps/types";
import { StepState } from "@/components/steps/StepProgress";
import { readTextFile, writeTextFile, exists } from "@tauri-apps/plugin-fs";
import { OrderlyConfig } from "./types";

export enum NPM {
  yarn = "yarn",
  npm = "npm",
  pnpm = "pnpm",
}

export type CreateProjectInputs = {
  brokerId: string;
  brokerName: string;
  framework: string;
  walletConnector: string;
  pages: any[];
  projectPath: string;
  projectName: string;
  npm: NPM;
};

type onProgressEventHandle = (
  id: CreateProjectIds,
  state: StepState,
  message: string
) => void;

export interface ProjectManager {
  setProjectPath(projectPath: string): void;
  setProjectName(projectName: string): void;
  setFrameworkHandler(frameworkHandler: IFramework): void;
  frameworkHandler: IFramework | null;

  selectPath(): Promise<string | null>;
  createProject(
    inputs: CreateProjectInputs,
    onProgress: onProgressEventHandle
  ): Promise<any>;
  readOrderlyConfigFile(): Promise<Record<string, any> | null>;
  writeOrderlyConfigFile(config: Record<string, any>): Promise<void>;
}

export class ProjectManagerImpl implements ProjectManager {
  #frameworkHandler?: IFramework;
  private projectPath?: string;
  private projectName?: string;

  async createProject(
    inputs: CreateProjectInputs,
    onProgress: onProgressEventHandle
  ): Promise<any> {
    try {
      this.setProjectPath(inputs.projectPath);
      this.setProjectName(inputs.projectName);

      this.setFrameworkHandler(ProjectManagerImpl.getFrameworkHandler(inputs));

      if (!this.frameworkHandler) {
        throw new Error("Framework handler is not set");
      }

      // step 1: create project from template
      onProgress(
        CreateProjectIds.CREATE_PROJECT,
        StepState.PENDING,
        `Creating a new Next.js app in ${inputs.projectPath}/${inputs.projectName}`
      );
      await this.frameworkHandler.createProject(inputs);

      // step 2: update project files
      onProgress(
        CreateProjectIds.CREATE_PROJECT,
        StepState.COMPLETED,
        "Project creation success"
      );
      onProgress(
        CreateProjectIds.UPDATE_PROJECT,
        StepState.PENDING,
        "Updating project files"
      );
      await this.frameworkHandler.updateProjectFiles(inputs);

      onProgress(
        CreateProjectIds.UPDATE_PROJECT,
        StepState.COMPLETED,
        "Project files updated"
      );

      // step 3: install dependencies
      onProgress(
        CreateProjectIds.INSTALL_DEPENDENCIES,
        StepState.PENDING,
        "Installing dependencies"
      );
      await this.frameworkHandler.installDependencies(inputs);

      onProgress(
        CreateProjectIds.INSTALL_DEPENDENCIES,
        StepState.COMPLETED,
        "Dependencies installed"
      );
    } catch (e: any) {
      console.log(e);

      throw e;
    }
  }
  async selectPath(): Promise<string | null> {
    const file = await open({
      multiple: false,
      directory: true,
    });

    return file;
  }

  setProjectPath(projectPath: string) {
    this.projectPath = projectPath;
  }

  setProjectName(projectName: string) {
    this.projectName = projectName;
  }

  setFrameworkHandler(frameworkHandler: IFramework) {
    this.#frameworkHandler = frameworkHandler;
  }

  get frameworkHandler() {
    return this.#frameworkHandler || null;
  }

  generateOrderlyConfig(inputs: CreateProjectInputs): OrderlyConfig | null {
    if (!this.frameworkHandler) {
      return null;
    }
    return this.frameworkHandler.generateOrderlyConfig(inputs);
  }

  static getFrameworkHandler(inputs: {
    framework: string;
    projectPath: string;
    projectName: string;
  }): IFramework {
    switch (inputs.framework) {
      case "nextjs":
        return new Nextjs(inputs.projectPath, inputs.projectName);
      default:
        throw new Error("Framework not supported");
    }
  }

  async writeOrderlyConfigFile(config: OrderlyConfig) {
    if (!this.projectPath || !this.projectName) {
      throw new Error("Project path or project name is not set");
    }
    const orderlyFilePath = `${this.projectPath}/${this.projectName}/.orderly.json`;
    await writeTextFile(orderlyFilePath, JSON.stringify(config, null, 2));
  }

  async readOrderlyConfigFile(): Promise<OrderlyConfig | null> {
    if (!this.projectPath || !this.projectName) {
      throw new Error("Project path or project name is not set");
    }

    // check the orderly file exists
    const orderlyFilePath = `${this.projectPath}/${this.projectName}/.orderly.json`;
    const orderlyFileExists = await exists(orderlyFilePath);
    if (!orderlyFileExists) {
      return null;
    }

    const config = await readTextFile(orderlyFilePath);
    return JSON.parse(config);
  }
}

export const projectManager = new ProjectManagerImpl();
