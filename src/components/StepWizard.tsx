import { Box, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";

interface Step {
  title: string;
  component: React.ComponentType<any>;
}

interface StepWizardProps {
  steps: Step[];
  onComplete: (data: any) => void;
}

export const StepWizard: React.FC<StepWizardProps> = ({
  steps,
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (stepData: any) => {
    const newFormData = { ...formData, ...stepData };
    setFormData(newFormData);

    if (currentStep === steps.length - 1) {
      onComplete(newFormData);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Flex className="flex flex-1 min-h-full">
      <ul className="min-w-[200px] bg-gray-100 dark:bg-gray-800 p-5">
        {steps.map((step, index) => (
          <li key={index}>
            <Text
              className={`my-2 rounded-lg cursor-default
              ${index === currentStep ? "bg-blue-600 text-white" : ""}
              ${index < currentStep ? "text-blue-600" : ""}`}
              size="2"
            >
              {step.title}
            </Text>
          </li>
        ))}
      </ul>
      <Box className="flex-1 p-10 overflow-y-auto">
        <div className="w-full max-w-[600px] mx-auto">
          <CurrentStepComponent onNext={handleNext} onBack={handleBack} />
        </div>
      </Box>
    </Flex>
  );
};
