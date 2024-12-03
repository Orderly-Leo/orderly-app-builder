import { FC, useEffect, useMemo } from "react";
import { Field } from "./field";
import { FormProvider, useForm } from "react-hook-form";
import { objectParse } from "./helper";

export interface ObjectFieldsProps {
  object: any;
  classes?: {
    fields?: string;
    field?: string;
    sectionHeader?: string;
  };
}

export const ObjectFields: FC<ObjectFieldsProps> = (props) => {
  const methods = useForm({
    defaultValues: props.object,
  });
  const { classes } = props;

  const parsedObject = useMemo(() => {
    return objectParse(props.object);
  }, [props.object]);

  // console.log(props.object);

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 px-2">
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
                    name={item.key}
                    field={item}
                    label={item.label}
                    path={item.path}
                    level={item.level}
                    className={classes?.field}
                  />
                )}
                {!item.children && (
                  <Field
                    name={item.key}
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
    <div className="sticky top-[60px] bg-white py-3 mb-3" id={props.id}>
      <div className="text-xl font-medium">{props.title}</div>
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
      <div className={`flex flex-col gap-4 ${classes?.root}`}>
        {fields.map((field) => {
          if (field.type === "object" && field.children) {
            console.log("-->>>>field", field);
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
                name={field.key}
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
              name={field.key}
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
