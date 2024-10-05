import { ChangeEvent, PropsWithChildren, useCallback, useState } from "react";
import router from "next/router";

import { Column, ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

// components
import { Layout } from "@/components/layout";
import { RequestEstimateDialog } from "../../components/request-estimate";

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
import { Body } from "@repo/ui/components/ui/text";

// types
import { Estimate } from "@repo/types";

// icons
import { ChevronDown, ChevronUp } from "lucide-react";

// constants
import { STATUS_VS_CHIP_INTENT } from "@/constants";

function HeaderCell({
  children,
  column,
  sortable = true,
}: PropsWithChildren<{
  column: Column<Estimate, unknown>;
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

export const columns: ColumnDef<Estimate>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <HeaderCell column={column}>Estimates</HeaderCell>;
    },
  },
  {
    accessorKey: "requestDate",
    header: ({ column }) => {
      return <HeaderCell column={column}>Request Date</HeaderCell>;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("requestDate")
            ? new Date(row.getValue("requestDate")).toLocaleDateString()
            : "--"}
        </div>
      );
    },
  },
  {
    accessorKey: "visitDate",
    header: ({ column }) => {
      return <HeaderCell column={column}>Visit Date</HeaderCell>;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("visitDate")
            ? new Date(row.getValue("visitDate")).toLocaleDateString()
            : "--"}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <HeaderCell column={column}>Total</HeaderCell>;
    },
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total);

      return (
        <div className="text-right font-medium">{total ? formatted : "--"}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <HeaderCell column={column}>Status</HeaderCell>;
    },
    cell: ({ row }) => {
      const status: Estimate["status"] = row.getValue("status");
      return (
        <StatusChip intent={STATUS_VS_CHIP_INTENT[status]}>{status}</StatusChip>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <HeaderCell column={column} sortable={false}>
          {" "}
        </HeaderCell>
      );
    },
    cell: ({ row }) => {
      const estimateId = row.getValue("id");
      return (
        <Button
          variant="fill"
          intent="action"
          onClick={() => router.push(`/estimates/${estimateId}`)}
        >
          View Estimate
        </Button>
      );
    },
  },
];

export default function Estimates() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: estimates, isLoading } = useQuery<Estimate[]>({
    queryKey: ["estimates"],
    queryFn: () =>
      fetch("https://api.example.com/estimates").then((res) => res.json()),
  });

  const handleSubmit = useCallback((args: any) => {
    console.log("submit", args);
  }, []);

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
          <Text.Heading size={"xl"}>Estimates</Text.Heading>
          <div className="flex gap-3 items-center">
            <Body>Status</Body>
            <form onChange={handleFilterChange}>
              <Select defaultValue="default">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={"all"} value={"default"}>
                    All Statuses
                  </SelectItem>
                  {Object.keys(STATUS_VS_CHIP_INTENT).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </form>

            <RequestEstimateDialog
              userId="00124"
              onSubmit={handleSubmit}
              trigger={<Button intent="action">+ Request an Estimate</Button>}
            />
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : estimates?.length ? (
          <DataTable
            columns={columns}
            data={estimates}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        ) : (
          <div>No estimates found</div>
        )}
      </div>
    </Layout>
  );
}
