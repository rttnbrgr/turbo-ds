import { PAYMENT_INFO } from "./payment-info";

export const USER_1 = {
  id: "00123",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "555-555-5555",
  address: "123 Main St",
  address2: undefined,
  city: "Madison",
  state: "WI",
  zip: "53703",
  role: "Client",
  username: "john.doe",
  password: "password",
  business_number: "555-555-5555",
  fax_number: "555-555-5555",
  country: "USA",
  payment_info: PAYMENT_INFO[0],
  receive_marketing_emails: true,
};

export const USER_2 = {
  id: "00124",
  name: "Jane Doe",
  email: "jane.doe@gmail.com",
  phone: "555-555-5555",
  address: "456 Grand Ave",
  address2: undefined,
  city: "Madison",
  state: "WI",
  zip: "53703",
  role: "Client",
  username: "jane.doe",
  password: "password",
  business_number: "555-555-5555",
  fax_number: "555-555-5555",
  country: "USA",
  payment_info: PAYMENT_INFO[1],
  receive_marketing_emails: false,
};

export const USERS = [USER_1, USER_2];

export type User = (typeof USERS)[number];
