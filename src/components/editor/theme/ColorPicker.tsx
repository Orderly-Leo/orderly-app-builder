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
      className={cn("relative", direction === "right" && "flex-row-reverse")}
    >
      <div
        className={cn(
          "w-7 h-full absolute top-0",
          direction === "right" ? "right-0" : "left-0"
        )}
      >
        <input
          type="color"
          value={props.color}
          onChange={(e) => props.onChange(e.target.value)}
          className="border border-black p-0 m-0 h-full w-full"
        />
      </div>

      <div
        className={cn(
          "flex flex-col gap-1",
          direction === "right" && "items-end"
        )}
      >
        {/* <div className="text-gray-500">{props.label}</div> */}
        <Input
          className={cn(
            "w-full text-xs pl-8 text-gray-600",
            direction === "right" && "text-right pl-0 pr-8"
          )}
          value={props.color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.onChange(e.target.value)
          }
        />
      </div>
    </div>
  );
};
