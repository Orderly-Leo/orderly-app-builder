import { FC, useEffect, useMemo } from "react";
import { Field } from "./field";
import { FormProvider, useForm } from "react-hook-form";
import { objectParse } from "./helper";

// import { z } from "zod";
import { createSchemaFromArgTypes } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Create schema from configArgTypes

// Now you can use the schema for validation
// type ConfigType = z.infer<typeof configSchema>;
export interface ObjectFieldsProps {
  object: any;
  classes?: {
    fields?: string;
    field?: string;
    sectionHeader?: string;
  };
  argTypes?: any;
  extendForZod?: (argTypes: z.ZodType<any>) => z.ZodType<any>;
  onChange?: (values: any, changed: any) => void;
}

export const ObjectFields: FC<ObjectFieldsProps> = (props) => {
  let configSchema = createSchemaFromArgTypes(props.argTypes);

  if (
    typeof props.extendForZod === "function" &&
    typeof (configSchema as z.AnyZodObject).merge === "function"
  ) {
    configSchema = props.extendForZod(configSchema);
  }

  const methods = useForm({
    defaultValues: props.object,
    resolver: zodResolver(configSchema),
    mode: "onBlur",
  });
  const { classes } = props;

  const parsedObject = useMemo(() => {
    return objectParse(props.object);
  }, [props.object]);

  // console.log(props.object);

  useEffect(() => {
    const subscription = methods.watch((values, changed) =>
      props.onChange?.(values, changed)
    );
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          {parsedObject.map((item) => {
            return (
              <div key={item.key}>
                {(item.type === "object" || item.type === "array") &&
                  item.children && (
                    <Fields
                      fields={item.children}
                      title={item.label}
                      id={item.path.replace(".", "_")}
                      classes={{
                        root: classes?.fields,
                        field: classes?.field,
                        sectionHeader: classes?.sectionHeader,
                      }}
                    />
                  )}
                {item.type === "colors" && item.children && (
                  <Field
                    field={item}
                    label={item.label}
                    path={item.path}
                    level={item.level}
                    className={classes?.field}
                  />
                )}
                {!item.children && (
                  <Field
                    field={item}
                    path={item.path}
                    label={item.label}
                    level={item.level}
                  />
                )}
              </div>
            );
          })}
        </div>
      </form>
    </FormProvider>
  );
};

const SectionHeader: FC<{ title: string; id: string }> = (props) => {
  return (
    <div className="sticky top-[30px] bg-white py-3 px-3" id={props.id}>
      <div className="font-medium">{props.title}</div>
    </div>
  );
};

const Fields: FC<{
  fields: any[];
  title: string;
  id: string;
  classes?: {
    root?: string;
    field?: string;
    sectionHeader?: string;
  };
}> = (props) => {
  const { fields, title, id, classes } = props;
  return (
    <>
      <SectionHeader title={title} id={id} />
      <div className={`flex flex-col gap-2 ${classes?.root}`}>
        {fields.map((field) => {
          if (field.type === "object" && field.children) {
            return (
              <div key={field.key}>
                {/* <div className="text-lg font-medium mb-2">{field.label}</div> */}
                <Fields
                  fields={field.children}
                  title={field.label}
                  id={field.path.replace(".", "_")}
                  classes={props.classes}
                />
              </div>
            );
          }

          if (field.type === "colors" && field.children) {
            return (
              <Field
                key={field.key}
                field={field}
                path={field.path}
                label={field.label}
                level={field.level}
                // description={field.description || ""}
              />
            );
          }

          return (
            <Field
              key={field.key}
              field={field}
              path={field.path}
              label={field.label}
              level={field.level}
              // description={field.description || ""}
            />
          );
        })}
      </div>
    </>
  );
};
