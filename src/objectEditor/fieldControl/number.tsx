import { TextField } from "@radix-ui/themes";
import { FC } from "react";

export const NumberControl: FC<{
  value: number;
  onChange: (value: number) => void;
}> = (props) => {
  const { value, onChange } = props;
  return (
    <TextField.Root
      type="number"
      value={value}
      size={"1"}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
};
