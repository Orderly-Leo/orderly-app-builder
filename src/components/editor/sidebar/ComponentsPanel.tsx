import { Card, Heading, Text } from "@radix-ui/themes";

export const ComponentsPanel = () => {
  return (
    <div className="p-4">
      <Heading size="4">Available Components</Heading>
      <Card className="mt-4">
        <Text>Component library will be displayed here</Text>
      </Card>
    </div>
  );
};
