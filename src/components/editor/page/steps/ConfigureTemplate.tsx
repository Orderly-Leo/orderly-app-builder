import { PageComponent, PageConfig } from "../../../../types/page";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
} from "@/components/ui/select";
import { useAtomValue } from "jotai";
import { routesAtom } from "../pages.atom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ConfigureTemplateProps {
  template: PageComponent;
  config: Partial<PageConfig>;
  onChange: (config: Partial<PageConfig>) => void;
  onBack: () => void;
  onNext: (data: any) => void;
}

const formScheme = z.object({
  name: z.string().min(2),
  route: z.string().min(1),
});

export const ConfigureTemplate = ({
  template,
  config,
  onBack,
  onNext,
}: ConfigureTemplateProps) => {
  const routes = useAtomValue(routesAtom);

  const form = useForm<PageConfig>({
    defaultValues: {
      name: config.name || template.name || "",
      route: config.route || "",
      parentRoute: config.parentRoute || "/",
      inheritLayout: config.inheritLayout || true,
    },
    resolver: zodResolver(formScheme),
  });

  const onSubmit = (data: PageConfig) => {
    console.log(data);
    onNext(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex pb-14">
          {/* 左侧预览区域 */}
          <div className="w-1/3 p-4">
            <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              {template.thumbnail ? (
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800"></div>
              )}
            </div>
          </div>

          {/* 右侧配置表单 */}
          <div className="flex-1 p-4 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Page Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter page name" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="route"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Route</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        {/* set parent route */}
                        <div className="w-2/5">
                          <Select
                            onValueChange={(value) => {
                              form.setValue("parentRoute", value);
                            }}
                            defaultValue={form.getValues("parentRoute")}
                            autoComplete="off"
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a route" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="/">/</SelectItem>
                              {routes.map((route) => (
                                <SelectItem key={route} value={route}>
                                  {route}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {form.watch("parentRoute") !== "/" && (
                          <div className="text-gray-500">/</div>
                        )}
                        <Input
                          placeholder="Please enter route"
                          {...field}
                          autoCapitalize="off"
                          autoCorrect="off"
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="inheritLayout"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none text-xs">
                      <FormLabel>Inherit Parent Layout</FormLabel>
                    </div>
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="fixed left-0 bottom-0 right-0 bg-white dark:bg-gray-900">
            <Separator />
            <div className="flex justify-between gap-3 p-3">
              <Button variant="ghost" onClick={onBack}>
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
