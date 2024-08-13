import * as React from "react";
import * as Text from "@/components/ui/text";

interface ConditionBlockProps extends Text.TextBodyProps {
  block: string;
}

const ConditionBlock = ({ block, children, ...props }: ConditionBlockProps) => (
  <Text.Body>
    <span className="font-bold">{block}</span> {children}
  </Text.Body>
);

export { ConditionBlock };
