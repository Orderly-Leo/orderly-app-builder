import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { EditorToolbar } from "./editor/EditorToolbar";
import { EditorSidebar } from "./editor/EditorSidebar";
import { EditorPreview } from "./editor/EditorPreview";
import { useState } from "react";

export const Editor = () => {
  // const [showLeft, setShowLeft] = useState(true);
  // const [showRight, setShowRight] = useState(true);

  return (
    <div className="h-screen">
      <EditorSidebar />
    </div>
  );

  // return (
  //   <div className="flex flex-col h-screen">
  //     <EditorToolbar
  //       showLeft={showLeft}
  //       showRight={showRight}
  //       onToggleLeft={() => setShowLeft(!showLeft)}
  //       onToggleRight={() => setShowRight(!showRight)}
  //     />
  //     <PanelGroup direction="horizontal" className="flex-1">
  //       {showLeft && (
  //         <>
  //           <Panel defaultSize={20} minSize={15}>
  //             <EditorSidebar />
  //           </Panel>
  //           <PanelResizeHandle className="w-1 hover:bg-blue-500 transition-colors" />
  //         </>
  //       )}
  //       {showRight && (
  //         <Panel>
  //           <EditorPreview />
  //         </Panel>
  //       )}
  //     </PanelGroup>
  //   </div>
  // );
};
