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

export const serviceTypeS = {
  "Service Type 1": "Service Type 1",
  "Service Type 2": "Service Type 2",
  "Service Type 3": "Service Type 3",
  "Service Type 4": "Service Type 4",
};

export const ESTIMATES_FIXTURE: Estimate[] = [
  {
    id: "0000032",
    requestDate: "2024-08-07",
    visitDate: "2024-08-14",
    total: 250,
    status: "Declined",
    serviceType: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requestedBy: "00123",
    notes:
      "This section will only populate if general notes do exist. This is an example of a pretty long note that can span multiple lines.",
    lineItems: [
      {
        id: "0000001",
        name: "Resod Front Yard",
        description: "",
        quantity: 4,
        price: 130,
      },
    ],
  },
  {
    id: "0000033",
    requestDate: "2024-08-07",
    visitDate: "2024-08-14",
    total: 265.25,
    status: "Approved",
    serviceType: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requestedBy: "00123",
    notes:
      "This section will only populate if general notes do exist. This is an example of a pretty long note that can span multiple lines.",
    lineItems: [
      {
        id: "0000001",
        name: "Mowing Full Lawn",
        description:
          'Includes mowing with a 21"-33" push mower, including a moderately steep hill in the backyard.',
        quantity: 1,
        price: 30,
      },
      {
        id: "0000002",
        name: "Full Weeding",
        description: "Includes weeding around the entire property.",
        quantity: 0.75,
        price: 15,
      },
      {
        id: "0000003",
        name: "Lawn Fertilizer",
        description: "Includes 90-day supply for full lawn.",
        quantity: 1,
        price: 65,
      },
    ],
  },
  {
    id: "0000034",
    requestDate: "2024-08-08",
    visitDate: "2024-08-21",
    total: 250.25,
    status: "Approved",
    serviceType: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requestedBy: "00123",
    notes:
      "This section will only populate if general notes do exist. This is an example of a pretty long note that can span multiple lines.",
    lineItems: [
      {
        id: "0000001",
        name: "Mowing Full Lawn",
        description:
          'Includes mowing with a 21"-33" push mower, including a moderately steep hill in the backyard.',
        quantity: 1,
        price: 30,
      },
      {
        id: "0000002",
        name: "Full Weeding",
        description: "Includes weeding around the entire property.",
        quantity: 0.75,
        price: 15,
      },
      {
        id: "0000003",
        name: "Lawn Fertilizer",
        description: "Includes 90-day supply for full lawn.",
        quantity: 1,
        price: 65,
      },
    ],
  },
  {
    id: "0000035",
    requestDate: "2024-08-08",
    visitDate: "2024-08-08",
    total: undefined,
    status: "Changes Requested",
    serviceType: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requestedBy: "00123",
    notes:
      "This section will only populate if general notes do exist. This is an example of a pretty long note that can span multiple lines.",
    lineItems: [
      {
        id: "0000001",
        name: "Resod Front Yard",
        description: "",
        quantity: 4,
        price: 130,
      },
    ],
  },
  {
    id: "0000036",
    requestDate: "2024-08-08",
    visitDate: "2024-09-05",
    total: 60.5,
    status: "Ready for Review",
    serviceType: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requestedBy: "00123",
    notes:
      "This section will only populate if general notes do exist. This is an example of a pretty long note that can span multiple lines.",
    lineItems: [
      {
        id: "0000001",
        name: "Mowing Full Lawn",
        description:
          'Includes mowing with a 21"-33" push mower, including a moderately steep hill in the backyard.',
        quantity: 1,
        price: 30,
      },
      {
        id: "0000002",
        name: "Full Weeding",
        description: "Includes weeding around the entire property.",
        quantity: 0.75,
        price: 15,
      },
      {
        id: "0000003",
        name: "Lawn Fertilizer",
        description: "Includes 90-day supply for full lawn.",
        quantity: 1,
        price: 65,
      },
    ],
  },
  {
    id: "0000037",
    requestDate: "2024-08-09",
    visitDate: "2024-09-12",
    total: undefined,
    status: "Request Submitted",
    serviceType: "Service Type 1",
    details: "Details 1",
    preferredArrivalTimes: ["Anytime", "Morning", "Afternoon", "Evening"],
    frequency: "One Time",
    requestedBy: "00123",
  },
];
