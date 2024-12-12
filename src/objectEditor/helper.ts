const getValueFromConfig = (config: any, path: string[]) => {
  let current: any = config;
  for (const key of path) {
    if (current === undefined) return undefined;
    current = current[key];
  }
  return current;
};

const parseConfigNode = (
  config: any,
  node: any,
  parentPath: string[] = [],
  rootGroup?: string
) => {
  if (!node) return node;

  const currentPath = node.key ? [...parentPath, node.key] : parentPath;
  const currentRootGroup = node.group || rootGroup;
  const fullPath = currentRootGroup
    ? [currentRootGroup, ...currentPath]
    : currentPath;

  // 特殊处理 colors 类型的节点
  // if (node.type === "colors" && Array.isArray(node.colors)) {
  //   const value = getValueFromConfig(config, fullPath);
  //   return {
  //     ...node,
  //     value,
  //     colors: node.colors.map((colorItem: any) => ({
  //       ...colorItem,
  //       value: value?.[colorItem.key],
  //     })),
  //   };
  // }

  // 如果有 children，检查是否需要打平
  if (Array.isArray(node.children)) {
    const processedChildren: any[] = [];

    node.children.forEach((child: any) => {
      if (Array.isArray(child.children)) {
        // 检查是否是最后一层children（即children中没有再包含children的节点）
        const isLastLevel = child.children.every(
          (grandChild: any) => !Array.isArray(grandChild.children)
        );

        if (isLastLevel) {
          // 如果是最后一层，保持当前节点结构
          const processed = parseConfigNode(
            config,
            child,
            currentPath,
            currentRootGroup
          );
          processedChildren.push(processed);
        } else {
          // 如果不是最后一层，递归处理并打平
          const processed = parseConfigNode(
            config,
            child,
            currentPath,
            currentRootGroup
          );
          if (processed.children) {
            processedChildren.push(...processed.children);
          }
        }
      } else {
        // 叶子节点直接添加
        const value = getValueFromConfig(config, [...fullPath, child.key]);
        processedChildren.push({
          ...child,
          value,
        });
      }
    });

    return {
      ...node,
      children: processedChildren,
    };
  }

  // 处理叶子节点
  if (node.type === "color" || node.type === "text") {
    return {
      ...node,
      value: getValueFromConfig(config, fullPath),
    };
  }

  return node;
};

export interface ParsedNode {
  level: number;
  key: string;
  label: string;
  name: string;
  type: string;
  value?: any;
  children?: ParsedNode[];
  colors?: any[];
  path: string;
}

export const objectParse = (
  obj: Record<string, any>,
  parentKey: string = "",
  parentPath: string[] = [],
  level: number = 0
): ParsedNode[] => {
  if (typeof obj !== "object" || obj === null) {
    return [];
  }

  return Object.entries(obj).map(([key, value]) => {
    const currentPath = [...parentPath, key];
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    const id = !!parentKey ? `${parentKey}_${key}` : key;

    if (value === null || value === undefined) {
      return {
        key,
        label,
        name: label,
        type: "text",
        value,
        path: currentPath.join("."),
        level,
        id,
      };
    }

    if (typeof value !== "object") {
      return {
        key,
        label,
        name: label,
        type: typeof value,
        value,
        path: currentPath.join("."),
        level,
        id,
      };
    }

    // 处理数组类型
    if (Array.isArray(value)) {
      return {
        key,
        label,
        name: label,
        type: "array",
        path: currentPath.join("."),
        level,
        children: value.map((item, index) => {
          if (typeof item === "object" && item !== null) {
            // 如果数组元素是对象，递归处理
            return {
              key: index.toString(),
              label: `Item ${index}`,
              name: `Item ${index}`,
              type: "object",
              path: [...currentPath, index.toString()].join("."),
              level: level + 1,
              children: objectParse(
                item,
                `${parentKey}_${key}`,
                [...currentPath, index.toString()],
                level + 2
              ),
            };
          } else {
            // 如果是基本类型，直接返回
            return {
              key: index.toString(),
              label: `Item ${index}`,
              name: `Item ${index}`,
              type: typeof item,
              value: item,
              path: [...currentPath, index.toString()].join("."),
              level: level + 1,
              id,
            };
          }
        }),
      };
    }

    // 处理嵌套对象
    return {
      key,
      label,
      name: label,
      type: "object",
      path: currentPath.join("."),
      level,
      id: `${parentKey}_${key}`,
      children: objectParse(
        value,
        `${parentKey}_${key}`,
        currentPath,
        level + 1
      ),
    };
  });
};

interface TreeNode {
  id: number;
  name: string;
  parent: number | null;
  children: number[];
  level: number;
  isExpandable?: boolean;
  value?: any;
  type?: string;
  path?: string;
}

export const flattenTree = (object: ParsedNode | ParsedNode[]) => {
  const result: TreeNode[] = [
    {
      id: 0,
      name: "root",
      children: [],
      parent: null,
      level: 0,
    },
  ];

  let currentId = 1;

  const processNode = (node: ParsedNode, parentId: number, level: number) => {
    const nodeId = currentId++;
    const childrenIds: number[] = [];

    // 将当前节点ID添加到父节点的children中
    if (parentId === 0) {
      result[0].children.push(nodeId);
    } else {
      const parentNode = result.find((n) => n.id === parentId);
      if (parentNode) {
        parentNode.children.push(nodeId);
      }
    }

    const isExpandable =
      (node.type === "object" || node.type === "array") &&
      node.children &&
      node.children.length > 0;

    // 如果有子节点，先递归处理所有子节点
    if (node.children && node.children.length > 0) {
      node.children.forEach((childNode) => {
        const childId = currentId; // 获取下一个将要使用的ID
        childrenIds.push(childId);
        processNode(childNode, nodeId, level + 1);
      });
    }

    const treeNode: TreeNode = {
      id: nodeId,
      name: node.label || node.name,
      children: childrenIds,
      parent: parentId,
      level,
      isExpandable,
      value: node.value,
      type: node.type,
      path: node.path,
    };

    result.push(treeNode);
  };

  // 处理输入节点
  if (Array.isArray(object)) {
    object.forEach((node) => processNode(node, 0, 1));
  } else {
    processNode(object, 0, 1);
  }

  return result;
};
