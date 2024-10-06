import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "@repo/ui/components/ui/button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["fill", "outline", "ghost"],
    },
    intent: {
      control: "select",
      options: ["default", "action", "danger"],
    },
    size: {
      control: "radio",
      options: ["sm", "md"],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Fill: Story = {
  args: {
    variant: "fill",
    children: "Fill Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Action: Story = {
  args: {
    intent: "action",
    children: "Action Button",
  },
};

export const Danger: Story = {
  args: {
    intent: "danger",
    children: "Danger Button",
  },
};
