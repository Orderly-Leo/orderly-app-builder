import { useEffect, useRef, useState } from "react";
import { PageConfig } from "@/types/page";
import { CircleCheck, X } from "lucide-react";
import { useAtomValue } from "jotai";
import { editorServiceAtom } from "@/components/config/configs.atom";

interface CreatePageProcessProps {
  onComplete: (success: boolean) => void;
  config: PageConfig;
}

type ProcessStep = {
  id: string;
  name: string;
  status: "pending" | "processing" | "success" | "error";
  error?: string;
};

export const CreatePageProcess = ({
  onComplete,
  config,
}: CreatePageProcessProps) => {
  const [currentStepIndex, _setCurrentStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const editorService = useAtomValue(editorServiceAtom);
  const isPending = useRef(false);

  console.log("config", config);

  const [steps, _setSteps] = useState<ProcessStep[]>([
    {
      id: "init",
      name: "Initializing page configuration",
      status: "pending",
    },
    {
      id: "template",
      name: "Installing template dependencies",
      status: "pending",
    },
    {
      id: "components",
      name: "Installing component dependencies",
      status: "pending",
    },
    {
      id: "config",
      name: "Generating page configuration",
      status: "pending",
    },
  ]);

  useEffect(() => {
    if (isPending.current) return;
    isPending.current = true;

    const processSteps = async () => {
      try {
        await editorService?.addPage(config, (id, state, message) => {
          console.log("progress", id, state, message);
        });

        //   // Step 1: Initialize
        //   await processStep(0, async () => {
        //     await simulateProcess(1000);
        //   });

        //   // Step 2: Install template
        //   await processStep(1, async () => {
        //     await simulateProcess(2000);
        //     // Simulate random error
        //     if (Math.random() < 0.2) {
        //       throw new Error("Failed to install template dependencies");
        //     }
        //   });

        //   // Step 3: Install components
        //   await processStep(2, async () => {
        //     await simulateProcess(1500);
        //   });

        //   // Step 4: Generate config
        //   await processStep(3, async () => {
        //     await simulateProcess(1000);
        //   });

        //   onComplete(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        onComplete(false);
      }
    };

    processSteps();
  }, [config]);

  // const processStep = async (index: number, process: () => Promise<void>) => {
  //   setCurrentStepIndex(index);
  //   setSteps((prev) =>
  //     prev.map((step, i) => ({
  //       ...step,
  //       status: i === index ? "processing" : step.status,
  //     }))
  //   );

  //   try {
  //     await process();
  //     setSteps((prev) =>
  //       prev.map((step, i) => ({
  //         ...step,
  //         status: i === index ? "success" : step.status,
  //       }))
  //     );
  //   } catch (err) {
  //     setSteps((prev) =>
  //       prev.map((step, i) => ({
  //         ...step,
  //         status: i === index ? "error" : step.status,
  //         error:
  //           i === index
  //             ? err instanceof Error
  //               ? err.message
  //               : "Unknown error"
  //             : step.error,
  //       }))
  //     );
  //     throw err;
  //   }
  // };

  // const simulateProcess = (ms: number) =>
  //   new Promise((resolve) => setTimeout(resolve, ms));

  const getStepIcon = (status: ProcessStep["status"]) => {
    switch (status) {
      case "success":
        return <CircleCheck className="text-emerald-600" />;
      case "error":
        return <X className="text-red-500" />;
      case "processing":
        return (
          <div className="w-5 h-5 border-2 border-purple-700 border-t-transparent rounded-full animate-spin" />
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
        );
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        <div className="p-4">
          <div className="text-2xl font-semibold mb-4">Creating Page</div>

          <div className="flex flex-col gap-3">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`p-3 rounded-lg flex items-center gap-2 ${
                  index === currentStepIndex ? "bg-purple-50" : ""
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-grow">
                  <div
                    className={`${
                      index === currentStepIndex ? "font-medium" : "font-normal"
                    }`}
                  >
                    {step.name}
                  </div>
                  {step.error && (
                    <div className="text-red-500 text-sm">{step.error}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-4 bg-red-50 p-3 rounded-lg">
              <div className="flex gap-2 items-center">
                <X className="text-red-500" />
                <div className="text-red-500">{error}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
