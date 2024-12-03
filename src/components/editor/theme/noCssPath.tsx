import { FileWarning } from "lucide-react";
import { Link } from "react-router-dom";

export const NoCssPath = () => {
  return (
    <div className="flex flex-col items-center gap-2 h-full justify-center">
      <FileWarning className="h-20 w-20 stroke-slate-400" />
      <div className="text-sm text-gray-400 flex flex-col items-center">
        <div>Can't found the CSS file</div>
        <div>
          please check the path in <Link to={"/settings"}>settings</Link>
        </div>
      </div>
    </div>
  );
};
