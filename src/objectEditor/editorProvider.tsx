import { createContext, FC, PropsWithChildren, JSX, useContext } from "react";
import { BooleanControl } from "./fieldControl/boolean";
import { NumberControl } from "./fieldControl/number";
import { ColorsControl } from "./fieldControl/colors";
import { StringControl } from "./fieldControl/string";
import { FileControl } from "./fieldControl/file";

export type ObjectEditorContextState = {
  fieldControls: {
    [key: string]: JSX.ElementType;
  };
  onFieldChange?: (key: string, value: any) => void;
  argTypes: any;
};

export const ObjectEditorContext = createContext<ObjectEditorContextState>(
  {} as ObjectEditorContextState
);

const defaultFieldControls = {
  boolean: BooleanControl,
  number: NumberControl,
  colors: ColorsControl,
  string: StringControl,
  file: FileControl,
};

export const useFieldControls = () => {
  return useContext(ObjectEditorContext);
};

export const ObjectEditorProvider: FC<
  PropsWithChildren<{
    // onFieldChange?: (key: string, value: any) => void;
    argTypes?: any;
  }>
> = (props) => {
  return (
    <ObjectEditorContext.Provider
      value={{
        fieldControls: defaultFieldControls,
        // onFieldChange: props.onFieldChange,
        argTypes: props.argTypes,
      }}
    >
      {props.children}
    </ObjectEditorContext.Provider>
  );
};
