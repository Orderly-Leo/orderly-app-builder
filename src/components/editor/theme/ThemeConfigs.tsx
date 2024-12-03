import { themeObjectAtom } from "./theme.atom";
import { ObjectEditor } from "../../../objectEditor";
import { useAtom } from "jotai";
import { themeCustomArgTypes } from "../../../types/themeCustom";

export const ThemeConfigs = () => {
  const [theme] = useAtom(themeObjectAtom);

  const onChange = () => {
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
