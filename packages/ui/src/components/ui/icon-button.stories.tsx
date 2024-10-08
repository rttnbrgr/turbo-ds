import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "@repo/ui/components/ui/icon-button";
import { Plus, Minus, X } from "lucide-react";

const meta: Meta<typeof IconButton> = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const ComponentShowcase: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton variant="fill" size="md">
        <Plus />
      </IconButton>
      <IconButton variant="ghost" size="md">
        <Plus />
      </IconButton>
      <IconButton variant="fill" size="md" disabled>
        <Plus />
      </IconButton>
      <IconButton variant="ghost" size="md" disabled>
        <Plus />
      </IconButton>
    </div>
  ),
};

export const Fill: Story = {
  args: {
    variant: "fill",
    size: "md",
    children: <Plus />,
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "md",
    children: <Plus />,
  },
};

export const FillDisabled: Story = {
  args: {
    variant: "fill",
    size: "md",
    children: <Plus />,
    disabled: true,
  },
};

export const GhostDisabled: Story = {
  args: {
    variant: "ghost",
    size: "md",
    children: <Plus />,
    disabled: true,
  },
};

export const Focus: Story = {
  args: {
    variant: "fill",
    size: "md",
    children: <Plus />,
  },
  parameters: {
    pseudo: { focusVisible: true, focus: true },
  },
};
export const Hover: Story = {
  args: {
    variant: "fill",
    size: "md",
    children: <Plus />,
  },
  parameters: {
    pseudo: { hover: true },
  },
};
