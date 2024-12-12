import { ThemeList } from "../theme/ThemeList";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { useTheme } from "../../../contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export const THEME_GROUPS = [
  {
    id: "colors",
    label: "Colors",
    items: ["primary", "secondary", "success", "warning", "danger", "info"],
  },
  {
    id: "typography",
    label: "Typography",
    items: ["fontFamily", "fontSize", "fontWeight", "lineHeight"],
  },
  {
    id: "spacing",
    label: "Spacing & Layout",
    items: ["spacing", "borderRadius"],
  },
];

export const ThemePanel = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { theme } = useTheme();
  const selectedGroup =
    THEME_GROUPS.find((g) => g.id === groupId) || THEME_GROUPS[0];

  return (
    <div className="h-full">
      <div className="w-80 border-r border-gray-200">
        <div className="flex justify-between items-center p-2 border-b border-gray-200">
          <div className="text-2xl font-bold">Theme</div>
          <Button variant={"ghost"}>code</Button>
        </div>

        <div className="overflow-auto h-[calc(100%-48px)]">
          <ThemeList
            groups={THEME_GROUPS}
            selectedGroup={selectedGroup}
            onGroupSelect={(group) => navigate(`config/${group.id}`)}
            themeConfig={theme}
          />
        </div>
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
