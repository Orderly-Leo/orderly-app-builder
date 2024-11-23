import { CircleCheck } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";

interface Step {
  title: string;
  description?: string;
}

interface WizardLayoutProps {
  steps: Step[];
  currentIndex: number;
  currentDescription: {
    title: string;
    description: string;
  };
  children: React.ReactNode;
}

export const WizardLayout: React.FC<WizardLayoutProps> = ({
  steps,
  currentIndex,
  currentDescription,
  children,
}) => {
  return (
    <div className="h-full flex gap-8">
      <aside className="w-1/4 text-white">
        <ul className="space-y-4 text-sm sticky top-10">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start gap-2 justify-end">
              {currentIndex > index ? (
                <CircleCheck className="text-green-500" size={16} />
              ) : null}
              <div className="flex flex-col">
                <h3 className="font-medium">{step.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <main className="w-3/4">
        <Card>
          <CardHeader className="flex">
            <div className="static top-5">
              <h3 className="text-sm font-bold">
                {`Step ${currentIndex + 1} of ${steps.length}`}
              </h3>
              <h2 className="text-2xl font-bold">{currentDescription.title}</h2>
              <p className="text-sm text-muted-foreground">
                {currentDescription.description}
              </p>
            </div>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </main>
    </div>
  );
};
