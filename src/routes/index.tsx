import { createBrowserRouter, Navigate } from "react-router-dom";
import { StepWizard } from "../components/StepWizard";
import { Editor } from "../components/Editor";
import { Layout } from "../components/Layout";
import { BrokerStep } from "../components/steps/BrokerStep";
import { FrameworkStep } from "../components/steps/FrameworkStep";
import { WalletStep } from "../components/steps/WalletStep";
import { PagesPanel } from "../components/editor/sidebar/PagesPanel";
import { ThemePanel } from "../components/editor/sidebar/ThemePanel";
import { ComponentsPanel } from "../components/editor/sidebar/ComponentsPanel";
import { SettingsPanel } from "../components/settings/SettingsPanel";

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
        element: <Navigate to="/editor/pages" replace />,
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
        children: [
          {
            index: true,
            element: <Navigate to="/editor/pages" replace />,
          },
          {
            path: "pages",
            element: <PagesPanel />,
          },
          {
            path: "theme",
            element: <ThemePanel />,
          },
          {
            path: "components",
            element: <ComponentsPanel />,
          },
          {
            path: "settings",
            element: <SettingsPanel />,
          },
        ],
      },
    ],
  },
]);
