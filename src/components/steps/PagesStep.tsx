import {
  Box,
  Card,
  Flex,
  Text,
  TextField,
  Checkbox,
  Button,
} from "@radix-ui/themes";
import { useState } from "react";
import { type StepProps } from "./types";

interface PageType {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  defaultConfig: {
    pageName: string;
    route: string;
  };
}

interface SelectedPage extends PageType {
  isSelected: boolean;
  customName: string;
  customRoute: string;
}

const availablePages: PageType[] = [
  {
    id: "trading",
    name: "Trading Page",
    description: "Full-featured trading interface with orderbook and charts",
    thumbnail: "/pages/trading.png",
    defaultConfig: {
      pageName: "Trading",
      route: "/trading",
    },
  },
  {
    id: "market",
    name: "Market Overview",
    description: "Display market data and statistics",
    thumbnail: "/pages/market.png",
    defaultConfig: {
      pageName: "Markets",
      route: "/markets",
    },
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "User portfolio and asset management",
    thumbnail: "/pages/portfolio.png",
    defaultConfig: {
      pageName: "Portfolio",
      route: "/portfolio",
    },
  },
  {
    id: "settings",
    name: "Settings",
    description: "User preferences and account settings",
    thumbnail: "/pages/settings.png",
    defaultConfig: {
      pageName: "Settings",
      route: "/settings",
    },
  },
];

export const PagesStep = ({ onNext, onBack, data }: StepProps) => {
  const [pages, setPages] = useState<SelectedPage[]>(
    availablePages.map((page) => ({
      ...page,
      isSelected: false,
      customName: page.defaultConfig.pageName,
      customRoute: page.defaultConfig.route,
    }))
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
        type: page.id,
        name: page.customName,
        route: page.customRoute,
      }));

    onNext({
      ...data,
      pages: selectedPages,
    });
  };

  const hasSelectedPages = pages.some((page) => page.isSelected);

  return (
    <Box>
      <Box mb="5">
        <Text size="5" weight="bold" as="p">
          Select Pages
        </Text>
        <Text size="2" color="gray" as="p">
          Choose the pages you want to include in your project
        </Text>
      </Box>

      <Flex direction="column" gap="4">
        {pages.map((page) => (
          <Card
            key={page.id}
            className={`transition-all ${
              page.isSelected
                ? "border-blue-500 bg-blue-50"
                : "hover:border-blue-300"
            }`}
          >
            <Flex gap="4">
              {/* Thumbnail */}
              <Box className="w-[200px] aspect-video bg-gray-100 rounded-lg overflow-hidden">
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
                    className="w-full h-full text-gray-400"
                  >
                    No preview
                  </Flex>
                )}
              </Box>

              {/* Content */}
              <Flex direction="column" className="flex-1" gap="2">
                <Flex align="center" gap="2">
                  <Checkbox
                    checked={page.isSelected}
                    id={page.id}
                    onClick={() => handleTogglePage(page.id)}
                  />
                  <Text weight="medium" as="label" htmlFor={page.id}>
                    {page.name}
                  </Text>
                </Flex>
                <Text size="1" color="gray">
                  {page.description}
                </Text>

                {page.isSelected && (
                  <Flex direction="column" gap="2" mt="2">
                    <Box>
                      <Text as="label" size="1" weight="medium">
                        Page Name
                      </Text>
                      <TextField.Root
                        size="1"
                        value={page.customName}
                        onChange={(e) =>
                          handleCustomization(
                            page.id,
                            "customName",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                    <Box>
                      <Text as="label" size="1" weight="medium">
                        Route
                      </Text>
                      <TextField.Root
                        size="1"
                        value={page.customRoute}
                        onChange={(e) =>
                          handleCustomization(
                            page.id,
                            "customRoute",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>

      <Flex justify="between" mt="6" gap="3">
        <Button variant="soft" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={!hasSelectedPages}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};
