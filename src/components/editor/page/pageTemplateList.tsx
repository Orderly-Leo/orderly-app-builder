import { Flex } from "@radix-ui/themes";

export const PageTemplateList = () => {
  return (
    <Flex gap="3">
      <PageTemplateItem />
      <PageTemplateItem />
    </Flex>
  );
};

const PageTemplateItem = () => {
  return (
    <div className="h-28 bg-white border border-gray-300 rounded aspect-square"></div>
  );
};
