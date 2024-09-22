import { Invoice } from "@/pages/client-portal/invoices";

export const INVOICES_MOCKED_DATA: Invoice[] = [
  {
    id: "0000000001",
    invoice_date: "2024-07-31",
    due_date: "2024-08-07",
    invoice_number: "1",
    invoice_total: 208.0,
    paid_amount: 104.0,
    status: "Partial",
    companyName: "Madison Handyman",
    companyAddress: "7818 Big Sky Dr # 107, Madison, WI 53719",
    companyPhone: "(212) 527-2948",
    companyEmail: "info@madisonhandyman.com",
    clientName: "Alison Beier",
    clientAddress: "1022 Hillside Ave, Madison, WI 53705",
    notes:
      "Thank you for choosing Madison Handyman for your home maintenance needs.",
    items: [
      {
        description: "Mowing Full Lawn",
        details:
          'Includes mowing with a 21"-33" push mower, including a moderately steep hill in the backyard.',
        quantity: 1,
        rate: 30,
        total: 30,
      },
      {
        description: "Full Weeding",
        details: "Includes weeding around the entire property.",
        quantity: 0.75,
        rate: 15,
        total: 11.25,
      },
      {
        description: "Lawn Fertilizer",
        details: "Includes 90-day supply for full lawn.",
        quantity: 1,
        rate: 65,
        total: 65,
      },
      {
        description: "Hedge Trimming",
        details: "Trimming and shaping of front yard hedges.",
        quantity: 2,
        rate: 40,
        total: 80,
      },
    ],
    subtotal: 186.25,
    taxRate: 0.04,
    taxAmount: 7.45,
    invoiceNumber: "INV-0001",
    dateIssued: "2024-07-31",
    dateDue: "2024-08-07",
    total: 208.0,
    paid: 104.0,
  },
  {
    id: "0000000002",
    invoice_date: "2024-08-07",
    due_date: "2024-08-14",
    invoice_number: "2",
    invoice_total: 312.0,
    paid_amount: 312.0,
    status: "Paid",
    companyName: "Madison Handyman",
    companyAddress: "7818 Big Sky Dr # 107, Madison, WI 53719",
    companyPhone: "(212) 527-2948",
    companyEmail: "info@madisonhandyman.com",
    clientName: "John Smith",
    clientAddress: "456 Oak St, Madison, WI 53703",
    notes: "Priority service requested and provided.",
    items: [
      {
        description: "Gutter Cleaning",
        details: "Complete cleaning of gutters and downspouts.",
        quantity: 3,
        rate: 45,
        total: 135,
      },
      {
        description: "Window Washing",
        details: "Exterior window washing for two-story home.",
        quantity: 2.5,
        rate: 60,
        total: 150,
      },
    ],
    subtotal: 285,
    taxRate: 0.04,
    taxAmount: 11.4,
    invoiceNumber: "INV-0002",
    dateIssued: "2024-08-07",
    dateDue: "2024-08-14",
    total: 312.0,
    paid: 312.0,
  },
  {
    id: "0000000003",
    invoice_date: "2024-08-14",
    due_date: "2024-08-21",
    invoice_number: "3",
    invoice_total: 110.5,
    paid_amount: 0,
    status: "Unpaid",
    companyName: "Madison Handyman",
    companyAddress: "7818 Big Sky Dr # 107, Madison, WI 53719",
    companyPhone: "(212) 527-2948",
    companyEmail: "info@madisonhandyman.com",
    clientName: "Emily Johnson",
    clientAddress: "789 Maple Ave, Madison, WI 53704",
    notes:
      "This section will only populate if general notes do exist. This is an example of a pretty long note that can span multiple lines.",
    items: [
      {
        description: "Mowing Full Lawn",
        details:
          'Includes mowing with a 21"-33" push mower, including a moderately steep hill in the backyard.',
        quantity: 1,
        rate: 30,
        total: 30,
      },
      {
        description: "Full Weeding",
        details: "Includes weeding around the entire property.",
        quantity: 0.75,
        rate: 15,
        total: 11.25,
      },
      {
        description: "Lawn Fertilizer",
        details: "Includes 90-day supply for full lawn.",
        quantity: 1,
        rate: 65,
        total: 65,
      },
    ],
    subtotal: 106.25,
    taxRate: 0.04,
    taxAmount: 4.25,
    invoiceNumber: "INV-0003",
    dateIssued: "2024-08-14",
    dateDue: "2024-08-21",
    total: 110.5,
    paid: 0,
  },
  {
    id: "0000000004",
    invoice_date: "2024-08-21",
    due_date: "2024-08-28",
    invoice_number: "4",
    invoice_total: 520.0,
    paid_amount: 0,
    status: "Unpaid",
    companyName: "Madison Handyman",
    companyAddress: "7818 Big Sky Dr # 107, Madison, WI 53719",
    companyPhone: "(212) 527-2948",
    companyEmail: "info@madisonhandyman.com",
    clientName: "Michael Brown",
    clientAddress: "321 Pine St, Madison, WI 53706",
    notes: "Extended service hours applied due to project complexity.",
    items: [
      {
        description: "Deck Staining",
        details: "Sanding, cleaning, and staining of 500 sq ft deck.",
        quantity: 8,
        rate: 55,
        total: 440,
      },
      {
        description: "Furniture Moving",
        details: "Moving and replacing deck furniture.",
        quantity: 1,
        rate: 60,
        total: 60,
      },
    ],
    subtotal: 500,
    taxRate: 0.04,
    taxAmount: 20,
    invoiceNumber: "INV-0004",
    dateIssued: "2024-08-21",
    dateDue: "2024-08-28",
    total: 520.0,
    paid: 0,
  },
];
