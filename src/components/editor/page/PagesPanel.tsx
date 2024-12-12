import { PageList } from "../page/pageList";
import { PageToolbar } from "../page/PageToolbar";
import { useNavigate, useParams } from "react-router-dom";
import { pagesAtom } from "../page/pages.atom";
import { useAtomValue } from "jotai";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export const PagesPanel = () => {
  const navigate = useNavigate();
  const params = useParams();

  const pages = useAtomValue(pagesAtom);

  const onPageNavigate = (path: string) => {
    const encodedPath = encodeURIComponent(path);
    navigate(`/editor/page/detail?path=${encodedPath}`);
  };

  return (
    <div className="bg-gray-100">
      <PageToolbar
        onCreateClick={function (): void {
          // throw new Error("Function not implemented.");
          navigate("/editor/create/page");
        }}
      />
      <div className="absolute top-[64px] left-0 right-0 bottom-0">
        <ScrollArea className="h-full">
          <PageList
            pages={pages}
            parentPath={params["*"]}
            onNavigate={onPageNavigate}
          />
        </ScrollArea>
      </div>
    </div>
  );
};
