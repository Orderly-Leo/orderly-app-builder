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
  return (
    <ObjectEditorProvider
      onFieldChange={props.onFieldChange}
      argTypes={props.argTypes}
    >
      <Flex>
        <ObjectCategory object={props.object} />
        <ObjectFields object={props.object} />
      </Flex>
    </ObjectEditorProvider>
  );
};
