import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex-1 h-full">
      <Outlet />
    </div>
  );
};
