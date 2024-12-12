import { BaseConfigHandler } from "./interface";
import { ProjectManager } from "../projectManager";
import { Config } from "@/data/config";
class ProjectConfigHandler extends BaseConfigHandler {
  #keys: string[] = ["projectConfig.paths.themeCSS", "projectPath"];

  // handle(
  //   projectManager: ProjectManager,
  //   config: Record<string, any>,
  //   key: string,
  //   eventName: string
  // ): Record<string, any> {
  //   // if (key === "projectConfig.paths.themeCSS") {
  //   //   console.log("======== themeCSS", value);
  //   // }

  //   console.log("======== config", config);
  //   console.log("======== key", key);
  //   console.log("======== eventName", eventName);
  //   return config;
  // }

  async update(
    projectManager: ProjectManager,
    config: Config
    // key: string,
    // eventName: string
  ): Promise<Config> {
    console.log("project manager", projectManager);
    const data = projectManager.generateOrderlyConfig(config);

    console.log("data=====>>>>>>>", data);
    if (data) {
      await projectManager.writeOrderlyConfigFile(data);
    }

    return config;
  }

  filter(_config: Record<string, any>, key: string, _value: any): boolean {
    return this.#keys.includes(key);
  }
}

export default ProjectConfigHandler;
