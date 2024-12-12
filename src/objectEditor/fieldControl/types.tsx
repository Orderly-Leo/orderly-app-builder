import { Control } from "react-hook-form";
import React from "react";

export type FieldTransform = {
  input?: (value: any) => any;
  output?: (value: any) => any;
};

// export type
export type ControlProps = {
  name: string;
  label?: string;
  placeholder?: string;
  description?: React.ReactNode;
  control: Control<any>;
  disabled?: boolean;
  readonly?: boolean;
  icon?: React.ReactNode;
  transformForField?: FieldTransform;
};
