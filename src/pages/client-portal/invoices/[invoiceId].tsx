import React from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/client-portal/layout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Body, Heading } from "@/components/ui/text";
import Link from "next/link";
import Image from "next/image";
import { ChevronsLeft } from "lucide-react";
import { useRouter } from "next/router";
import { INVOICES_MOCKED_DATA } from "@/mocks/invoices.mock";
import { Invoice, STATUS_VS_CHIP_INTENT } from "@/pages/client-portal/invoices";
import { StatusChip } from "@/components/ui/status-chip";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function InvoicePage() {
    const router = useRouter();
    const { invoiceId } = router.query;

    const invoice = INVOICES_MOCKED_DATA.find((invoice) => invoice.id === invoiceId);

    if (!invoice) {
        return (
            <Layout>
                <div>Invoice not found</div>
            </Layout>
        );
    }

    const {
        id,
        status,
        companyName,
        companyAddress,
        companyPhone,
        companyEmail,
        clientName,
        clientAddress,
        notes,
        invoiceNumber,
        dateIssued,
        dateDue,
        items,
        subtotal,
        taxRate,
        taxAmount,
        total,
        paid,
    } = invoice as Invoice;

    const dueAmount = total - paid || 0;

    const formattedDueDate = new Date(dateDue).toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
    });

    return (
        <Layout>
            <div className="flex flex-col gap-9 p-8 bg-white">
                <div className="flex justify-between items-center">
                    <Link href="/client-portal/invoices" className="flex gap-2 items-center">
                        <ChevronsLeft className="text-blue-600" size={12} />
                        <Body size="sm" className="text-blue-600">
                            Back to All Invoices
                        </Body>
                    </Link>
                    <div className="flex gap-3">
                        <Button variant="outline">Print</Button>
                        <Button variant="fill" intent="action">
                            Pay Invoice
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    {/* what about past due and partial */}
                    {/* what about unpaid but not past due */}
                    {status === "Unpaid" ? (
                        <Alert variant="destructive">
                            <AlertTitle>This invoice is past Due</AlertTitle>
                            <AlertDescription>{`The $${dueAmount} balance on this invoice has not been paid and is now late. Please pay as soon as possible to avoid late charges.`}</AlertDescription>
                        </Alert>
                    ) : null}
                    {status === "Partial" ? (
                        <Alert variant="warn">
                            <AlertTitle>This invoice is only partially paid</AlertTitle>
                            <AlertDescription>{`A partial amount of $${paid} has been paid towards this invoice, while $${dueAmount} is still due. Please submit this payment before it’s due date of ${formattedDueDate}.`}</AlertDescription>
                        </Alert>
                    ) : null}
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <Heading size="lg">Invoice</Heading>
                                <StatusChip intent={STATUS_VS_CHIP_INTENT[status]}>
                                    {status}
                                </StatusChip>
                            </div>

                            <div className="flex flex-col">
                                <Heading size="sm">{companyName}</Heading>
                                <Body size="sm">{companyAddress}</Body>
                                <Body size="sm">{companyPhone}</Body>
                                <Body size="sm">{companyEmail}</Body>
                            </div>
                        </div>
                        <div>
                            <Image
                                alt="Logo"
                                src="/logo.png"
                                width={208}
                                height={90}
                                className="w-full hidden md:block"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 w-full items-start">
                        <div className="flex flex-col">
                            <Heading size="sm">Bill To</Heading>
                            <Body size="sm">{clientName}</Body>
                            <Body size="sm">{clientAddress}</Body>
                        </div>
                        <div className="col-start-2">
                            <Heading size="sm">Notes</Heading>
                            <Body size="sm">{notes}</Body>
                        </div>
                        <div className="grid grid-cols-2 items-center gap-x-3 self-end col-start-3">
                            <Body size="sm" weight="bold">
                                Invoice Number
                            </Body>
                            <Body size="sm">{invoiceNumber}</Body>
                            <Body size="sm" weight="bold">
                                Date Issued
                            </Body>
                            <Body size="sm">{dateIssued}</Body>
                            <Body size="sm" weight="bold">
                                Date Due
                            </Body>
                            <Body size="sm">{formattedDueDate}</Body>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Description</TableHead>
                                <TableHead>Qty./Hrs.</TableHead>
                                <TableHead>Cost/Rate</TableHead>
                                <TableHead>Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div>
                                            <strong>{item.description}</strong>
                                            <p>{item.details}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.quantity.toFixed(2)}</TableCell>
                                    <TableCell>${item.rate.toFixed(2)}</TableCell>
                                    <TableCell>${item.total.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex justify-end">
                        <div className="w-1/3">
                            <div className="flex justify-between">
                                <Body size="sm" weight="bold">
                                    Subtotal
                                </Body>
                                <Body size="sm">${subtotal.toFixed(2)}</Body>
                            </div>
                            <div className="flex justify-between">
                                <Body size="sm" weight="bold">
                                    Tax ({(taxRate * 100).toFixed(2)}%)
                                </Body>
                                <Body size="sm">${taxAmount.toFixed(2)}</Body>
                            </div>
                            <div className="flex justify-between mt-2">
                                <Heading size="sm">TOTAL DUE</Heading>
                                <Heading size="sm">${total.toFixed(2)}</Heading>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Heading size="sm">Thank You For Your Business!</Heading>
                        <Body size="sm">
                            If you have any questions about this invoice, don't hesitate to reach
                            out using the contact information above.
                        </Body>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
