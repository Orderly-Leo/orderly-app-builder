import { Text, Flex, Box } from "@radix-ui/themes";
import {
  StepWizardProvider,
  useStepWizard,
} from "../contexts/StepWizardContext";

interface Step {
  title: string;
  component: React.ComponentType<any>;
}

interface StepWizardProps {
  steps: Step[];
  onComplete: (data: any) => void;
}

const StepWizardContent: React.FC<StepWizardProps> = ({
  steps,
  onComplete,
}) => {
  const { currentStep, onNext, onPrevious, formData } = useStepWizard();
  const CurrentStepComponent = steps[currentStep].component;

  return (
    <Flex className="flex-1 min-h-full h-screen">
      <Box className="min-w-[200px] bg-gray-100 p-5 h-full">
        {steps.map((step, index) => (
          <Box
            key={index}
            className={`px-4 py-3 my-2 rounded-lg cursor-default
              ${index === currentStep ? "bg-blue-600 text-white" : ""}
              ${index < currentStep ? "text-blue-600" : ""}`}
          >
            <Text>{step.title}</Text>
          </Box>
        ))}
      </Box>
      <Box className="flex-1 p-10 overflow-y-auto">
        <Box className="w-full max-w-[600px] mx-auto">
          <CurrentStepComponent
            onNext={onNext}
            onBack={onPrevious}
            formData={formData}
          />
        </Box>
      </Box>
    </Flex>
  );
};

export const StepWizard: React.FC<StepWizardProps> = (props) => {
  return (
    <StepWizardProvider>
      <StepWizardContent {...props} />
    </StepWizardProvider>
  );
};
