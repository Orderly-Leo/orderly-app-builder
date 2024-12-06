import { FC, useMemo } from "react";
import { useFieldControls } from "./editorProvider";
import { UndefinedControl } from "./fieldControl/undefined";

import { view, lensPath } from "ramda";
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
  const { field, path, className } = props;

  const { register, control } = useFormContext();
  const { name } = register(path);

  const { fieldControls, argTypes } = useFieldControls();

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
    <div className={className}>
      <Control
        {...field}
        name={name}
        control={control}
        label={props.label}
        description={argType?.description}
      />
    </div>
  );
};
