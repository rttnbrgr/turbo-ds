import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { textBodyVariants } from "@repo/ui/components/ui/text";

import { cn } from "@repo/ui/lib/utils";

// Container
const _containerBase =
  "bg-slate-50 p-1 border border-solid border-gray-300 rounded inline-flex justify-center items-center group";

/**
 *
 * Toggle Switch
 *
 */
const _toggleBase = `inline-flex items-center justify-center rounded-sm bg-transparent`;
const _toggleTypography = textBodyVariants({ className: "uppercase" });
const _toggleDisabled = "disabled:pointer-events-none disabled:opacity-50";

// Shared Base
const _toggleSwitchShared = [_toggleBase, _toggleTypography, _toggleDisabled];

// Shared Size
const _toggleSm = "w-[60px] h-5";
const _toggleMd = "w-[60px] h-7";

/**
 *
 * Active + Varaints
 *
 */
const _toggleActive = `
  group-data-[state=on]:tracking-wide
  group-data-[state=on]:font-bold
  group-data-[state=on]:text-white
`;

const toggleSwitchVariants = cva([..._toggleSwitchShared, _toggleActive], {
  variants: {
    variant: {
      "and-or": "group-data-[state=on]:bg-blue-600",
      "off-on": "group-data-[state=on]:bg-green-600",
    },
    size: {
      sm: _toggleSm,
      md: _toggleMd,
    },
  },
  defaultVariants: {
    variant: "and-or",
    size: "md",
  },
});

/**
 *
 * Active + Varaints (Inverted)
 *
 */
const _toggleActiveInvert = `
  group-data-[state=off]:tracking-wide
  group-data-[state=off]:font-bold
  group-data-[state=off]:text-white
`;

const toggleSwitchInvertVariants = cva(
  [..._toggleSwitchShared, _toggleActiveInvert],
  {
    variants: {
      variant: {
        "and-or": "group-data-[state=off]:bg-blue-600",
        "off-on": "group-data-[state=off]:bg-red-600",
      },
      size: {
        sm: _toggleSm,
        md: _toggleMd,
      },
    },
    defaultVariants: {
      variant: "and-or",
      size: "md",
    },
  },
);

type ToggleProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleSwitchVariants>;

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(_containerBase, className)}
    {...props}
  >
    <span className={cn(toggleSwitchInvertVariants({ variant, size }))}>
      {variant === "and-or" ? "and" : "off"}
    </span>
    <span className={cn(toggleSwitchVariants({ variant, size }))}>
      {variant === "and-or" ? "or" : "on"}
    </span>
  </TogglePrimitive.Root>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleSwitchVariants, toggleSwitchInvertVariants };
