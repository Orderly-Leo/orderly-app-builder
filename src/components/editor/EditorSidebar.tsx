import { Tabs, Tab, Icon } from "@blueprintjs/core";
import { PagesPanel } from "./sidebar/PagesPanel";
import { ThemePanel } from "./sidebar/ThemePanel";
import { ComponentsPanel } from "./sidebar/ComponentsPanel";
import { SettingsPanel } from "../settings/SettingsPanel";

export const EditorSidebar = () => {
  return (
    <Tabs id="EditorTabs" className="h-full">
      <Tab
        id="pages"
        title={<Icon icon="applications" />}
        panel={<PagesPanel />}
      />
      <Tab
        id="theme"
        title={<Icon icon="color-fill" />}
        panel={<ThemePanel />}
      />
      <Tab
        id="components"
        title={<Icon icon="widget" />}
        panel={<ComponentsPanel />}
      />
      <Tab
        id="settings"
        title={<Icon icon="cog" />}
        panel={<SettingsPanel />}
      />
    </Tabs>
  );
};
