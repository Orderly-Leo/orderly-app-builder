import { Button, Icon } from "@blueprintjs/core";

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
    <div className="h-12 border-b border-[#333333] px-2 flex items-center">
      <Button
        minimal
        icon={showLeft ? "eye-open" : "eye-off"}
        onClick={onToggleLeft}
        className={!showLeft ? "text-gray-500" : "text-gray-300"}
      />
      <Button
        minimal
        icon={showRight ? "eye-open" : "eye-off"}
        onClick={onToggleRight}
        className={!showRight ? "text-gray-500" : "text-gray-300"}
      />
    </div>
  );
};
