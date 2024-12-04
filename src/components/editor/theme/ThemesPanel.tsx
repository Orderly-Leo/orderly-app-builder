import { Button } from "@/components/ui/button";
import { useAtom, useAtomValue } from "jotai";
import { Pencil, Trash2 } from "lucide-react";
import { FC } from "react";
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
    console.log("deleteTheme", name);
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
              <Button
                variant="ghost"
                size="icon"
                className="p-0 text-gray-300 group-hover:text-gray-900 transition-colors"
                onClick={() => deleteTheme(theme.name)}
              >
                <Trash2 className="w-4 h-4 text-inherit" />
              </Button>
            </div>
          </div>
          <div className="flex rounded-lg overflow-hidden h-24">
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
