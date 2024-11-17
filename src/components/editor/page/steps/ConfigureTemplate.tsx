import { TextField, Flex, Text, Box } from "@radix-ui/themes";
import { PageTemplate, PageConfig } from "../../../../types/page";
import { ChangeEvent } from "react";

interface ConfigureTemplateProps {
  template: PageTemplate;
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
    <Flex>
      {/* 左侧预览区域 */}
      <Box className="w-1/3" p={"4"}>
        <Box className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
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
        </Box>
      </Box>

      {/* 右侧配置表单 */}
      <Flex direction="column" gap="3" className="flex-1 px-4">
        <Box>
          <Text as="label" size="2" weight="medium" mb="2">
            Page Name
          </Text>
          <TextField.Root
            value={config.name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("name", e.target.value)
            }
            placeholder="Enter page name"
          />
        </Box>

        <Box>
          <Text as="label" size="2" weight="medium" mb="2">
            Route
          </Text>
          <TextField.Root
            value={config.route || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange("route", e.target.value)
            }
            placeholder="/path/to/page"
          />
        </Box>
        <Box>
          <Text as="label" size="2" weight="medium" mb="2">
            Use the global layout
          </Text>
        </Box>

        {/* {Object.entries(template.props || {}).length > 0 && (
          <Box>
            <Text size="3" weight="medium" mb="3">
              Page Properties
            </Text>
            <Flex direction="column" gap="4">
              {Object.entries(template.props || {}).map(([prop, schema]) => (
                <Box key={prop}>
                  <Text as="label" size="2" weight="medium" mb="2">
                    {prop}
                    {schema.required && (
                      <Text color="red" ml="1">
                        *
                      </Text>
                    )}
                  </Text>
                  <TextField.Root
                    value={config.props?.[prop] || schema.default || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handlePropChange(prop, e.target.value)
                    }
                    placeholder={schema.description}
                  />
                  {schema.description && (
                    <Text size="1" color="gray" mt="1">
                      {schema.description}
                    </Text>
                  )}
                </Box>
              ))}
            </Flex>
          </Box>
        )} */}
      </Flex>
    </Flex>
  );
};
