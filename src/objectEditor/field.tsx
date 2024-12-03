import { FC, useMemo } from "react";
import { useFieldControls } from "./editorProvider";
import { UndefinedControl } from "./fieldControl/undefined";

import { view, lensPath } from "ramda";
import { Description } from "./description";
import { InputLabel } from "@/components/ui/inputLabel";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export const Field: FC<{
  name: string;
  label: string;
  path: string;
  // description: string;
  field: any;
  level: number;
  className?: string;
}> = (props) => {
  const { label, field, path, className } = props;

  const { register } = useFormContext();
  const { onChange, onBlur, ref, name } = register(path);

  const { fieldControls, argTypes } = useFieldControls();

  // const [object, setObject] = useAtom(objectAtom);

  // const onChange = (value: any, key?: string) => {
  //   let keyPath = path;
  //   if (typeof key === "string") {
  //     keyPath = keyPath + "." + key;
  //   }
  //   onFieldChange?.(keyPath, value);
  // };

  const argType = useMemo(() => {
    if (!argTypes) return undefined;
    const lens = lensPath(path.split("."));
    // console.log("*****", path.split("."));

    return view(lens, argTypes);
  }, [path]);

  let Control = fieldControls[argType?.control?.type || field.type];

  if (!Control) {
    Control = UndefinedControl;
  }

  return (
    <div className={cn("hover:bg-gray-50 p-2 rounded-md -mx-2", className)}>
      <InputLabel>{label}</InputLabel>
      <Description description={argType?.description} />

      <div>
        <Control
          {...field}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          name={name}
        />
      </div>
    </div>
  );
};
