import { useState } from "react";
import { Button, Box, Flex, Text } from "@radix-ui/themes";
import { PageComponent, PageConfig } from "../../../types/page";
import { SelectTemplate } from "./steps/SelectTemplate";
import { ConfigureTemplate } from "./steps/ConfigureTemplate";
import { SetPageRoute } from "./steps/SetPageRoute";
import { useAtom } from "jotai";
import { pagesAtom, pageActions } from "../../../store/pageStore";
import { useNavigate } from "react-router-dom";
import { CreatePageProcesse } from "./steps/CreatePageProcesse";
import { SelectPages } from "./steps/SelectPages";

export const CreatePageWizard = () => {
  const navigate = useNavigate();
  const [, setPages] = useAtom(pagesAtom);
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PageComponent | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [pageConfig, setPageConfig] = useState<Partial<PageConfig>>({});
  const [selectedPages, setSelectedPages] = useState<
    Array<{
      type: string;
      name: string;
      route: string;
    }>
  >([]);

  const handleNext = () => {
    if (step === 0 && selectedTemplate) {
      setPageConfig({
        template: selectedTemplate.id,
        props: {},
        name: selectedTemplate.defaultConfig.pageName,
        route: selectedTemplate.defaultConfig.route,
      });
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    } else {
      setStep(0);
    }
  };

  const handleCancel = () => {
    navigate("/editor/pages");
  };

  const handleComponentSelect = (componentId: string) => {
    setSelectedComponents((prev) => {
      if (prev.includes(componentId)) {
        return prev.filter((id) => id !== componentId);
      }
      return [...prev, componentId];
    });
  };

  const handleComplete = () => {
    const finalConfig: PageConfig = {
      id: crypto.randomUUID(),
      name: pageConfig.name || "Untitled Page",
      route: pageConfig.route || "/",
      template: selectedTemplate!.id,
      components: selectedComponents,
      pages: selectedPages,
      props: pageConfig.props || {},
    };

    setPages((pages) => {
      pageActions.addPage(pages, finalConfig);
    });

    navigate(`/editor/pages/${finalConfig.id}`);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <SelectTemplate
            selectedTemplate={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
        );
      case 1:
        return <SelectPages onPagesChange={setSelectedPages} />;
      case 2:
        return (
          <ConfigureTemplate
            template={selectedTemplate!}
            config={pageConfig}
            onChange={setPageConfig}
          />
        );
      case 3:
        return (
          <CreatePageProcesse
            template={selectedTemplate!.id}
            components={selectedComponents}
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
    <div className="h-full flex flex-col">
      <div className="shrink-0 border-b border-gray-200">
        <Flex justify="between" align="center" p="4">
          <Text size="5" weight="bold">
            Create New Page
          </Text>
        </Flex>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Box>{renderStep()}</Box>
      </div>

      <div className="shrink-0 border-t border-gray-200">
        <Flex gap="3" justify="end" p="4">
          <Button variant="soft" onClick={handleCancel}>
            Cancel
          </Button>
          {step > 0 && (
            <Button variant="soft" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 3 ? (
            <Button onClick={handleNext} disabled={!selectedTemplate}>
              Next
            </Button>
          ) : (
            <Button onClick={handleComplete}>Create</Button>
          )}
        </Flex>
      </div>
    </div>
  );
};
