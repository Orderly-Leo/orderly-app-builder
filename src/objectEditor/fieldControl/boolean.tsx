import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { FormDescription } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FC } from "react";
import { Control } from "react-hook-form";
export const BooleanControl: FC<{
  value: boolean;
  name: string;
  control: Control<any>;
}> = (props) => {
  const { name, control } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between">
          <div className="space-y-0.5">
            <FormLabel>Security emails</FormLabel>
            <FormDescription>
              Receive emails about your account security.
            </FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
