import chroma from "chroma-js";
import { OrderlyTheme } from "./types";

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
