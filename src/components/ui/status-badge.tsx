import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { textBodyVariants } from "./text";

const characterMap: Record<string, string> = {
    neutral: "-",
    success: "✓",
    warn: "!",
    danger: "!",
    action: "~",
};

const _base = "inline-flex items-center justify-center gap-1 rounded-full w-3.5 h-3.5 text-white ";
const _typography = textBodyVariants({
    size: "sm",
    className: "text-white",
});

const statusBadgeVariants = cva([_base, _typography], {
    variants: {
        intent: {
            neutral: "bg-gray-600",
            success: "bg-green-600",
            warn: "bg-yellow-600",
            danger: "bg-red-600",
            action: "bg-blue-600",
        },
    },
    defaultVariants: {
        intent: "neutral",
    },
});

export interface StatusBADGEProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof statusBadgeVariants> {}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBADGEProps>(
    ({ children, className, intent, ...props }, ref) => {
        const derivedIntent = intent || "danger";
        return (
            <div
                ref={ref}
                className={cn(
                    statusBadgeVariants({
                        intent: derivedIntent,
                        className,
                    })
                )}
                {...props}
            >
                {characterMap?.[derivedIntent]}
            </div>
        );
    }
);
StatusBadge.displayName = "Status Badge";

export { StatusBadge };
