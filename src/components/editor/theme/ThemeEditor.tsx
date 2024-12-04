import { useAtomValue } from "jotai";
import { useThemeEditor } from "./useThemeEditor";
import { currentThemeAtom } from "./theme.atom";
import { Control, Controller, useForm } from "react-hook-form";
import { ColorPicker } from "./ColorPicker";
import { FC, PropsWithChildren } from "react";

// import { useForm } from "react-hook-form";

export const ThemeEditor = () => {
  // const form = useForm();
  useThemeEditor();
  const currentTheme = useAtomValue(currentThemeAtom);

  console.log(currentTheme);

  if (!currentTheme?.theme) return null;

  return (
    <div className="py-5">
      <ThemeForm theme={currentTheme?.theme} />
    </div>
  );
};

const ThemeForm = (props: { theme: Record<string, string> }) => {
  const form = useForm({
    defaultValues: props.theme,
  });

  return (
    <form>
      <div className="flex flex-col text-sm">
        <ColorRow name="Primary">
          <div className="grid grid-cols-4 gap-2">
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
          <div className="grid grid-cols-4 gap-2">
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
          <div className="grid grid-cols-4 gap-2">
            <ColorItem
              control={form.control}
              name="--oui-color-danger-darken"
            />

            <ColorItem control={form.control} name="--oui-color-danger" />
            <ColorItem control={form.control} name="--oui-color-danger-light" />
            <ColorItem
              control={form.control}
              name="--oui-color-danger-contrast"
            />
          </div>
        </ColorRow>
        <ColorRow name="Warning">
          <div className="grid grid-cols-4 gap-2">
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
            <ColorItem control={form.control} name="--oui-color-trading-loss" />

            <ColorItem
              control={form.control}
              name="--oui-color-trading-loss-contrast"
            />
          </div>
        </ColorRow>
        <ColorRow name="Base">
          <div className="grid grid-cols-3 gap-2">
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
      </div>
    </form>
  );
};

const ColorItem = (props: { name: string; control: Control }) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <ColorPicker
          color={field.value}
          onChange={field.onChange}
          label={props.name}
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

const GradientInput = () => {
  return <div>GradientInput</div>;
};
