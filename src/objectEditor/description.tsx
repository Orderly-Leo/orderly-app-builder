import { FC, ReactElement } from "react";
import { Text } from "@radix-ui/themes";

type DescriptionProps = {
  description?: ReactElement;
};

export const Description: FC<DescriptionProps> = (props) => {
  if (!props.description) return null;
  return (
    <Text as="div" size="1" color="gray">
      {props.description}
    </Text>
  );
};
