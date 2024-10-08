import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@repo/ui/components/ui/alert";
import { AlertTriangle, Info } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const DefaultWithIcon: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>
        This is a default alert message with an icon.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Destructive Alert</AlertTitle>
      <AlertDescription>This is a destructive alert message.</AlertDescription>
    </Alert>
  ),
};

export const Warn: Story = {
  render: () => (
    <Alert variant="warn">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning Alert</AlertTitle>
      <AlertDescription>This is a warning alert message.</AlertDescription>
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Alert without Icon</AlertTitle>
      <AlertDescription>
        This is an alert message without an icon.
      </AlertDescription>
    </Alert>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Custom Content</AlertTitle>
      <AlertDescription>
        This alert contains custom content, including a{" "}
        <a href="#" className="underline">
          link
        </a>{" "}
        and a list:
        <ul className="list-disc list-inside mt-2">
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </AlertDescription>
    </Alert>
  ),
};
