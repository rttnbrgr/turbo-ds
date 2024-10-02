export const PAYMENT_INFO = [
  {
    id: "00123",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "555-555-5555",
    address: "123 Main St",
    city: "Madison",
    state: "WI",
    zip: "53703",
    card_number: "1234-5678-9101-1121",
    card_expiry: "12/25",
    card_cvv: "123",
  },
  {
    id: "00124",
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
    phone: "555-555-5555",
    address: "456 Grand Ave",
    city: "Madison",
    state: "WI",
    zip: "53703",
    card_number: "1234-5678-9101-1121",
    card_expiry: "12/25",
    card_cvv: "123",
  },
];

export type PaymentInfo = (typeof PAYMENT_INFO)[number];
