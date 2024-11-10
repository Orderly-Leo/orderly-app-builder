import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

interface EditorToolbarProps {
  showLeft: boolean;
  showRight: boolean;
  onToggleLeft: () => void;
  onToggleRight: () => void;
}

export const EditorToolbar = ({
  showLeft,
  showRight,
  onToggleLeft,
  onToggleRight,
}: EditorToolbarProps) => {
  return (
    <div className="h-12 border-b border-[#333333] px-2">
      <button
        onClick={onToggleLeft}
        className={`p-2 rounded hover:bg-[#333333] transition-colors ${
          !showLeft ? "text-gray-500" : "text-gray-300"
        }`}
      >
        {showLeft ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </button>
      <button
        onClick={onToggleRight}
        className={`p-2 rounded hover:bg-[#333333] transition-colors ${
          !showRight ? "text-gray-500" : "text-gray-300"
        }`}
      >
        {showRight ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
};
