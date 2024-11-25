import { Box, Flex } from "@radix-ui/themes";
import { PageList } from "../page/pageList";
import { PageToolbar } from "../page/PageToolbar";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PageProps } from "../page/pageProps";

export const PagesPanel = () => {
  const navigate = useNavigate();
  const { pageId } = useParams();

  // return <PageList />;

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <PageList />
      </div>
      <div>
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
