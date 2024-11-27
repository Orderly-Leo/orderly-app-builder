import { atom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { PageConfig } from "../types/page";

// 页面列表数据
export const pagesAtom = atomWithImmer<PageConfig[]>([
  {
    id: "1",
    name: "Trading",
    route: "/trading",
    template: "blank",
    props: {},
  },
  {
    id: "2",
    name: "Dashboard",
    route: "/dashboard",
    template: "dashboard",
    props: {
      title: "My Dashboard",
      layout: "grid",
    },
  },
]);

// 当前选中的页面ID
export const selectedPageIdAtom = atom<string | null>(null);

// 选中的页面数据
export const selectedPageAtom = atom((get) => {
  const pages = get(pagesAtom);
  const selectedId = get(selectedPageIdAtom);
  return pages.find((page) => page.id === selectedId) || null;
});

// 页面操作方法
export const pageActions = {
  addPage: (pages: PageConfig[], newPage: PageConfig) => {
    pages.push(newPage);
  },
  updatePage: (pages: PageConfig[], updatedPage: PageConfig) => {
    const index = pages.findIndex((p) => p.id === updatedPage.id);
    if (index !== -1) {
      pages[index] = updatedPage;
    }
  },
  deletePage: (pages: PageConfig[], pageId: string) => {
    const index = pages.findIndex((p) => p.id === pageId);
    if (index !== -1) {
      pages.splice(index, 1);
    }
  },
};

export const newPageAtom = atomWithImmer({
  name: "",
  path: [],
  type: "", // page type: trading, market or portfolio
});
