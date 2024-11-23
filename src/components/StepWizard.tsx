import { atom, useAtom } from "jotai";
import { StepWizardProvider } from "../contexts/StepWizardContext";
import { PagesStep } from "./steps/PagesStep";
import { BrokerStep } from "./steps/BrokerStep";
import { FrameworkStep } from "./steps/FrameworkStep";
import { WalletStep } from "./steps/WalletStep";
import { atomWithImmer } from "jotai-immer";
import { ProjectPathStep } from "./steps/ProjectPathStep";
import { WizardLayout } from "./WizardLayout";

interface Step {
  title: string;
  component: React.ComponentType<any>;
  description: string;
}

interface StepWizardProps {}

const steps = [
  { title: "Broker ID", id: 1, component: BrokerStep, description: "" },
  {
    title: "React Framework",
    id: 2,
    component: FrameworkStep,
    description: "",
  },
  { title: "Wallet Connector", id: 3, component: WalletStep, description: "" },
  {
    title: "Pages",
    id: 4,
    component: PagesStep,
    description: "Choose the pages you want to include in your project",
  },
  {
    title: "Project Path",
    id: 5,
    component: ProjectPathStep,
    description: "Select the path for your application",
  },
];

const formDataAtom = atomWithImmer({
  data: {
    brokerId: "",
    brokerName: "",
    framework: "",
    walletConnector: "",
    pages: [],
    projectPath: "/Users/leo/project/test",
  },
});

const currentStepIndexAtom = atom(0);

const currentStepAtom = atom((get) => {
  const index = get(currentStepIndexAtom);
  return steps[index];
});

const currentComponentAtom = atom((get) => get(currentStepAtom)?.component);
const currentDescriptionAtom = atom((get) => {
  return {
    title: get(currentStepAtom)?.title,
    description: get(currentStepAtom)?.description,
  };
});

const StepWizardContent: React.FC<StepWizardProps> = ({}) => {
  const [CurrentStepComponent] = useAtom(currentComponentAtom);
  const [currentDescription] = useAtom(currentDescriptionAtom);

  const [currentIndex, setCurrentIndex] = useAtom(currentStepIndexAtom);
  const [formData, setFormData] = useAtom(formDataAtom);

  const onNext = (stepData: Record<string, any>) => {
    setFormData((draft) => {
      draft.data = { ...draft.data, ...stepData };
    });
    setCurrentIndex(currentIndex + 1);
  };
  const onPrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-[#1a1333] to-[#2d1d3f]">
      <div>
        <img
          className="w-auto h-7 relative object-contain dark:block"
          src="https://mintlify.s3-us-west-1.amazonaws.com/orderly/logo/dark.svg"
          alt="dark logo"
        />
      </div>
      <WizardLayout
        steps={steps}
        currentIndex={currentIndex}
        currentDescription={currentDescription}
      >
        <CurrentStepComponent
          onNext={onNext}
          onBack={onPrevious}
          formData={formData.data}
          onComplete={() => {}}
        />
      </WizardLayout>
    </div>
  );
};

export const StepWizard: React.FC<StepWizardProps> = (props) => {
  return (
    <StepWizardProvider>
      <StepWizardContent />
    </StepWizardProvider>
  );
};
