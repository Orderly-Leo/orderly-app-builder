import { createBrowserRouter, Navigate } from "react-router-dom";
import { StepWizard } from "../components/StepWizard";
import { Editor } from "../components/Editor";
import { Layout } from "../components/Layout";
import { BrokerStep } from "../components/steps/BrokerStep";
import { FrameworkStep } from "../components/steps/FrameworkStep";
import { WalletStep } from "../components/steps/WalletStep";
import { PagesPanel } from "../components/editor/sidebar/PagesPanel";
import { ComponentsPanel } from "../components/editor/sidebar/ComponentsPanel";
import { SettingsPanel } from "../components/settings/SettingsPanel";
import { PageDetail } from "../components/editor/page/PageDetail";
import { CreatePageWizard } from "../components/editor/page/createPageWizard";
import { ThemeConfigs } from "../components/editor/theme/ThemeConfigs";
import { ConfigPanel } from "../components/config/configPanel";

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
        path: "create",
        element: <CreatePageWizard />,
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
            children: [
              {
                path: "create",
                element: <CreatePageWizard />,
              },
              {
                path: ":pageId",
                element: <PageDetail />,
              },
            ],
          },
          {
            path: "theme",
            element: <ThemeConfigs />,
          },
          {
            path: "components",
            element: <ComponentsPanel />,
          },
          {
            path: "config",
            element: <ConfigPanel />,
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
