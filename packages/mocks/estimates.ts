export type Estimate = {
  id: string;
  requestDate: string;
  visitDate?: string;
  total?: number;
  status:
    | "Declined"
    | "Approved"
    | "Changes Requested"
    | "Ready for Review"
    | "Request Submitted";
  serviceType:
    | "Service Type 1"
    | "Service Type 2"
    | "Service Type 3"
    | "Service Type 4";
  details: string;
  preferredArrivalTimes: string[];
  frequency: string;
  requestedBy: string;
  notes?: string;
  lineItems?: LineItem[];
};

export type LineItem = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
};
