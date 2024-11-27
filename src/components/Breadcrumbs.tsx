import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbNameMap: Record<string, string> = {
  "/editor": "Editor",
  "/editor/pages": "Pages",
  "/editor/theme": "Theme",
  "/editor/components": "Components",
  "/editor/config": "Config",
  "/editor/settings": "Settings",
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: breadcrumbNameMap[url] || pathSnippets[index],
      url,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {extraBreadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={item.key}>
            {index < extraBreadcrumbItems.length - 1 ? (
              <>
                <BreadcrumbLink asChild>
                  <Link to={item.url}>{item.title}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <span>{item.title}</span>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
