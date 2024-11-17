import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { pagesAtom, selectedPageIdAtom } from "../../../store/pageStore";

export const PageList = () => {
  const [pages] = useAtom(pagesAtom);
  const [selectedPageId, setSelectedPageId] = useAtom(selectedPageIdAtom);

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
          onClick={() => setSelectedPageId(page.id)}
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
