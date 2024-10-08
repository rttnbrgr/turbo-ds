import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { textBodyVariants } from "@repo/ui/components/ui/text";

import { cn } from "@repo/ui/lib/utils";

const labelVariants = cva([
  "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", // #TODO Peer disabled is not working
]);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof textBodyVariants>
>(({ className, weight, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      textBodyVariants({ weight, size, className }),
      labelVariants(),
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
