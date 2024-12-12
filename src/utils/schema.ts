import { z } from "zod";

type ArgTypeConfig = {
  z?: z.ZodType;
  [key: string]: any;
};

type ArgTypes = {
  [key: string]: ArgTypeConfig | ArgTypes;
};

const ignoreKeys = ["_description", "_control", "_label"];

export function createSchemaFromArgTypes(
  argTypes: ArgTypes
): z.ZodType<any> | z.ZodObject<any> {
  if (!argTypes) {
    // throw new Error("argTypes cannot be null or undefined");
    return z.any();
  }

  const schemaShape: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(argTypes)) {
    if (!value || typeof value !== "object") continue; // Skip null/undefined values

    if (ignoreKeys.includes(key)) continue;

    // Check if the value has a `z` property (is an ArgTypeConfig)
    if ("z" in value) {
      schemaShape[key] = value.z;
    }
    // If it's a nested object without `z`, recurse
    else {
      schemaShape[key] = createSchemaFromArgTypes(value as ArgTypes);
    }
  }

  if (Object.keys(schemaShape).length === 0) {
    return z.any();
  }

  return z.object(schemaShape);
}
