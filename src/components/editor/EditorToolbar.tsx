import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

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
    <div className="flex items-center p-2 border-b border-[#333333]">
      <button onClick={onToggleLeft}>
        {showLeft ? <EyeOpenIcon /> : <EyeNoneIcon />}
      </button>
      <button onClick={onToggleRight}>
        {showRight ? <EyeOpenIcon /> : <EyeNoneIcon />}
      </button>
    </div>
  );
};
