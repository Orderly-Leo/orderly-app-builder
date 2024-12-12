import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, FolderPlus } from "lucide-react";
import { projectManager } from "@/service/projectManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProjectPathStepProps {
  onNext: (data: { projectPath: string }) => void;
  onBack: () => void;
  formData: { projectPath: string; projectName: string; npm: string };
}

const formSchema = z.object({
  projectPath: z.string().min(1, { message: "Project path is required" }),
  projectName: z.string().min(1, { message: "Project name is required" }),
  npm: z.string().min(1, { message: "NPM is required" }),
});

export const ProjectPathStep: React.FC<ProjectPathStepProps> = ({
  onNext,
  onBack,
  formData,
}) => {
  const form = useForm({
    defaultValues: {
      projectPath: formData.projectPath || "",
      projectName: formData.projectName || "",
      npm: formData.npm || "npm",
    },
    resolver: zodResolver(formSchema),
  });

  const onOpenDialog = async () => {
    const file = await projectManager.selectPath();
    if (file) {
      // setProjectPath(file);
      form.setValue("projectPath", file, {
        shouldValidate: true,
      });
    }
  };

  const handleNext = (values: z.infer<typeof formSchema>) => {
    onNext(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleNext)} className="space-y-2">
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your project Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectPath"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input {...field} placeholder="Enter your project Name" />
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={onOpenDialog}
                  >
                    <FolderPlus />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="npm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Please choose your npm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"npm"}>npm</SelectItem>
                    <SelectItem value="yarn">yarn</SelectItem>
                    <SelectItem value="pnpm">pnpm</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between pt-5">
          <Button variant={"ghost"} onClick={onBack}>
            Back
          </Button>
          <Button
            type="submit"
            // disabled={!projectPath.trim() || !projectName.trim()}
            // onClick={handleNext}
          >
            Create Project
            <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
};
