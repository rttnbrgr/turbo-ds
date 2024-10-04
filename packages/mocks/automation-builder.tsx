// import { AutomationCardProps } from "@repo/ui/components/ui/automation-card";
// LEGZ - TODO
type AutomationCardProps = any;

type AutomationBlock = {
  block: string;
  children: (string | AutomationBlock)[];
};

// clean unused parts here
// move mocks to their own file
// move nav wip to its own file

type dataShape = AutomationCardProps & { blocks?: AutomationBlock[] };

export const AUTOMATION_MOCK_DATA: dataShape[] = [
  {
    title: "Email Customer when Negatively Reviewed",
    description:
      "This is an automation description that can be long but will eventually wrap.",
    isVisible: true,
    isActive: false,
    blocks: [
      {
        block: "if",
        children: [
          "a visit is completed and the customer left a negative review (0 – 3.5 stars)...",
        ],
      },
      {
        block: "then",
        children: [
          "email customer the template “Response to Negative Review” after 1 day,",
          {
            block: "ADD",
            children: ["the tag “Dissatisfied” to the customer immediately."],
          },
        ],
      },
    ],
  },
  {
    title: "Estimate Follow-up",
    description:
      "Triggers when an estimate is sent and sends the customer four follow-up emails spanning 30 days. This automation stops when the estimate is accepted or declined, or when changes are requested.",
    isVisible: true,
    isActive: true,
    blocks: [
      {
        block: "if",
        children: ["Estimate is sent"],
      },
      {
        block: "then",
        children: [
          "email customer a placeholder template 1 day after",
          {
            block: "and",
            children: ["email customer a placeholder template 3 days after"],
          },
          {
            block: "and",
            children: [
              "email company owner a placeholder template 7 days after",
            ],
          },
        ],
      },
      {
        block: "stop",
        children: ["When estimate is accepted or declined"],
      },
    ],
  },
  {
    title: "Collections Warning",
    isVisible: true,
    isActive: true,
    blocks: [
      {
        block: "if",
        children: ["Invoice becomes past due"],
      },
      {
        block: "then",
        children: [
          "email customer a placeholder template 7 day after",
          {
            block: "and",
            children: ["email customer a placeholder template 14 days after"],
          },
          {
            block: "and",
            children: [
              "email Employee One a placeholder template 30 days after",
            ],
          },
        ],
      },
      {
        block: "stop",
        children: ["After invoice is paid in full"],
      },
    ],
  },
  {
    title: "Skipped Visit Notification",
    isVisible: true,
    isActive: true,
    blocks: [
      {
        block: "if",
        children: ["Visit is skipped"],
      },
      {
        block: "then",
        children: ["text customer a placeholder template immediately"],
      },
    ],
  },
  {
    title: "Estimate Accepted",
    isVisible: true,
    isActive: true,
    blocks: [
      {
        block: "if",
        children: [
          "Estimate is accepted",
          {
            block: "and",
            children: ["estimate has mowing service"],
          },
        ],
      },
      {
        block: "then",
        children: [
          "email customer a placeholder template immediately",
          {
            block: "and",
            children: ["add placeholder tag to customer"],
          },
          {
            block: "and",
            children: ["email Employee One a placeholder template immediately"],
          },
        ],
      },
    ],
  },
  {
    title: "Scheduled Meeting",
    isVisible: true,
    isActive: true,
    blocks: [
      {
        block: "if",
        children: [
          "Meeting is added",
          {
            block: "and",
            children: ["Meeting has category estimate"],
          },
        ],
      },
      {
        block: "then",
        children: [
          "text customer a placeholder template immediately",

          {
            block: "and",
            children: ["text company owner a placeholder template immediately"],
          },
        ],
      },
    ],
  },
];
