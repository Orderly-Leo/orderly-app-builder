import { AppWindow, Component, Palette, Settings } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export const EditorSidebar = () => {
  const navItems = [
    { to: "pages", icon: <AppWindow />, label: "Pages" },
    { to: "theme", icon: <Palette />, label: "Theme" },
    { to: "components", icon: <Component />, label: "Components" },
    { to: "settings", icon: <Settings />, label: "Settings" },
  ];

  return (
    <div className="h-full flex">
      <nav className="w-14 border-r border-gray-200">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center justify-center h-14 border-l-2 hover:bg-gray-100 
              ${
                isActive
                  ? "border-blue-500 text-blue-500 bg-blue-50"
                  : "border-transparent text-gray-600"
              }`
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
