import { useState } from "react";
import { Box, Tabs, TextField, Text, Flex } from "@radix-ui/themes";
import { ColorPicker } from "./ColorPicker";
import { ThemeConfig } from "./type";
import { Colors } from "./colors";

const defaultTheme: ThemeConfig = {
  colors: {
    Primary: {
      darken: "#993ed6",
      default: "#3E63DD",
      lighten: "#cf8cff",
      contrast: "#FFFFFF",
    },
    Error: {
      darken: "#EF4444",
      default: "#EF4444",
      lighten: "#EF4444",
      contrast: "#FFFFFF",
    },
    Success: {
      darken: "#10B981",
      default: "#10B981",
      lighten: "#10B981",
      contrast: "#FFFFFF",
    },
    Warning: {
      darken: "#D25F00",
      default: "#FF7D00",
      lighten: "#FF9A2E",
      contrast: "#FFFFFF",
    },
    Base: {
      "100": "#F9FAFB",
      "200": "#F3F4F6",
      "300": "#E5E7EB",
      "400": "#D1D5DB",
      "500": "#9CA3AF",
      "600": "#6B7280",
      "700": "#4B5563",
      "800": "#374151",
      "900": "#1F2937",
    },
  },
  // colors: {

  //   // primary: "#3E63DD",
  //   // secondary: "#6B7280",
  //   // success: "#2ECC71",
  //   // warning: "#F1C40F",
  //   // danger: "#E74C3C",
  //   // info: "#3498DB",
  //   // background: "#FFFFFF",
  //   // surface: "#F9FAFB",
  //   // text: "#1F2937",
  //   // border: "#E5E7EB",
  // },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    unit: 4,
    scale: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
    },
  },
  borderRadius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    full: "9999px",
  },
};

export const ThemeEditor = () => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

  const handleColorChange =
    (key: keyof ThemeConfig["colors"]) => (color: string) => {
      setTheme({
        ...theme,
        colors: {
          ...theme.colors,
          [key]: color,
        },
      });
    };

  return (
    <Box p="4" className="bg-gray-100">
      <Tabs.Root defaultValue="colors">
        <Tabs.List>
          <Tabs.Trigger value="colors">Colors</Tabs.Trigger>
          <Tabs.Trigger value="typography">Typography</Tabs.Trigger>
          <Tabs.Trigger value="spacing">Spacing</Tabs.Trigger>
        </Tabs.List>

        <Box py="4" mx={"auto"} maxWidth={"85%"}>
          <Tabs.Content value="colors">
            <Colors colors={theme.colors} />
          </Tabs.Content>

          <Tabs.Content value="typography">
            <Flex direction="column" gap="4">
              <Box>
                <Text as="label" size="2" weight="medium">
                  Font Family
                </Text>
                <TextField.Root>
                  <TextField.Root
                    value={theme.typography.fontFamily}
                    onChange={(e) =>
                      setTheme({
                        ...theme,
                        typography: {
                          ...theme.typography,
                          fontFamily: e.target.value,
                        },
                      })
                    }
                  />
                </TextField.Root>
              </Box>
              {/* Add other typography settings */}
            </Flex>
          </Tabs.Content>

          <Tabs.Content value="spacing">
            <Flex direction="column" gap="4">
              <Box>
                <Text as="label" size="2" weight="medium">
                  Base Unit
                </Text>
                <TextField.Root>
                  <TextField.Root
                    type="number"
                    value={theme.spacing.unit}
                    onChange={(e) =>
                      setTheme({
                        ...theme,
                        spacing: {
                          ...theme.spacing,
                          unit: Number(e.target.value),
                        },
                      })
                    }
                  />
                </TextField.Root>
              </Box>
              {/* Add other spacing settings */}
            </Flex>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
};
