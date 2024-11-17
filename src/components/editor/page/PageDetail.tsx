import { Box, Card, Flex, Heading, Text, Button } from "@radix-ui/themes";
import { PageConfig } from "../../../types/page";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

interface PageDetailProps {
  page: PageConfig;
}

export const PageDetail = ({ page }: PageDetailProps) => {
  return (
    <Box className="h-full">
      {/* 顶部工具栏 */}
      <Flex
        justify="between"
        align="center"
        p="4"
        className="border-b border-gray-200"
      >
        <Heading size="4">{page.name}</Heading>
        <Flex gap="2">
          <Button variant="soft" size="2">
            <Pencil1Icon />
            Edit
          </Button>
          <Button variant="soft" color="red" size="2">
            <TrashIcon />
            Delete
          </Button>
        </Flex>
      </Flex>

      {/* 页面详情内容 */}
      <Box p="4" className="overflow-auto h-[calc(100%-73px)]">
        <Card>
          <Flex direction="column" gap="4">
            <Box>
              <Text weight="medium">Route</Text>
              <Text color="gray">{page.route}</Text>
            </Box>

            <Box>
              <Text weight="medium">Template</Text>
              <Text color="gray">{page.template}</Text>
            </Box>

            <Box>
              <Text weight="medium">Properties</Text>
              <Card className="mt-2">
                {Object.entries(page.props).map(([key, value]) => (
                  <Flex key={key} justify="between" className="py-1">
                    <Text size="2">{key}</Text>
                    <Text size="2" color="gray">
                      {JSON.stringify(value)}
                    </Text>
                  </Flex>
                ))}
              </Card>
            </Box>
          </Flex>
        </Card>
      </Box>
    </Box>
  );
};
