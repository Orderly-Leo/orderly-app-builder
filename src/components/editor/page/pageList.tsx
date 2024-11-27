import { Flex, Text } from "@radix-ui/themes";
// import { pagesAtom, selectedPageIdAtom } from "../../../store/pageStore";
import { NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { FC } from "react";

export const PageList: FC<{ pages: any[]; parentPath?: string }> = (props) => {
  const { pages, parentPath } = props;
  // const [selectedPageId, setSelectedPageId] = useAtom(selectedPageIdAtom);

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

  if (!Array.isArray(pages)) {
    return <div>Page details</div>;
  }

  return (
    <div className="flex flex-col gap-3">
      {pages.map((page) => {
        const path = parentPath ? `${parentPath}/${page.route}` : page.route;
        return (
          <NavLink to={path} key={page.id}>
            <Card className="shadow-none p-3">
              <Flex direction="column" gap="1">
                <div className="font-medium">{page.name}</div>
                <div className="text-sm text-gray-500">{path}</div>
              </Flex>
            </Card>
          </NavLink>
        );
      })}
    </div>
  );
};
