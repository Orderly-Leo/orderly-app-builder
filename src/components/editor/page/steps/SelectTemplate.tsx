import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageComponent } from "../../../../types/page";

const pageComponents: PageComponent[] = [
  {
    id: "trading",
    name: "TradingPage",
    packages: ["@orderly.network/trading"],
    description:
      "TradingPage is an App page containing full trading functionalities, and includes the following components:",
    thumbnail: "/templates/dashboard.png",
    defaultConfig: {
      pageName: "Trading",
      route: "/trading",
    },
    props: {
      symbol: "ETH",
      tradingViewConfig: {
        scriptSRC: "",
      },
      referral: {
        saveRefCode: true,
      },
    },
  },
  {
    id: "market",
    name: "Market Page",
    packages: ["@orderly.network/trading"],
    description: "Start with a blank page",
    thumbnail: "/templates/blank.png",
    defaultConfig: {
      pageName: "Market",
      route: "/market",
    },
    props: {},
  },
  {
    id: "blank",
    name: "Blank Page",
    description: "Start with a blank page",
    thumbnail: "/templates/blank.png",
    defaultConfig: {
      pageName: "Untitled page",
      route: "/untitled",
    },
    props: {},
  },
];

interface SelectTemplateProps {
  selectedTemplate: PageComponent | null;
  onSelect: (template: PageComponent) => void;
}

export const SelectTemplate = ({
  selectedTemplate,
  onSelect,
}: SelectTemplateProps) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-[240px] border-r">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs text-gray-500 font-semibold">
              Page Components
            </h2>
            <div className="space-y-1">
              {pageComponents.map((template) => (
                <Button
                  key={template.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start px-4",
                    selectedTemplate?.id === template.id &&
                      "bg-accent text-accent-foreground"
                  )}
                  onClick={() => onSelect(template)}
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {selectedTemplate ? (
          <div className="space-y-6">
            {/* Preview Image */}
            <div className="aspect-video rounded-lg overflow-hidden bg-muted">
              {selectedTemplate.thumbnail ? (
                <img
                  src={selectedTemplate.thumbnail}
                  alt={selectedTemplate.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                  No preview available
                </div>
              )}
            </div>

            {/* Template Details */}
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">
                {selectedTemplate.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {selectedTemplate.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Select a template to see details
          </div>
        )}
      </div>
    </div>
  );
};
