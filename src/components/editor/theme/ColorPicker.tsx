import { InputGroup, Button, Popover } from "@blueprintjs/core";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  return (
    <div className="flex gap-2">
      <InputGroup
        value={color}
        onChange={(e) => onChange(e.target.value)}
        rightElement={
          <Popover
            content={
              <SketchPicker
                color={color}
                onChange={(color) => onChange(color.hex)}
              />
            }
          >
            <Button
              minimal
              style={{
                backgroundColor: color,
                width: 20,
                height: 20,
                margin: 7,
                borderRadius: 4,
              }}
            />
          </Popover>
        }
      />
    </div>
  );
};
