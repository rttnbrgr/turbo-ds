import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as Text from "@/components/ui/text";

import { cn } from "@/lib/utils";

const labelVariants = cva([
  "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", // #TODO Peer disabled is not working
]);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof Text.BodyVariants>
>(({ className, weight, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      Text.BodyVariants({ weight, size, className }),
      labelVariants()
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
