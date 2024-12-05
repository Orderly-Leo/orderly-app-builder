import { Button } from "@/components/ui/button";
import { useAtom, useAtomValue } from "jotai";
import { Pencil, Trash2 } from "lucide-react";
import { FC, useMemo } from "react";
import { themesAtom } from "./theme.atom";
import { Link } from "react-router-dom";
import { confirm } from "@tauri-apps/plugin-dialog";

import {
  appIsInitializedAtom,
  editorServiceAtom,
  themeCSSPathAtom,
} from "@/components/config/configs.atom";
import { NoCssPath } from "./noCssPath";

export const ThemesPanel: FC = () => {
  const [themes, setThemes] = useAtom(themesAtom);
  const appInitialized = useAtomValue(appIsInitializedAtom);
  const themeCSSPath = useAtomValue(themeCSSPathAtom);
  const editorService = useAtomValue(editorServiceAtom);

  if (!appInitialized) {
    return null;
  }

  if (!themeCSSPath) {
    return <NoCssPath />;
  }

  const deleteTheme = async (name: string) => {
    const confirmation = await confirm(
      "This action will delete the theme. Are you sure?",
      { title: "Delete Theme", kind: "warning" }
    );
    if (confirmation) {
      setThemes(themes.filter((t) => t.name !== name));
      // delete theme from local storage
      editorService?.deleteTheme(name);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {themes.map((theme) => (
        <div key={theme.name} className="space-y-2 group">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium flex-1">{theme.name}</h3>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="p-0 text-gray-300 group-hover:text-gray-900 transition-colors"
                asChild
              >
                <Link to={`${theme.name}`}>
                  <Pencil className="w-4 h-4 text-inherit" />
                </Link>
              </Button>
              {themes.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-0 text-gray-300 group-hover:text-gray-900 transition-colors"
                  onClick={() => deleteTheme(theme.name)}
                >
                  <Trash2 className="w-4 h-4 text-inherit" />
                </Button>
              )}
            </div>
          </div>
          <div>
            <ThemeColors theme={theme.theme} />
            {/* {theme.colors.map((color, index) => (
              <div
                key={index}
                className="flex-1"
                style={{ backgroundColor: color }}
              />
            ))} */}
          </div>
        </div>
      ))}
    </div>
  );
};

const ThemeColors: FC<{ theme: Record<string, string> }> = ({ theme }) => {
  const colors = useMemo(() => {
    return [
      theme["--oui-color-base-5"],
      theme["--oui-color-base-6"],
      theme["--oui-color-base-7"],
      theme["--oui-color-primary-darken"],
      theme["--oui-color-primary"],
      theme["--oui-color-primary-light"],
      theme["--oui-color-success-darken"],
      theme["--oui-color-success"],
      theme["--oui-color-success-light"],
      theme["--oui-color-danger-darken"],
      theme["--oui-color-danger"],
      theme["--oui-color-danger-light"],
      theme["--oui-color-warning-darken"],
      theme["--oui-color-warning"],
      theme["--oui-color-warning-light"],
    ];
  }, [theme]);
  return (
    <div className="flex rounded-lg overflow-hidden h-24">
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex-1"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
};
