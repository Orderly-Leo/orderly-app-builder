import { Box, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { availablePages, SelectedPage } from "@/data/pages";
import { Checkbox } from "../ui/checkbox";

export const PagesStep = ({
  onNext,
  onBack,
  formData,
}: {
  onNext: (data: any) => void;
  onBack: () => void;
  formData: any;
}) => {
  const [pages, setPages] = useState<SelectedPage[]>(
    availablePages.map((page) => {
      const isSelected = formData.pages.some(
        (selectedPage: any) => selectedPage.id === page.id
      );
      return {
        ...page,
        isSelected,
        customName: page.defaultConfig.pageName,
        customRoute: page.defaultConfig.route,
      };
    })
  );

  const handleTogglePage = (pageId: string) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === pageId ? { ...page, isSelected: !page.isSelected } : page
      )
    );
  };

  const handleCustomization = (
    pageId: string,
    field: "customName" | "customRoute",
    value: string
  ) => {
    setPages((prev) =>
      prev.map((page) =>
        page.id === pageId ? { ...page, [field]: value } : page
      )
    );
  };

  const handleNext = () => {
    const selectedPages = pages
      .filter((page) => page.isSelected)
      .map((page) => ({
        id: page.id,
        name: page.customName,
        route: page.customRoute,
      }));

    onNext({
      // ...formData,
      pages: selectedPages,
    });
  };

  const hasSelectedPages = pages.some((page) => page.isSelected);

  return (
    <div>
      {/* <Box mb="5">
        <Text size="5" weight="bold" as="p">
          Select Pages
        </Text>
        <Text size="2" color="gray" as="p">
          Choose the pages you want to include in your project
        </Text>
      </Box> */}

      <div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 h-[240px]">
            {pages.map((page) => (
              <div key={page.id} className="flex-none w-[calc(80%-16px)]">
                <div className="relative h-full">
                  {/* Thumbnail */}
                  <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                    {page.thumbnail ? (
                      <img
                        src={page.thumbnail}
                        alt={page.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Flex
                        align="center"
                        justify="center"
                        className="w-full h-full "
                      >
                        No preview
                      </Flex>
                    )}
                  </div>

                  {/* Content */}
                  <Flex
                    direction="column"
                    gap="2"
                    className="absolute left-0 bottom-0 p-4"
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={page.isSelected}
                        id={page.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePage(page.id);
                        }}
                      />
                      <Text weight="medium" as="label" htmlFor={page.id}>
                        {page.name}
                      </Text>
                    </div>
                    {/* <Text>{page.description}</Text> */}
                  </Flex>
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="flex items-center justify-between mt-6 gap-3">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!hasSelectedPages}>
          Next
        </Button>
      </div>
    </div>
  );
};
