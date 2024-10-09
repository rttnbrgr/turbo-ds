import { useMemo, useState } from "react";
import router from "next/router";

// types
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { Estimate, Invoice, PaymentInfo, Property } from "@repo/types";

// ui
import { MetricCard } from "../components/metric-card";
import { Card, CardBody, CardTitle } from "@repo/ui/components/ui/card";
import { DataTable } from "@repo/ui/components/ui/data-table";
import * as Text from "@repo/ui/components/ui/text";
import { Layout } from "../components/layout";
import { Button } from "@repo/ui/components/ui/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";

// hooks
import { useQuery } from "@tanstack/react-query";

// constants
import { ESTIMATE_STATUSES } from "@/constants";

// utils
import {
  generateColumn,
  generateDateColumn,
  generateStatusColumn,
  generateActionColumn,
} from "../components/table-cell-renderers";

const metrics: {
  title: string;
  value: number;
  intent: "neutral" | "warn" | "danger" | "success";
}[] = [
  {
    title: "Outstanding Balance",
    value: 110.5,
    intent: "neutral",
  },
  {
    title: "Credit",
    value: 15.0,
    intent: "warn",
  },
  {
    title: "Past Due",
    value: 0.0,
    intent: "danger",
  },
];

type UpcomingVisit = Pick<
  Estimate,
  "id" | "status" | "visitDate" | "lineItems"
> & {
  property?: Pick<Property, "name" | "address">;
};

const upcomingVisitColumns: ColumnDef<UpcomingVisit>[] = [
  generateDateColumn("visitDate", "Date"),
  generateColumn<UpcomingVisit>({
    key: "title",
    header: "Title",
    accessorFn: (row) => row.lineItems?.[0]?.name,
  }),
  generateColumn<UpcomingVisit>({
    key: "property.name",
    header: "Property Name",
  }),
  generateColumn<UpcomingVisit>({
    key: "property.address",
    header: "Property Address",
  }),
  generateStatusColumn<UpcomingVisit>("status", "Type", ESTIMATE_STATUSES),
  generateActionColumn<UpcomingVisit>("", "View Estimate", (row) =>
    router.push(`/estimates/${row.id}`),
  ),
];

type UnpaidInvoice = Pick<
  Invoice,
  "id" | "total" | "paid" | "status" | "invoice_date"
>;

const unpaidInvoicesColumns: ColumnDef<UnpaidInvoice>[] = [
  generateDateColumn("invoice_date", "Date"),
  generateColumn<UnpaidInvoice>({
    key: "invoice_number",
    header: "Invoice Number",
  }),
  generateColumn<UnpaidInvoice>({
    key: "total",
    header: "Invoice Total",
  }),
  generateColumn<UnpaidInvoice>({
    key: "paid",
    header: "Paid Amount",
  }),
  generateStatusColumn<UnpaidInvoice>("status", "Status", {
    Unpaid: { text: "Unpaid", intent: "danger" },
    Paid: { text: "Paid", intent: "success" },
    Partial: { text: "Partial", intent: "warn" },
  }),
  generateColumn<UnpaidInvoice>({
    key: "action",
    header: "",
    sortable: false,
    cell: (_, row) => (
      <div className="flex gap-2">
        <Button
          variant="fill"
          intent="action"
          size="sm"
          onClick={() => router.push(`/invoices/${row.id}`)}
        >
          View Invoice
        </Button>
        <Button variant="outline" size="sm">
          Print
        </Button>
      </div>
    ),
  }),
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

  const { data: payment } = useQuery<PaymentInfo[]>({
    queryKey: ["payment"],
    queryFn: () =>
      fetch("https://api.example.com/payment/none").then((res) => res.json()),
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

        {!payment && (
          <Alert variant="warn">
            <AlertTitle>Payment Information Not Added</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              Want to save time and pay for visits with saved payment
              information? Click below or go to My Profile to add this
              information. Note that to save your payment information, you must
              secure your profile with a username and password.
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
        )}

        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              intent={metric.intent}
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
