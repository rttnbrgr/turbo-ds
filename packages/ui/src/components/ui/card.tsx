import * as React from "react";
import * as Text from "@repo/ui/components/ui/text";

import { cn } from "@repo/ui/lib/utils";

/**
 *
 * Card
 *
 */
const _cardBase =
  "rounded-lg border bg-card text-card-foreground shadow-sm p-6";
const _cardFlex = "flex flex-col gap-2";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(_cardBase, _cardFlex, className)} {...props} />
));
Card.displayName = "Card";

/**
 *
 * Card Header
 * -
 * For use with title + description
 *
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 *
 * Card Title
 * -
 * Extends Text.Header
 *
 */
const CardTitle = ({ ...props }: Text.TextHeadingProps) => (
  <Text.Heading size="sm" {...props} />
);

/**
 *
 * Card Description
 * -
 * Extends Text.Body
 *
 */
const CardDescription = ({ ...props }: Text.TextBodyProps) => (
  <Text.Body className="text-gray-500" {...props} />
);

/**
 *
 * Card body
 *
 */
const CardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1", className)} {...props} />
));
CardBody.displayName = "Card Body";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardBody,
};
