import { AppSidebar } from "@/components/editor/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useMatches,
  useNavigation,
} from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

export function EditorLayout() {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={
        {
          "--sidebar-width": "180px",
          // "--sidebar-accent": "#000",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-20 flex shrink-0 items-center border-b bg-background/80 backdrop-blur-md px-4 py-2">
          <div className="flex items-center gap-2 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          <MainToolbar />
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

const MainToolbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const matches = useMatches();

  console.log(matches);

  if (path.startsWith("/themes")) {
    return (
      <div className="text-sm">
        <Button size="sm" variant="outline" asChild>
          <Link to="/create/theme">
            <Plus className="mr-1 h-4 w-4" />
            Create new theme
          </Link>
        </Button>
      </div>
    );
  }

  if (path.startsWith("/pages")) {
    return (
      <div className="text-sm">
        <Button size="sm" variant="outline" asChild>
          <Link to="/create/page">
            <Plus className="mr-1 h-4 w-4" />
            Create new page
          </Link>
        </Button>
      </div>
    );
  }

  // Default or other routes - return empty toolbar
  return null;
};
