import { Label } from "@repo/ui/components/ui/label";

interface RequiredLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
}

export default function RequiredLabel({
  htmlFor,
  children,
}: RequiredLabelProps) {
  return (
    <Label htmlFor={htmlFor} className="flex items-center gap-1">
      {children}
      <span className="text-destructive">*</span>
    </Label>
  );
}
