export type Estimate = {
  id: string;
  request_date: string;
  visit_date?: string;
  total?: number;
  status:
    | "Declined"
    | "Approved"
    | "Changes Requested"
    | "Ready for Review"
    | "Request Submitted";
  service_type: string;
  details: string;
  preferredArrivalTimes: string[];
  frequency: string;
  requested_by: string;
};

export const ESTIMATES_FIXTURE: Estimate[] = [
  {
    id: "0000032",
    request_date: "2024-08-07",
    visit_date: "2024-08-14",
    total: 250,
    status: "Declined",
    service_type: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requested_by: "00123",
  },
  {
    id: "0000033",
    request_date: "2024-08-07",
    visit_date: "2024-08-14",
    total: 265.25,
    status: "Approved",
    service_type: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requested_by: "00123",
  },
  {
    id: "0000034",
    request_date: "2024-08-08",
    visit_date: "2024-08-21",
    total: 250.25,
    status: "Approved",
    service_type: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requested_by: "00123",
  },
  {
    id: "0000035",
    request_date: "2024-08-08",
    visit_date: "2024-08-08",
    total: undefined,
    status: "Changes Requested",
    service_type: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requested_by: "00123",
  },
  {
    id: "0000036",
    request_date: "2024-08-08",
    visit_date: "2024-09-05",
    total: 60.5,
    status: "Ready for Review",
    service_type: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requested_by: "00123",
  },
  {
    id: "0000037",
    request_date: "2024-08-09",
    visit_date: "2024-09-12",
    total: undefined,
    status: "Request Submitted",
    service_type: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requested_by: "00123",
  },
];
