import { Button, Dialog, Flex, Grid, TextField, Text } from "@radix-ui/themes";
import { PageTemplateList } from "./pageTemplateList";

export const CreatePageForm = () => {
  return (
    <div>
      <Grid columns={"2"} className="py-4">
        <div>
          <Text>Please choose page component</Text>
          <PageTemplateList />
        </div>
        <div>
          <TextField.Root placeholder="path" />
        </div>
      </Grid>
      <Flex
        gapX={"2"}
        pt={"4"}
        justify={"end"}
        className="border-t border-gray-200"
      >
        <Button variant="soft">Cancel</Button>
        <Button className="min-w-48">Next</Button>
      </Flex>
    </div>
  );
};
