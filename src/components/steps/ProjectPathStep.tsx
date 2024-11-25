import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, FolderPlus } from "lucide-react";
import { projectManager } from "@/service/projectManager";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../ui/select";
import { InputLabel } from "../ui/inputLabel";

interface ProjectPathStepProps {
  onNext: (data: { projectPath: string }) => void;
  onBack: () => void;
  formData: { projectPath: string; projectName: string; npm: string };
}

export const ProjectPathStep: React.FC<ProjectPathStepProps> = ({
  onNext,
  onBack,
  formData,
}) => {
  const [projectPath, setProjectPath] = useState(formData.projectPath || "");
  const [projectName, setProjectName] = useState(formData.projectName || "");
  const [npm, setNPM] = useState(formData.npm || "npm");

  const onOpenDialog = async () => {
    const file = await projectManager.selectPath();
    if (file) {
      setProjectPath(file);
    }
  };

  const handleNext = () => {
    if (projectPath.trim()) {
      onNext({ projectPath });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <InputLabel>Project Name</InputLabel>
        <Input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter your project Name"
        />
      </div>
      <div>
        <InputLabel>Project Path</InputLabel>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            value={projectPath}
            onChange={(e) => setProjectPath(e.target.value)}
            placeholder="Enter your project path"
          />
          <Button type="button" variant={"outline"} onClick={onOpenDialog}>
            <FolderPlus />
          </Button>
        </div>
      </div>
      <div>
        <InputLabel>Node Module Package Manager</InputLabel>
        <div>
          <Select value={npm} onValueChange={(value) => setNPM(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Please choose your npm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"npm"}>npm</SelectItem>
              <SelectItem value="yarn">yarn</SelectItem>
              <SelectItem value="pnpm">pnpm</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant={"ghost"} onClick={onBack}>
          Back
        </Button>
        <Button
          disabled={!projectPath.trim() || !projectName.trim()}
          onClick={handleNext}
        >
          Create Project
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
