import { createBrowserRouter, Navigate } from "react-router-dom";
import { StepWizard } from "../components/StepWizard";
import { Editor } from "../components/Editor";
import { Layout } from "../components/Layout";
import { ComponentsPanel } from "../components/editor/sidebar/ComponentsPanel";
import { CreatePageWizard } from "../components/editor/page/createPageWizard";
import { ConfigPanel } from "../components/config/configPanel";
import { ThemesPanel } from "../components/editor/theme/ThemesPanel";
import { CreateThemeWizard } from "../components/editor/theme/CreateThemeWizard";
import { CreateThemeStep1 } from "@/components/editor/theme/steps/step_1";
import { ThemeEditor } from "@/components/editor/theme/ThemeEditor";
import { PageDetail } from "@/components/editor/page/PageDetail";
import {PagesPanel} from "@/components/editor/page/PagesPanel.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/bootstrap" replace />,
      },
      // {
      //   path: "create",
      //   element: <CreatePageWizard />,
      // },
      {
        path: "bootstrap",
        element: <StepWizard />,
      },
      {
        path: "create/page",
        element: <CreatePageWizard />,
      },
      {
        path: "create/theme",
        element: <CreateThemeWizard />,
        children: [
          {
            index: true,
            element: <Navigate to="step_1" replace />,
          },
          {
            path: "step_1",
            element: <CreateThemeStep1 />,
          },
        ],
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
            // children: [
            //   // {
            //   //   path: ":pageId",
            //   //   element: <PageDetail />,
            //   // },
            // ],
          },
          {
            path: "page/:page",
            element: <PageDetail />,
          },
          {
            path: "themes",
            // element: <ThemesPanel />,
            children: [
              {
                index: true,
                element: <ThemesPanel />,
              },

              {
                path: ":themeName",
                // element: <ThemeConfigs />,
                element: <ThemeEditor />,
              },
            ],
          },
          {
            path: "components",
            element: <ComponentsPanel />,
          },
          {
            path: "config",
            element: <ConfigPanel />,
          },
          // {
          //   path: "settings",
          //   element: <SettingsPanel />,
          // },
        ],
      },
    ],
  },
]);
