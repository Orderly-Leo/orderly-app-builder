import chroma from "chroma-js";
import { OrderlyTheme } from "./types";
import { parse } from "@babel/parser";

export const PROJECT_THEMES_KEY = "__orderly_themes__";

export function convertHexToColor(
  data: Record<string, any>
): Record<string, string> {
  const newData = { ...data };
  Object.keys(newData).map((key) => {
    if (key.startsWith("--oui-color-")) {
      newData[key] = chroma(newData[key]).rgb().join(" ");
    } else if (
      key.startsWith("--oui-gradient") &&
      !key.endsWith("angle") &&
      !key.includes("stop")
    ) {
      const color = chroma(chroma(data[key]));

      newData[key] = color.rgb().join(" ");
    }
  });
  return newData;
}

export function convertColorToHex(data: Record<string, any>) {
  const newData = { ...data };
  Object.keys(newData).map((key) => {
    if (key.startsWith("--oui-color-")) {
      const color = chroma(chroma(data[key].split(" ")));

      newData[key] = color.hex();
    } else if (
      key.startsWith("--oui-gradient") &&
      !key.endsWith("angle") &&
      !key.includes("stop")
    ) {
      const color = chroma(chroma(data[key].split(" ")));

      newData[key] = color.hex();
    }
  });
  return newData;
}

export function updateThemeToLocalStorage(theme: OrderlyTheme) {
  const themes = localStorage.getItem(PROJECT_THEMES_KEY);
  if (themes) {
    let themesArray = JSON.parse(themes);
    if (Array.isArray(themesArray)) {
      themesArray = themesArray.map((t: OrderlyTheme) =>
        t.name === theme.name ? theme : t
      );
      localStorage.setItem(PROJECT_THEMES_KEY, JSON.stringify(themesArray));
    }
  } else {
    localStorage.setItem(PROJECT_THEMES_KEY, JSON.stringify([theme]));
  }
}

export async function groupPagesByRoute(pages: any[]) {
  const routes = new Map();

  // First build the tree structure using Map
  pages.forEach((page) => {
    const route = page.route;
    const segments: string[] = route.split("/").filter(Boolean);

    if (segments.length === 0) return;

    let currentLevel = routes;
    let parentPage = null;

    segments.forEach((segment, index) => {
      if (!currentLevel.has(segment)) {
        if (index === segments.length - 1) {
          currentLevel.set(segment, {
            ...page,
            children: new Map(),
          });
        } else {
          currentLevel.set(segment, {
            route: segments.slice(0, index + 1).join("/"),
            children: new Map(),
          });
        }
      }

      parentPage = currentLevel.get(segment);
      currentLevel = parentPage.children;
    });
  });

  // Convert Map to Array recursively
  const mapToArray = (map: Map<string, any>): any[] => {
    return Array.from(map.entries()).map(([key, value]) => ({
      ...value,
      children: mapToArray(value.children),
    }));
  };

  return mapToArray(routes);
}

export function getTradingProps(code: string) {
  const ast = parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  console.log("ast", ast);
}
