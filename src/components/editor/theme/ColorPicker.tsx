import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Input
        className="flex-1"
        value={color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
      />
      <div className="w-8 h-8 rounded overflow-hidden">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full border-0 p-0 m-0"
        />
      </div>
    </div>
  );
};
