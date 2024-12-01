import { useEffect, useRef } from "react";
import { EditorLayout } from "./editor/EditorLayout";
import { EditorService } from "@/service/editor";

export const Editor = () => {
  const editorServiceInstance = useRef<EditorService | null>(null);
  useEffect(() => {
    if (!editorServiceInstance.current) {
      editorServiceInstance.current = new EditorService(
        "/Users/leo/project/test",
        "test",
        {
          frameworkType: "nextjs",
        }
      );
    }
    // nextjs.loadCSS();
  }, []);
  return (
    <div className="h-screen">
      <EditorLayout />
      {/* <EditorSidebar /> */}
    </div>
  );
};
