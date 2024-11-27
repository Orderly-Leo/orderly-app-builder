import { ChevronRight } from "lucide-react";
import { FC, useMemo } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";

type ObjectCategoryProps = {
  object: any;
};

export const ObjectCategory: FC<ObjectCategoryProps> = (props) => {
  console.log(props.object);
  const data = useMemo(
    () =>
      flattenTree({
        name: "data",
        children: props.object,
      }),
    [props.object]
  );

  return (
    <div
      className="text-xs p-4 sticky top-[60px] text-gray-800"
      style={{
        height: `calc(100vh - 100px)`,
      }}
    >
      <TreeView
        data={data}
        className="basic"
        aria-label="basic example tree"
        nodeRenderer={(props) => {
          // console.log(props.element);
          const { element, getNodeProps, level, isBranch, handleSelect } =
            props;
          if (element.children.length === 0) {
            return null;
          }
          return (
            <div
              {...getNodeProps()}
              className="flex gap-1 items-center py-[2px]"
              style={{ paddingLeft: 20 * (level - 1) }}
            >
              {isBranch && element.children.length > 0 && (
                <ChevronRight size={14} />
              )}

              <span>{element.name}</span>
            </div>
          );
        }}
      />
    </div>
  );
};
