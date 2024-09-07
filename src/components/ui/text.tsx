import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 *
 * Body Text
 *
 */

const _BODY_BASE = "font-sans not-italic text-sm";

const textBodyVariants = cva(_BODY_BASE, {
  variants: {
    weight: {
      default: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
    size: {
      sm: "text-xs",
      default: "text-sm",
    },
  },
  defaultVariants: {
    weight: "default",
    size: "default",
  },
});

export interface TextBodyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textBodyVariants> {
  asChild?: boolean;
}

const TextBody = React.forwardRef<HTMLParagraphElement, TextBodyProps>(
  ({ className, weight, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        className={cn(textBodyVariants({ weight, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TextBody.displayName = "Text";

/**
 *
 * Header
 *
 */

const _HEADER_BASE = "font-sans not-italic font-bold leading-normal capitalize";

const textHeadingVariants = cva(_HEADER_BASE, {
  variants: {
    size: {
      sm: "text-base",
      default: "text-xl",
      lg: "text-2xl",
      xl: "text-4xl", // not exact to henry
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface TextHeadingProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textHeadingVariants> {
  asChild?: boolean;
}

const TextHeading = React.forwardRef<HTMLParagraphElement, TextHeadingProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h2";
    return (
      <Comp
        className={cn(textHeadingVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TextHeader.displayName = "Header";

/**
 *
 * Keyword
 *
 */

const _KEYWORD_BASE = "font-sans not-italic font-bold tracking-wide uppercase";

const textKeywordVariants = cva(_KEYWORD_BASE, {
  variants: {
    size: {
      sm: "text-xs",
      default: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface TextKeywordProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textKeywordVariants> {
  asChild?: boolean;
}

const TextKeyword = React.forwardRef<HTMLParagraphElement, TextKeywordProps>(
  ({ className, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        className={cn(textKeywordVariants({ size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
TextKeyword.displayName = "Keyword";

const Body = TextBody;
const Heading = TextHeading;
const Keyword = TextKeyword;

export {
  Body,
  Heading,
  Keyword,
  textBodyVariants,
  textHeadingVariants,
  textKeywordVariants,
};
