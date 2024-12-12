import { FC, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderSearch2 } from "lucide-react";

import { open } from "@tauri-apps/plugin-dialog";
import { FormDescription, FormMessage } from "@/components/ui/form";
import { FormControl, FormLabel } from "@/components/ui/form";
import { ControlProps } from "./types";
import { FormField, FormItem } from "@/components/ui/form";

type PathControlProps = {} & ControlProps;

export const PathControl: FC<PathControlProps> = (props) => {
  const { name, control, label, transformForField } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = async (onChange: (value: string) => void) => {
    let result = await open({
      //   directory: true,
      multiple: false,
      title: "Your theme css file",
    });

    if (typeof transformForField?.input === "function") {
      result = transformForField.input(result);
    }

    if (result) {
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
              <Input {...field} ref={inputRef} />
              <Button
                type="button"
                variant={"ghost"}
                className="absolute right-1 h-6 px-2"
                onMouseDown={(event) => {
                  event.preventDefault();
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }

                  handleClick(field.onChange);
                }}
              >
                <FolderSearch2 />
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
