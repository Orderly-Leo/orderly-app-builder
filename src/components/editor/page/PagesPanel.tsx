import { PageList } from "../page/pageList";
import { PageToolbar } from "../page/PageToolbar";
import { useNavigate, useParams } from "react-router-dom";
import { currentPagesAtom, pathsAtom } from "../page/pages.atom";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const PagesPanel = () => {
  const navigate = useNavigate();
  const params = useParams();

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

  const onPageNavigate = (path: string) => {
    const encodedPath = encodeURIComponent(path);
    navigate(`/editor/page/detail?path=${encodedPath}`);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <PageToolbar
        onCreateClick={function (): void {
          // throw new Error("Function not implemented.");
          navigate("/create/page");
        }}
      />
      <PageList
        pages={pages}
        parentPath={params["*"]}
        onNavigate={onPageNavigate}
      />

    </div>
  );
};
