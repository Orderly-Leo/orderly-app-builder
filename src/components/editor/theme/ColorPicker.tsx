import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  label: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange, label }: ColorPickerProps) => {
  console.log(color);
  return (
    <div className="flex gap-2 items-center">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full border-0 p-0 m-0"
      />

      <div className="flex flex-col gap-1">
        <div className="text-gray-500">{label}</div>
        <Input
          className="flex-1"
          value={color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
        />
      </div>
    </div>
  );
};
