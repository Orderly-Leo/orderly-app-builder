import { RadioGroup, Button, Heading, Box, Flex } from "@radix-ui/themes";
import { useState } from "react";

interface FrameworkStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export const FrameworkStep: React.FC<FrameworkStepProps> = ({
  onNext,
  onBack,
}) => {
  const [framework, setFramework] = useState("");

  const frameworks = [
    { id: "next", name: "Next.js" },
    { id: "remix", name: "Remix" },
    { id: "gatsby", name: "Gatsby" },
  ];

  const handleSubmit = () => {
    if (framework) {
      onNext({ framework });
    }
  };

  return (
    <Box>
      <Heading size="4" className="mb-4">
        Choose React Framework
      </Heading>
      <RadioGroup.Root value={framework} onValueChange={setFramework}>
        <Flex direction="column" className="gap-3 mb-4">
          {frameworks.map((fw) => (
            <RadioGroup.Item key={fw.id} value={fw.id}>
              {fw.name}
            </RadioGroup.Item>
          ))}
        </Flex>
      </RadioGroup.Root>
      <Flex className="gap-3 justify-between">
        <Button onClick={onBack} variant="soft">
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!framework}>
          Next
        </Button>
      </Flex>
    </Box>
  );
};
