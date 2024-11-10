import { Card, H4, H5, Text } from "@blueprintjs/core";
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
    <div className="flex gap-6">
      {/* 左侧模板列表 */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 pr-4">
        <H5 className="mb-4">Page Components</H5>
        <div className="flex flex-col gap-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              interactive
              className={`cursor-pointer transition-colors
                ${
                  selectedTemplate?.id === template.id
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }`}
              onClick={() => onSelect(template)}
            >
              <Text className="font-medium">{template.name}</Text>
            </Card>
          ))}
        </div>
      </div>

      {/* 右侧预览和详情 */}
      <div className="flex-1">
        {selectedTemplate ? (
          <>
            {/* 预览图 */}
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden">
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
            </div>

            {/* 模板详情 */}
            <div className="space-y-4">
              <div>
                <H4>{selectedTemplate.name}</H4>
                <Text className="text-gray-600 dark:text-gray-400">
                  {selectedTemplate.description}
                </Text>
              </div>

              {/* 属性预览 */}
              {Object.keys(selectedTemplate.props || {}).length > 0 && (
                <div>
                  <H4 className="mb-2">Available Properties:</H4>
                  <div className="space-y-2">
                    {Object.entries(selectedTemplate.props || {}).map(
                      ([key, prop]) => (
                        <Card key={key}>
                          <div className="flex justify-between items-center">
                            <Text className="font-medium">
                              {key}
                              {prop.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </Text>
                            <Text className="text-gray-500">{prop.type}</Text>
                          </div>
                          {prop.description && (
                            <Text className="text-gray-600 mt-1">
                              {prop.description}
                            </Text>
                          )}
                        </Card>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            Select a template to see details
          </div>
        )}
      </div>
    </div>
  );
};
