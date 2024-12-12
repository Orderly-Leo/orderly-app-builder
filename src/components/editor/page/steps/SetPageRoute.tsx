import { PageComponent } from "../../../../types/page";
import { Card } from "@/components/ui/card";

const components: PageComponent[] = [
  {
    id: "orderbook",
    name: "Orderbook",
    // category: "Trading",
    description: "Display market orderbook with real-time updates",
    thumbnail: "/components/orderbook.png",
  },
  {
    id: "tradingview",
    name: "TradingView Chart",
    // category: "Trading",
    description: "Professional trading chart powered by TradingView",
    thumbnail: "/components/chart.png",
  },
  {
    id: "trade-form",
    name: "Trade Form",
    // category: "Trading",
    description: "Order placement form with multiple order types",
    thumbnail: "/components/trade-form.png",
  },
  {
    id: "market-trades",
    name: "Market Trades",
    // category: "Trading",
    description: "Real-time market trades list",
    thumbnail: "/components/market-trades.png",
  },
];

interface SetPageRouteProps {
  selectedComponents: string[];
  onComponentSelect: (componentId: string) => void;
}

export const SetPageRoute = ({
  selectedComponents,
  onComponentSelect,
}: SetPageRouteProps) => {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold mb-4">Select Components</div>
      <div className="flex flex-wrap gap-4">
        {components.map((component) => (
          <Card
            key={component.id}
            className={`w-[240px] cursor-pointer transition-all hover:shadow-md ${
              selectedComponents.includes(component.id)
                ? "border-blue-500 bg-blue-50"
                : "hover:border-blue-300"
            }`}
            onClick={() => onComponentSelect(component.id)}
          >
            <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
              {component.thumbnail ? (
                <img
                  src={component.thumbnail}
                  alt={component.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400">
                  No preview
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">{component.name}</div>
                {/* <Text size="1" color="gray">
                  {component.category}
                </Text> */}
              </div>
              <div className="text-sm text-gray-500">
                {component.description}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
