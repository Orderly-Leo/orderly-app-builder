import { Box, Flex, TextField, Text } from "@radix-ui/themes";
import { PageTemplate, PageConfig } from "../../../../types/page";

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

  const handlePropChange = (prop: string, value: any) => {
    onChange({
      ...config,
      props: {
        ...config.props,
        [prop]: value,
      },
    });
  };

  return (
    <Flex gap="6">
      {/* 左侧预览区域 */}
      <Box className="w-1/3">
        <Text size="2" weight="medium" className="mb-3">
          Template Preview
        </Text>
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
        <Box className="mt-4">
          <Text size="3" weight="medium">
            {template.name}
          </Text>
          <Text size="2" color="gray" className="mt-1">
            {template.description}
          </Text>
        </Box>
      </Box>

      {/* 右侧配置表单 */}
      <Box className="flex-1 space-y-6">
        <Box>
          <Text as="label" size="2" weight="medium">
            Page Name
          </Text>
          <TextField.Root
            value={config.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter page name"
          />
        </Box>

        <Box>
          <Text as="label" size="2" weight="medium">
            Route
          </Text>
          <TextField.Root
            value={config.route || ""}
            onChange={(e) => handleChange("route", e.target.value)}
            placeholder="/path/to/page"
          />
        </Box>

        {Object.entries(template.props || {}).length > 0 && (
          <Box>
            <Text size="2" weight="medium" className="mb-3">
              Page Properties
            </Text>
            <Box className="space-y-4">
              {Object.entries(template.props || {}).map(([prop, schema]) => (
                <Box key={prop}>
                  <Text as="label" size="2" weight="medium">
                    {prop}
                    {schema.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </Text>
                  <TextField.Root
                    value={config.props?.[prop] || schema.default || ""}
                    onChange={(e) => handlePropChange(prop, e.target.value)}
                    placeholder={schema.description}
                  />
                  {schema.description && (
                    <Text size="1" color="gray" className="mt-1">
                      {schema.description}
                    </Text>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Flex>
  );
};
