import { EditorService } from "@/service/editor";
import { OrderlyProjectConfig } from "@/service/types";
import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export type AppConfig = {
  config: OrderlyProjectConfig | null;
};

export type AppState = {
  initialized: boolean;
};

export const configsAtom = atomWithImmer<AppConfig>({
  config: null,
});

export const appStateAtom = atomWithImmer<AppState>({
  initialized: false,
});

export const appIsInitializedAtom = atom(
  (get) => get(appStateAtom).initialized
);

export const themeCSSPathAtom = atom<string | null>(
  (get) => get(configsAtom).config?.paths.themeCSS || null
);

export const editorServiceAtom = atom<EditorService | null>(null);
