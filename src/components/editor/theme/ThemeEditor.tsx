import { useId, useState } from "react";
import {
  Tabs,
  Tab,
  FormGroup,
  InputGroup,
  type TabId,
  TabPanel,
} from "@blueprintjs/core";
import { ColorPicker } from "./ColorPicker";
import { ThemeConfig } from "../../../types/theme";

const defaultTheme: ThemeConfig = {
  colors: {
    primary: "#3E63DD",
    secondary: "#6B7280",
    success: "#2ECC71",
    warning: "#F1C40F",
    danger: "#E74C3C",
    info: "#3498DB",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: "#1F2937",
    border: "#E5E7EB",
  },
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
  const TABS_PARENT_ID = useId();
  const [selectedTabId, setSelectedTabId] = useState<TabId>("Home");

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

  const handleTypographyChange = (
    category: keyof ThemeConfig["typography"],
    key: string,
    value: string | number
  ) => {
    setTheme({
      ...theme,
      typography: {
        ...theme.typography,
        [category]: {
          ...theme.typography[category],
          [key]: value,
        },
      },
    });
  };

  return (
    <div className="p-4">
      <TabPanel
        id={selectedTabId}
        selectedTabId={selectedTabId}
        parentId={TABS_PARENT_ID}
        panel={<p>The current panel id is: "{selectedTabId}"</p>}
      />
      <Tabs
        id={TABS_PARENT_ID}
        onChange={setSelectedTabId}
        selectedTabId={selectedTabId}
      >
        <Tab id="colors" title="Colors" />
        <Tab id="typography" title="Typography" />
      </Tabs>
      {/* <Tabs
        id="ThemeEditorTabs"
        className="theme-editor-tabs"
        vertical={false}
        renderActiveTabPanelOnly={true}
      >
        <Tab
          id="colors"
          title="Colors"
          panel={
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(theme.colors).map(([key, value]) => (
                <FormGroup
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                >
                  <ColorPicker
                    color={value}
                    onChange={handleColorChange(
                      key as keyof ThemeConfig["colors"]
                    )}
                  />
                </FormGroup>
              ))}
            </div>
          }
        />
        <Tab
          id="typography"
          title="Typography"
          panel={
            <div>
              <FormGroup label="Font Family">
                <InputGroup
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
              </FormGroup>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Font Sizes</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.typography.fontSize).map(
                    ([key, value]) => (
                      <FormGroup key={key} label={key}>
                        <InputGroup
                          value={value}
                          onChange={(e) =>
                            handleTypographyChange(
                              "fontSize",
                              key,
                              e.target.value
                            )
                          }
                        />
                      </FormGroup>
                    )
                  )}
                </div>
              </div>
            </div>
          }
        />
        <Tab
          id="spacing"
          title="Spacing"
          panel={
            <div>
              <FormGroup label="Base Unit">
                <InputGroup
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
              </FormGroup>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Scale</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(theme.spacing.scale).map(([key, value]) => (
                    <FormGroup key={key} label={key}>
                      <InputGroup
                        type="number"
                        value={value}
                        onChange={(e) =>
                          setTheme({
                            ...theme,
                            spacing: {
                              ...theme.spacing,
                              scale: {
                                ...theme.spacing.scale,
                                [key]: Number(e.target.value),
                              },
                            },
                          })
                        }
                      />
                    </FormGroup>
                  ))}
                </div>
              </div>
            </div>
          }
        />
      </Tabs> */}
    </div>
  );
};
