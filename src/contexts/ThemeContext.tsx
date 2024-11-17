import { createContext, useContext, useState, ReactNode } from "react";
import { ThemeConfig } from "../types/theme";

const defaultTheme: ThemeConfig = {
  colors: {
    primary: "#3E63DD",
    secondary: "#6B7280",
    success: "#2ECC71",
    warning: "#F1C40F",
    danger: "#E74C3C",
    info: "#3498DB",
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

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
