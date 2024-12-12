import { ProjectManager } from "../projectManager";

export interface IConfigHandler {
  //   new (): IConfigHandler;
  handle(
    projectManager: ProjectManager,
    config: Record<string, any>,
    key: string,
    eventName: string
  ): Record<string, any>;
  filter(config: Record<string, any>, key: string, eventName: string): boolean;
}

export abstract class BaseConfigHandler implements IConfigHandler {
  async handle(
    projectManager: ProjectManager,
    config: Record<string, any>,
    key: string,
    eventName: string
  ) {
    if (!this.filter(config, key, eventName)) {
      return config;
    }

    return await this.update(projectManager, config, key, eventName);
  }

  abstract update(
    projectManager: ProjectManager,
    config: Record<string, any>,
    key: string,
    eventName: string
  ): Record<string, any>;

  abstract filter(
    config: Record<string, any>,
    key: string,
    eventName: string
  ): boolean;
}
