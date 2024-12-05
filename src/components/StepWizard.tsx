import { useAtom } from "jotai";
import { WizardLayout } from "./WizardLayout";
import { CreateProjectProgress } from "./steps/StepProgress";
import { motion, AnimatePresence } from "motion/react";
import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";

import { useState } from "react";
import {
  currentComponentAtom,
  currentDescriptionAtom,
  currentStepIndexAtom,
  formDataAtom,
  STEPS,
} from "./steps/atom";
import { projectManager } from "@/service/projectManager";
import { useNavigate } from "react-router-dom";

interface StepWizardProps {}

const StepWizardContent: React.FC<StepWizardProps> = ({}) => {
  const [CurrentStepComponent] = useAtom(currentComponentAtom);
  const [currentDescription] = useAtom(currentDescriptionAtom);

  const [currentIndex, setCurrentIndex] = useAtom(currentStepIndexAtom);
  const [formData, setFormData] = useAtom(formDataAtom);
  const [showProgress, setShowProgress] = useState(false);

  const navigate = useNavigate();

  const onNext = (stepData: Record<string, any>) => {
    if (currentIndex === STEPS.length - 1) {
      setShowProgress(true);
      return;
    }
    setFormData((draft) => {
      draft.data = { ...draft.data, ...stepData };
    });

    setCurrentIndex(currentIndex + 1);
  };

  const onPrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const onStepComplete = async (data: any) => {
    const config = projectManager.generateOrderlyConfig(data);
    if (config) {
      projectManager.writeOrderlyConfigFile(config);

      // await getCurrentWindow().setSize(new LogicalSize(800, 600));
      navigate("/editor");
    }
  };

  return (
    <div className="min-h-screen p-8 step-wizard-container">
      <AnimatePresence mode="wait">
        {!showProgress ? (
          <motion.div
            key="wizard"
            initial={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <WizardLayout
              steps={STEPS}
              currentIndex={currentIndex}
              currentDescription={currentDescription}
            >
              <CurrentStepComponent
                onNext={onNext}
                onBack={onPrevious}
                formData={formData.data}
              />
            </WizardLayout>
          </motion.div>
        ) : (
          <motion.div
            key="progress"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CreateProjectProgress
              onBack={() => {
                setCurrentIndex(0);
                setShowProgress(false);
              }}
              onComplete={(data: any) => {
                onStepComplete(data);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const StepWizard: React.FC<StepWizardProps> = () => {
  return <StepWizardContent />;
};
