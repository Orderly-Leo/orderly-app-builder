import { FormField } from "@/components/ui/form";
import { FormControl, FormLabel } from "@/components/ui/form";
import { FormDescription, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { ControlProps } from "./types";

type StringControlProps = {} & ControlProps;

export const StringControl: FC<StringControlProps> = (props,) => {
  const { name, control ,label} = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
