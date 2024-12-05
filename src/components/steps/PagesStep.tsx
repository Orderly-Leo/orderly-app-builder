import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { availablePages, SelectedPage } from "@/data/pages";
import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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

  // const handleCustomization = (
  //   pageId: string,
  //   field: "customName" | "customRoute",
  //   value: string
  // ) => {
  //   setPages((prev) =>
  //     prev.map((page) =>
  //       page.id === pageId ? { ...page, [field]: value } : page
  //     )
  //   );
  // };

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
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 h-[240px]">
          {pages.map((page) => (
            <div
              key={page.id}
              onClick={() => handleTogglePage(page.id)}
              className={"pb-4 cursor-pointer"}
            >
              <div className={"relative h-full"}>
                {/* Thumbnail */}
                <div
                  className={cn(
                    "w-[320px] h-full bg-gray-100 rounded-lg overflow-hidden bg-cover opacity-70",
                    page.isSelected && "opacity-100"
                  )}
                  style={{
                    backgroundImage: `url(${page.thumbnail})`,
                  }}
                ></div>

                {/* Content */}
                {page.isSelected && (
                  <div className="absolute top-2 right-2">
                    <CircleCheck className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

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
