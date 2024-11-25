import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { FrameworkStep } from "./FrameworkStep";
import { PagesStep } from "./PagesStep";
import { WalletStep } from "./WalletStep";
import { BrokerStep } from "./BrokerStep";
import { ProjectPathStep } from "./ProjectPathStep";
import { CreateProjectInputs, NPM } from "@/service/projectManager";

export const STEPS = [
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
    title: "Project Settings",
    id: 5,
    component: ProjectPathStep,
    description: "Select the path for your application",
  },
];

export const formDataAtom = atomWithImmer<{ data: CreateProjectInputs }>({
  data: {
    brokerId: "orderly",
    brokerName: "Orderly",
    framework: "nextjs",
    walletConnector: "walletconnect",
    pages: ["trading"],
    projectName: "test",
    projectPath: "/Users/leo/project/test",
    npm: "npm" as NPM,
  },
});

export const currentStepIndexAtom = atom(0);

export const currentStepAtom = atom((get) => {
  const index = get(currentStepIndexAtom);
  return STEPS[index];
});

export const currentComponentAtom = atom(
  (get) => get(currentStepAtom)?.component
);
export const currentDescriptionAtom = atom((get) => {
  return {
    title: get(currentStepAtom)?.title,
    description: get(currentStepAtom)?.description,
  };
});
