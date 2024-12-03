import { Card } from "@/components/ui/card";
import { ThemeConfig } from "../../../types/theme";

interface ThemeGroup {
  id: string;
  label: string;
  items: string[];
}

interface ThemeListProps {
  groups: ThemeGroup[];
  selectedGroup: ThemeGroup;
  onGroupSelect: (group: ThemeGroup) => void;
  themeConfig: ThemeConfig;
}

export const ThemeList = ({
  groups,
  selectedGroup,
  onGroupSelect,
}: ThemeListProps) => {
  return (
    <div className="p-2">
      {groups.map((group) => (
        <Card
          key={group.id}
          className={`mb-2 cursor-pointer transition-colors ${
            selectedGroup.id === group.id
              ? "border-blue-500 bg-blue-50"
              : "hover:bg-gray-50"
          }`}
          onClick={() => onGroupSelect(group)}
        >
          <div className="flex flex-col gap-1">
            <div className="text-lg font-medium">{group.label}</div>
            <div className="text-sm text-gray-500">
              {group.items.length} properties
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
