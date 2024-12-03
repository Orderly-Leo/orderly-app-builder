import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FC } from "react";
import { useOutletContext } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2, { message: "Theme name is required." }),
  description: z.string().optional(),
  isDefault: z.boolean().optional(),
});

export const CreateThemeStep1: FC<{}> = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      isDefault: false,
    },
  });

  const { onCreate } = useOutletContext<{ onCreate: (data: any) => void }>();

  const onSubmit = (data: any) => {
    onCreate(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Theme Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Theme Description" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      name="isDefault"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="space-y-0 leading-none">
                    Set as Default Theme
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end p-4">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
