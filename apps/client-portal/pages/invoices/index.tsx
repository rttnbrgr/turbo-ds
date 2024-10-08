import { ChangeEvent, useCallback, useState } from "react";
import router from "next/router";
import Image from "next/image";

// utils
import { useQuery } from "@tanstack/react-query";
import { Column, ColumnDef, ColumnFiltersState } from "@tanstack/react-table";

// ui
import * as Text from "@repo/ui/components/ui/text";
import { Button } from "@repo/ui/components/ui/button";
import { StatusChip } from "@repo/ui/components/ui/status-chip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { DataTable } from "@repo/ui/components/ui/data-table";

// components
import { Layout } from "@/components/layout";

// icons
import { ChevronDown, ChevronUp } from "lucide-react";

// types
import { Invoice } from "@repo/types";
import { STATUS_VS_CHIP_INTENT } from "@/constants";

function HeaderCell({
  children,
  column,
  sortable = true,
}: React.PropsWithChildren<{
  column: Column<Invoice, unknown>;
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

const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoice_date",
    header: ({ column }) => (
      <HeaderCell column={column}>Invoice Date</HeaderCell>
    ),
    cell: ({ row }) =>
      new Date(row.getValue("invoice_date")).toLocaleDateString(),
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => <HeaderCell column={column}>Due Date</HeaderCell>,
    cell: ({ row }) => {
      const dueDate = new Date(row.getValue("due_date"));
      const isPastDue: boolean = row.original.over_due;

      return (
        // replace with the status badge when i merge in the components branch
        <span className={isPastDue ? "flex gap-2 items-center" : ""}>
          <span className={`${isPastDue ? "text-red-500" : ""}`}>
            {dueDate.toLocaleDateString()}
          </span>
          {isPastDue && (
            <Image alt="!" src="/alert.svg" width={15} height={15} />
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "invoice_number",
    header: ({ column }) => (
      <HeaderCell column={column}>Invoice Number</HeaderCell>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <HeaderCell column={column}>Invoice Total</HeaderCell>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <HeaderCell column={column}>Paid Amount</HeaderCell>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("paid"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <HeaderCell column={column}>Status</HeaderCell>,
    cell: ({ row }) => {
      const status: Invoice["status"] = row.getValue("status");
      return (
        <StatusChip intent={STATUS_VS_CHIP_INTENT[status]}>{status}</StatusChip>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => {
      return null;
    },
    cell: ({ row }) => {
      const invoiceId = row.getValue("id");
      return (
        <div className="flex gap-2">
          <Button
            variant="fill"
            intent="action"
            onClick={() => router.push(`/invoices/${invoiceId}`)}
          >
            View Invoice
          </Button>
          <Button variant="outline">Print</Button>
        </div>
      );
    },
  },
];

export default function Invoices() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: invoices, isLoading } = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: () =>
      fetch("https://api.example.com/invoices").then((res) => res.json()),
  });

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    const value = e.target.value;
    if (value === "default") {
      return setColumnFilters([]);
    }
    setColumnFilters([
      {
        id: "status",
        value,
      },
    ]);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-9">
        <div className="flex justify-between">
          <Text.Heading size="xl">Invoices</Text.Heading>
          <div className="flex gap-3 items-center">
            <Text.Body>Status</Text.Body>
            <form onChange={handleFilterChange}>
              <Select defaultValue="default">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">All Statuses</SelectItem>
                  {Object.keys(STATUS_VS_CHIP_INTENT).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </form>
          </div>
        </div>
        {isLoading ? (
          <Text.Body>Loading invoices...</Text.Body>
        ) : invoices?.length ? (
          <DataTable
            columns={columns}
            columnFilters={columnFilters}
            data={invoices}
          />
        ) : (
          <Text.Body>No invoices found</Text.Body>
        )}
      </div>
    </Layout>
  );
}
