import * as React from "react";

import { cn } from "@/lib/utils";

// Base styles
const _styles =
  "bg-gray-100 py-3 px-4 flex flex-col gap-3 max-w-[700px] border border-solid border-gray-300 rounded";

export interface AutomationConditionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AutomationCondition = React.forwardRef<
  HTMLDivElement,
  AutomationConditionProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn([_styles, className])} {...props} />
));
AutomationCondition.displayName = "Card";

export { AutomationCondition };
