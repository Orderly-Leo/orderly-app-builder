import { currentThemeAtom, themeConfig, themeObjectAtom } from "./theme.config";
import { ObjectEditor } from "../../../objectEditor";
import { objectParse, updateObject } from "../../../objectEditor/helper";
import { atomWithImmer } from "jotai-immer";
import { useAtom } from "jotai";
import { themeCustomArgTypes } from "../../../types/themeCustom";

export const ThemeConfigs = () => {
  const [theme, setTheme] = useAtom(themeObjectAtom);

  const onChange = (path: string, value: any) => {
    // setTheme((draft) => {
    //   updateObject(draft, path, value);
    // });
  };

  return (
    <div>
      <ObjectEditor
        object={theme}
        onFieldChange={onChange}
        argTypes={themeCustomArgTypes}
      />
    </div>
  );
};
