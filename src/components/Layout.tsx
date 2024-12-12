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
    <div className="fixed bottom-0 right-0 text-white">
      <Link to={"/bootstrap"}>Bootstrap</Link>
      <Link to={"/editor"}>Editor</Link>
    </div>
  );
};
