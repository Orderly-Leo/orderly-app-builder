import { FC } from "react";
import { ObjectEditorProvider } from "./editorProvider";
import { ObjectFields, ObjectFieldsProps } from "./fields";
import { ObjectCategory } from "./treeview";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { FieldTransform } from "./fieldControl/types";

export type ObjectEditorProps = {
  object: any;
  generateCode?: (object: any) => string;
  onFieldChange?: (values: any, changed: any) => void;
  argTypes?: any;
  extendForZod?: (argTypes: z.ZodType<any>) => z.ZodType<any>;
  showCategory?: boolean;
  onChange?: (values: any, changed: any) => void;
  classes?: ObjectFieldsProps["classes"] & {
    category?: string;
  };
  transformForField?: Record<string, FieldTransform>;
};

export const ObjectEditor: FC<ObjectEditorProps> = (props) => {
  const { showCategory = true } = props;

  return (
    <ObjectEditorProvider
      // onFieldChange={props.onFieldChange}
      argTypes={props.argTypes}
      extendForZod={props.extendForZod}
      transformForField={props.transformForField}
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
        <ObjectFields
          object={props.object}
          classes={props.classes}
          onChange={props.onChange}
          argTypes={props.argTypes}
          extendForZod={props.extendForZod}
        />
      </div>
    </ObjectEditorProvider>
  );
};
