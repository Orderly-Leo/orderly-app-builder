import { OrderlyTheme } from "@/service/types";
import { atom } from "jotai";

// export const themeConfig: ThemeItems = {
//   colors: {
//     primary: {
//       darken: "#993ed6",
//       default: "#3E63DD",
//       lighten: "#cf8cff",
//       contrast: "#FFFFFF",
//     },
//     error: {
//       darken: "#EF4444",
//       default: "#EF4444",
//       lighten: "#EF4444",
//       contrast: "#FFFFFF",
//     },
//     success: {
//       darken: "#10B981",
//       default: "#10B981",
//       lighten: "#10B981",
//       contrast: "#FFFFFF",
//     },
//     warning: {
//       darken: "#D25F00",
//       default: "#FF7D00",
//       lighten: "#FF9A2E",
//       contrast: "#FFFFFF",
//     },
//     base: {
//       "100": "#F9FAFB",
//       "200": "#F3F4F6",
//       "300": "#E5E7EB",
//       "400": "#D1D5DB",
//       "500": "#9CA3AF",
//       "600": "#6B7280",
//       "700": "#4B5563",
//       "800": "#374151",
//       "900": "#1F2937",
//     },
//   },
//   typography: {
//     fontFamily: "Inter, system-ui, sans-serif",
//     fontSize: {
//       xs: "0.75rem",
//       sm: "0.875rem",
//       base: "1rem",
//       lg: "1.125rem",
//       xl: "1.25rem",
//       "2xl": "1.5rem",
//       "3xl": "1.875rem",
//     },
//     fontWeight: {
//       light: 300,
//       normal: 400,
//       medium: 500,
//       semibold: 600,
//       bold: 700,
//     },
//     lineHeight: {
//       none: 1,
//       tight: 1.25,
//       normal: 1.5,
//       relaxed: 1.75,
//     },
//   },
//   spacing: {
//     unit: 4,
//     scale: {
//       xs: 1,
//       sm: 2,
//       md: 3,
//       lg: 4,
//       xl: 5,
//     },
//   },
//   borderRadius: {
//     sm: "0.25rem",
//     md: "0.375rem",
//     lg: "0.5rem",
//     full: "9999px",
//   },
// };

export const themesAtom = atom<OrderlyTheme[]>([]);

//objectParse(themeConfig)
// export const themeAtom = atomWithImmer({});

export const currentThemeAtom = atom<OrderlyTheme | null>(null);

export const themeObjectAtom = atom((get) => {
  const theme = get(currentThemeAtom);
  return theme?.theme;
  // return objectParse(theme.theme);
});
