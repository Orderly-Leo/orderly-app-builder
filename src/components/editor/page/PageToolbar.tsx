import { useAtomValue } from "jotai";
import { Plus, Trash2 } from "lucide-react";
import { currentPageAtom } from "./pages.atom";

interface PageToolbarProps {
  onCreateClick: () => void;
}

export const PageToolbar = ({ onCreateClick }: PageToolbarProps) => {
  const currentPage = useAtomValue(currentPageAtom);
  // const handleOpenWindow = () => {
  //   const appWindow = new Window("tauri", {
  //     // url: "https://tauri.app",
  //     title: "Tauri",
  //     width: 800,
  //     height: 600,
  //   });

  //   appWindow.once("tauri://created", function () {
  //     // window successfully created
  //     console.log("window successfully created");
  //   });
  //   appWindow.once("tauri://error", function (e) {
  //     // an error happened creating the window
  //     console.error("an error happened creating the window", e);
  //   });
  // };

  return (
    <div className="flex px-4 py-2 justify-between text-xs sticky top-[32px]">
      {/* <div className="flex-1">Pages</div> */}
      {/* <div> */}
      <button className="flex items-center gap-1" onClick={onCreateClick}>
        <Plus size={14} />
        Create
      </button>
      {currentPage && (
        <button className="flex items-center gap-1">
          <Trash2 size={14} />
          Delete
        </button>
      )}

      {/* <Button size="1" variant="outline" onClick={handleOpenWindow} ml="2">
          Create new window
        </Button> */}
      {/* </div> */}
    </div>
  );
};
