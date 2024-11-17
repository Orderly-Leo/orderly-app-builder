
import { Heading } from "@radix-ui/themes";
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
      <Heading className="mb-4">{title}</Heading>
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
