import { FC } from "react";
import { Field } from "./field";

export const ObjectFields: FC<{ object: any }> = (props) => {
  return (
    <div>
      {Object.keys(props.object).map((key) => {
        return <Field key={key} name={key} value={props.object[key]} />;
      })}
    </div>
  );
};
