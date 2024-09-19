import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { textBodyVariants } from "./text";

/**
 * Base styles
 */
const _base = "p-3 flex flex-col gap-2 gap-1 w-full rounded bg-opacity-30";
const _typography = textBodyVariants({
    size: "sm",
    className: "text-gray-950",
});
const _border = "border border-solid border-transparent ";

const MessageBannerVariants = cva([_base, _typography, _border], {
    variants: {
        intent: {
            neutral: "bg-gray-100 border-gray-200",
            success: "bg-green-100 border-green-200",
            warn: "bg-yellow-100 border-yellow-200",
            danger: "bg-red-100 border-red-200",
            action: "bg-blue-100 border-blue-200",
        },
    },
    defaultVariants: {
        intent: "neutral",
    },
});

export interface MessageBannerProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof MessageBannerVariants> {
    title: string;
    description: string;
}

const MessageBanner = React.forwardRef<HTMLDivElement, MessageBannerProps>(
    ({ children, className, intent, title, description, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    MessageBannerVariants({
                        intent,
                        className,
                    })
                )}
                {...props}
            >
                <div className="font-bold">{title}</div>
                <div>{description}</div>
            </div>
        );
    }
);
MessageBanner.displayName = "Message Banner";

export { MessageBanner };
