import { MetricCard } from "../components/metric-card";
import { Card, CardBody, CardTitle } from "@repo/ui/components/ui/card";
import { DataTable } from "@repo/ui/components/ui/data-table";
import { StatusChip } from "@repo/ui/components/ui/status-chip";
import * as Text from "@repo/ui/components/ui/text";
import { formatDate } from "../utils/formatDate";
import { Layout } from "../components/layout";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import router from "next/router";
import { HeaderCell } from "@/components/header-cell";
import { useQuery } from "@tanstack/react-query";
import { Estimate, Invoice } from "@repo/types/index";
import { Property } from "../../../packages/types/property";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";

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

type UpcomingVisit = Pick<
  Estimate,
  "id" | "status" | "visitDate" | "lineItems"
> & {
  property?: Pick<Property, "name" | "address">;
};

const upcomingVisitColumns: ColumnDef<UpcomingVisit>[] = [
  {
    accessorKey: "visitDate",
    header: ({ column }) => (
      <HeaderCell<UpcomingVisit> column={column}>Date</HeaderCell>
    ),
    cell: ({ row }) => {
      const date = row.original.visitDate;
      return (
        <Text.Body size="md">
          {date ? formatDate(new Date(date)) : "-"}
        </Text.Body>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <HeaderCell<UpcomingVisit> column={column}>Title</HeaderCell>
    ),
    cell: ({ row }) => {
      const lineItems = row.original.lineItems;
      const title = lineItems?.[0]?.name;
      return title;
    },
  },
  {
    accessorKey: "property.name",
    header: ({ column }) => (
      <HeaderCell<UpcomingVisit> column={column}>Property Name</HeaderCell>
    ),
  },
  {
    accessorKey: "property.address",
    header: ({ column }) => (
      <HeaderCell<UpcomingVisit> column={column}>Property Address</HeaderCell>
    ),
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <HeaderCell<UpcomingVisit> column={column}>Type</HeaderCell>
    ),
    cell: ({ row }) => {
      // TODO JT - what is type in terms of estimates?
      const type = (row.original as any).type;
      return (
        <StatusChip intent={type === "visit" ? "neutral" : "action"}>
          {type === "visit" ? "Visit" : "Invoice"}
        </StatusChip>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <HeaderCell<UpcomingVisit> column={column} sortable={false}>
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
          size="sm"
          onClick={() => router.push(`/estimates/${estimateId}`)}
        >
          View Estimate
        </Button>
      );
    },
  },
];

type UnpaidInvoice = Pick<
  Invoice,
  "id" | "total" | "paid" | "status" | "invoice_date"
>;

const unpaidInvoicesColumns: ColumnDef<UnpaidInvoice>[] = [
  {
    accessorKey: "invoice_date",
    header: ({ column }) => (
      <HeaderCell<UnpaidInvoice> column={column}>Date</HeaderCell>
    ),
    cell: ({ row }) => {
      const date = row.original.invoice_date;
      return <Text.Body size="md">{formatDate(new Date(date))}</Text.Body>;
    },
  },
  {
    accessorKey: "invoice_number",
    header: ({ column }) => (
      <HeaderCell<UnpaidInvoice> column={column}>Invoice Number</HeaderCell>
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <HeaderCell<UnpaidInvoice> column={column}>Invoice Total</HeaderCell>
    ),
  },
  {
    accessorKey: "paid",
    header: ({ column }) => (
      <HeaderCell<UnpaidInvoice> column={column}>Paid Amount</HeaderCell>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <HeaderCell<UnpaidInvoice> column={column}>Status</HeaderCell>
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <StatusChip intent={status === "Unpaid" ? "danger" : "success"}>
          {status}
        </StatusChip>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <HeaderCell<UnpaidInvoice> column={column} sortable={false}>
          {" "}
        </HeaderCell>
      );
    },
    cell: ({ row }) => {
      const invoiceId = row.getValue("id");
      return (
        <div className="flex gap-2">
          <Button
            variant="fill"
            intent="action"
            size="sm"
            onClick={() => router.push(`/invoices/${invoiceId}`)}
          >
            View Invoice
          </Button>
          <Button variant="outline" size="sm">
            Print
          </Button>
        </div>
      );
    },
  },
];

export default function ClientPortalIndex() {
  const [upcomingVisitColumnFilters, setUpcomingVisitColumnFilters] =
    useState<ColumnFiltersState>([]);
  const [unpaidInvoicesColumnFilters, setUnpaidInvoicesColumnFilters] =
    useState<ColumnFiltersState>([]);

  const { data: estimates } = useQuery<Estimate[]>({
    queryKey: ["estimates"],
    queryFn: () =>
      fetch("https://api.example.com/estimates").then((res) => res.json()),
  });

  const { data: properties } = useQuery<Property[]>({
    queryKey: ["properties"],
    queryFn: () =>
      fetch("https://api.example.com/properties").then((res) => res.json()),
  });

  const { data: invoices } = useQuery<Invoice[]>({
    queryKey: ["invoices"],
    queryFn: () =>
      fetch("https://api.example.com/invoices").then((res) => res.json()),
  });

  const upcomingVisits = useMemo(() => {
    return estimates?.map((estimate) => {
      const property = properties?.find((p) => p.id === estimate.propertyId);
      return {
        ...estimate,
        property: {
          name: property?.name ?? "",
          address: property?.address ?? "",
        },
      };
    });
  }, [estimates, properties]);

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>Home</Text.Heading>

        <Alert variant="warn">
          <AlertTitle>Payment Information Not Added</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            Want to save time and pay for visits with saved payment information?
            Click below or go to My Profile to add this information. Note that
            to save your payment information, you must secure your profile with
            a username and password.
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Add Payment Information
              </Button>
              <Button variant="outline" size="sm">
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric) => (
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
            {upcomingVisits && (
              <DataTable
                columns={upcomingVisitColumns}
                data={upcomingVisits}
                columnFilters={upcomingVisitColumnFilters}
                setColumnFilters={setUpcomingVisitColumnFilters}
              />
            )}
          </CardBody>
        </Card>

        <Card>
          <CardTitle>Unpaid Invoices</CardTitle>
          <CardBody>
            {invoices && (
              <DataTable
                columns={unpaidInvoicesColumns}
                data={invoices}
                columnFilters={unpaidInvoicesColumnFilters}
                setColumnFilters={setUnpaidInvoicesColumnFilters}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
