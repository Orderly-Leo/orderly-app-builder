import { Select } from "@radix-ui/themes";
import { FC } from "react";

export const SelectControl: FC<{
  value: any;
  options: { label: string; value: any }[];
  onChange: (value: any) => void;
}> = (props) => {
  const { value, options, onChange } = props;
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger />
      <Select.Content>
        {options?.map((option) => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
