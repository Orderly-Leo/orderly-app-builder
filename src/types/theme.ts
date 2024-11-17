export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      none: number;
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    unit: number;
    scale: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}
