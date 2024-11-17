import { Button, Flex } from "@radix-ui/themes";
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
    <Flex align="center" p="2" className="border-b border-[#333333]">
      <Button variant="ghost" onClick={onToggleLeft}>
        {showLeft ? <EyeOpenIcon /> : <EyeNoneIcon />}
      </Button>
      <Button variant="ghost" onClick={onToggleRight}>
        {showRight ? <EyeOpenIcon /> : <EyeNoneIcon />}
      </Button>
    </Flex>
  );
};
