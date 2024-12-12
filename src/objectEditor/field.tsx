import { FC, useMemo } from "react";
import { useFieldControls } from "./editorProvider";
import { UndefinedControl } from "./fieldControl/undefined";

import { view, lensPath } from "ramda";
import { useFormContext } from "react-hook-form";

export const Field: FC<{
  // name: string;
  label: string;
  path: string;
  // description: string;
  field: any;
  level: number;
  className?: string;
  // transformForForm?: FormTransform;
}> = (props) => {
  const { field, path, className } = props;

  const { control } = useFormContext();
  // const { name } = register(path);

  const {
    fieldControls,
    argTypes,
    transformForField: transformForForm,
  } = useFieldControls();

  const argType = useMemo(() => {
    if (!argTypes) return undefined;
    const lens = lensPath(path.split("."));
    // console.log("*****", path.split("."));

    return view(lens, argTypes);
  }, [path]);

  let Control = fieldControls[argType?._control?.type || field.type];

  if (!Control) {
    Control = UndefinedControl;
  }

  const transform = transformForForm?.[path];

  return (
    <div className={className}>
      <Control
        {...field}
        name={path}
        control={control}
        label={props.label}
        description={argType?._description}
        transformForField={transform}
      />
    </div>
  );
};
