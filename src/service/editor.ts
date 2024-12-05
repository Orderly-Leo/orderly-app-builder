import { path } from "ramda";
import {
  ProjectManager,
  projectManager,
  ProjectManagerImpl,
} from "./projectManager";
import { OrderlyConfig, OrderlyTheme } from "./types";
import { invoke } from "@tauri-apps/api/core";
import { PROJECT_THEMES_KEY } from "./utils";

export class EditorService {
  private projectPath: string;
  #themes: OrderlyTheme[] = [];
  private projectConfig: any;
  projectManager: ProjectManager;
  private projectName: string;
  private cssWorker: Worker;

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

    this.cssWorker = new Worker(
      new URL("../workers/cssWorker.ts", import.meta.url),
      {
        type: "module",
      }
    );
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

    const cssPath = path(["paths", "themeCSS"], this.projectConfig);

    if (cssPath) {
      this.framework?.setCSSPath(cssPath);
    }

    // load css file
    if (!!this.framework) {
      // await this.framework.loadCSS();

      this.#themes = await this.loadThemes();

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

  private async loadThemes() {
    const themes: OrderlyTheme[] = [];
    const currentTheme = await this.loadThemeFromCSSFile();
    let currentThemeMD5: string[] = [];

    if (currentTheme) {
      console.log("========loadThemes current theme", currentTheme);

      currentThemeMD5 = await this.getThemeMD5(currentTheme);

      // console.log("+++++md5++++++", md5);

      themes.push({
        name: "Default",
        theme: currentTheme,
        description: "Default theme",
      });
    }

    // load css items from localstorage

    // const themesStr = localStorage.getItem(PROJECT_THEMES_KEY);
    // if (themesStr) {
    //   const arr = JSON.parse(themesStr);

    //   for await (const theme of arr) {
    //     const [md5Str, sortedThemeStr] = await this.getThemeMD5(theme.theme);

    //     console.log(
    //       "????",
    //       sortedThemeStr,
    //       currentThemeMD5[1],
    //       md5Str,
    //       currentThemeMD5[0]
    //     );
    //   }

    //   themes.push(...arr);
    // }

    return themes;
  }

  private async getThemeMD5(theme: Record<string, any>): Promise<string[]> {
    const sortedTheme = this.sortTheme(theme);
    const sortedThemeStr = JSON.stringify(sortedTheme)
      .replace(/\s*/g, "")
      .replace("\n", "");

    const md5Str: string = await invoke("get_str_md5", { str: sortedThemeStr });

    return [md5Str, sortedThemeStr];
  }

  private async loadThemeFromCSSFile() {
    return await this.projectManager.frameworkHandler?.loadCSS();
  }

  private sortTheme(theme: Record<string, any>) {
    // this.#themes.sort((a, b) => a.name.localeCompare(b.name));
    const keys = Object.keys(theme);
    keys.sort();
    return keys.reduce((acc, key) => {
      acc[key] = theme[key];
      return acc;
    }, {} as Record<string, any>);
  }

  appendTheme(theme: OrderlyTheme) {
    this.#themes.unshift(theme);
    this.saveThemes();
  }

  deleteTheme(name: string) {
    this.#themes = this.#themes.filter((t) => t.name !== name);
    this.saveThemes();
  }

  private saveThemes() {
    localStorage.setItem(PROJECT_THEMES_KEY, JSON.stringify(this.#themes));
  }

  async themeToCSS(theme: Record<string, any>) {
    const cssInJs = {
      ":root": theme,
    };

    return new Promise<string>((resolve, reject) => {
      const handleMessage = (e: MessageEvent) => {
        const { type, data } = e.data;
        if (type === "CSS_RESULT") {
          this.cssWorker.removeEventListener("message", handleMessage);
          resolve(data);
        }
      };

      this.cssWorker.addEventListener("message", handleMessage);
      this.cssWorker.postMessage({
        type: "THEME_TO_CSS",
        data: cssInJs,
      });
    });
  }

  async saveThemeAsCSS(theme: Record<string, any>) {
    const css = await this.themeToCSS(theme);
    if (css) {
      await this.framework?.writeCSS(css);
    }
    return css;
  }

  destroy() {
    if (this.cssWorker) {
      this.cssWorker.terminate();
    }
  }
}
