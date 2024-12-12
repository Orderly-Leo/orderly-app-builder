import { FC } from "react";
import { LayoutProps } from "./props/layout";

import { ObjectEditor } from "@/objectEditor";

export const PageProps: FC<{
  props: any;
  propTypes: any;
  onChange?: (values: any, changed: any) => void;
}> = ({ props, propTypes, onChange }) => {
  return (
    <div>
      <LayoutProps />
      <ObjectEditor
        showCategory={false}
        classes={{
          fields: "gap-0 px-5",
        }}
        object={props}
        argTypes={propTypes}
        onChange={onChange}
      />
    </div>
  );
};
