import { createContext, FC, PropsWithChildren, JSX, useContext } from "react";
import { BooleanControl } from "./fieldControl/boolean";
import { NumberControl } from "./fieldControl/number";
import { ColorsControl } from "./fieldControl/colors";
import { StringControl } from "./fieldControl/string";
import { FileControl } from "./fieldControl/file";
import { PathControl } from "./fieldControl/path";
import { z } from "zod";
import { FieldTransform } from "./fieldControl/types";
import { ColorControl } from "./fieldControl/color";

export type ObjectEditorContextState = {
  fieldControls: {
    [key: string]: JSX.ElementType;
  };
  onFieldChange?: (key: string, value: any) => void;
  argTypes: any;
  extendForZod?: (argTypes: z.ZodType<any>) => z.ZodType<any>;
  transformForField?: Record<string, FieldTransform>;
};

export const ObjectEditorContext = createContext<ObjectEditorContextState>(
  {} as ObjectEditorContextState
);

const defaultFieldControls = {
  boolean: BooleanControl,
  number: NumberControl,
  colors: ColorsControl,
  color: ColorControl,
  string: StringControl,
  file: FileControl,
  path: PathControl,
};

export const useFieldControls = () => {
  return useContext(ObjectEditorContext);
};

export const ObjectEditorProvider: FC<
  PropsWithChildren<{
    argTypes?: any;
    extendForZod?: (argTypes: z.ZodType<any>) => z.ZodType<any>;
    transformForField?: Record<string, FieldTransform>;
  }>
> = (props) => {
  return (
    <ObjectEditorContext.Provider
      value={{
        fieldControls: defaultFieldControls,
        argTypes: props.argTypes,
        extendForZod: props.extendForZod,
        transformForField: props.transformForField,
      }}
    >
      {props.children}
    </ObjectEditorContext.Provider>
  );
};
