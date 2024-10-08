import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { _disabledCursor, _focus } from "./shared-styles";

const _rootBase =
  "peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 bg-white";
const _rootChecked =
  "data-[state=checked]:bg-blue-600 data-[state=checked]:text-white";
const _indicator = "flex items-center justify-center text-current";
const _check = "h-3 w-3";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      [_rootBase, _rootChecked, _focus, _disabledCursor],
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn(_indicator)}>
      <Check className={cn(_check)} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
