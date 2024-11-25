import { AppWindow, Component, Palette, Settings } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export const EditorSidebar = () => {
  const navItems = [
    { to: "pages", icon: <AppWindow />, label: "Pages" },
    { to: "theme", icon: <Palette />, label: "Theme" },
    { to: "components", icon: <Component />, label: "Components" },
    { to: "config", icon: <Component />, label: "Config" },
    { to: "settings", icon: <Settings />, label: "Settings" },
  ];

  return (
    <div className="h-full flex">
      <nav className="w-14 border-r border-gray-200 h-full sticky top-0 bottom-0">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center justify-center h-14 border-l-2 hover:bg-gray-100
              ${isActive ? "font-bold" : ""}`
            }
            title={label}
          >
            {icon}
          </NavLink>
        ))}
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
