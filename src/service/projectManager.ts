import { open } from "@tauri-apps/plugin-dialog";
import { IFramework } from "./framework";
import { Nextjs } from "./nextjs";
import { CustomError } from "@/types/customError";
import { CreateProjectIds } from "@/components/steps/types";
import { StepState } from "@/components/steps/StepProgress";

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
  selectPath(): Promise<string | null>;
  createProject(
    inputs: CreateProjectInputs,
    onProgress: onProgressEventHandle
  ): Promise<any>;
}

export class ProjectManagerImpl implements ProjectManager {
  private frameworkHandler?: IFramework;
  async createProject(
    inputs: CreateProjectInputs,
    onProgress: onProgressEventHandle
  ): Promise<any> {
    try {
      this.frameworkHandler = ProjectManagerImpl.getFrameworkHandler(inputs);
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

  static getFrameworkHandler(inputs: CreateProjectInputs): IFramework {
    switch (inputs.framework) {
      case "nextjs":
        return new Nextjs(inputs.projectPath, inputs.projectName);
      default:
        throw new Error("Framework not supported");
    }
  }
}

export const projectManager = new ProjectManagerImpl();
