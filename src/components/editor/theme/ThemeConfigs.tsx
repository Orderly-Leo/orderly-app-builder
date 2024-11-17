import { themeConfig } from "./theme.config";
import { ObjectEditor } from "../../../objectEditor";
import { objectParse, updateObject } from "../../../objectEditor/helper";
import { atomWithImmer } from "jotai-immer";
import { useAtom } from "jotai";
import { themeCustomArgTypes } from "../../../types/themeCustom";

const themeAtom = atomWithImmer(objectParse(themeConfig));

export const ThemeConfigs = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  const onChange = (path: string, value: any) => {
    // console.log(path, value);
    setTheme((draft) => {
      updateObject(draft, path, value);
    });
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
