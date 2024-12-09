import { ObjectEditor } from "../../objectEditor";

import { config } from "../../data/config";
import { configArgTypes } from "../../types/config";
import { useMemo } from "react";
import {
  appIsInitializedAtom,
  configsAtom,
  editorServiceAtom,
} from "./configs.atom";
import { useAtomValue } from "jotai";
import { z } from "zod";
import { exists } from "@tauri-apps/plugin-fs";

export const ConfigPanel = () => {
  const appConfigs = useAtomValue(configsAtom);
  const editorService = useAtomValue(editorServiceAtom);

  const initialized = useAtomValue(appIsInitializedAtom);

  const mergedConfig = useMemo(() => {
    return {
      ...config,
      projectConfig: appConfigs.config
        ? appConfigs.config
        : config.projectConfig,
    };
  }, [config, appConfigs.config]);

  const onChange = (values: any, changed: any) => {
    if (!editorService) return;
    console.log("======== values", values);
    console.log("======== changed", changed);

    editorService.handleConfig(changed.values, changed.name, changed.type);
  };

  if (!initialized) return null;

  return (
    <div style={{ maxWidth: "980px" }}>
      <ObjectEditor
        object={mergedConfig}
        onFieldChange={onChange}
        argTypes={configArgTypes}
        onChange={onChange}
        extendForZod={(schema) => {
          const projectConfigSchema = z.object({
            projectConfig: z.object({
              paths: z.object({
                themeCSS: z
                  .string()
                  .min(1, "Theme CSS path is required")
                  .transform(
                    (value) =>
                      `${
                        editorService?.projectManager.frameworkHandler
                          ?.fullProjectPath ?? ""
                      }/${value}`
                  )
                  .refine(
                    async (value) => {
                      const isExists = await exists(value);
                      return isExists;
                    },

                    {
                      message: "The path does not exist",
                    }
                  ),

                src: z.string().min(1, "src path is required"),
                public: z.string().min(1, "public path is required"),
              }),
            }),
          });

          return (schema as z.AnyZodObject).merge(projectConfigSchema);
        }}
        transformForField={{
          "projectConfig.paths.themeCSS": {
            input: (value: string) =>
              value
                .replace(
                  editorService?.projectManager.frameworkHandler
                    ?.fullProjectPath ?? "",
                  ""
                )
                .replace(/^\//, ""),
          },
        }}
      />
    </div>
  );
};
