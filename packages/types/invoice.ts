import { Asset } from "./asset";
import { InvoiceItem } from "./invoiceItem";

export type Invoice = {
  id: string;
  invoice_number: string;
  invoice_date: string;
  over_due: boolean;
  due_date: string;
  issued_date: string;
  paid_date: string;
  status: "Partial" | "Paid" | "Unpaid";

  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  clientName: string;
  clientAddress: string;
  notes: string;

  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  paid: number;

  items: InvoiceItem[];
  assets?: Asset[];
};
