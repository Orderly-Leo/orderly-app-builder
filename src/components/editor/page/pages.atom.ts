import { atom } from "jotai";
import { mergeDeepRight } from "ramda";

export const pagesAtom = atom<any[]>([]);

// export const pathsAtom = atom<string[]>([]);

export const routesAtom = atom<any[]>((get) => {
  return get(pagesAtom).map((page) => page.route);
});

export const currentPagePathAtom = atom<string | null>(null);

export const componentConfigAtom = atom<any>({});

export const currentPageAtom = atom((get) => {
  if (!get(currentPagePathAtom)) {
    return null;
  }

  const currentPagePath = get(currentPagePathAtom);
  const pages = get(pagesAtom);
  const componentConfig = get(componentConfigAtom);

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

  const component = findPageByPath(pages);

  if (component) {
    const currentComponentConfig = componentConfig[component.component.id];
    if (currentComponentConfig) {
      // component.config = currentComponentConfig;
      component.component.props = mergeDeepRight(
        component.component.props,
        currentComponentConfig
      );
    }
  }

  return component;
});
