import { join } from "@tauri-apps/api/path";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { IFramework } from "./framework";

class EditorService {
  private projectPath: string;
  private orderlyFileData: any;
  private cssData: any;

  private framework?: IFramework;

  constructor(
    projectPath: string,
    options: {
      frameworkType: string;
    }
  ) {
    this.projectPath = projectPath;

    this.restoreData();
  }

  private async restoreData() {
    const orderlyFile = await this.loadOrderlyFile();
    this.orderlyFileData = orderlyFile;
  }

  private async loadOrderlyFile() {
    const orderlyFilePath = await join(this.projectPath, "orderly.json");
    return readTextFile(orderlyFilePath);
  }
}
