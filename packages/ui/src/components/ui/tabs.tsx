import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@repo/ui/lib/utils";
import { textBodyVariants } from "./text";

const Tabs = TabsPrimitive.Root;

/**
 *
 * Tabs List
 *
 */

const _listBase = `inline-flex flex-row items-center justify-center`;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(_listBase, className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 *
 * Tabs Trigger
 *
 */

const _triggerBase = `inline-flex items-center justify-center whitespace-nowrap px-3 py-3`;
// const _triggerTypography = `text-sm/4 font-semibold text-grey-800`;
const _triggerTypography = `${textBodyVariants()} font-semibold text-slate-600`;
const _triggerBorder = `border-b-2 border-solid border-transparent`;
const _triggerHover = `hover:border-slate-400`;
const _triggerFocus = `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`;
const _triggerDisabled = `disabled:pointer-events-none disabled:opacity-50`;
const _triggerActive = `data-[state=active]:border-blue-600 data-[state=active]:text-blue-600`;
const _triggerRest = `-offset-background transition-all`;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      _triggerBase,
      _triggerTypography,
      _triggerBorder,
      _triggerHover,
      _triggerFocus,
      _triggerDisabled,
      _triggerActive,
      _triggerRest,
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 *
 * Tabs Content
 *
 */

const _contentBase = "py-4";
// I dk why we need focusable state for the contetn? hiding for now
// const _contentFocus = "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
const _contentFocus = "";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(_contentBase, _contentFocus, className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
