import { FC } from "react";

type ColorsControlProps = {
  children: any[];
  label: string;

  onChange: (value: string, key: string) => void;
};

export const ColorsControl: FC<ColorsControlProps> = (props) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {props.children.map((child) => {
        return (
          <ColorCell
            key={child.key}
            keyName={child.key}
            name={child.label}
            value={child.value}
            onChange={props.onChange}
          />
        );
      })}
    </div>
  );
};

const ColorCell: FC<{
  name: string;
  value: string;
  keyName: string;
  onChange: (value: string, key: string) => void;
}> = (props) => {
  const { value, name } = props;
  return (
    <div className="flex gap-2">
      <div>
        <input
          type="color"
          value={value}
          onChange={(e) => {
            // console.log(e.target.value);
            props.onChange(e.target.value, props.keyName);
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-sm">{name}</div>
        <input
          className="w-[100px] bg-transparent text-sm bg-gray-300 rounded px-1"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(e.target.value, props.keyName);
          }}
        />
      </div>
    </div>
  );
};
