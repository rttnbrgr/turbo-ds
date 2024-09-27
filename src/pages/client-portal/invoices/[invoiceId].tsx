import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/client-portal/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentDialog } from "../payment-dialog";
import { AttachedImages } from "../attached-images";

export default function InvoicePage() {
  const router = useRouter();
  const { invoiceId } = router.query;

  const invoice = INVOICES_MOCKED_DATA.find(
    invoice => invoice.id === invoiceId
  );

  const formatDate = useCallback((date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  }, []);

  const handleClosePaymentDialog = useCallback(() => {
    // close the dialog here...
    // LEGZ TODO: need to move dialog state to this component to do this
  }, []);

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
    invoice_number,
    items,
    subtotal,
    taxRate,
    taxAmount,
    total,
    paid,
    assets,
    paid_date,
    issued_date,
    due_date,
  } = invoice as Invoice;

  const dueAmount = total - paid || 0;

  const formattedDueDate = formatDate(due_date);
  const formattedIssuedDate = formatDate(issued_date);
  const formattedDatePaid = formatDate(paid_date);

  const calculateTotal = () => {
    switch (status) {
      case "Paid":
        return "$0.00";
      case "Partial":
        return `$${dueAmount.toFixed(2)}`;
      case "Unpaid":
      default:
        return `$${total.toFixed(2)}`;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Link
            href="/client-portal/invoices"
            className="flex gap-2 items-center"
          >
            <ChevronsLeft className="text-blue-600" size={12} />
            <Body size="sm" className="text-blue-600">
              Back to All Invoices
            </Body>
          </Link>
          <Dialog>
            <div className="flex gap-3">
              <Button variant="outline">Print</Button>

              {status !== "Paid" ? (
                <DialogTrigger>
                  <Button variant="fill" intent="action">
                    Pay Invoice
                  </Button>
                </DialogTrigger>
              ) : null}

              <DialogContent className="font-sans">
                <DialogHeader>
                  <DialogTitle>Pay Invoice</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <PaymentDialog
                    onClose={handleClosePaymentDialog}
                    invoice={invoice}
                  />
                </DialogDescription>
              </DialogContent>
            </div>
          </Dialog>
        </div>
        <div className="rounded-md border bg-white p-6">
          <div className="flex flex-col gap-6">
            {status === "Unpaid" ? (
              <Alert variant="destructive">
                <AlertTitle>This invoice is past Due</AlertTitle>
                <AlertDescription>{`The $${dueAmount} balance on this invoice has not been paid and is now late. Please pay as soon as possible to avoid late charges.`}</AlertDescription>
              </Alert>
            ) : null}
            {status === "Partial" ? (
              <Alert variant="warn">
                <AlertTitle>This invoice is only partially paid</AlertTitle>
                <AlertDescription>{`A partial amount of $${paid} has been paid towards this invoice, while $${dueAmount} is still due. Please submit this payment before it's due date of ${formattedDueDate}.`}</AlertDescription>
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

            <div className="grid grid-cols-6 w-full items-start">
              <div className="flex flex-col">
                <Heading size="sm">Bill To</Heading>
                <Body size="sm">{clientName}</Body>
                <Body size="sm">{clientAddress}</Body>
              </div>
              <div className="col-start-3">
                <Heading size="sm">Notes</Heading>
                <Body size="sm">{notes}</Body>
              </div>

              <div className="grid-cols-2 col-start-6 items-center self-end ">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold p-2">
                        Invoice Number
                      </TableCell>
                      <TableCell className="p-2 text-right">
                        {invoice_number}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="p-2 font-bold">
                        Date Issued
                      </TableCell>
                      <TableCell className="p-2 text-right">
                        {formattedIssuedDate}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      className={
                        due_date > issued_date && status !== "Paid"
                          ? `text-destructive`
                          : ""
                      }
                    >
                      <TableCell className="p-2 font-bold">Date Due</TableCell>
                      <TableCell className="p-2 text-right">
                        {formattedDueDate}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-t border-black/20">
                  <TableHead className="w-2/3">Description</TableHead>
                  <TableHead>Qty./Hrs.</TableHead>
                  <TableHead className="text-right">Cost/Rate</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items?.map((item, index) => (
                  <TableRow key={index} className={`border-t border-solid`}>
                    <TableCell>
                      <Heading size="sm">{item.description}</Heading>
                      <Body size="sm">{item.details}</Body>
                    </TableCell>
                    <TableCell>{item.quantity.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      ${item.rate.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

              <TableFooter className="bg-inherit">
                <TableRow className="border-spacing-4">
                  <TableCell
                    colSpan={3}
                    className="text-right font-bold p-05 pr-4 pt-4"
                  >
                    SubTotal
                  </TableCell>
                  <TableCell className="text-right p-05 pr-4 pt-4">
                    ${subtotal.toFixed(2)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={3}
                    className={`text-right font-bold p-05 pr-4 ${status === "Unpaid" ? "pb-4" : ""}`}
                  >
                    Tax ({(taxRate * 100).toFixed(2)}%)
                  </TableCell>
                  <TableCell
                    className={`text-right p-05 pr-4 ${status === "Unpaid" ? "pb-4" : ""}`}
                  >
                    ${taxAmount.toFixed(2)}
                  </TableCell>
                </TableRow>

                {status === "Partial" || status === "Paid" ? (
                  <TableRow className="">
                    <TableCell
                      colSpan={3}
                      className="text-right font-bold p-05 pr-4"
                    >
                      <div className="flex flex-col">
                        <span>Payment on {formattedDatePaid}</span>
                        <span className=" text-gray-500 font-normal text-[11px] pb-4">
                          Tip Not Included
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right p-05 pr-4 pb-4 align-top">
                      -${paid.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ) : null}

                <TableRow className="bg-gray-100">
                  <TableCell colSpan={3} className="text-right font-bold">
                    TOTAL DUE
                  </TableCell>
                  <TableCell className={`text-right `}>
                    {calculateTotal()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>

            <div className="mt-8">
              <Heading size="sm">Thank You For Your Business!</Heading>
              <Body size="sm">
                If you have any questions about this invoice, don't hesitate to
                reach out using the contact information above.
              </Body>
            </div>
          </div>
        </div>

        {assets ? (
          <div className="rounded-md border bg-white p-6">
            <AttachedImages assets={assets} />
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
