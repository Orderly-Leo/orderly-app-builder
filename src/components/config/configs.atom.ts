import { atomWithImmer } from "jotai-immer";

const configs = {
  application: {},
  project: {
    path: {
      themeCss: "/orderly-app-builder",
    },
  },
};

export const configsAtom = atomWithImmer(configs);
