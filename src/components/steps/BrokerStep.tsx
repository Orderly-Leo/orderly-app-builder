import { Button, FormGroup, InputGroup } from "@blueprintjs/core";
import { ChangeEvent, useState } from "react";

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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Enter Broker Information</h2>
      <FormGroup label="Broker ID" labelFor="broker-id">
        <InputGroup
          id="broker-id"
          value={brokerId}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBrokerId(e.target.value)
          }
          placeholder="Enter your broker ID"
        />
      </FormGroup>
      <FormGroup label="Broker Name" labelFor="broker-name">
        <InputGroup
          id="broker-name"
          value={brokerName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBrokerName(e.target.value)
          }
          placeholder="Enter your broker name"
        />
      </FormGroup>
      <Button
        intent="primary"
        onClick={handleSubmit}
        disabled={!brokerId.trim() || !brokerName.trim()}
      >
        Next
      </Button>
    </div>
  );
};
