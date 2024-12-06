import { ObjectEditor } from "../../objectEditor";

import { config } from "../../data/config";
import { Container } from "@radix-ui/themes";
import { configArgTypes } from "../../types/config";
import { useMemo } from "react";
import {
  appIsInitializedAtom,
  configsAtom,
  editorServiceAtom,
} from "./configs.atom";
import { useAtomValue } from "jotai";

export const ConfigPanel = () => {
  const appConfigs = useAtomValue(configsAtom);
  const editorService = useAtomValue(editorServiceAtom);

  const initialized = useAtomValue(appIsInitializedAtom);

  console.log("======== appConfigs", appConfigs.config);

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
    <Container maxWidth={"980px"}>
      <ObjectEditor
        object={mergedConfig}
        onFieldChange={onChange}
        argTypes={configArgTypes}
        onChange={onChange}
      />
    </Container>
  );
};
