import { TextField, Button, Heading, Box } from "@radix-ui/themes";
import { useState } from "react";

interface BrokerStepProps {
  onNext: (data: any) => void;
}

export const BrokerStep: React.FC<BrokerStepProps> = ({ onNext }) => {
  const [brokerId, setBrokerId] = useState("");
  const [brokerName, setBrokerName] = useState("");

  const handleSubmit = () => {
    if (brokerId.trim() && brokerName.trim()) {
      onNext({ brokerId, brokerName });
    }
  };

  return (
    <Box>
      <Heading size="4" className="mb-4">
        Enter Broker Information
      </Heading>
      <Box className="flex flex-col gap-4 my-5">
        <TextField.Root
          value={brokerId}
          onChange={(e) => setBrokerId(e.target.value)}
          placeholder="Enter your broker ID"
          size="3"
        />
        <TextField.Root
          value={brokerName}
          onChange={(e) => setBrokerName(e.target.value)}
          placeholder="Enter your broker name"
          size="3"
        />
      </Box>
      <Button
        onClick={handleSubmit}
        disabled={!brokerId.trim() || !brokerName.trim()}
        size="3"
      >
        Next
      </Button>
    </Box>
  );
};
