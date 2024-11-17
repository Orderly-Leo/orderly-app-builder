import { Box, Card, Flex, Text } from "@radix-ui/themes";
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
  themeConfig,
}: ThemeListProps) => {
  return (
    <Box p="2">
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
          <Flex direction="column" gap="1">
            <Text weight="medium">{group.label}</Text>
            <Text size="1" color="gray">
              {group.items.length} properties
            </Text>
          </Flex>
        </Card>
      ))}
    </Box>
  );
};
