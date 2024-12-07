import { FC } from "react";
import { ObjectEditorProvider } from "./editorProvider";
import { ObjectFields, ObjectFieldsProps } from "./fields";
import { ObjectCategory } from "./treeview";
import { cn } from "@/lib/utils";

export type ObjectEditorProps = {
  object: any;
  generateCode?: (object: any) => string;
  onFieldChange?: (path: string, value: any) => void;
  argTypes?: any;
  showCategory?: boolean;
  classes?: ObjectFieldsProps["classes"] & {
    category?: string;
  };
};

export const ObjectEditor: FC<ObjectEditorProps> = (props) => {
  const { showCategory = true } = props;

  return (
    <ObjectEditorProvider
      // onFieldChange={props.onFieldChange}
      argTypes={props.argTypes}
    >
      <div className={cn(showCategory && "grid grid-cols-[220px_1fr]")}>
        {showCategory && (
          <ObjectCategory
            object={props.object}
            classes={{
              root: props.classes?.category,
            }}
          />
        )}
        <ObjectFields object={props.object} classes={props.classes} />
      </div>
    </ObjectEditorProvider>
  );
};
