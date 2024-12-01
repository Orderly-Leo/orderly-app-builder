import { FC, useMemo } from "react";
import { ObjectEditorProvider } from "./editorProvider";
import { ObjectFields } from "./fields";
import { ObjectCategory } from "./treeview";
import { cn } from "@/lib/utils";
import { objectParse } from "./helper";

export type ObjectEditorProps = {
  object: any;
  generateCode?: (object: any) => string;
  onFieldChange?: (path: string, value: any) => void;
  argTypes?: any;
  showCategory?: boolean;
};

export const ObjectEditor: FC<ObjectEditorProps> = (props) => {
  const { showCategory = true } = props;

  const parsedObject = useMemo(() => {
    return objectParse(props.object);
  }, [props.object]);
  return (
    <ObjectEditorProvider
      // onFieldChange={props.onFieldChange}
      argTypes={props.argTypes}
    >
      <div className={cn(showCategory && "grid grid-cols-[220px_1fr]")}>
        {showCategory && <ObjectCategory object={parsedObject} />}
        <ObjectFields object={parsedObject} />
      </div>
    </ObjectEditorProvider>
  );
};
