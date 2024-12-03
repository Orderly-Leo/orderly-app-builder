import { Text, Flex } from "@radix-ui/themes";
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
    <Flex direction="column" className="h-full w-full">
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
        <Flex
          align="center"
          justify="center"
          direction="column"
          gap="2"
          className="h-full"
        >
          <Text size="5">No Preview Available</Text>
          <Text color="gray">Select a page to preview</Text>
        </Flex>
      )}
    </Flex>
  );
};
