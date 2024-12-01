import { join } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { IFramework } from "./framework";
import { Nextjs } from "./nextjs";

export class EditorService {
  private projectPath: string;
  private orderlyFileData: any;
  private cssData: any;

  private framework?: IFramework;
  private projectName: string;
  constructor(
    projectPath: string,
    projectName: string,
    options: {
      frameworkType: string;
    }
  ) {
    this.projectPath = projectPath;
    this.projectName = projectName;
    this.createFrameworkService(options.frameworkType);
    this.restoreData();
  }
  createFrameworkService(frameworkType: string) {
    switch (frameworkType) {
      case "nextjs":
        this.framework = new Nextjs(this.projectPath, this.projectName, {
          paths: {
            css: "src/app/globals.css",
          },
        });
        break;
    }
  }

  private async restoreData() {
    console.log("======== restore data ==========");
    // const orderlyFile = await this.loadOrderlyFile();
    // this.orderlyFileData = orderlyFile;

    // load css file
    if (!!this.framework) {
      this.framework.loadCSS();
    }
  }

  private async loadOrderlyFile() {
    const orderlyFilePath = await join(this.projectPath, "orderly.json");
    return readTextFile(orderlyFilePath);
  }
}
