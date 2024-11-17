import { TextField } from "@radix-ui/themes";
import { FC } from "react";

type StringControlProps = {
  value: string;
  onChange?: (value: string) => void;
};

export const StringControl: FC<StringControlProps> = (props) => {
  const { value, onChange } = props;
  return (
    <TextField.Root
      size={"1"}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
};
