import { Plus } from "lucide-react";
import { Window } from "@tauri-apps/api/window";

interface PageToolbarProps {
  onCreateClick: () => void;
}

export const PageToolbar = ({ onCreateClick }: PageToolbarProps) => {
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
    <div className="flex px-4 ">
      {/* <div className="flex-1">Pages</div> */}
      <div>
        <button
          className="flex items-center gap-1 text-sm"
          onClick={onCreateClick}
        >
          <Plus size={14} />
          Create
        </button>
        {/* <Button size="1" variant="outline" onClick={handleOpenWindow} ml="2">
          Create new window
        </Button> */}
      </div>
    </div>
  );
};
