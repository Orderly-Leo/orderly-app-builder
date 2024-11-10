import { FC } from "react";
import { ObjectEditorProvider } from "./editorProvider";
import { ObjectFields } from "./fields";

export type ObjectEditorProps = {
  object: any;
};

export const ObjectEditor: FC<ObjectEditorProps> = (props) => {
  return (
    <ObjectEditorProvider>
      <ObjectFields object={props.object} />
    </ObjectEditorProvider>
  );
};
