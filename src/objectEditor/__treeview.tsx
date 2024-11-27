import { FC, useMemo, useState } from "react";

interface TreeNode {
  name: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode[];
  className?: string;
  "aria-label"?: string;
}

interface TreeItemProps {
  node: TreeNode;
  level: number;
  onSelect?: (node: TreeNode) => void;
}

const TreeItem: FC<TreeItemProps> = ({ node, level, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const hasExpandableChildren =
    hasChildren &&
    node.children?.some((child) => child.children && child.children.length > 0);

  const handleClick = () => {
    if (hasExpandableChildren) {
      setIsExpanded(!isExpanded);
    }
    onSelect?.(node);
  };

  return (
    <div>
      <div
        role="treeitem"
        aria-expanded={hasExpandableChildren ? isExpanded : undefined}
        onClick={handleClick}
        style={{
          paddingLeft: 20 * (level - 1),
          cursor: hasExpandableChildren ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
        }}
      >
        {hasExpandableChildren && (
          <span style={{ marginRight: 4 }}>{isExpanded ? "▼" : "▶"}</span>
        )}
        {node.name}
      </div>
      {hasExpandableChildren && isExpanded && (
        <div role="group">
          {node.children?.map((child, index) => (
            <TreeItem
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CustomTreeView: FC<TreeViewProps> = ({
  data,
  className,
  "aria-label": ariaLabel,
}) => {
  const treeData = useMemo(() => {
    return Array.isArray(data) ? data : [data];
  }, [data]);

  return (
    <div role="tree" className={className} aria-label={ariaLabel}>
      {treeData.map((node, index) => (
        <TreeItem key={`${node.name}-${index}`} node={node} level={1} />
      ))}
    </div>
  );
};

type ObjectCategoryProps = {
  object: any;
};

export const ObjectCategory: FC<ObjectCategoryProps> = (props) => {
  const data = useMemo(
    () => ({
      name: "data",
      children: props.object,
    }),
    [props.object]
  );

  return (
    <div className="sticky top-20 p-4 text-sm">
      <CustomTreeView
        data={[data]}
        className="basic"
        aria-label="basic example tree"
      />
    </div>
  );
};
