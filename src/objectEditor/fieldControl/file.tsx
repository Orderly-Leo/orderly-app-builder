import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus } from "lucide-react";

import { open } from "@tauri-apps/plugin-dialog";
import { FormDescription, FormMessage } from "@/components/ui/form";
import { FormControl, FormLabel } from "@/components/ui/form";
import { ControlProps } from "./types";
import { FormField, FormItem } from "@/components/ui/form";

type FileControlProps = {
  fileType?: "image" | "video" | "audio" | "file";
} & ControlProps;

export const FileControl: FC<FileControlProps> = (props) => {
  const { name, control, label } = props;

  const handleClick = async (onChange: (value: string) => void) => {
    const result = await open({
      //   directory: true,
      multiple: false,
      title: "Your theme css file",
    });

    if (result) {
      // field.onChange(result);
      onChange(result);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-2 relative">
              <Input {...field} />
              <Button
                type="button"
                variant={"ghost"}
                className="absolute right-1 h-6 px-2"
                onMouseDown={(event) => {
                  event.preventDefault();

                  handleClick(field.onChange);
                }}
              >
                <FilePlus />
              </Button>
            </div>
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
