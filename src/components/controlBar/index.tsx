import { Play } from "lucide-react";

export const ControlBar = () => {
  return (
    <div className="flex items-center justify-center p-2 bg-gray-200">
      <div className="border border-gray-400 bg-gray-100 rounded-md py-1 px-2 min-w-80 flex items-center justify-between">
        <div className="text-xs">Test project</div>
        <button>
          <Play size={16} />
        </button>
      </div>
    </div>
  );
};
