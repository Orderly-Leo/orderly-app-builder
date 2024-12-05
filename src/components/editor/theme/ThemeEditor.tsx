import { useAtomValue } from "jotai";
import { useThemeEditor } from "./useThemeEditor";
import { currentThemeAtom } from "./theme.atom";
import { Control, Controller, useForm } from "react-hook-form";
import { ColorPicker } from "./ColorPicker";
import { FC, PropsWithChildren, useEffect } from "react";
import { Input } from "@/components/ui/input";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { convertHexToColor, updateThemeToLocalStorage } from "@/service/utils";
// import { useForm } from "react-hook-form";

export const ThemeEditor = () => {
  // const form = useForm();
  const { coverToCSS } = useThemeEditor();
  const currentTheme = useAtomValue(currentThemeAtom);

  const onThemeChange = async (theme: Record<string, any>) => {
    const css = convertHexToColor(theme);
    const cssStr = await coverToCSS(css);
    console.log(theme, css, cssStr);

    if (currentTheme) {
      updateThemeToLocalStorage({
        ...currentTheme,
        theme,
      });
    }
  };

  if (!currentTheme?.theme) return null;

  return (
    <div className="py-5">
      <ThemeForm theme={currentTheme?.theme} onChange={onThemeChange} />
    </div>
  );
};

const ThemeForm = (props: {
  theme: Record<string, string>;
  onChange: (theme: Record<string, any>) => void;
}) => {
  const form = useForm({
    defaultValues: props.theme,
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      // console.log(value, name, type);

      props.onChange(value);
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <Form {...form}>
      <form>
        <div className="text-xl font-medium mb-2 px-4">Colors</div>
        <div className="flex flex-col text-sm">
          <ColorRow name="Primary">
            <div className="grid md:grid-cols-3 lg:md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2">
              <ColorItem
                control={form.control}
                name="--oui-color-primary-darken"
              />

              <ColorItem control={form.control} name="--oui-color-primary" />
              <ColorItem
                control={form.control}
                name="--oui-color-primary-light"
              />
              <ColorItem
                control={form.control}
                name="--oui-color-primary-contrast"
              />
            </div>
          </ColorRow>
          <ColorRow name="Success">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2">
              <ColorItem
                control={form.control}
                name="--oui-color-success-darken"
              />

              <ColorItem control={form.control} name="--oui-color-success" />
              <ColorItem
                control={form.control}
                name="--oui-color-success-light"
              />
              <ColorItem
                control={form.control}
                name="--oui-color-success-contrast"
              />
            </div>
          </ColorRow>
          <ColorRow name="Danger">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2">
              <ColorItem
                control={form.control}
                name="--oui-color-danger-darken"
              />

              <ColorItem control={form.control} name="--oui-color-danger" />
              <ColorItem
                control={form.control}
                name="--oui-color-danger-light"
              />
              <ColorItem
                control={form.control}
                name="--oui-color-danger-contrast"
              />
            </div>
          </ColorRow>
          <ColorRow name="Warning">
            <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2">
              <ColorItem
                control={form.control}
                name="--oui-color-warning-darken"
              />

              <ColorItem control={form.control} name="--oui-color-warning" />
              <ColorItem
                control={form.control}
                name="--oui-color-warning-light"
              />
              <ColorItem
                control={form.control}
                name="--oui-color-warning-contrast"
              />
            </div>
          </ColorRow>
          <ColorRow name="Trading - Profit">
            <div className="grid grid-cols-3 gap-2">
              <ColorItem
                control={form.control}
                name="--oui-color-trading-profit"
              />

              <ColorItem
                control={form.control}
                name="--oui-color-trading-profit-contrast"
              />
            </div>
          </ColorRow>
          <ColorRow name="Trading - Loss">
            <div className="grid grid-cols-3 gap-2">
              <ColorItem
                control={form.control}
                name="--oui-color-trading-loss"
              />

              <ColorItem
                control={form.control}
                name="--oui-color-trading-loss-contrast"
              />
            </div>
          </ColorRow>
          <ColorRow name="Base">
            <div className="grid grid-cols-3">
              <ColorItem control={form.control} name="--oui-color-base-1" />
              <ColorItem control={form.control} name="--oui-color-base-2" />
              <ColorItem control={form.control} name="--oui-color-base-3" />
              <ColorItem control={form.control} name="--oui-color-base-4" />
              <ColorItem control={form.control} name="--oui-color-base-5" />
              <ColorItem control={form.control} name="--oui-color-base-6" />
              <ColorItem control={form.control} name="--oui-color-base-7" />
              <ColorItem control={form.control} name="--oui-color-base-8" />
              <ColorItem control={form.control} name="--oui-color-base-9" />
              <ColorItem control={form.control} name="--oui-color-base-10" />
            </div>
          </ColorRow>
          <GradientRow
            name="Gradient Brand"
            start={form.watch("--oui-gradient-brand-start")}
            end={form.watch("--oui-gradient-brand-end")}
          >
            <div className="flex justify-between">
              <ColorItem
                control={form.control}
                name="--oui-gradient-brand-start"
              />
              {/* <Input {...form.register("--oui-gradient-brand-stop-start")} />
            <Input {...form.register("--oui-gradient-brand-stop-end")} /> */}
              <ColorItem
                control={form.control}
                name="--oui-gradient-brand-end"
                direction="right"
              />
            </div>
          </GradientRow>
          <GradientRow
            name="Gradient Primary"
            start={form.watch("--oui-gradient-primary-start")}
            end={form.watch("--oui-gradient-primary-end")}
          >
            <div className="flex justify-between">
              <ColorItem
                control={form.control}
                name="--oui-gradient-primary-start"
              />
              <ColorItem
                control={form.control}
                name="--oui-gradient-primary-end"
                direction="right"
              />
            </div>
          </GradientRow>
          <GradientRow
            name="Gradient Success"
            start={form.watch("--oui-gradient-success-start")}
            end={form.watch("--oui-gradient-success-end")}
          >
            <div className="flex justify-between">
              <ColorItem
                control={form.control}
                name="--oui-gradient-success-start"
              />
              <ColorItem
                control={form.control}
                name="--oui-gradient-success-end"
                direction="right"
              />
            </div>
          </GradientRow>
          <GradientRow
            name="Gradient Warning"
            start={form.watch("--oui-gradient-warning-start")}
            end={form.watch("--oui-gradient-warning-end")}
          >
            <div className="flex justify-between">
              <ColorItem
                control={form.control}
                name="--oui-gradient-warning-start"
              />
              <ColorItem
                control={form.control}
                name="--oui-gradient-warning-end"
                direction="right"
              />
            </div>
          </GradientRow>
          <GradientRow
            name="Gradient Danger"
            start={form.watch("--oui-gradient-danger-start")}
            end={form.watch("--oui-gradient-danger-end")}
          >
            <div className="flex justify-between">
              <ColorItem
                control={form.control}
                name="--oui-gradient-danger-start"
              />

              <ColorItem
                control={form.control}
                name="--oui-gradient-danger-end"
                direction="right"
              />
            </div>
          </GradientRow>
        </div>
        <div className="text-xl font-medium mb-2 mt-5 px-4">Spacing</div>
        <div className="grid grid-cols-3 gap-4 px-4">
          <FormField
            control={form.control}
            name="--oui-spacing-xs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>--oui-spacing-xs</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="--oui-spacing-sm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>--oui-spacing-sm</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="--oui-spacing-md"
            render={({ field }) => (
              <FormItem>
                <FormLabel>--oui-spacing-md</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="--oui-spacing-lg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>--oui-spacing-lg</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="--oui-spacing-xl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>--oui-spacing-xl</FormLabel>
                <Input {...field} />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

const ColorItem = (props: {
  name: string;
  control: Control;
  direction?: "left" | "right";
}) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <ColorPicker
          color={field.value}
          onChange={field.onChange}
          label={props.name}
          direction={props.direction}
        />
      )}
    />
  );
};

const ColorRow: FC<PropsWithChildren<{ name: string }>> = (props) => {
  return (
    <div className="odd:bg-white even:bg-gray-50 px-5 py-3">
      <div className="text-lg font-medium mb-2">{props.name}</div>
      {props.children}
    </div>
  );
};

const GradientRow: FC<
  PropsWithChildren<{ name: string; start: string; end: string }>
> = (props) => {
  return (
    <div className="odd:bg-white even:bg-gray-50 px-5 py-3">
      <div className="text-lg font-medium mb-2">{props.name}</div>
      <SliderPrimitive.Root
        className={cn(
          "relative flex w-full touch-none select-none items-center"
        )}
        defaultValue={[0, 100]}
      >
        <SliderPrimitive.Track
          className="relative h-5 w-full grow overflow-hidden rounded-full bg-primary/20"
          style={{
            background: `linear-gradient(to right, ${props.start}, ${props.end})`,
          }}
        >
          <SliderPrimitive.Range className="absolute h-full bg-transparent" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
      {/* <div
        className="h-5 w-full"
        style={{
          background: `linear-gradient(to right, ${props.start}, ${props.end})`,
        }}
      ></div> */}
      {props.children}
    </div>
  );
};
