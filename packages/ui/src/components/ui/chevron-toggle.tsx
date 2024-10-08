import { cn } from "@repo/ui/lib/utils";
import { ChevronRight } from "lucide-react";

type ChevronToggleProps = {
  isOpen: boolean;
  alt?: boolean;
  classNames?: string;
  size?: number;
};

export const ChevronToggle = ({
  isOpen = false,
  classNames,
  size = 12,
  alt = false,
  ...props
}: ChevronToggleProps) => {
  const _base = "rounded text-current transition";
  let _rotate;

  if (alt) {
    _rotate = isOpen ? "rotate" : "rotate-180";

    return (
      <div className={cn(_base, _rotate, classNames)}>
        <ChevronRight size={size} />
      </div>
    );
  }

  _rotate = isOpen ? "rotate-90" : "rotate";

  return (
    <div className={cn(_base, _rotate, classNames)}>
      <ChevronRight size={size} />
    </div>
  );
};
