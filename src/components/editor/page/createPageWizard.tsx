import { useState } from "react";
import { Button, Classes, Dialog } from "@blueprintjs/core";
import { PageTemplate, PageConfig } from "../../../types/page";
import { SelectTemplate } from "./steps/SelectTemplate";
import { ConfigureTemplate } from "./steps/ConfigureTemplate";

interface CreatePageWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (pageConfig: PageConfig) => void;
}

export const CreatePageWizard = ({
  open,
  onOpenChange,
  onComplete,
}: CreatePageWizardProps) => {
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<PageTemplate | null>(
    null
  );
  const [pageConfig, setPageConfig] = useState<Partial<PageConfig>>({});

  const handleNext = () => {
    if (step === 0 && selectedTemplate) {
      setPageConfig({
        template: selectedTemplate.id,
        props: {},
      });
      setStep(1);
    }
  };

  const handleBack = () => {
    setStep(0);
  };

  const handleComplete = (config: Partial<PageConfig>) => {
    const finalConfig: PageConfig = {
      id: crypto.randomUUID(),
      name: config.name || "Untitled Page",
      route: config.route || "/",
      template: selectedTemplate!.id,
      props: config.props || {},
    };
    onComplete(finalConfig);
    onOpenChange(false);
    // Reset state
    setStep(0);
    setSelectedTemplate(null);
    setPageConfig({});
  };

  return (
    <Dialog
      isOpen={open}
      onClose={() => onOpenChange(false)}
      title="Create New Page"
      className={Classes.DIALOG}
      style={{ width: 800, maxHeight: "80vh" }}
    >
      <div className={Classes.DIALOG_BODY}>
        {step === 0 ? (
          <SelectTemplate
            selectedTemplate={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
        ) : (
          <ConfigureTemplate
            template={selectedTemplate!}
            config={pageConfig}
            onChange={setPageConfig}
          />
        )}
      </div>

      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          {step === 1 && (
            <Button minimal onClick={handleBack}>
              Back
            </Button>
          )}
          {step === 0 ? (
            <Button
              intent="primary"
              onClick={handleNext}
              disabled={!selectedTemplate}
            >
              Next
            </Button>
          ) : (
            <Button
              intent="primary"
              onClick={() => handleComplete(pageConfig)}
              disabled={!pageConfig.route || !pageConfig.name}
            >
              Create
            </Button>
          )}
        </div>
      </div>
    </Dialog>
  );
};
