"use client";

import * as React from "react";
import {
  ArchiveX,
  Command,
  FileSliders,
  Layers,
  Palette,
  Trash2,
} from "lucide-react";

// import { NavUser } from "@/components/nav-user";
// import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
// import { Switch } from "@/components/ui/switch"

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Pages",
      url: "/editor/pages",
      icon: Layers,
      isActive: true,
    },
    {
      title: "Themes",
      url: "/editor/themes",
      icon: Palette,
      isActive: false,
    },
    {
      title: "Settings",
      url: "/editor/config",
      icon: FileSliders,
      isActive: false,
    },
    // {
    //   title: "Junk",
    //   url: "#",
    //   icon: ArchiveX,
    //   isActive: false,
    // },
    // {
    //   title: "Trash",
    //   url: "#",
    //   icon: Trash2,
    //   isActive: false,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0]);

  // const { setOpen } = useSidebar();

  const navigate = useNavigate();

  //!w-[calc(var(--sidebar-width-icon)_+_1px)]

  return (
    <Sidebar collapsible="icon" className="overflow-hidden flex-row" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    // tooltip={{
                    //   children: item.title,
                    //   hidden: false,
                    // }}
                    onClick={() => {
                      setActiveItem(item);

                      // setOpen(true);

                      navigate(item.url);
                    }}
                    isActive={activeItem.title === item.title}
                    className="px-2.5 md:px-2"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
