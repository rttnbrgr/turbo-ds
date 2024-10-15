"use client";

import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";
import {
  ColumnDef,
  ColumnFilter,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";

import { debounce } from "lodash"; // Make sure to import debounce from lodash

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnFilters?: ColumnFilter[];
  setColumnFilters?: Dispatch<SetStateAction<ColumnFiltersState>>;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  columnFilters,
  setColumnFilters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [showShadow, setShowShadow] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);
  const tableContentRef = useRef<HTMLTableElement>(null);

  console.log("showShadow", showShadow);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  // show the shadow when the table is scrollable and not at the right end
  useEffect(() => {
    const checkScroll = () => {
      if (tableRef.current && tableContentRef.current) {
        const containerRect = tableRef.current.getBoundingClientRect();
        const tableRect = tableContentRef.current.getBoundingClientRect();

        const isScrollable = tableRect.width > containerRect.width;
        const isAtRightEnd =
          Math.abs(tableRect.right - containerRect.right) <= 1;

        setShowShadow(isScrollable && !isAtRightEnd);
      }
    };

    // Debounce the checkScroll function
    const debouncedCheckScroll = debounce(checkScroll, 100);

    const tableElement = tableRef.current;
    if (tableElement) {
      // Add event listeners to the closest scrollable parent
      const scrollableParent = tableElement.closest(".overflow-auto") || window;
      scrollableParent.addEventListener("scroll", checkScroll);
      scrollableParent.addEventListener("touchmove", debouncedCheckScroll);
      window.addEventListener("resize", debouncedCheckScroll);
      checkScroll(); // Initial check
    }

    return () => {
      if (tableElement) {
        const scrollableParent =
          tableElement.closest(".overflow-auto") || window;
        scrollableParent.removeEventListener("scroll", checkScroll);
        scrollableParent.removeEventListener("touchmove", debouncedCheckScroll);
        window.removeEventListener("resize", debouncedCheckScroll);
      }
      debouncedCheckScroll.cancel(); // Cancel any pending debounced calls
    };
  }, []);

  return (
    <div className="relative rounded-md border data-table">
      <div
        ref={tableRef}
        className="overflow-auto"
        style={{
          maxWidth: "100%",
          position: "relative",
        }}
      >
        <Table ref={tableContentRef}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div
          className={`absolute top-0 right-0 bottom-0 w-4 pointer-events-none transition-opacity duration-300 ${
            showShadow ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: "inset -10px 0 8px -8px rgba(0, 0, 0, 0.15)",
          }}
        />
      </div>
    </div>
  );
}
