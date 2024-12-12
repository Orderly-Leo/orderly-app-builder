import { Play } from "lucide-react";

export const ControlBar = () => {
  return (
    <div
      data-tauri-drag-region
      className="flex items-center justify-center bg-gray-200 sticky top-0 tauri-drag-region z-50 py-1"
    >
      <div className="border border-gray-400/50 bg-gray-300 rounded-md h-[24px] px-2 min-w-80 flex items-center justify-between">
        <div className="text-xs text-gray-500">Test project</div>
        <button>
          <Play size={14} className="stroke-gray-500" />
        </button>
      </div>
    </div>
  );
};
