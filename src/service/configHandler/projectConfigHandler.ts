import { BaseConfigHandler } from "./interface";

class ProjectConfigHandler extends BaseConfigHandler {
  #keys: string[] = ["projectConfig.paths.themeCSS", "projectPath"];
  handle(
    config: Record<string, any>,
    key: string,
    eventName: string
  ): Record<string, any> {
    // if (key === "projectConfig.paths.themeCSS") {
    //   console.log("======== themeCSS", value);
    // }

    console.log("======== config", config);
    console.log("======== key", key);
    console.log("======== eventName", eventName);
    return config;
  }

  filter(config: Record<string, any>, key: string, value: any): boolean {
    return this.#keys.includes(key);
  }
}

export default ProjectConfigHandler;
