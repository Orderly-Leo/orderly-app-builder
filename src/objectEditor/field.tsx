import { FC } from "react";

export const Field: FC<{
  name: string;
  value: any;
}> = (props) => {
  const { name, value } = props;

  return (
    <div>
      <span>{name}</span>
      <span>
        <pre>{value}</pre>
      </span>
    </div>
  );
};
