import { Config } from "@/data/config";
import { type CreateProjectInputs } from "./projectManager";
import { type OrderlyProjectConfig } from "./types";
import { PageConfig } from "@/types/page";
export interface IFramework {
  name: string;
  projectPath: string;
  projectName: string;
  fullProjectPath: string;
  // new (projectPath: string, projectName: string): IFramework;

  run(): void;
  restart(): void;
  stop(): void;

  generateFiles(config: any): Promise<any>;
  createProject(inputs: CreateProjectInputs): Promise<any>;
  updateProjectFiles(inputs: CreateProjectInputs): Promise<any>;

  installDependencies(): Promise<any>;

  loadCSS(): Promise<any>;
  writeCSS(css: string): Promise<any>;
  collectPages(): Promise<any>;
  setCSSPath(cssPath: string): void;

  generateOrderlyConfig(inputs: Partial<Config>): OrderlyProjectConfig;

  readComponentConfig(): Promise<any>;
  writeComponentConfig(config: string): Promise<any>;

  appendDependencies(dependencies: string[]): Promise<any>;
  addPage(page: PageConfig): Promise<any>;
}
