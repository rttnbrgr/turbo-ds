import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { _disabledCursor, _disabledPointer, _focus } from "./shared-styles";
import { textBodyVariants } from "@repo/ui/components/ui/text";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const _triggerBase =
  "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2";
const _triggerTypography = `${textBodyVariants()} data-[placeholder]:text-gray-500 [&>span]:line-clamp-1 text-left`;
const _triggerRest = "[&>span]:line-clamp-1";

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      [_triggerBase, _triggerTypography, _focus, _disabledCursor],
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

/**
 *
 * Select Scroll Buttons
 *
 */

const _selectScrollButton =
  "flex cursor-default items-center justify-center py-1";

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn([_selectScrollButton], className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn([_selectScrollButton], className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

/**
 *
 * Select Content
 *
 */

const _contentBase =
  "relative z-50 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md";

const _contentSize = "max-h-96 min-w-[8rem]";

const _contentOpen = `
  data-[state=open]:animate-in
  data-[state=closed]:animate-out 
  data-[state=closed]:fade-out-0
  data-[state=open]:fade-in-0
  data-[state=closed]:zoom-out-95
  data-[state=open]:zoom-in-95
`;
const _contentPosition = `
  data-[side=bottom]:slide-in-from-top-2
  data-[side=left]:slide-in-from-right-2
  data-[side=right]:slide-in-from-left-2
  data-[side=top]:slide-in-from-bottom-2
`;

const _contentPopper = `
  data-[side=bottom]:translate-y-1 
  data-[side=left]:-translate-x-1 
  data-[side=right]:translate-x-1 
  data-[side=top]:-translate-y-1
`;

const _viewport = "p-1 flex flex-col space-y-0.5";
// adjust the max width to remove the border width
const _viewportPopper = `
  h-[var(--radix-select-trigger-height)]
  w-full
  min-w-[calc(var(--radix-select-trigger-width)-2px)]
`;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        [_contentBase, _contentSize, _contentOpen, _contentPosition],
        position === "popper" && [_contentPopper],
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(_viewport, position === "popper" && _viewportPopper)}
      >
        {/* Items go here */}
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

/**
 *
 * Select Label
 *
 */

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

/**
 *
 * Select Item
 *
 */

// Item styles
const _itemBase =
  "relative flex w-full cursor-default select-none items-center justify-between rounded-sm py-1.5 px-2";
const _itemTypography = textBodyVariants();
// review aginst focus shared; focus is how hover styles work?
const _itemFocus = "outline-none focus:bg-gray-50 focus:cursor-pointer";
const _sharedFocus =
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-blue-600 focus-visible:ring-offset-2";
// const _itemDisabled =
//   "data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

// Indicator
const _indicator = "h-5 w-5 flex items-center justify-center";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      [_itemBase, _itemTypography, _itemFocus, _disabledPointer],
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className={_indicator}>
      <SelectPrimitive.ItemIndicator>
        <Check className="h-5 w-5" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
