import { WritableDraft } from "immer";

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
  if (node.type === "colors" && Array.isArray(node.colors)) {
    const value = getValueFromConfig(config, fullPath);
    return {
      ...node,
      value,
      colors: node.colors.map((colorItem: any) => ({
        ...colorItem,
        value: value?.[colorItem.key],
      })),
    };
  }

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
  parentPath: string[] = []
): ParsedNode[] => {
  return Object.entries(obj).map(([key, value]) => {
    const currentPath = [...parentPath, key];
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    if (value === null || value === undefined) {
      return {
        key,
        label,
        name: label,
        type: "text",
        value,
        path: currentPath.join("."),
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
        children: value.map((item, index) => {
          if (typeof item === "object" && item !== null) {
            // 如果数组元素是对象，递归处理
            return {
              key: index.toString(),
              label: `Item ${index}`,
              name: `Item ${index}`,
              type: "object",
              path: [...currentPath, index.toString()].join("."),
              children: objectParse(item, index.toString(), [
                ...currentPath,
                index.toString(),
              ]),
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
            };
          }
        }),
      };
    }

    // 处理颜色对象（包含 darken、default、lighten、contrast 的对象）
    if (
      typeof value === "object" &&
      ("darken" in value ||
        "default" in value ||
        "lighten" in value ||
        "contrast" in value)
    ) {
      return {
        key,
        label,
        type: "colors",
        name: label,
        path: currentPath.join("."),
        children: [
          {
            key: "darken",
            type: "color",
            label: "Darken",
            name: label,
            value: value.darken,
            path: [...currentPath, "darken"].join("."),
          },
          {
            key: "default",
            type: "color",
            label: "Default",
            name: label,
            value: value.default,
            path: [...currentPath, "default"].join("."),
          },
          {
            key: "lighten",
            type: "color",
            label: "Lighten",
            name: label,
            value: value.lighten,
            path: [...currentPath, "lighten"].join("."),
          },
          {
            key: "contrast",
            type: "color",
            label: "Contrast",
            name: label,
            value: value.contrast,
            path: [...currentPath, "contrast"].join("."),
          },
        ],
      };
    }

    // 处理基础色值对象（包含数字键的对象，如 100、200、300 等）
    if (
      typeof value === "object" &&
      Object.keys(value).every((k) => /^\d+$/.test(k))
    ) {
      return {
        key,
        label,
        name: label,
        type: "colors",
        path: currentPath.join("."),
        children: Object.entries(value).map(([colorKey, colorValue]) => ({
          key: colorKey,
          type: "color",
          label: colorKey,
          name: label,
          value: colorValue,
          path: [...currentPath, colorKey].join("."),
        })),
      };
    }

    // 处理嵌套对象
    return {
      key,
      label,
      name: label,
      type: "object",
      path: currentPath.join("."),
      children: objectParse(value, key, currentPath),
    };
  });
};

export function updateObject(
  draft: WritableDraft<ParsedNode>[],
  path: string,
  value: any
) {
  const pathArray = path.split(".");
  let target = draft;

  while (pathArray.length > 1 && Array.isArray(target)) {
    const key = pathArray.shift()!;

    let index = target.findIndex((item) => item.key === key);

    if (index === -1) {
      throw new Error(`Key ${key} not found`);
    }

    if (Array.isArray(target[index].children)) {
      target = target[index].children;
    }
  }

  const finalKey = pathArray[0];
  let finalIndex = target.findIndex((item) => item.key === finalKey);

  if (finalIndex === -1) {
    throw new Error(`Key ${finalKey} not found`);
  }

  if (Array.isArray(target)) {
    target[finalIndex].value = value;
  } else {
    console.warn("Cant find target");
  }
}
