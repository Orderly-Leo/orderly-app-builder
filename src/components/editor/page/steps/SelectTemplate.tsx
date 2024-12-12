import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageComponent } from "../../../../types/page";
import { availablePages } from "@/data/pages";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface SelectTemplateProps {
  selectedTemplate?: PageComponent;
  // onSelect: (template: PageComponent) => void;
  onCancel: () => void;
  onNext: (data: any) => void;
}

export const SelectTemplate = ({
  selectedTemplate,
  // onSelect,
  onCancel,
  onNext,
}: SelectTemplateProps) => {
  const [selected, setSelected] = useState(
    selectedTemplate ?? availablePages[0]
  );

  const onNextHandler = () => {
    onNext({
      template: selected,
    });
  };

  return (
    <div className="flex relative h-full">
      <div className="absolute left-0 top-0 right-0 bottom-14 flex overflow-y-auto">
        <div className="w-[240px]">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-xs text-gray-500 font-semibold">
                Page Components
              </h2>
              <div className="space-y-1">
                {availablePages.map((template) => (
                  <Button
                    key={template.id}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start px-4",
                      selected?.id === template.id &&
                        "bg-accent text-accent-foreground"
                    )}
                    onClick={() => setSelected(template)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Separator orientation="vertical" className="h-full" />

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {selected ? (
            <div className="space-y-6">
              {/* Preview Image */}
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                {selected.thumbnail ? (
                  <img
                    src={selected.thumbnail}
                    alt={selected.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                    No preview available
                  </div>
                )}
              </div>

              {/* Template Details */}
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">{selected.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selected.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a template to see details
            </div>
          )}
        </div>
      </div>
      <div className="absolute left-0 bottom-0 right-0 bg-white dark:bg-gray-900">
        <Separator />
        <div className="flex justify-between gap-3 p-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" onClick={onNextHandler} disabled={!selected}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
