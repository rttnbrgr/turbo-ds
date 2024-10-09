import { PropsWithChildren } from "react";
import { Column } from "@tanstack/react-table";
import * as Text from "@repo/ui/components/ui/text";
import { Button } from "@repo/ui/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export function HeaderCell<T>({
  children,
  column,
  sortable = true,
}: PropsWithChildren<{
  column: Column<T, unknown>;
  sortable?: boolean;
}>) {
  if (!sortable) {
    return <Text.Heading size="sm">{children}</Text.Heading>;
  }
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="text-sm font-bold p-0"
    >
      {children}
      {column.getIsSorted() === "asc" ? (
        <ChevronUp size={12} />
      ) : (
        <ChevronDown size={12} />
      )}
    </Button>
  );
}
