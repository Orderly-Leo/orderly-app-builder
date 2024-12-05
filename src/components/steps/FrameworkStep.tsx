import { Text } from "@radix-ui/themes";
import { useState } from "react";
import { SiNextdotjs, SiRemix, SiCreatereactapp } from "react-icons/si";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FrameworkStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  formData: any;
}

export const FrameworkStep: React.FC<FrameworkStepProps> = ({
  onNext,
  onBack,
  formData,
}) => {
  const [framework, setFramework] = useState(formData.framework);

  const frameworks = [
    { id: "nextjs", name: "Next.js", icon: <SiNextdotjs size={24} /> },
    { id: "remix", name: "Remix", icon: <SiRemix size={24} /> },
    {
      id: "crd",
      name: "Create React App",
      icon: <SiCreatereactapp size={24} />,
    },
  ];

  const handleSubmit = () => {
    if (framework) {
      onNext({ framework }); // This should now work as it's properly passed from context
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* <Text size="5" weight="bold">
        Choose React Framework
      </Text> */}
      <div className="flex flex-col gap-3 flex-1">
        {frameworks.map((fw) => (
          <div
            key={fw.id}
            onClick={() => setFramework(fw.id)}
            className={cn(
              "p-4 rounded-md cursor-pointer border",
              framework === fw.id && "border-purple-600 bg-purple-50",
              "transition-all duration-200 ease-in-out"
            )}
          >
            <div className="flex items-center gap-3">
              {fw.icon}
              <Text size="3" weight={framework === fw.id ? "bold" : "regular"}>
                {fw.name}
              </Text>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 pt-5">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!framework}>
          Next
        </Button>
      </div>
    </div>
  );
};
