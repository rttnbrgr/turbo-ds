import * as Text from "@/components/ui/text";
import { Layout } from "@client-portal/layout";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Estimate, ESTIMATES_FIXTURE } from "@/mocks/estimates";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import router from "next/router";
import { ArrowUpDown } from "lucide-react";
import { STATUS_VS_CHIP_INTENT } from "@/lib/constants";

function HeaderCell({ children, column, sortable = true }) {
  if (!sortable) {
    return <Text.Heading size="sm">{children}</Text.Heading>;
  }
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="text-sm font-bold"
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
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
    accessorKey: "request_date",
    header: ({ column }) => {
      return <HeaderCell column={column}>Request Date</HeaderCell>;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("request_date")
            ? new Date(row.getValue("request_date")).toLocaleDateString()
            : "--"}
        </div>
      );
    },
  },
  {
    accessorKey: "visit_date",
    header: ({ column }) => {
      return <HeaderCell column={column}>Visit Date</HeaderCell>;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("visit_date")
            ? new Date(row.getValue("visit_date")).toLocaleDateString()
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
          onClick={() => router.push(`/client-portal/estimates/${estimateId}`)}
        >
          View Estimate
        </Button>
      );
    },
  },
];

export default function Estimates() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Text.Heading size={"xl"}>Estimates</Text.Heading>
          <div className="flex gap-3 items-center">
            <div className="text-primary">Status</div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(STATUS_VS_CHIP_INTENT).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button intent="action">+ Request an Estimate</Button>
          </div>
        </div>
        <DataTable columns={columns} data={ESTIMATES_FIXTURE} />
      </div>
    </Layout>
  );
}
