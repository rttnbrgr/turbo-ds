import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type SegmentedControlProps = Partial<React.ComponentProps<typeof ToggleGroup>> & {
    items: {
        label: string;
        children: React.ReactNode;
    }[];
};

export function SegmentedControl({ items, ...props }: SegmentedControlProps) {
    const type = props.type || "multiple";
    const size = props.size || "default";
    return (
        <ToggleGroup type={type} size={size}>
            {/* spread in the rest of the props? */}
            {items.map((item, index) => (
                <ToggleGroupItem key={index} value={item.label} aria-label={item.label}>
                    {item.children}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}
