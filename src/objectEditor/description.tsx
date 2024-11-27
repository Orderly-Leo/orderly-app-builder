import { FC, ReactElement } from "react";

type DescriptionProps = {
  description?: ReactElement;
};

export const Description: FC<DescriptionProps> = (props) => {
  if (!props.description) return null;
  return <div className="text-sm text-gray-500 mb-1">{props.description}</div>;
};
