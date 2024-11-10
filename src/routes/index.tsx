import { createBrowserRouter, Navigate } from "react-router-dom";
import { StepWizard } from "../components/StepWizard";
import { Editor } from "../components/Editor";
import { Layout } from "../components/Layout";
import { BrokerStep } from "../components/steps/BrokerStep";
import { FrameworkStep } from "../components/steps/FrameworkStep";
import { WalletStep } from "../components/steps/WalletStep";

const steps = [
  { title: "Broker ID", component: BrokerStep },
  { title: "React Framework", component: FrameworkStep },
  { title: "Wallet Connector", component: WalletStep },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/editor" replace />,
      },
      {
        path: "bootstrap",
        element: (
          <StepWizard
            steps={steps}
            onComplete={(data) => {
              console.log("Wizard completed with data:", data);
            }}
          />
        ),
      },
      {
        path: "editor",
        element: <Editor />,
      },
    ],
  },
]);
