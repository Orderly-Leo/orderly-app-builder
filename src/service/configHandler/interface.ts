export interface IConfigHandler {
  //   new (): IConfigHandler;
  handle(
    config: Record<string, any>,
    key: string,
    eventName: string
  ): Record<string, any>;
  filter(config: Record<string, any>, key: string, eventName: string): boolean;
}

export abstract class BaseConfigHandler implements IConfigHandler {
  handle(config: Record<string, any>, key: string, eventName: string) {
    if (!this.filter(config, key, eventName)) {
      return config;
    }

    return config;
  }

  abstract filter(
    config: Record<string, any>,
    key: string,
    eventName: string
  ): boolean;
}
