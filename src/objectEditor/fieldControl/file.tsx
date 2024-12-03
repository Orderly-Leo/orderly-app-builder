import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FolderSearch2 } from "lucide-react";
import { FC } from "react";
import { useController } from "react-hook-form";

import { open } from "@tauri-apps/plugin-dialog";

export const FileControl: FC<{
  name: string;
}> = ({ name }) => {
  const {
    field,
    // fieldState: { invalid, isTouched, isDirty },
    // formState: { touchedFields, dirtyFields }
  } = useController({
    name,
    // control,
    // rules: { required: true },
  });

  const handleClick = async () => {
    const result = await open({
      //   directory: true,
      multiple: false,
      title: "Your theme css file",
    });

    if (result) {
      field.onChange(result);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event.target.value);
  };

  return (
    <div className="flex items-center gap-2 relative">
      <Input {...field} onChange={onChange} />
      <Button
        type="button"
        variant={"ghost"}
        className="absolute right-1 h-6 px-2"
        onMouseDown={(event) => {
          //   event.stopPropagation();
          event.preventDefault();

          handleClick();
        }}
      >
        <FolderSearch2 />
      </Button>
    </div>
  );
};
