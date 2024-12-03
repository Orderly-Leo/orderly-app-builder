import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export const pagesAtom = atomWithImmer<any[]>([
  {
    id: "trading",
    name: "Trading",
    route: "perp",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    route: "portfolio",
    children: [
      {
        id: "portfolio-overview",
        name: "Overview",
        route: "overview",
      },
      {
        id: "portfolio-positions",
        name: "Positions",
        route: "positions",
      },
      {
        id: "portfolio-history",
        name: "History",
        route: "history",
      },
      {
        id: "portfolio-orders",
        name: "Orders",
        route: "orders",
      },
    ],
  },
]);

export const pathsAtom = atom<string[]>([]);

export const currentPagesAtom = atom((get) => {
  const pages = get(pagesAtom);
  const paths = get(pathsAtom);

  const currentPages = paths.reduce((acc, path) => {
    const page = acc.find((page) => page.route === path);

    if (page?.children) {
      return page.children;
    }
    return page;
  }, pages);

  return currentPages;
});
