import { ChangeEvent, useCallback, useState } from "react";
import router from "next/router";
import Image from "next/image";

// utils
import { useQuery } from "@tanstack/react-query";
import { ColumnFiltersState } from "@tanstack/react-table";
import {
  generateColumn,
  generateDateColumn,
  generateStatusColumn,
  generateActionColumn,
} from "@/components/table-cell-renderers";

// ui
import * as Text from "@repo/ui/components/ui/text";
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
import { ESTIMATE_STATUSES, STATUS_VS_CHIP_INTENT } from "@/constants";

// types
import { Invoice } from "@repo/types";

const columns = [
  generateDateColumn<Invoice>("invoice_date", "Invoice Date"),
  generateColumn<Invoice>({
    key: "due_date",
    header: "Due Date",
    cell: (value, row) => {
      const dueDate = new Date(value);
      const isPastDue: boolean = row.over_due;

      return (
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
  }),
  generateColumn<Invoice>({
    key: "invoice_number",
    header: "Invoice Number",
  }),
  generateColumn<Invoice>({
    key: "total",
    header: "Invoice Total",
    cell: (value) => {
      const amount = parseFloat(value);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  }),
  generateColumn<Invoice>({
    key: "paid",
    header: "Paid Amount",
    cell: (value) => {
      const amount = parseFloat(value);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  }),
  generateStatusColumn<Invoice>("status", "Status", ESTIMATE_STATUSES),
  generateActionColumn<Invoice>("", "View Invoice", (row) =>
    router.push(`/invoices/${row.id}`),
  ),
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
