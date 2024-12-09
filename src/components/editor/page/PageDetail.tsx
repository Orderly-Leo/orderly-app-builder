import { useAtomValue, useSetAtom } from "jotai";
import { currentPageAtom, currentPagePathAtom } from "./pages.atom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PageProps } from "./pageProps";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const PageDetail = () => {
  const currentPage = useAtomValue(currentPageAtom);
  const setCurrentPagePath = useSetAtom(currentPagePathAtom);
  const location = useLocation();

  useEffect(() => {
    if (currentPage) return;

    const searchParams = new URLSearchParams(
      decodeURIComponent(location.search)
    );
    const path = searchParams.get("path");
    // console.log("path", path);
    setCurrentPagePath(path);
  }, [currentPage, location.search]);

  if (!currentPage) return null;

  return (
    <div className="flex h-full bg-gray-100">
      <div className="w-1/3 px-8 py-10">
        <PagePreview />
      </div>
      <div className="flex-1 bg-white">
        <PageProps
          propTypes={currentPage.component.propTypes}
          props={currentPage.component.props}
        />
      </div>
    </div>
  );
};

export const PagePreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Preview</CardTitle>
      </CardHeader>
    </Card>
  );
};
