export type OrderlyConfig = {
  // framework: string;
  paths: {
    src: string;
    public: string;
    themeCSS: string;
  };
};

export type OrderlyTheme = {
  name: string;
  description?: string;
  theme: Record<string, string>;
};
