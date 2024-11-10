import { Box, Flex, Text } from "@radix-ui/themes";
import { PageTemplate } from "../../../../types/page";


const templates: PageTemplate[] = [
  {
    id: "blank",
    name: "Blank Page",
    description: "Start with a blank page",
    thumbnail: "/templates/blank.png",
    props: {},
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "A dashboard layout with multiple sections",
    thumbnail: "/templates/dashboard.png",
    props: {
      title: {
        type: "string",
        description: "Dashboard title",
        default: "Dashboard",
        required: true,
      },
      layout: {
        type: "string",
        description: "Layout type",
        default: "grid",
      },
    },
  },
];

interface SelectTemplateProps {
  selectedTemplate: PageTemplate | null;
  onSelect: (template: PageTemplate) => void;
}

export const SelectTemplate = ({
  selectedTemplate,
  onSelect,
}: SelectTemplateProps) => {
  return (
    <Flex gap="6">
      {/* 左侧模板列表 */}
      <Box className="w-1/3 border-r border-gray-200 dark:border-gray-700 pr-4">
        <Text size="3" weight="medium" className="mb-4">
          Templates
        </Text>
        <Flex direction="column" gap="2">
          {templates.map((template) => (
            <Box
              key={template.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors
                ${
                  selectedTemplate?.id === template.id
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              onClick={() => onSelect(template)}
            >
              <Text size="2" weight="medium">
                {template.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* 右侧预览和详情 */}
      <Box className="flex-1">
        {selectedTemplate ? (
          <>
            {/* 预览图 */}
            <Box className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
              {selectedTemplate.thumbnail ? (
                <img
                  src={selectedTemplate.thumbnail}
                  alt={selectedTemplate.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No preview available
                </div>
              )}
            </Box>

            {/* 模板详情 */}
            <Box className="space-y-4">
              <Box>
                <Text size="4" weight="medium">
                  {selectedTemplate.name}
                </Text>
                <Text size="2" color="gray" className="mt-1">
                  {selectedTemplate.description}
                </Text>
              </Box>

              {/* 属性预览 */}
              {Object.keys(selectedTemplate.props || {}).length > 0 && (
                <Box>
                  <Text size="2" weight="medium" className="mb-2">
                    Available Properties:
                  </Text>
                  <Box className="space-y-2">
                    {Object.entries(selectedTemplate.props || {}).map(
                      ([key, prop]) => (
                        <Box
                          key={key}
                          className="p-2 bg-gray-50 dark:bg-gray-800 rounded"
                        >
                          <Flex justify="between" align="center">
                            <Text size="2" weight="medium">
                              {key}
                              {prop.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </Text>
                            <Text size="1" color="gray">
                              {prop.type}
                            </Text>
                          </Flex>
                          {prop.description && (
                            <Text size="1" color="gray" className="mt-1">
                              {prop.description}
                            </Text>
                          )}
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Flex
            align="center"
            justify="center"
            className="h-full text-gray-400"
          >
            Select a template to see details
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
