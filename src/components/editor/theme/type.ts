export interface ThemeItems {
  colors: {
    primary: ColorConfig;
    error: ColorConfig;
    success: ColorConfig;
    warning: ColorConfig;
    base: {
      [key: string]: string;
    };
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

interface ColorConfig {
  darken: string;
  default: string;
  lighten: string;
  contrast: string;
}
