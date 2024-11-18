import { Flex } from "@radix-ui/themes";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex-1 h-full">
      <Outlet />
      <TestBar />
    </div>
  );
};

const TestBar = () => {
  return (
    <Flex className="fixed bottom-0 right-0">
      <Link to={"/bootstrap"}>Bootstrap</Link>
    </Flex>
  );
};
