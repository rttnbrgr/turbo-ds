import { MetricCard } from "@/components/client-portal/metric-card";
import { Card, CardBody, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusChip } from "@/components/ui/status-chip";
import * as Text from "@/components/ui/text";
import { formatDate } from "@/lib/utils";
import { Layout } from "@client-portal/layout";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

const metrics = [
  {
    title: "Outstanding Balance",
    value: 110.5,
  },
  {
    title: "Credit",
    value: 15.0,
  },
  {
    title: "Past Due",
    value: 0.0,
  },
];

type UpcomingVisit = {
  date: string;
  type: "visit" | "invoice";
  title: string;
  propertyName: string;
  propertyAddress: string;
};

const upcomingVisits: UpcomingVisit[] = [
  {
    date: "08/14/24",
    type: "visit",
    title: "Weekly Recurring Lawn Care",
    propertyName: "Beier Residence",
    propertyAddress: "7818 Big Sky Dr # 107, Madison, WI 53719",
  },
  {
    date: "08/21/24",
    type: "invoice",
    title: "Weekly Recurring Lawn Care",
    propertyName: "Beier Residence",
    propertyAddress: "7818 Big Sky Dr # 107, Madison, WI 53719",
  },
];

const upcomingVisitColumns: ColumnDef<UpcomingVisit>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      return <Text.Body size="md">{formatDate(new Date(date))}</Text.Body>;
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "propertyName",
    header: "Property Name",
  },
  {
    accessorKey: "propertyAddress",
    header: "Property Address",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <StatusChip intent={type === "visit" ? "neutral" : "action"}>
          {type === "visit" ? "Visit" : "Invoice"}
        </StatusChip>
      );
    },
  },
];

type UnpaidInvoice = {
  date: string;
  invoiceNumber: string;
  total: number;
  paidAmount: number;
  status: "unpaid" | "paid" | "partial";
};

const unpaidInvoices: UnpaidInvoice[] = [
  {
    date: "08/14/24",
    invoiceNumber: "14",
    total: 200,
    paidAmount: 50,
    status: "partial",
  },
  {
    date: "08/21/24",
    invoiceNumber: "15",
    total: 200,
    paidAmount: 0,
    status: "unpaid",
  },
];

const unpaidInvoicesColumns: ColumnDef<UnpaidInvoice>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.original.date;
      return <Text.Body size="md">{formatDate(new Date(date))}</Text.Body>;
    },
  },
  {
    accessorKey: "invoiceNumber",
    header: "Invoice Number",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "paidAmount",
    header: "Paid Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <StatusChip intent={status === "unpaid" ? "danger" : "success"}>
          {status}
        </StatusChip>
      );
    },
  },
];

export default function ClientPortalIndex() {
  const [upcomingVisitColumnFilters, setUpcomingVisitColumnFilters] =
    useState<ColumnFiltersState>([]);
  const [unpaidInvoicesColumnFilters, setUnpaidInvoicesColumnFilters] =
    useState<ColumnFiltersState>([]);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>Home</Text.Heading>

        <div className="grid grid-cols-3 gap-4">
          {metrics.map(metric => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
            />
          ))}
        </div>

        <Card>
          <CardTitle>Upcoming Visits</CardTitle>
          <CardBody>
            <DataTable
              columns={upcomingVisitColumns}
              data={upcomingVisits}
              columnFilters={upcomingVisitColumnFilters}
              setColumnFilters={setUpcomingVisitColumnFilters}
            />
          </CardBody>
        </Card>

        <Card>
          <CardTitle>Unpaid Invoices</CardTitle>
          <CardBody>
            <DataTable
              columns={unpaidInvoicesColumns}
              data={unpaidInvoices}
              columnFilters={unpaidInvoicesColumnFilters}
              setColumnFilters={setUnpaidInvoicesColumnFilters}
            />
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
