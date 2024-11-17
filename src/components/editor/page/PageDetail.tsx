import { Box, Card, Flex, Heading, Text, Button } from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import {
  pagesAtom,
  selectedPageAtom,
  pageActions,
} from "../../../store/pageStore";
import { useNavigate } from "react-router-dom";

export const PageDetail = () => {
  const navigate = useNavigate();
  const [selectedPage] = useAtom(selectedPageAtom);
  const [, setPages] = useAtom(pagesAtom);

  if (!selectedPage) {
    return null;
  }

  const handleDelete = () => {
    setPages((pages) => {
      pageActions.deletePage(pages, selectedPage.id);
    });
    navigate("/editor/pages");
  };

  return (
    <Box className="h-full">
      <Flex
        justify="between"
        align="center"
        p="4"
        className="border-b border-gray-200"
      >
        <Heading size="4">{selectedPage.name}</Heading>
        <Flex gap="2">
          <Button variant="soft" size="2">
            <Pencil1Icon />
            Edit
          </Button>
          <Button variant="soft" color="red" size="2" onClick={handleDelete}>
            <TrashIcon />
            Delete
          </Button>
        </Flex>
      </Flex>

      <Box p="4" className="overflow-auto h-[calc(100%-73px)]">
        <Card>
          <Flex direction="column" gap="4">
            <Box>
              <Text weight="medium">Route</Text>
              <Text color="gray">{selectedPage.route}</Text>
            </Box>

            <Box>
              <Text weight="medium">Template</Text>
              <Text color="gray">{selectedPage.template}</Text>
            </Box>

            <Box>
              <Text weight="medium">Properties</Text>
              <Card className="mt-2">
                {Object.entries(selectedPage.props).map(([key, value]) => (
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
