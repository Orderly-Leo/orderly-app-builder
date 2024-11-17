import { FC, useMemo } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";

type ObjectCategoryProps = {
  object: any;
};

export const ObjectCategory: FC<ObjectCategoryProps> = (props) => {
  const data = useMemo(
    () =>
      flattenTree({
        name: "data",
        children: props.object,
      }),
    [props.object]
  );

  return (
    <div className="w-[220px]">
      <TreeView
        data={data}
        className="basic"
        aria-label="basic example tree"
        nodeRenderer={({ element, getNodeProps, level, handleSelect }) => (
          <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
            {element.name}
          </div>
        )}
      />
    </div>
  );
};
