import { useEffect } from "react";
import { EditorLayout } from "./editor/EditorLayout";

export const Editor = () => {
  useEffect(() => {
    const nextjs = new NextjsService(
      "C:\\Users\\kunal\\Desktop\\test",
      "test",
      {
        css: "src/globals.css",
      }
    );
    nextjs.loadCSS();
  }, []);
  return (
    <div className="h-screen">
      <EditorLayout />
      {/* <EditorSidebar /> */}
    </div>
  );
};
