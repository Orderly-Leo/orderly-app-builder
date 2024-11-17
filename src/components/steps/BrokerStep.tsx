import { TextField, Button, Text, Box, Flex } from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";
import { useStepWizard } from "../../contexts/StepWizardContext";

interface BrokerStepProps {
  onComplete: (data: any) => void;
}

export const BrokerStep: React.FC<BrokerStepProps> = ({ onComplete }) => {
  const { updateFormData, setCurrentStep, formData } = useStepWizard();
  const [brokerId, setBrokerId] = useState(formData.brokerId || "");
  const [brokerName, setBrokerName] = useState(formData.brokerName || "");

  const handleSubmit = () => {
    if (brokerId.trim() && brokerName.trim()) {
      updateFormData({ brokerId, brokerName });
      setCurrentStep(1);
    }
  };

  return (
    <Flex direction="column" gap="6">
      <Text size="5" weight="bold">
        Enter Broker Information
      </Text>
      <Box>
        <Text as="label" size="2" weight="medium" mb="2">
          Broker ID
        </Text>
        <TextField.Root
          value={brokerId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBrokerId(e.target.value)
          }
          placeholder="Enter your broker ID"
        />
      </Box>
      <Box>
        <Text as="label" size="2" weight="medium" mb="2">
          Broker Name
        </Text>

        <TextField.Root
          value={brokerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBrokerName(e.target.value)
          }
          placeholder="Enter your broker name"
        />
      </Box>
      <Button
        onClick={handleSubmit}
        disabled={!brokerId.trim() || !brokerName.trim()}
      >
        Next
      </Button>
    </Flex>
  );
};
