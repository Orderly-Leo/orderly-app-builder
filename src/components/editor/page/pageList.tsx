import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { PageConfig } from "../../../types/page";

interface PageListProps {
  selectedPageId?: string | null;
  onPageSelect?: (page: PageConfig) => void;
}

export const PageList = ({ selectedPageId, onPageSelect }: PageListProps) => {
  // 示例数据，实际应该从状态管理或API获取
  const pages: PageConfig[] = [
    {
      id: "1",
      name: "Home",
      route: "/",
      template: "blank",
      props: {},
    },
    {
      id: "2",
      name: "Dashboard",
      route: "/dashboard",
      template: "dashboard",
      props: {
        title: "My Dashboard",
        layout: "grid",
      },
    },
  ];

  if (pages.length === 0) {
    return (
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap="2"
        className="h-full text-gray-400 p-4"
      >
        <Text>No pages created yet</Text>
      </Flex>
    );
  }

  return (
    <Box className="p-2">
      {pages.map((page) => (
        <Card
          key={page.id}
          className={`mb-2 cursor-pointer transition-colors ${
            selectedPageId === page.id
              ? "border-blue-500 bg-blue-50"
              : "hover:bg-gray-50"
          }`}
          onClick={() => onPageSelect?.(page)}
        >
          <Flex direction="column" gap="1">
            <Text weight="medium">{page.name}</Text>
            <Text size="1" color="gray">
              {page.route}
            </Text>
          </Flex>
        </Card>
      ))}
    </Box>
  );
};
