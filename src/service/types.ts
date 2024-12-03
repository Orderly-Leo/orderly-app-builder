import { ThemeItems } from "@/components/editor/theme/type";

export type OrderlyConfig = {
  framework: string;
  paths: {
    src: string;
    public: string;
    themeCSS: string;
  };
};

export type OrderlyTheme = {
  name: string;
  description: string;
  theme: ThemeItems;
};