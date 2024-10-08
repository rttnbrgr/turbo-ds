import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@repo/ui/lib/utils";
import { textBodyVariants } from "./text";

const statusDotVariants = cva(["w-2 h-2 rounded-full"], {
  variants: {
    intent: {
      neutral: "bg-gray-600",
      success: "bg-green-600",
      warn: "bg-yellow-600",
      danger: "bg-red-600",
      action: "bg-blue-600",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
});

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusChipVariants> {}

const StatusDot = React.forwardRef<HTMLDivElement, StatusDotProps>(
  ({ className, intent, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        statusDotVariants({
          intent,
          className,
        }),
      )}
      {...props}
    />
  ),
);
StatusDot.displayName = "Status Dot";

/**
 * Base styles
 */
const _base = "px-2 py-1 inline-flex items-center justify-center gap-1";
const _typography = textBodyVariants({
  size: "sm",
  className: "text-gray-950",
});
const _border = "border border-solid border-transparent ";

const statusChipVariants = cva([_base, _typography, _border], {
  variants: {
    intent: {
      neutral: "bg-gray-100 border-gray-200",
      success: "bg-green-100 border-green-200",
      warn: "bg-yellow-100/50 border-yellow-200",
      danger: "bg-red-100/70 border-red-200",
      action: "bg-blue-100 border-blue-200",
    },
  },
  defaultVariants: {
    intent: "neutral",
  },
});

export interface StatusChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusChipVariants> {}

const StatusChip = React.forwardRef<HTMLDivElement, StatusChipProps>(
  ({ children, className, intent, ...props }, ref) => {
    // #TODO wire up default text
    const defaultText = "Neutral";

    return (
      <div
        ref={ref}
        className={cn(
          statusChipVariants({
            intent,
            className,
          }),
        )}
        {...props}
      >
        <StatusDot intent={intent} />
        {!children && defaultText}
        {children && children}
      </div>
    );
  },
);
StatusChip.displayName = "Status Chip";

export { StatusDot, StatusChip };
