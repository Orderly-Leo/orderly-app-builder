import { Box, Flex } from "@radix-ui/themes";
import { PageList } from "../page/pageList";
import { PageToolbar } from "../page/PageToolbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PageProps } from "../page/pageProps";
import { currentPagesAtom, pagesAtom, pathsAtom } from "../page/pages.atom";
import { useAtom } from "jotai";
import { useEffect } from "react";

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
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <PageToolbar
          onCreateClick={function (): void {
            // throw new Error("Function not implemented.");
            navigate("/create/page");
          }}
        />
        <div className="p-4">
          <PageList pages={pages} parentPath={params["*"]} />
        </div>
      </div>
      <div className="sticky top-[64px]">
        <PageProps />
      </div>
    </div>
  );

  // return (
  //   <Flex className="h-full">
  //     {/* 左侧列表区域 */}
  //     <Box className="w-60 border-r border-gray-200">
  //       <PageToolbar onCreateClick={() => navigate("/create")} />
  //       <Box className="overflow-auto h-[calc(100%-48px)]">
  //         <PageList
  //           selectedPageId={pageId}
  //           onPageSelect={(page) => navigate(`${page.id}`)}
  //         />
  //       </Box>
  //     </Box>

  //     {/* 右侧详情区域 */}
  //     <Box className="flex-1">
  //       <Outlet />
  //     </Box>
  //   </Flex>
  // );
};
