import {
  ProjectManager,
  projectManager,
  ProjectManagerImpl,
} from "./projectManager";
import { OrderlyConfig, OrderlyTheme } from "./types";

const PROJECT_THEMES_KEY = "project-themes";
export class EditorService {
  private projectPath: string;
  #themes: OrderlyTheme[] = [];
  // private orderlyFileData: any;
  // private cssData: any;
  private projectConfig: any;
  private projectManager: ProjectManager;

  private projectName: string;
  constructor(
    projectPath: string,
    projectName: string,
    options: {
      framework: string;
    }
  ) {
    this.projectPath = projectPath;
    this.projectName = projectName;
    this.projectManager = projectManager;
    this.updateProjectManager(options.framework);

    // this.restoreData();
  }
  updateProjectManager(framework: string) {
    if (
      this.projectManager.frameworkHandler?.name === framework &&
      this.projectManager.frameworkHandler?.projectPath === this.projectPath &&
      this.projectManager.frameworkHandler?.projectName === this.projectName
    )
      return;

    this.projectManager.setProjectPath(this.projectPath);
    this.projectManager.setProjectName(this.projectName);
    this.projectManager.setFrameworkHandler(
      ProjectManagerImpl.getFrameworkHandler({
        framework: framework,
        projectPath: this.projectPath,
        projectName: this.projectName,
      })
    );
  }

  get framework() {
    return this.projectManager.frameworkHandler;
  }

  get themes() {
    return this.#themes;
  }

  async restoreData(
    cb: (data: { config: OrderlyConfig; themes: OrderlyTheme[] }) => void
  ) {
    console.log("======== restore data ==========");
    // const orderlyFile = await this.loadOrderlyFile();
    // this.orderlyFileData = orderlyFile;

    this.projectConfig = await this.loadProjectConfig();

    console.log("======== project config", this.projectConfig);

    // load css file
    if (!!this.framework) {
      // await this.framework.loadCSS();

      this.#themes = this.loadThemes();

      await this.framework.collectPages();
    }

    cb({
      config: this.projectConfig,
      themes: this.#themes,
    });
  }

  get config() {
    return this.projectConfig;
  }

  private loadProjectConfig() {
    return this.projectManager.readOrderlyConfigFile();
  }

  private loadThemes() {
    // load css items from localstorage

    const themes = localStorage.getItem(PROJECT_THEMES_KEY);
    if (themes) {
      return JSON.parse(themes);
    }
    return [];
  }

  appendTheme(theme: OrderlyTheme) {
    this.#themes.push(theme);
    this.saveThemes();
  }

  deleteTheme(name: string) {
    this.#themes = this.#themes.filter((t) => t.name !== name);
    this.saveThemes();
  }

  private saveThemes() {
    localStorage.setItem(PROJECT_THEMES_KEY, JSON.stringify(this.#themes));
  }
}
