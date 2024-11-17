import { Switch } from "@radix-ui/themes";
import { FC } from "react";

export const BooleanControl: FC<{
  value: boolean;
  onChange: (value: boolean) => void;
}> = ({ value, onChange }) => {
  return <Switch checked={value} onCheckedChange={onChange} />;
};
