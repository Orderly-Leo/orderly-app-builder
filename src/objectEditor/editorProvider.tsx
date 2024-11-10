import { createContext, FC, PropsWithChildren, ReactNode } from "react";

export type ObjectEditorContextState = {
  fieldEditors: Record<string, ReactNode>;
};

export const ObjectEditorContext = createContext<ObjectEditorContextState>(
  {} as ObjectEditorContextState
);

export const ObjectEditorProvider: FC<PropsWithChildren> = (props) => {
  return (
    <ObjectEditorContext.Provider
      value={{
        fieldEditors: {},
      }}
    >
      {props.children}
    </ObjectEditorContext.Provider>
  );
};
