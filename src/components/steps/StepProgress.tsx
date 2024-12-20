import { motion, AnimatePresence } from "motion/react";
import { FC, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  CircleX,
  X,
} from "lucide-react";
import { useAtom } from "jotai";
import { formDataAtom } from "./atom";
import { projectManager } from "@/service/projectManager";
import { cn } from "@/lib/utils";
import { CustomError } from "@/types/customError";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CreateProjectIds } from "./types";
import { Spinner } from "../ui/spiner";

export enum StepState {
  COMPLETED = "completed",
  PENDING = "pending",
  ERROR = "error",
}
interface CompletedItem {
  id: string;
  text: string;
  state: StepState;
  messages?: string;
}

interface StepProgressProps {
  progress: number; // 0-100
  state: "pending" | "completed" | "failed";
  completedItems: CompletedItem[];
  onBack: () => void;
}

export const CircleProgress = ({
  progress,
  state,
}: {
  progress: number;
  state: "pending" | "completed" | "failed";
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    state === "pending"
      ? circumference - ((progress * 33) / 100) * circumference
      : 0;

  return (
    <div className="relative w-32 h-32">
      {/* Background circle */}
      <svg className="w-full h-full rotate-[-90deg]">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="rgba(255,255,255,1)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      {/* Center percentage text */}
      <div className="absolute inset-0 flex items-center justify-center flex-col text-white text-2xl">
        {state === "completed" ? (
          <Check size={48} color="green" />
        ) : state === "failed" ? (
          <X size={48} color="rgba(255,255,255,0.7)" />
        ) : (
          <div>{`${progress}/3`}</div>
        )}
      </div>
    </div>
  );
};

interface CompletedItemComponentProps {
  item: CompletedItem;
}

const CompletedItemComponent: React.FC<CompletedItemComponentProps> = ({
  item,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div
        className={cn(
          "flex items-center gap-x-2 py-2 px-4 my-1 text-white bg-white/10 rounded-md",
          item.state === "error" && "bg-red-500/10 "
        )}
      >
        <div className="text-sm flex-1">{item.text}</div>

        {item.state === StepState.PENDING ? (
          <Spinner />
        ) : item.state === StepState.COMPLETED ? (
          <Check size={18} color="green" />
        ) : (
          <CircleX size={18} color="red" />
        )}
        {!!item.messages && (
          <CollapsibleTrigger>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </CollapsibleTrigger>
        )}
      </div>
      <CollapsibleContent>
        <div className="rounded-md px-4 py-2  text-sm shadow-sm bg-white/10 text-red-500">
          <pre className="text-wrap text-xs">{item.messages}</pre>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export const StepProgress: React.FC<StepProgressProps> = ({
  progress = 0,
  completedItems = [],
  onBack,
  state,
}) => {
  return (
    <>
      <div className="h-full flex flex-col items-center gap-6">
        {/* Progress Circle */}
        <CircleProgress progress={progress} state={state} />

        {/* Completed Items List */}
        <div className="w-full max-w-lg select-auto">
          <AnimatePresence mode="popLayout">
            {completedItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CompletedItemComponent item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* {state === "completed" && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10">
          <Button variant={"ghost"}>
            <span>Open vscode</span>
            <ExternalLink />
          </Button>
        </div>
      )} */}

      {state === "failed" && (
        <button
          onClick={onBack}
          className="fixed bottom-5 left-5 text-white/80 flex items-center gap-1 z-10"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back and edit</span>
        </button>
      )}
    </>
  );
};

export const CreateProjectProgress: FC<{
  onBack: () => void;
  onComplete: (data: any) => void;
}> = ({ onBack, onComplete }) => {
  const progressing = useRef(false);
  const [progress, setProgress] = useState(0);
  const [completedItems, setCompletedItems] = useState<CompletedItem[]>([]);
  const [progressState, setProgressState] = useState<
    "pending" | "completed" | "failed"
  >("pending");

  const [formData] = useAtom(formDataAtom);

  const updateCompletedItem = (
    id: string,
    text: string,
    state: StepState,
    messages?: string
  ) => {
    setCompletedItems((items) => {
      const index = items.findIndex((item) => item.id === id);
      if (index !== -1) {
        return items.map((item) =>
          item.id === id ? { ...item, text, state, messages } : item
        );
      }
      return [
        ...items,
        {
          id,
          text,
          state,
          messages,
        },
      ];
    });
  };

  useEffect(() => {
    if (progressing.current) return;
    progressing.current = true;
    projectManager
      .createProject(
        formData.data,
        (id: CreateProjectIds, state: StepState, message: string) => {
          updateCompletedItem(id, message, state);
          if (state === StepState.COMPLETED) {
            setProgress((progress) => progress + 1);
          }
        }
      )
      .then(
        () => {
          setProgressState("completed");
          //   setProgress(100);
          //   setCompletedItems(testItems);
          onComplete(formData.data);
        },
        (error) => {
          setProgressState("failed");
          if (error instanceof CustomError) {
            updateCompletedItem(
              error.id,
              error.title,
              StepState.ERROR,
              error.message
            );
          } else {
            updateCompletedItem(
              "UNKNOW_ERROR",
              "Unknow error",
              StepState.ERROR,
              error instanceof Error ? error.message : error
            );
          }
        }
      )
      .catch((error) => {
        // console.error("CreateProjectProgress", error);
        updateCompletedItem(
          "UNKNOW_ERROR",
          "Unknow error",
          StepState.ERROR,
          error instanceof Error ? error.message : error
        );
      });
  }, []);

  return (
    <StepProgress
      progress={progress}
      completedItems={completedItems}
      onBack={onBack}
      state={progressState}
    />
  );
};
