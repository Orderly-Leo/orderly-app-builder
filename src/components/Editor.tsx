import { Box } from "@radix-ui/themes";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { EditorToolbar } from "./editor/EditorToolbar";
import { EditorSidebar } from "./editor/EditorSidebar";
import { EditorPreview } from "./editor/EditorPreview";
import { useState } from "react";

export const Editor = () => {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  return (
    <Box className="flex flex-col h-screen">
      <EditorToolbar
        showLeft={showLeft}
        showRight={showRight}
        onToggleLeft={() => setShowLeft(!showLeft)}
        onToggleRight={() => setShowRight(!showRight)}
      />
      <PanelGroup direction="horizontal" className="flex-1">
        {showLeft && (
          <Panel defaultSize={20} minSize={15}>
            <EditorSidebar />
          </Panel>
        )}
        {showLeft && showRight && (
          <PanelResizeHandle className="w-1 hover:bg-blue-500 transition-colors" />
        )}
        {showRight && (
          <Panel>
            <EditorPreview />
          </Panel>
        )}
      </PanelGroup>
    </Box>
  );
};
