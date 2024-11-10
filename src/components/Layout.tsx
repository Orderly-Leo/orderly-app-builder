import { Box } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <Box className="flex-1 h-full">
      <Outlet />
    </Box>
  );
};
