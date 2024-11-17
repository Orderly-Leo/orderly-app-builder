import { Box, Button, Flex } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { Window } from "@tauri-apps/api/window";

interface PageToolbarProps {
  onCreateClick: () => void;
}

export const PageToolbar = ({ onCreateClick }: PageToolbarProps) => {
  const handleOpenWindow = () => {
    const appWindow = new Window("tauri", {
      // url: "https://tauri.app",
      title: "Tauri",
      width: 800,
      height: 600,
    });

    appWindow.once("tauri://created", function () {
      // window successfully created
      console.log("window successfully created");
    });
    appWindow.once("tauri://error", function (e) {
      // an error happened creating the window
      console.error("an error happened creating the window", e);
    });
  };

  return (
    <Flex p="2" className="border-b border-gray-200">
      <Box flexGrow="1">Pages</Box>
      <Box>
        <Button size="1" variant="outline" onClick={onCreateClick}>
          <Plus size={14} />
          Create
        </Button>
        <Button size="1" variant="outline" onClick={handleOpenWindow} ml="2">
          Create new window
        </Button>
      </Box>
    </Flex>
  );
};
