import { TextField, Text, Box, Flex } from "@radix-ui/themes";
import { ChangeEvent, useState } from "react";
import { useStepWizard } from "../../contexts/StepWizardContext";
import { Input } from "../ui/input";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { InputLabel } from "../ui/inputLabel";

interface BrokerStepProps {
  onComplete: (data: any) => void;
  onNext: (data: any) => void;
  formData: any;
}

export const BrokerStep: React.FC<BrokerStepProps> = ({
  onComplete,
  formData,
  onNext,
}) => {
  // const { updateFormData,  formData } = useStepWizard();
  const [brokerId, setBrokerId] = useState(formData.brokerId || "");
  const [brokerName, setBrokerName] = useState(formData.brokerName || "");

  const handleSubmit = () => {
    if (brokerId.trim() && brokerName.trim()) {
      // updateFormData({ brokerId, brokerName });
      // setCurrentStep(1);
      onNext({ brokerId, brokerName });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <InputLabel>Broker ID</InputLabel>
        <Input
          value={brokerId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBrokerId(e.target.value)
          }
          placeholder="Enter your broker ID"
        />
      </div>
      <div>
        <InputLabel>Broker Name</InputLabel>

        <Input
          value={brokerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBrokerName(e.target.value)
          }
          placeholder="Enter your broker name"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!brokerId.trim() || !brokerName.trim()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
