import { PageList } from "../page/pageList";
import { PageToolbar } from "../page/PageToolbar";
import { useNavigate, useParams } from "react-router-dom";
import { PageProps } from "../page/pageProps";
import { currentPagesAtom, pathsAtom } from "../page/pages.atom";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

export const PagesPanel = () => {
  const navigate = useNavigate();
  const params = useParams();

  // const [pages] = useAtom(pagesAtom);

  const [pages] = useAtom(currentPagesAtom);

  const [_, setPaths] = useAtom(pathsAtom);

  useEffect(() => {
    if (params["*"]) {
      setPaths(params["*"].split("/"));
    } else {
      setPaths([]);
    }
  }, [params]);

  // return <PageList />;

  return (
    <div className="flex">
      <div className="w-6/12">
        <PageToolbar
          onCreateClick={function (): void {
            // throw new Error("Function not implemented.");
            navigate("/create/page");
          }}
        />
        <div className="p-4 h-screen overflow-auto">
          <PageList pages={pages} parentPath={params["*"]} />
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex-1 sticky top-[64px] px-2">
        <PageProps />
      </div>
    </div>
  );
};
