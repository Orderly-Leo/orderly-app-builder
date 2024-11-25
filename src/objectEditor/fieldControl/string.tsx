import { Input } from "@/components/ui/input";
import { FC } from "react";

type StringControlProps = {
  value: string;
  onChange?: (value: string) => void;
};

export const StringControl: FC<StringControlProps> = (props) => {
  const { value, onChange } = props;
  return <Input value={value} onChange={(e) => onChange?.(e.target.value)} />;
};
