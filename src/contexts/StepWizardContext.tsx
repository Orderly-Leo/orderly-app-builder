import { createContext, useContext, useState, ReactNode } from "react";

interface StepWizardContextType {
  formData: Record<string, any>;
  updateFormData: (stepData: Record<string, any>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onNext: (stepData: Record<string, any>) => void;
  onPrevious: () => void;
}

const StepWizardContext = createContext<StepWizardContextType | null>(null);

export function StepWizardProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const updateFormData = (stepData: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const onNext = (stepData: Record<string, any>) => {
    updateFormData(stepData);
    setCurrentStep((prev) => prev + 1);
  };

  const onPrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  return (
    <StepWizardContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        onNext,
        onPrevious,
      }}
    >
      {children}
    </StepWizardContext.Provider>
  );
}

export function useStepWizard() {
  const context = useContext(StepWizardContext);
  if (!context) {
    throw new Error("useStepWizard must be used within a StepWizardProvider");
  }
  return context;
}
