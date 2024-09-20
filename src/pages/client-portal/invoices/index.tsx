import { Layout } from "@client-portal/layout";
import router from "next/router";
import * as Text from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Column, ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { INVOICES_MOCKED_DATA } from "@/mocks/invoices.mock";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface InvoiceItem {
    description: string;
    details: string;
    quantity: number;
    rate: number;
    total: number;
}

export type Invoice = {
    id: string;
    invoice_date: string;
    due_date: string;
    invoice_number: string;
    invoice_total: number;
    paid_amount: number;
    status: "Partial" | "Paid" | "Unpaid";
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    clientName: string;
    clientAddress: string;
    notes: string;

    items: InvoiceItem[];
    subtotal: number;
    taxRate: number;
    taxAmount: number;

    invoiceNumber: string;
    dateIssued: string;
    dateDue: string;
    total: number;
};

export const STATUS_VS_CHIP_INTENT: {
    [key in Invoice["status"]]: "danger" | "success" | "action";
} = {
    Partial: "action",
    Paid: "success",
    Unpaid: "danger",
};

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
            {column.getIsSorted() === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </Button>
    );
}

const columns: ColumnDef<Invoice>[] = [
    {
        accessorKey: "invoice_date",
        header: ({ column }) => <HeaderCell column={column}>Invoice Date</HeaderCell>,
        cell: ({ row }) => new Date(row.getValue("invoice_date")).toLocaleDateString(),
    },
    {
        accessorKey: "due_date",
        header: ({ column }) => <HeaderCell column={column}>Due Date</HeaderCell>,
        cell: ({ row }) => {
            const dueDate = new Date(row.getValue("due_date"));
            const today = new Date();
            const isPastDue = dueDate < today;
            return (
                <span className={isPastDue ? "text-red-500 font-bold" : ""}>
                    {dueDate.toLocaleDateString()}
                    {isPastDue && " ⚠️"}
                </span>
            );
        },
    },
    {
        accessorKey: "invoice_number",
        header: ({ column }) => <HeaderCell column={column}>Invoice Number</HeaderCell>,
    },
    {
        accessorKey: "invoice_total",
        header: ({ column }) => <HeaderCell column={column}>Invoice Total</HeaderCell>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("invoice_total"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "paid_amount",
        header: ({ column }) => <HeaderCell column={column}>Paid Amount</HeaderCell>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("paid_amount"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => <HeaderCell column={column}>Status</HeaderCell>,
        cell: ({ row }) => {
            const status: Invoice["status"] = row.getValue("status");
            return <StatusChip intent={STATUS_VS_CHIP_INTENT[status]}>{status}</StatusChip>;
        },
    },
    {
        accessorKey: "id",
        cell: ({ row }) => {
            const invoiceId = row.getValue("id");
            console.log("🚀 ~ invoiceId:", invoiceId);
            return (
                <div className="flex gap-2">
                    <Button
                        variant="fill"
                        intent="action"
                        onClick={() => router.push(`/client-portal/invoices/${invoiceId}`)}
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
    return (
        <Layout>
            <div className="flex flex-col gap-9">
                <div className="flex justify-between">
                    <Text.Heading size="xl">Invoices</Text.Heading>
                    <div className="flex gap-3 items-center">
                        <Text.Body>Status</Text.Body>
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
                    </div>
                </div>
                <DataTable columns={columns} data={INVOICES_MOCKED_DATA} />
            </div>
        </Layout>
    );
}
