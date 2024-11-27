import { ObjectEditor } from "../../objectEditor";

import { config } from "../../data/config";
import { Container } from "@radix-ui/themes";
import { objectParse, updateObject } from "../../objectEditor/helper";
import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { configArgTypes } from "../../types/config";

const objectAtom = atomWithImmer(objectParse(config));

export const ConfigPanel = () => {
  const [object, setObject] = useAtom(objectAtom);

  const onChange = (path: string, value: any) => {
    setObject((draft) => {
      updateObject(draft, path, value);
    });
  };
  return (
    <Container maxWidth={"980px"}>
      <ObjectEditor
        object={object}
        onFieldChange={onChange}
        argTypes={configArgTypes}
      />
    </Container>
  );
};
