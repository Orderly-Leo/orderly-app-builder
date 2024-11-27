import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const InputLabel = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={cn("text-sm mb-2 text-gray-600", className)}>
      {children}
    </div>
  );
};
