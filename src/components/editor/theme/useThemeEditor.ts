import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { currentThemeAtom } from "./theme.atom";
import { editorServiceAtom } from "@/components/config/configs.atom";

export const useThemeEditor = () => {
  //   const [theme, setTheme] = useAtom(themeObjectAtom);
  const setCurrentTheme = useSetAtom(currentThemeAtom);
  const editorService = useAtomValue(editorServiceAtom);

  useEffect(() => {
    if (editorService) {
      editorService.projectManager.frameworkHandler
        ?.loadCSS()
        .then((cssData) => {
          //   console.log(cssData);
          setCurrentTheme({
            name: "default",
            theme: cssData,
          });
        });
    }
  }, [editorService]);
};
