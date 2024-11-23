import { useState } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, FolderPlus } from "lucide-react";

interface ProjectPathStepProps {
  onNext: (data: { projectPath: string }) => void;
  onBack: () => void;
  formData: { projectPath: string };
}

export const ProjectPathStep: React.FC<ProjectPathStepProps> = ({
  onNext,
  onBack,
  formData,
}) => {
  const [projectPath, setProjectPath] = useState(formData.projectPath || "");

  const handleNext = () => {
    if (projectPath.trim()) {
      onNext({ projectPath });
    }
  };

  return (
    <Flex direction="column" gap="6">
      <Box className="pb-10 pt-4">
        <Text as="label" size="2" weight="medium" mb="2">
          Project Path
        </Text>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            value={projectPath}
            onChange={(e) => setProjectPath(e.target.value)}
            placeholder="Enter your project path"
          />
          <Button type="button" variant={"outline"}>
            <FolderPlus />
          </Button>
        </div>
      </Box>
      <div className="flex justify-between">
        <Button variant={"ghost"} onClick={onBack}>
          Back
        </Button>
        <Button disabled={!projectPath.trim()}>
          Create Project
          <ArrowRight />
        </Button>
      </div>
    </Flex>
  );
};
