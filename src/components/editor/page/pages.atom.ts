import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";

export const pagesAtom = atomWithImmer<any[]>([
  // {
  //   id: "trading",
  //   name: "Trading",
  //   route: "perp",
  // },
  // {
  //   id: "portfolio",
  //   name: "Portfolio",
  //   route: "portfolio",
  //   children: [
  //     {
  //       id: "portfolio-overview",
  //       name: "Overview",
  //       route: "overview",
  //     },
  //     {
  //       id: "portfolio-positions",
  //       name: "Positions",
  //       route: "positions",
  //     },
  //     {
  //       id: "portfolio-history",
  //       name: "History",
  //       route: "history",
  //     },
  //     {
  //       id: "portfolio-orders",
  //       name: "Orders",
  //       route: "orders",
  //     },
  //   ],
  // },
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

export const currentPagePathAtom = atom<string | null>(null);

export const currentPageAtom = atom((get) => {
  if (!get(currentPagePathAtom)) {
    return null;
  }

  const currentPagePath = get(currentPagePathAtom);
  const pages = get(pagesAtom);

  // Helper function to recursively search through pages and their children
  const findPageByPath = (pages: any[]): any => {
    for (const page of pages) {
      if (page.path === currentPagePath) {
        return page;
      }
      if (page.children) {
        const found = findPageByPath(page.children);
        if (found) return found;
      }
    }
    return null;
  };

  return findPageByPath(pages);
});
