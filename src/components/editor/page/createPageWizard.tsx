import { useState } from "react";

import { PageConfig } from "../../../types/page";
import { SelectTemplate } from "./steps/SelectTemplate";
import { ConfigureTemplate } from "./steps/ConfigureTemplate";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CreatePageProcess } from "./steps/CreatePageProcess";

export const CreatePageWizard = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const [pageConfig, setPageConfig] = useState<Partial<PageConfig>>({
    framework: "nextjs",
    props: {},
  });

  const handleNext = (data: any) => {
    setPageConfig((config) => ({
      ...config,
      ...data,
    }));
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    // if (step === 3) {
    //   setStep(2);
    // } else if (step === 2) {
    //   setStep(1);
    // } else {
    //   setStep(0);
    // }
    setStep((step) => step - 1);
  };

  const handleCancel = () => {
    // navigate("/editor/pages");
    navigate(-1);
  };

  const handleComplete = () => {
    // navigate(`/editor/pages/${pageConfig.route}`);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <SelectTemplate
            selectedTemplate={pageConfig.template}
            onCancel={handleCancel}
            onNext={handleNext}
          />
        );

      case 1:
        return (
          <ConfigureTemplate
            template={pageConfig.template!}
            config={pageConfig}
            onChange={setPageConfig}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <CreatePageProcess
            config={pageConfig as PageConfig}
            onComplete={(success) => {
              if (success) {
                handleComplete();
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="shrink-0 ">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <ArrowLeft
              size={18}
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <div className="text-xl font-medium">Create New Page</div>
          </div>
        </div>
        <Separator />
      </div>

      <div className="flex-1">{renderStep()}</div>
    </div>
  );
};
