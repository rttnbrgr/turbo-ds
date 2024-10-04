import { PaymentInfo } from "./payment-info";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  role: string;
  username: string;
  password: string;
  business_number?: string;
  fax_number?: string;
  country: string;
  payment_info: PaymentInfo;
  receive_marketing_emails: boolean;
};
