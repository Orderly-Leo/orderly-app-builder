import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { ChangeHandler } from "react-hook-form";

type StringControlProps = {
  value: string;
  name: string;
  onChange?: ChangeHandler;
};

export const StringControl = forwardRef<HTMLInputElement, StringControlProps>(
  (props, ref) => {
    const { onChange, name } = props;

    return (
      <Input autoComplete="off" name={name} onChange={onChange} ref={ref} />
    );
  }
);
