import { ObjectEditor } from "../../objectEditor";

import { config } from "../../data/config";
import { Container } from "@radix-ui/themes";
import { configArgTypes } from "../../types/config";
import { useMemo } from "react";
import { appIsInitializedAtom, configsAtom } from "./configs.atom";
import { useAtomValue } from "jotai";

export const ConfigPanel = () => {
  const appConfigs = useAtomValue(configsAtom);

  const initialized = useAtomValue(appIsInitializedAtom);

  console.log("======== appConfigs", appConfigs.config);

  const mergedConfig = useMemo(() => {
    return {
      ...config,
      projectConfig: {
        // ...config.projectConfig,
        ...appConfigs.config,
      },
    };
  }, [config, appConfigs.config]);

  const onChange = () => {
    // setObject((draft) => {
    //   updateObject(draft, path, value);
    // });
  };

  if (!initialized) return null;

  return (
    <Container maxWidth={"980px"}>
      <ObjectEditor
        object={mergedConfig}
        onFieldChange={onChange}
        argTypes={configArgTypes}
      />
    </Container>
  );
};
