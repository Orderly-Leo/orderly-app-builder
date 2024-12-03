// import { pagesAtom, selectedPageIdAtom } from "../../../store/pageStore";
import { NavLink } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { PageDetail } from "./PageDetail";

export const PageList: FC<{ pages: any[]; parentPath?: string }> = (props) => {
  const { pages, parentPath } = props;
  // const [selectedPageId, setSelectedPageId] = useAtom(selectedPageIdAtom);

  if (pages.length === 0) {
    return (
      <div className="h-full text-gray-400 p-4 flex items-center justify-center">
        <div>No pages created yet</div>
      </div>
    );
  }

  if (!Array.isArray(pages)) {
    return <PageDetail />;
  }

  return (
    <div className="flex flex-col gap-3">
      {pages.map((page) => {
        const path = parentPath ? `${parentPath}/${page.route}` : page.route;
        return (
          <NavLink to={path} key={page.id}>
            <Card className="shadow-none p-3">
              <div className="font-medium">{page.name}</div>
              <div className="text-sm text-gray-500">{path}</div>
            </Card>
          </NavLink>
        );
      })}
    </div>
  );
};
