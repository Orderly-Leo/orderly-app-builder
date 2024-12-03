import { useState } from "react";
import { Box } from "@radix-ui/themes";
import { PageComponent, PageConfig } from "../../../types/page";
import { SelectTemplate } from "./steps/SelectTemplate";
import { ConfigureTemplate } from "./steps/ConfigureTemplate";
import { useAtom } from "jotai";
import { pagesAtom, pageActions } from "../../../store/pageStore";
import { useNavigate } from "react-router-dom";
import { CreatePageProcesse } from "./steps/CreatePageProcesse";
import { SelectPages } from "./steps/SelectPages";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const CreatePageWizard = () => {
  const navigate = useNavigate();
  const [, setPages] = useAtom(pagesAtom);
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PageComponent | null>(null);
  const [selectedComponents] = useState<string[]>([]);
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
        name: selectedTemplate.defaultConfig?.pageName || "",
        route: selectedTemplate.defaultConfig?.route || "",
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
    // navigate("/editor/pages");
    navigate(-1);
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

      <div className="flex-1 overflow-y-auto">
        <Box>{renderStep()}</Box>
      </div>

      <div className="shrink-0">
        <Separator />
        <div className="p-3">
          <div className="flex justify-between gap-3">
            {step === 0 && (
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
            )}

            {step > 0 && (
              <Button variant="ghost" onClick={handleBack}>
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
          </div>
        </div>
      </div>
    </div>
  );
};
