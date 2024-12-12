import { FC } from "react";
import { ThemeItems } from "./type";

export const Colors: FC<{
  colors: ThemeItems["colors"];
}> = (props) => {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(props.colors).map(([key, value]) => {
        console.log(key, value);
        return <ColorRow key={key} name={key} colors={value as any} />;
      })}
    </div>
  );
};

const ColorRow: FC<{
  name: string;
  colors: { [key: string]: string };
}> = (props) => {
  return (
    <div>
      <div className="text-lg font-bold">{props.name}</div>
      <div className="flex flex-row justify-start flex-wrap mt-1">
        {Object.entries(props.colors).map(([key, value]) => {
          return <SimpleColorCell key={key} name={key} value={value} />;
          // return <ColorCell key={key} name={key} value={value} />;
        })}
      </div>
    </div>
  );
};

const SimpleColorCell: FC<{
  name: string;
  value: string;
  // onChange: (color: string) => void;
}> = (props) => {
  const { value } = props;

  return (
    <div
      className="w-12 h-14 first:rounded-l-lg last:rounded-r-lg hover:scale-110 transform transition-transform duration-200 hover:z-10"
      style={{ background: value }}
    ></div>
  );
};
