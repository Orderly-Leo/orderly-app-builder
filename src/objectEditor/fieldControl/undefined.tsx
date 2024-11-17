import { FC } from "react";

export const UndefinedControl: FC<{ value: any }> = ({ value }) => {
  return (
    <div>
      <pre>{JSON.stringify(value)}</pre>
    </div>
  );
};
