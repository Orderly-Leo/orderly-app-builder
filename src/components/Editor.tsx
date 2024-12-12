import { useEffect, useRef } from "react";
import { EditorLayout } from "./editor/EditorLayout";
import { EditorService } from "@/service/editor";
import {
  appStateAtom,
  configsAtom,
  editorServiceAtom,
} from "./config/configs.atom";
import { useSetAtom } from "jotai";
import { themesAtom } from "./editor/theme/theme.atom";
import { ControlBar } from "./controlBar";
import { componentConfigAtom, pagesAtom } from "./editor/page/pages.atom";

export const Editor = () => {
  const setEditorService = useSetAtom(editorServiceAtom);
  const setConfigs = useSetAtom(configsAtom);
  const setAppState = useSetAtom(appStateAtom);
  const setThemes = useSetAtom(themesAtom);
  const setPages = useSetAtom(pagesAtom);
  const setComponentConfig = useSetAtom(componentConfigAtom);

  const editorServiceRef = useRef<EditorService | null>(null);

  useEffect(() => {
    if (!editorServiceRef.current) {
      editorServiceRef.current = new EditorService(
        "/Users/leo/project/test",
        "test",
        {
          framework: "nextjs",
        }
      );

      setEditorService(editorServiceRef.current);

      editorServiceRef.current.restoreData((data) => {
        console.log("======== data", data);

        if (data.themes.length === 1) {
          // if default theme is not in the local storage, add it
          const _sdkTheme = localStorage.getItem("__orderly_theme__");
          if (!_sdkTheme) {
            localStorage.setItem(
              "__orderly_theme__",
              JSON.stringify(data.themes[0])
            );
          }
        }

        setThemes(data.themes);

        setConfigs((draft) => {
          draft.config = data.config;
        });

        setPages(data.routes);

        setComponentConfig(data.componentConfig);

        setAppState((draft) => {
          draft.initialized = true;
        });
      });
    }
  }, []);

  return (
    <div className="min-h-svh flex flex-col">
      <ControlBar />
      <div className="flex-1 relative overflow-hidden">
        <EditorLayout />
      </div>
    </div>
  );
};
