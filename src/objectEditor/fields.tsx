import { FC } from "react";
import { Field } from "./field";
import { Flex, Heading, Text } from "@radix-ui/themes";

export const ObjectFields: FC<{ object: any[] }> = (props) => {
  return (
    <Flex direction="column" gap="4">
      {props.object.map((item) => {
        return (
          <div key={item.key}>
            <SectionHeader
              title={item.label}
              id={item.path.replace(".", "_")}
            />
            {item.type === "object" && item.children && (
              <Fields fields={item.children} />
            )}
            {item.type === "colors" && item.children && (
              <Field
                name={item.key}
                field={item}
                label={item.label}
                path={item.path}
              />
            )}
            {!item.children && (
              <Field
                name={item.key}
                field={item}
                path={item.path}
                label={item.label}
              />
            )}
          </div>
        );
      })}
    </Flex>
  );
};

const SectionHeader: FC<{ title: string; id: string }> = (props) => {
  return (
    <div className="sticky top-0 bg-white py-2" id={props.id}>
      <Heading className="mb-4">{props.title}</Heading>
    </div>
  );
};

const Fields: FC<{ fields: any[] }> = (props) => {
  return (
    <Flex direction="column" gap="3">
      {props.fields.map((field) => {
        if (field.type === "object" && field.children) {
          return (
            <div key={field.key}>
              <Text as="div" weight="medium" mb="2">
                {field.label}
              </Text>
              <Fields fields={field.children} />
            </div>
          );
        }

        if (field.type === "colors" && field.children) {
          return (
            <Field
              key={field.key}
              name={field.key}
              field={field}
              path={field.path}
              label={field.label}
              description={field.description || ""}
            />
          );
        }

        return (
          <Field
            key={field.key}
            name={field.key}
            field={field}
            path={field.path}
            label={field.label}
            description={field.description || ""}
          />
        );
      })}
    </Flex>
  );
};
