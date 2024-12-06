import { IConfigHandler } from "./interface";

export class ConfigPipelineService {
  private readonly handlers: IConfigHandler[];

  constructor(handlers: IConfigHandler[]) {
    this.handlers = handlers;
  }

  handle(config: Record<string, any>, key: string, eventName: string) {
    let result = config;
    for (let handler of this.handlers) {
      result = handler.handle(result, key, eventName);
    }
    return result;
  }

  public addHandler(handler: IConfigHandler) {
    this.handlers.push(handler);
  }
}
