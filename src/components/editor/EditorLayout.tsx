import { AppSidebar } from "@/components/editor/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function EditorLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "160px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-md p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs />
        </header>
        <div className="flex flex-1 flex-col gap-4">
          <Outlet />
          {/* {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="aspect-video h-12 w-full rounded-lg bg-muted/50"
            />
          ))} */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
