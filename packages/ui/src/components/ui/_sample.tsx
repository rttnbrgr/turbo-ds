import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@repo/ui/lib/utils";
import { textBodyVariants } from "./text";

// Base styles
const _base =
  "inline-flex items-center justify-center whitespace-nowrap rounded";
const _typography = textBodyVariants();
const _focus =
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  ";
const _disabled = "disabled:pointer-events-none disabled:opacity-50";
const _rest = "transition-colors";

// Fill
const fill =
  "bg-slate-600 text-primary-foreground hover:bg-slate-700 active:bg-slate-800";

// Ghost
const ghost =
  "bg-transparent text-slate-950 hover:bg-slate-50 active:bg-slate-100";

const sampleVariants = cva([_base, _typography, _focus, _disabled, _rest], {
  variants: {
    variant: {
      fill,
      ghost,
    },
  },
  defaultVariants: {
    variant: "fill",
  },
});

export interface SampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sampleVariants> {}

const Sample = React.forwardRef<HTMLDivElement, SampleProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sampleVariants({ variant, className }))}
      {...props}
    />
  ),
);
Sample.displayName = "Sample";

export { Sample, sampleVariants };
