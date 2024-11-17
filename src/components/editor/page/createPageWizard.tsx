import { useState } from "react";
import { Button, Box, Flex, Text } from "@radix-ui/themes";
import { PageTemplate, PageConfig } from "../../../types/page";
import { SelectTemplate } from "./steps/SelectTemplate";
import { ConfigureTemplate } from "./steps/ConfigureTemplate";
import { useAtom } from "jotai";
import { pagesAtom, pageActions } from "../../../store/pageStore";
import { useNavigate } from "react-router-dom";

export const CreatePageWizard = () => {
  const navigate = useNavigate();
  const [, setPages] = useAtom(pagesAtom);
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

  const handleCancel = () => {
    navigate("/editor/pages");
  };

  const handleComplete = (config: Partial<PageConfig>) => {
    const finalConfig: PageConfig = {
      id: crypto.randomUUID(),
      name: config.name || "Untitled Page",
      route: config.route || "/",
      template: selectedTemplate!.id,
      props: config.props || {},
    };

    setPages((pages) => {
      pageActions.addPage(pages, finalConfig);
    });

    navigate(`/editor/pages/${finalConfig.id}`);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="shrink-0 border-b border-gray-200">
        <Flex justify="between" align="center" p="4">
          <Text size="5" weight="bold">
            Create New Page
          </Text>
        </Flex>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Box>
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
      </div>

      <div className="shrink-0 border-t border-gray-200">
        <Flex gap="3" justify="end" p="4">
          <Button variant="soft" onClick={handleCancel}>
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
      </div>
    </div>
  );
};
