import { Card, Flex, Text, Box } from "@radix-ui/themes";
import { PageComponent } from "../../../../types/page";

const pageComponents: PageComponent[] = [
  {
    id: "trading",
    name: "TradingPage",
    packages: ["@orderly.network/trading"],
    description:
      "TradingPage is an App page containing full trading functionalities, and includes the following components:",
    thumbnail: "/templates/dashboard.png",
    defaultConfig: {
      pageName: "Trading",
      route: "/trading",
    },
    props: {
      symbol: "ETH",
      tradingViewConfig: {
        scriptSRC: "",
      },
      referral: {
        saveRefCode: true,
      },
    },
  },
  {
    id: "market",
    name: "Market Page",
    packages: ["@orderly.network/trading"],
    description: "Start with a blank page",
    thumbnail: "/templates/blank.png",
    defaultConfig: {
      pageName: "Market",
      route: "/market",
    },
    props: {},
  },
  {
    id: "blank",
    name: "Blank Page",
    description: "Start with a blank page",
    thumbnail: "/templates/blank.png",
    defaultConfig: {
      pageName: "Untitled page",
      route: "/untitled",
    },
    props: {},
  },
];

interface SelectTemplateProps {
  selectedTemplate: PageComponent | null;
  onSelect: (template: PageComponent) => void;
}

export const SelectTemplate = ({
  selectedTemplate,
  onSelect,
}: SelectTemplateProps) => {
  return (
    <Flex>
      {/* 左侧模板列表 */}
      <Box className="w-[240px] px-4">
        <Text size="3" weight="medium" mb="4">
          Page Components
        </Text>
        <Flex direction="column" gap="2">
          {pageComponents.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-colors
                ${
                  selectedTemplate?.id === template.id
                    ? "border-blue-500 bg-blue-50"
                    : "hover:border-blue-300"
                }`}
              onClick={() => onSelect(template)}
            >
              <Text weight="medium">{template.name}</Text>
            </Card>
          ))}
        </Flex>
      </Box>

      {/* 右侧预览和详情 */}
      <Box className="flex-1">
        {selectedTemplate ? (
          <Flex direction="column">
            {/* 预览图 */}
            <Box className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
              {selectedTemplate.thumbnail ? (
                <img
                  src={selectedTemplate.thumbnail}
                  alt={selectedTemplate.name}
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

            {/* 模板详情 */}
            <Box py={"3"}>
              <Text size="5" weight="medium" as="p">
                {selectedTemplate.name}
              </Text>
              <Text color="gray" mt="1" size={"1"}>
                {selectedTemplate.description}
              </Text>
            </Box>

            {/* 属性预览 */}
            {/* {Object.keys(selectedTemplate.props || {}).length > 0 && (
              <Box>
                <Text size="3" weight="medium" mb="2">
                  Available Properties:
                </Text>
                <Flex direction="column" gap="2">
                  {Object.entries(selectedTemplate.props || {}).map(
                    ([key, prop]) => (
                      <Card key={key}>
                        <Flex justify="between" align="center">
                          <Text weight="medium">
                            {key}
                            {prop.required && (
                              <Text color="red" ml="1">
                                *
                              </Text>
                            )}
                          </Text>
                          <Text color="gray">{prop.type}</Text>
                        </Flex>
                        {prop.description && (
                          <Text color="gray" size="2" mt="1">
                            {prop.description}
                          </Text>
                        )}
                      </Card>
                    )
                  )}
                </Flex>
              </Box>
            )} */}
          </Flex>
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
