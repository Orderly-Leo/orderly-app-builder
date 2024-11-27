import { FC } from "react";
import { ObjectEditorProvider } from "./editorProvider";
import { ObjectFields } from "./fields";
import { Flex } from "@radix-ui/themes";
import { ObjectCategory } from "./treeview";

export type ObjectEditorProps = {
  object: any;
  generateCode?: (object: any) => string;
  onFieldChange?: (path: string, value: any) => void;
  argTypes?: any;
};

export const ObjectEditor: FC<ObjectEditorProps> = (props) => {
  console.log(props.object);
  return (
    <ObjectEditorProvider
      onFieldChange={props.onFieldChange}
      argTypes={props.argTypes}
    >
      <div className="grid grid-cols-[220px_1fr]">
        <ObjectCategory object={props.object} />
        <ObjectFields object={props.object} />
      </div>
    </ObjectEditorProvider>
  );
};
