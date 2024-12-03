import { useState } from "react";
import { SettingsCategory } from "./SettingsCategory";
import { Input } from "../ui/input";

// Group type definition
interface SettingsGroup {
  id: string;
  label: string;
  icon?: string;
}

interface SettingItem {
  id: string;
  label: string;
  description: string;
  type: "boolean" | "string" | "number" | "select";
  value: any;
  options?: { label: string; value: any }[];
  category: string;
  group: string; // Add group field
}

const SETTINGS_GROUPS: SettingsGroup[] = [
  { id: "commonly-used", label: "Application", icon: "star" },
  { id: "editor", label: "Editor", icon: "edit" },
  { id: "preview", label: "Preview", icon: "eye-open" },
];

const SETTINGS_DATA: SettingItem[] = [
  {
    id: "editor.theme",
    label: "Editor Theme",
    description: "Specifies the color theme for the editor",
    type: "select",
    value: "light",
    options: [
      { label: "Light", value: "light" },
      { label: "Dark", value: "dark" },
    ],
    category: "Appearance",
    group: "editor",
  },
  {
    id: "editor.fontSize",
    label: "Font Size",
    description: "Controls the font size in pixels",
    type: "number",
    value: 14,
    category: "Editor",
    group: "editor",
  },
  {
    id: "preview.liveRefresh",
    label: "Live Refresh",
    description: "Automatically refresh preview when changes are made",
    type: "boolean",
    value: true,
    category: "Preview",
    group: "preview",
  },
];

const SettingsSidebar = ({
  groups,
  activeGroup,
  onGroupSelect,
}: {
  groups: SettingsGroup[];
  activeGroup: string;
  onGroupSelect: (groupId: string) => void;
}) => {
  return (
    <div className="w-60 border-r border-gray-200 p-2">
      {groups.map((group) => (
        <div
          key={group.id}
          className={`p-2 cursor-pointer rounded hover:bg-gray-100 ${
            activeGroup === group.id ? "bg-gray-100" : ""
          }`}
          onClick={() => onGroupSelect(group.id)}
        >
          {group.icon && <span className={`bp4-icon-${group.icon} mr-2`} />}
          {group.label}
        </div>
      ))}
    </div>
  );
};

export const SettingsPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [settings, setSettings] = useState(SETTINGS_DATA);
  const [activeGroup, setActiveGroup] = useState(SETTINGS_GROUPS[0].id);

  const filteredSettings = settings.filter(
    (setting) =>
      setting.group === activeGroup &&
      (!searchQuery ||
        setting.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        setting.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const groupedSettings = filteredSettings.reduce((acc, setting) => {
    if (!acc[setting.category]) {
      acc[setting.category] = [];
    }
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, SettingItem[]>);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Input
          placeholder="Search settings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        ></Input>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <SettingsSidebar
          groups={SETTINGS_GROUPS}
          activeGroup={activeGroup}
          onGroupSelect={setActiveGroup}
        />

        <div className="flex-1 overflow-auto p-4">
          {Object.entries(groupedSettings).map(
            ([category, items]) =>
              items.length > 0 && (
                <SettingsCategory
                  key={category}
                  title={category}
                  settings={items}
                  onSettingChange={(id, value) => {
                    setSettings(
                      settings.map((s) => (s.id === id ? { ...s, value } : s))
                    );
                  }}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
};
