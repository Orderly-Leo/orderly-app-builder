import { ProjectManager } from "../projectManager";
import { IConfigHandler } from "./interface";

export class ConfigPipelineService {
  private readonly handlers: IConfigHandler[];

  constructor(
    private readonly projectManager: ProjectManager,
    handlers: IConfigHandler[]
  ) {
    this.handlers = handlers;
  }

  async handle(
    config: Record<string, any>,
    key: string,
    eventName: string
  ): Promise<Record<string, any>> {
    let result = config;
    for await (let handler of this.handlers) {
      result = await handler.handle(
        this.projectManager,
        result,
        key,
        eventName
      );
    }
    return result;
  }

  public addHandler(handler: IConfigHandler) {
    this.handlers.push(handler);
  }
}
