import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      label:
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    },
    size: {
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "blockquote" | "label" | "span";
}

export function Typography({
  className,
  variant,
  size,
  as: Component = "p",
  ...props
}: TypographyProps) {
  return (
    <Component
      className={cn(typographyVariants({ variant, size, className }))}
      {...props}
    />
  );
}
