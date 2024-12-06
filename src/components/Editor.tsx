import { useEffect } from "react";
import { EditorLayout } from "./editor/EditorLayout";
import { EditorService } from "@/service/editor";
import {
  appStateAtom,
  configsAtom,
  editorServiceAtom,
} from "./config/configs.atom";
import { useAtom } from "jotai";
import { useSetAtom } from "jotai";
import { themesAtom } from "./editor/theme/theme.atom";
import { ControlBar } from "./controlBar";

export const Editor = () => {
  const [editorService, setEditorService] = useAtom(editorServiceAtom);
  const setConfigs = useSetAtom(configsAtom);
  const setAppState = useSetAtom(appStateAtom);
  const setThemes = useSetAtom(themesAtom);

  useEffect(() => {
    if (!editorService) {
      const editorService = new EditorService(
        "/Users/leo/project/test",
        "test",
        {
          framework: "nextjs",
        }
      );

      setEditorService(editorService);

      editorService.restoreData((data) => {
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

        setAppState((draft) => {
          draft.initialized = true;
        });
      });
    }
  }, []);

  return (
    <div className="min-h-svh">
      <ControlBar />
      <EditorLayout />
    </div>
  );
};
