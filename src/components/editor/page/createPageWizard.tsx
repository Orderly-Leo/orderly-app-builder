import { useState } from "react";
import { Button, Box, Flex, Text } from "@radix-ui/themes";
import { PageTemplate, PageConfig } from "../../../types/page";
import { SelectTemplate } from "./steps/SelectTemplate";
import { ConfigureTemplate } from "./steps/ConfigureTemplate";

interface CreatePageWizardProps {
  onComplete: (pageConfig: PageConfig) => void;
  onCancel: () => void;
}

export const CreatePageWizard = ({
  onComplete,
  onCancel,
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
  };

  return (
    <Box className="h-full flex flex-col">
      <Flex
        justify="between"
        align="center"
        p="4"
        className="border-b border-gray-200"
      >
        <Text size="5" weight="bold">
          Create New Page
        </Text>
      </Flex>

      <Box className="flex-1 overflow-auto">
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

      <Flex gap="3" justify="end" p="4" className="border-t border-gray-200">
        <Button variant="soft" onClick={onCancel}>
          Cancel
        </Button>
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
  );
};
