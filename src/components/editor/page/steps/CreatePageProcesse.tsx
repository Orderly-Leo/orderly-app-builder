import { Box, Flex, Text, Card } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

interface CreatePageProcesseProps {
  template: string;
  components: string[];
  onComplete: (success: boolean) => void;
}

type ProcessStep = {
  id: string;
  name: string;
  status: "pending" | "processing" | "success" | "error";
  error?: string;
};

export const CreatePageProcesse = ({ onComplete }: CreatePageProcesseProps) => {
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      id: "init",
      name: "Initializing page configuration",
      status: "pending",
    },
    {
      id: "template",
      name: "Installing template dependencies",
      status: "pending",
    },
    {
      id: "components",
      name: "Installing component dependencies",
      status: "pending",
    },
    {
      id: "config",
      name: "Generating page configuration",
      status: "pending",
    },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processSteps = async () => {
      try {
        // Step 1: Initialize
        await processStep(0, async () => {
          await simulateProcess(1000);
        });

        // Step 2: Install template
        await processStep(1, async () => {
          await simulateProcess(2000);
          // Simulate random error
          if (Math.random() < 0.2) {
            throw new Error("Failed to install template dependencies");
          }
        });

        // Step 3: Install components
        await processStep(2, async () => {
          await simulateProcess(1500);
        });

        // Step 4: Generate config
        await processStep(3, async () => {
          await simulateProcess(1000);
        });

        onComplete(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        onComplete(false);
      }
    };

    processSteps();
  }, []);

  const processStep = async (index: number, process: () => Promise<void>) => {
    setCurrentStepIndex(index);
    setSteps((prev) =>
      prev.map((step, i) => ({
        ...step,
        status: i === index ? "processing" : step.status,
      }))
    );

    try {
      await process();
      setSteps((prev) =>
        prev.map((step, i) => ({
          ...step,
          status: i === index ? "success" : step.status,
        }))
      );
    } catch (err) {
      setSteps((prev) =>
        prev.map((step, i) => ({
          ...step,
          status: i === index ? "error" : step.status,
          error:
            i === index
              ? err instanceof Error
                ? err.message
                : "Unknown error"
              : step.error,
        }))
      );
      throw err;
    }
  };

  const simulateProcess = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getStepIcon = (status: ProcessStep["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircledIcon className="text-green-500" />;
      case "error":
        return <CrossCircledIcon className="text-red-500" />;
      case "processing":
        return (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        );
      default:
        return (
          <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
        );
    }
  };

  return (
    <Box p="4">
      <Card className="max-w-2xl mx-auto">
        <Box p="4">
          <Text size="5" weight="bold" mb="4">
            Creating Page
          </Text>

          <Flex direction="column" gap="3">
            {steps.map((step, index) => (
              <Flex
                key={step.id}
                align="center"
                gap="3"
                className={`p-3 rounded-lg ${
                  index === currentStepIndex ? "bg-blue-50" : ""
                }`}
              >
                {getStepIcon(step.status)}
                <Box flexGrow="1">
                  <Text
                    weight={index === currentStepIndex ? "medium" : "regular"}
                  >
                    {step.name}
                  </Text>
                  {step.error && (
                    <Text size="1" color="red">
                      {step.error}
                    </Text>
                  )}
                </Box>
              </Flex>
            ))}
          </Flex>

          {error && (
            <Card className="mt-4 bg-red-50">
              <Flex gap="2" align="center">
                <CrossCircledIcon className="text-red-500" />
                <Text color="red">{error}</Text>
              </Flex>
            </Card>
          )}
        </Box>
      </Card>
    </Box>
  );
};
