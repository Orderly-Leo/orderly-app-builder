import { Box, TextField, Flex } from "@radix-ui/themes";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <Flex gap="2" align="center">
      <TextField.Root
        className="flex-1"
        value={color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      ></TextField.Root>
      <Box asChild className="w-8 h-8 rounded cursor-pointer overflow-hidden">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full border-0 p-0 m-0"
        />
      </Box>
    </Flex>
  );
};
