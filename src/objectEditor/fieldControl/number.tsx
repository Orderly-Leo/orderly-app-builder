import { Input } from "@/components/ui/input";
import { FC } from "react";

export const NumberControl: FC<{
  value: number;
  onChange: (value: number) => void;
}> = (props) => {
  const { value, onChange } = props;
  return (
    <Input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  );
};
