import { FC, useMemo } from "react";
import { useFieldControls } from "./editorProvider";
import { UndefinedControl } from "./fieldControl/undefined";
import { Box } from "@radix-ui/themes";
import { view, lensPath } from "ramda";
import { Description } from "./description";
import { InputLabel } from "@/components/ui/inputLabel";

export const Field: FC<{
  name: string;
  label: string;
  path: string;
  // description: string;
  field: any;
}> = (props) => {
  const { label, field, path } = props;

  const { fieldControls, onFieldChange, argTypes } = useFieldControls();

  // const [object, setObject] = useAtom(objectAtom);

  const onChange = (value: any, key?: string) => {
    let keyPath = path;
    if (typeof key === "string") {
      keyPath = keyPath + "." + key;
    }
    onFieldChange?.(keyPath, value);
  };

  const argType = useMemo(() => {
    if (!argTypes) return undefined;
    const lens = lensPath(path.split("."));

    return view(lens, argTypes);
  }, [path]);

  let Control = fieldControls[field.type];

  if (!Control) {
    Control = UndefinedControl;
  }

  return (
    <div className="hover:bg-gray-50 p-2 rounded-md -mx-2">
      <InputLabel>{label}</InputLabel>
      <Description description={argType?.description} />

      <div>
        <Control {...field} onChange={onChange} />
      </div>
    </div>
  );
};
