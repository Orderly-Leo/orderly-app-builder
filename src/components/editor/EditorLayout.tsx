import { AppSidebar } from "@/components/editor/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

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
        {/* <header className="sticky top-0 z-20 flex shrink-0 items-center border-b bg-background/80 backdrop-blur-md px-4 py-1">
          <div className="flex items-center gap-2 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumbs />
          </div>
          <MainToolbar />
        </header> */}
        <div className="h-full relative overflow-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// const MainToolbar = () => {
//   const location = useLocation();
//   const path = location.pathname;
//   // const matches = useMatches();

//   if (path.startsWith("/themes")) {
//     return (
//       <div className="text-sm">
//         <Button size="sm" variant="outline" asChild>
//           <Link to="/create/theme">
//             <Plus className="mr-1 h-4 w-4" />
//             Create new theme
//           </Link>
//         </Button>
//       </div>
//     );
//   }

//   if (path.startsWith("/pages")) {
//     return (
//       <div className="text-sm">
//         <Button size="sm" variant="outline" asChild>
//           <Link to="/create/page">
//             <Plus className="mr-1 h-4 w-4" />
//             Create new page
//           </Link>
//         </Button>
//       </div>
//     );
//   }

//   // Default or other routes - return empty toolbar
//   return null;
// };
