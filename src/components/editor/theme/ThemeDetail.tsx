import { useParams } from "react-router-dom";
import { ColorPicker } from "./ColorPicker";
import { useTheme } from "../../../contexts/ThemeContext";
import { THEME_GROUPS } from "../sidebar/ThemePanel";
import { Typography } from "@/components/ui/typography";

export const ThemeDetail = () => {
  const { groupId } = useParams();
  const { theme, updateTheme } = useTheme();
  const group = THEME_GROUPS.find((g) => g.id === groupId) || THEME_GROUPS[0];

  const renderControl = (item: string) => {
    if (group.id === "colors") {
      return (
        <ColorPicker
          color={theme.colors[item as keyof typeof theme.colors]}
          onChange={(color) =>
            updateTheme({
              colors: {
                ...theme.colors,
                [item]: color,
              },
            })
          }
        />
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <Typography variant="h4">{group.label}</Typography>
      </div>

      <div className="p-4 overflow-auto h-[calc(100%-73px)]">
        <div className="flex flex-col gap-4">
          {group.items.map((item) => (
            <div key={item}>
              <Typography as="label" variant="label" className="mb-2 block">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Typography>
              {renderControl(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
