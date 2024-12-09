// import { pagesAtom, selectedPageIdAtom } from "../../../store/pageStore";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { PageDetail } from "./PageDetail";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { currentPagePathAtom } from "./pages.atom";

export const PageList: FC<{
  pages: any[];
  parentPath?: string;
  onNavigate: (path: string) => void;
}> = (props) => {
  const { pages, onNavigate } = props;
  // const [selectedPageId, setSelectedPageId] = useAtom(selectedPageIdAtom);

  if (!Array.isArray(pages) || pages.length === 0) {
    return (
      <div className="h-full text-gray-400 p-4 flex items-center justify-center">
        <div>No pages created yet</div>
      </div>
    );
  }

  if (!Array.isArray(pages)) {
    return <PageDetail />;
  }

  return <PagesGridStyle pages={pages} onNavigate={onNavigate} />;

  // return (
  //   <div className="flex flex-col gap-3 items-center">
  //     {pages.map((page) => {
  //       console.log("++++++++++", page);

  //       return <Page key={page.path} {...page} level={0} />;
  //     })}
  //   </div>
  // );
};

const PagesGridStyle: FC<{
  pages: any[];
  onNavigate: (path: string) => void;
}> = ({ pages, onNavigate }) => {
  const [currentPagePath, setCurrentPagePath] = useAtom(currentPagePathAtom);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {pages.map((page) => {
        return (
          <Page
            key={page.path}
            {...page}
            currentPagePath={currentPagePath}
            onNavigate={onNavigate}
            onSelect={(path) => {
              setCurrentPagePath(path);
            }}
          />
        );
      })}
    </div>
  );
};

type PageProps = {
  page: string;
  path: string;
  route: string;
  children?: PageProps[];
  component: any;

  currentPagePath: string | null;
  onSelect: (path: string) => void;
  onNavigate: (path: string) => void;
};

const Page = (props: PageProps) => {
  const {
    route,
    component,
    children,
    path,
    currentPagePath,
    onSelect,
    onNavigate,
  } = props;
  return (
    <>
      <Card
        className={cn(
          "shadow-none p-2 w-full space-y-1 border-none",
          currentPagePath === path && "outline outline-2 outline-fuchsia-700"
        )}
        // style={{ transform: `translateX(${level * 40}px)` }}
        onClick={() => {
          onSelect(path);
        }}
        onDoubleClick={() => {
          console.log("++++++++++", route);
          onNavigate(path);
        }}
      >
        <div
          className="w-full bg-cover bg-no-repeat bg-top aspect-video rounded-tl-lg rounded-tr-lg"
          style={{ backgroundImage: `url(${component?.thumbnail})` }}
        />
        <div className="text-xs text-gray-500">{component?.id}</div>
        {/* <div className="text-sm text-gray-500">{route}</div> */}
      </Card>

      {children &&
        children.map((child) => (
          <Page
            key={child.path}
            {...child}
            currentPagePath={currentPagePath}
            onSelect={onSelect}
            onNavigate={onNavigate}
          />
        ))}
    </>
  );
};
