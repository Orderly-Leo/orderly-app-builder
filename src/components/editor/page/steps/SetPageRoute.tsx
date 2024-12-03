import { Card, Flex, Text, Box } from "@radix-ui/themes";
import { PageComponent } from "../../../../types/page";

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
    <Box p="4">
      <Text size="3" weight="medium" mb="4">
        Select Components
      </Text>
      <Flex wrap="wrap" gap="4">
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
            <Box className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
              {component.thumbnail ? (
                <img
                  src={component.thumbnail}
                  alt={component.name}
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
            <Box p="3">
              <Flex justify="between" align="center" mb="2">
                <Text weight="medium">{component.name}</Text>
                {/* <Text size="1" color="gray">
                  {component.category}
                </Text> */}
              </Flex>
              <Text size="1" color="gray">
                {component.description}
              </Text>
            </Box>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};
