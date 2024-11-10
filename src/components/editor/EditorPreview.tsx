import { NonIdealState } from "@blueprintjs/core";
import { PreviewToolbar } from "./preview/PreviewToolbar";
import { useState, useRef } from "react";

export const EditorPreview = () => {
  const [currentUrl, setCurrentUrl] = useState("/preview");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 示例 URL 列表，实际应从项目配置中获取
  const urls = ["/preview", "/preview/about", "/preview/contact"];

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
      <PreviewToolbar
        currentUrl={currentUrl}
        urls={urls}
        onUrlChange={setCurrentUrl}
        onRefresh={handleRefresh}
      />

      {currentUrl ? (
        <iframe
          ref={iframeRef}
          src={currentUrl}
          className="w-full h-full border-none bg-white"
          title="Preview"
        />
      ) : (
        <NonIdealState
          icon="document"
          title="No Preview Available"
          description="Select a page to preview"
        />
      )}
    </div>
  );
};
