import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export let iconSize = {
  sm: 12,
  md: 16,
  lg: 24,
};

const _base = "inline-flex items-center justify-center";
const _focus =
  "ring-offset-backgroundfocus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  ";
const _disabled = "disabled:pointer-events-none disabled:opacity-50";
const _rest = "rounded-full  transition-colors bg-pink";

const iconButtonVariants = cva([_base, _focus, _disabled, _rest], {
  variants: {
    variant: {
      fill: "bg-primary text-primary-foreground hover:bg-primary/90",
      ghost: "hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      md: "h-7 w-7",
    },
  },

  defaultVariants: {
    variant: "fill",
    size: "md",
  },
});

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    // child should be an icon
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "Button";

export { IconButton, iconButtonVariants };
