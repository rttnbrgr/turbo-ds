import type { Meta, StoryObj } from "@storybook/react";

import { StatusChip } from "@repo/ui/components/ui/status-chip";

const meta = {
  title: "UI/StatusChip",
  component: StatusChip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    intent: {
      control: "select",
      options: ["neutral", "success", "warn", "danger", "action"],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentShowcase: Story = {
  render: () => {
    const intents = ["neutral", "success", "warn", "danger", "action"] as const;

    return (
      <div className="flex flex-row items-start gap-4">
        {intents.map((intent) => (
          <StatusChip key={intent} intent={intent}>
            {intent}
          </StatusChip>
        ))}
      </div>
    );
  },
};

export const Default: Story = {
  args: {
    children: "Status",
  },
};

export const Neutral: Story = {
  args: {
    intent: "neutral",
    children: "Neutral Status",
  },
};

export const Success: Story = {
  args: {
    intent: "success",
    children: "Success Status",
  },
};

export const Warn: Story = {
  args: {
    intent: "warn",
    children: "Warning Status",
  },
};

export const Danger: Story = {
  args: {
    intent: "danger",
    children: "Danger Status",
  },
};

export const Action: Story = {
  args: {
    intent: "action",
    children: "Action Status",
  },
};

export const WithoutChildren: Story = {
  args: {
    intent: "neutral",
  },
};
