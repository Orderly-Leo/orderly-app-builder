import { Flex, Grid } from "@radix-ui/themes";

export const PageList = () => {
  return (
    <Flex gap="3">
      <PageItem />
      <PageItem />
    </Flex>
  );
};

export const PageItem = () => {
  return (
    <div className="h-20 bg-white border border-gray-300 rounded aspect-square"></div>
  );
};
