import { PreviewToolbar } from "./preview/PreviewToolbar";
import { useState, useRef } from "react";

export const EditorPreview = () => {
  const [currentUrl, setCurrentUrl] = useState("/preview");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const urls = ["/preview", "/preview/about", "/preview/contact"];

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
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
        <div className="flex h-full items-center justify-center flex-col gap-2">
          <div className="text-2xl font-bold">No Preview Available</div>
          <div className="text-sm text-gray-500">Select a page to preview</div>
        </div>
      )}
    </div>
  );
};
