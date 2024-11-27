import { TextField, Flex, Text, Box } from "@radix-ui/themes";
import { PageComponent, PageConfig } from "../../../../types/page";
import { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { InputLabel } from "@/components/ui/inputLabel";
import { Checkbox } from "@/components/ui/checkbox";

interface ConfigureTemplateProps {
  template: PageComponent;
  config: Partial<PageConfig>;
  onChange: (config: Partial<PageConfig>) => void;
}

export const ConfigureTemplate = ({
  template,
  config,
  onChange,
}: ConfigureTemplateProps) => {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  return (
    <div className="flex">
      {/* 左侧预览区域 */}
      <div className="w-1/3 p-4">
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
          {template.thumbnail ? (
            <img
              src={template.thumbnail}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Flex
              align="center"
              justify="center"
              className="w-full h-full text-gray-400"
            >
              No preview available
            </Flex>
          )}
        </div>
      </div>

      {/* 右侧配置表单 */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        <div>
          <InputLabel>Page Name</InputLabel>
          <Input
            value={config.name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("name", e.target.value)
            }
            placeholder="Enter page name"
          />
        </div>

        <div>
          <InputLabel>Route</InputLabel>
          <Input
            value={config.route || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("route", e.target.value)
            }
            placeholder="/path/to/page"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="inheritLayout" />
          <label htmlFor="inheritLayout">Inherit Parent Layout</label>
          {/* <Switch
            checked={config.inheritLayout || false}
            onCheckedChange={(checked) => handleChange("inheritLayout", checked)}
          /> */}
        </div>
      </div>
    </div>
  );
};
