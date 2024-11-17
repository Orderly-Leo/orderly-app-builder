import { FC } from "react";
import { ThemeConfig } from "./type";
import { Box, Flex, Text } from "@radix-ui/themes";
import { ColorPicker } from "./ColorPicker";

export const Colors: FC<{
  colors: ThemeConfig["colors"];
}> = (props) => {
  return (
    <Flex direction="column" gap="4">
      {Object.entries(props.colors).map(([key, value]) => {
        console.log(key, value);
        return <ColorRow key={key} name={key} colors={value} />;
      })}
    </Flex>
  );
};

const ColorRow: FC<{
  name: string;
  colors: { [key: string]: string };
}> = (props) => {
  return (
    <div>
      <Text size={"2"} weight="bold" as="div">
        {props.name}
      </Text>
      <Flex direction="row" justify={"start"} wrap={"wrap"} mt={"1"}>
        {Object.entries(props.colors).map(([key, value]) => {
          return <SimpleColorCell key={key} name={key} value={value} />;
          // return <ColorCell key={key} name={key} value={value} />;
        })}
      </Flex>
    </div>
  );
};

const SimpleColorCell: FC<{
  name: string;
  value: string;
  // onChange: (color: string) => void;
}> = (props) => {
  const { value, name } = props;

  return (
    <div
      className="w-12 h-14 first:rounded-l-lg last:rounded-r-lg hover:scale-110 transform transition-transform duration-200 hover:z-10"
      style={{ background: value }}
    ></div>
  );
};
