import { type CreateProjectInputs } from "./projectManager";

export interface IFramework {
  projectPath: string;
  projectName: string;
  // new (projectPath: string, projectName: string): IFramework;

  run(): void;
  restart(): void;
  stop(): void;

  generateFiles(config: any): Promise<any>;
  createProject(inputs: CreateProjectInputs): Promise<any>;
  updateProjectFiles(inputs: CreateProjectInputs): Promise<any>;

  installDependencies(inputs: CreateProjectInputs): Promise<any>;

  loadCSS(): Promise<any>;
}
