import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@repo/ui/lib/utils";
import { textBodyVariants } from "./text";
import { _disabledPointer, _focus } from "./shared-styles";

/**
 * Base styles
 */
const _base =
  "inline-flex items-center justify-center whitespace-nowrap rounded gap-1";
// const _typography = "text-sm font-medium ";
const _typography = textBodyVariants();
const _rest = "transition-colors";

/**
 * Variants
 * #TODO: add semantic text vars
 */

// Fill
const fill =
  "bg-slate-600 text-primary-foreground hover:bg-slate-700 active:bg-slate-800";
const fillAction =
  "bg-blue-600 text-primary-foreground hover:bg-blue-700 active:bg-blue-800";
const fillDanger =
  "bg-red-600 text-primary-foreground hover:bg-red-700 active:bg-red-800";

// Outline
const outline =
  "bg-slate-50 text-slate-950 border border-solid border-slate-400 hover:bg-slate-200 active:bg-slate-300";

// Ghost
const ghost =
  "bg-transparent text-slate-950 hover:bg-slate-50 active:bg-slate-100";
const ghostAction =
  "bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100";
const ghostDanger =
  "bg-transparent text-red-600 hover:bg-red-50 active:bg-red-100";

const buttonVariants = cva(
  [_base, _typography, _focus, _disabledPointer, _rest],
  {
    variants: {
      variant: {
        fill,
        outline,
        ghost,
      },
      intent: {
        default: "",
        action: "",
        danger: "",
      },
      size: {
        md: "h-9 px-3 py-2 gap-2",
        sm: "h-7 px-2 py-1 gap-1 ",
      },
    },
    compoundVariants: [
      {
        variant: "fill",
        intent: "action",
        class: fillAction,
      },
      {
        variant: "fill",
        intent: "danger",
        className: fillDanger,
      },
      {
        variant: "ghost",
        intent: "action",
        class: ghostAction,
      },
      {
        variant: "ghost",
        intent: "danger",
        className: ghostDanger,
      },
    ],
    defaultVariants: {
      variant: "fill",
      size: "md",
      intent: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, intent, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, intent, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
