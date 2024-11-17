import { Box, Flex, Text, Button } from "@radix-ui/themes";
import { ThemeList } from "../theme/ThemeList";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { CodeIcon } from "@radix-ui/react-icons";
import { Save } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";

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
    <Flex className="h-full">
      <Box className="w-80 border-r border-gray-200">
        <Flex
          p="2"
          className="border-b border-gray-200"
          justify="between"
          align="center"
        >
          <Text size="2" weight="medium">
            Theme
          </Text>
          <Button size="1" variant="soft">
            <CodeIcon size={14} />
            code
          </Button>
        </Flex>

        <Box className="overflow-auto h-[calc(100%-48px)]">
          <ThemeList
            groups={THEME_GROUPS}
            selectedGroup={selectedGroup}
            onGroupSelect={(group) => navigate(`config`)}
            themeConfig={theme}
          />
        </Box>
      </Box>

      <Box className="flex-1">
        <Outlet />
      </Box>
    </Flex>
  );
};
