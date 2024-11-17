import { Box, Flex, Text } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import { ColorPicker } from "./ColorPicker";
import { useTheme } from "../../../contexts/ThemeContext";
import { THEME_GROUPS } from "../sidebar/ThemePanel";

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
    // 其他类型的控件可以在这里添加
    return null;
  };

  return (
    <Box className="h-full">
      <Flex
        justify="between"
        align="center"
        p="4"
        className="border-b border-gray-200"
      >
        <Text size="5" weight="bold">
          {group.label}
        </Text>
      </Flex>

      <Box p="4" className="overflow-auto h-[calc(100%-73px)]">
        <Flex direction="column" gap="4">
          {group.items.map((item) => (
            <Box key={item}>
              <Text as="label" size="2" weight="medium" mb="2">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
              {renderControl(item)}
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
