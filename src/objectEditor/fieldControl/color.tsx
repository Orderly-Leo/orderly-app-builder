import { FormDescription, FormMessage } from "@/components/ui/form";

import { FormControl, FormItem } from "@/components/ui/form";

import { FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ControlProps } from "./types";

type ColorControlProps = {} & ControlProps;

export const ColorControl = (props: ColorControlProps) => {
  const { name, control, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input type="text" {...field} className="pl-9" />
              <div className="absolute h-full top-0 left-[2px] z-10">
                <input type="color" {...field} className="w-8 h-full" />
              </div>
            </div>
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
