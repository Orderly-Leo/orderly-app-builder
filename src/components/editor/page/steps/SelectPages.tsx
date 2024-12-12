import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

interface SelectPagesProps {
  onPagesChange: (
    pages: Array<{ type: string; name: string; route: string }>
  ) => void;
}

export const SelectPages = ({ onPagesChange }: SelectPagesProps) => {
  const [pages, setPages] = useState<SelectedPage[]>(
    availablePages.map((page) => ({
      ...page,
      isSelected: false,
      customName: page.defaultConfig.pageName,
      customRoute: page.defaultConfig.route,
    }))
  );

  const handleTogglePage = (pageId: string) => {
    setPages((prev) => {
      const newPages = prev.map((page) =>
        page.id === pageId ? { ...page, isSelected: !page.isSelected } : page
      );

      // Notify parent component of changes
      const selectedPages = newPages
        .filter((page) => page.isSelected)
        .map((page) => ({
          type: page.id,
          name: page.customName,
          route: page.customRoute,
        }));

      onPagesChange(selectedPages);
      return newPages;
    });
  };

  const handleCustomization = (
    pageId: string,
    field: "customName" | "customRoute",
    value: string
  ) => {
    setPages((prev) => {
      const newPages = prev.map((page) =>
        page.id === pageId ? { ...page, [field]: value } : page
      );

      const selectedPages = newPages
        .filter((page) => page.isSelected)
        .map((page) => ({
          type: page.id,
          name: page.customName,
          route: page.customRoute,
        }));

      onPagesChange(selectedPages);
      return newPages;
    });
  };

  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-4">Select Pages to Include</div>
      <div className="flex flex-col gap-4">
        {pages.map((page) => (
          <Card
            key={page.id}
            className={`transition-all ${
              page.isSelected
                ? "border-blue-500 bg-blue-50"
                : "hover:border-blue-300"
            }`}
          >
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="w-[200px] aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {page.thumbnail ? (
                  <img
                    src={page.thumbnail}
                    alt={page.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    No preview
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={page.isSelected}
                    onClick={() => handleTogglePage(page.id)}
                  />
                  <div className="font-medium">{page.name}</div>
                </div>
                <div className="text-sm text-gray-500">{page.description}</div>

                {page.isSelected && (
                  <div className="flex flex-col gap-2 mt-2">
                    <div>
                      <div className="font-medium">Page Name</div>
                      <Input
                        value={page.customName}
                        onChange={(e) =>
                          handleCustomization(
                            page.id,
                            "customName",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <div className="font-medium">Route</div>
                      <Input
                        value={page.customRoute}
                        onChange={(e) =>
                          handleCustomization(
                            page.id,
                            "customRoute",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
