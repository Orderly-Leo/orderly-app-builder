import { useState } from "react";
import { Box, Button, Dialog, Flex, TextField } from "@radix-ui/themes";
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-black/50">
        <Box className="bg-white dark:bg-gray-800 rounded-lg w-[800px] max-h-[80vh] overflow-hidden">
          <Dialog.Title className="py-4 border-b border-gray-200 dark:border-gray-700">
            Create New Page
          </Dialog.Title>

          <Box className="py-6">
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
          </Box>

          <Flex
            justify="end"
            className="py-4 border-t border-gray-200 dark:border-gray-700 gap-2"
          >
            {step === 1 && (
              <Button variant="soft" onClick={handleBack}>
                Back
              </Button>
            )}
            {step === 0 ? (
              <Button onClick={handleNext} disabled={!selectedTemplate}>
                Next
              </Button>
            ) : (
              <Button
                onClick={() => handleComplete(pageConfig)}
                disabled={!pageConfig.route || !pageConfig.name}
              >
                Create
              </Button>
            )}
          </Flex>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
};
