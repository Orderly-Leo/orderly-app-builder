import { Button, FormGroup, Radio, RadioGroup, Icon } from "@blueprintjs/core";
import { ChangeEvent, useState } from "react";
import { IconName } from "@blueprintjs/icons";
interface FrameworkStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

export const FrameworkStep: React.FC<FrameworkStepProps> = ({
  onNext,
  onBack,
}) => {
  const [framework, setFramework] = useState("");

  const frameworks = [
    { id: "next", name: "Next.js", icon: "lightning" as IconName },
    { id: "remix", name: "Remix", icon: "repeat" as IconName },
    { id: "gatsby", name: "Gatsby", icon: "graph" as IconName },
  ];

  const handleSubmit = () => {
    if (framework) {
      onNext({ framework });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Choose React Framework</h2>
      <FormGroup>
        <RadioGroup
          selectedValue={framework}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFramework(e.currentTarget.value)
          }
        >
          <div className="grid grid-cols-3 gap-4">
            {frameworks.map((fw) => (
              <label
                key={fw.id}
                htmlFor={`framework-${fw.id}`}
                className={`
                  relative p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-all
                  ${
                    framework === fw.id
                      ? "border-2 border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-200"
                  }
                `}
              >
                <input
                  id={`framework-${fw.id}`}
                  name="framework"
                  type="radio"
                  value={fw.id}
                  checked={framework === fw.id}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFramework(e.target.value)
                  }
                  className="hidden"
                />
                {framework === fw.id && (
                  <div className="absolute top-2 right-2">
                    <Icon icon="small-tick" intent="primary" size={16} />
                  </div>
                )}
                <div className="flex flex-col items-center space-y-3 pt-2">
                  <Icon
                    icon={fw.icon}
                    size={28}
                    className={framework === fw.id ? "text-blue-500" : ""}
                  />
                  <span
                    className={`font-medium ${
                      framework === fw.id ? "text-blue-600" : ""
                    }`}
                  >
                    {fw.name}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </RadioGroup>
      </FormGroup>
      <div className="flex justify-between">
        <Button minimal onClick={onBack}>
          Back
        </Button>
        <Button intent="primary" onClick={handleSubmit} disabled={!framework}>
          Next
        </Button>
      </div>
    </div>
  );
};
