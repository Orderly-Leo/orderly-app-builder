import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  label: string;
  direction?: "left" | "right";
  onChange: (color: string) => void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const direction = props.direction || "left";
  return (
    <div
      className={cn(
        "flex gap-2 items-center",
        direction === "right" && "flex-row-reverse"
      )}
    >
      <input
        type="color"
        value={props.color}
        onChange={(e) => props.onChange(e.target.value)}
        className="border border-black  p-0 m-0"
      />

      <div
        className={cn(
          "flex flex-col gap-1",
          direction === "right" && "items-end"
        )}
      >
        <div className="text-gray-500">{props.label}</div>
        <Input
          className={cn("flex-1", direction === "right" && "text-right")}
          value={props.color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(e.target.value)
          }
        />
      </div>
    </div>
  );
};
