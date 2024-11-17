import { FC, useMemo } from "react";
import { useFieldControls } from "./editorProvider";
import { UndefinedControl } from "./fieldControl/undefined";
import { Box, Flex, Text } from "@radix-ui/themes";
import { view, lensPath } from "ramda";
import { Description } from "./description";

export const Field: FC<{
  name: string;
  label: string;
  path: string;
  // description: string;
  field: any;
}> = (props) => {
  const { label, field, path } = props;

  const { fieldControls, onFieldChange, argTypes } = useFieldControls();

  // const [object, setObject] = useAtom(objectAtom);

  const onChange = (value: any, key?: string) => {
    let keyPath = path;
    if (typeof key === "string") {
      keyPath = keyPath + "." + key;
    }
    onFieldChange?.(keyPath, value);
  };

  const argType = useMemo(() => {
    if (!argTypes) return undefined;
    const lens = lensPath(path.split("."));

    return view(lens, argTypes);
  }, [path]);

  let Control = fieldControls[field.type];

  if (!Control) {
    Control = UndefinedControl;
  }

  return (
    <Box>
      <Text as="label" size="2" weight="medium">
        {label}
      </Text>
      <Description description={argType?.description} />

      <Box mt="2">
        <Control {...field} onChange={onChange} />
      </Box>
    </Box>
  );
};
