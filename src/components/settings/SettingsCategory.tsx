import { H5 } from "@blueprintjs/core";
import { SettingItem } from "./SettingItem";

interface SettingsCategoryProps {
  title: string;
  settings: Array<{
    id: string;
    label: string;
    description: string;
    type: string;
    value: any;
    options?: { label: string; value: any }[];
  }>;
  onSettingChange: (id: string, value: any) => void;
}

export const SettingsCategory = ({
  title,
  settings,
  onSettingChange,
}: SettingsCategoryProps) => {
  return (
    <div className="mb-6">
      <H5 className="mb-4">{title}</H5>
      <div className="space-y-4">
        {settings.map((setting) => (
          <SettingItem
            key={setting.id}
            {...setting}
            onChange={(value) => onSettingChange(setting.id, value)}
          />
        ))}
      </div>
    </div>
  );
};
