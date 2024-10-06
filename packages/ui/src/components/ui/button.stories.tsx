import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "lucide-react";

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
    asChild: {
      table: {
        disable: true,
      },
    },
    onClick: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ComponentShowcase: Story = {
  render: () => {
    const variants = ["fill", "outline", "ghost"] as const;
    const intents = ["default", "action", "danger"] as const;
    const sizes = ["sm", "md"] as const;

    return (
      <div className="grid grid-cols-3 gap-4">
        {variants.map((variant) => (
          <div key={variant} className="space-y-4">
            <h3 className="font-bold text-lg capitalize">{variant}</h3>
            {intents.map((intent) => (
              <div key={intent} className="space-y-2">
                <h4 className="font-semibold capitalize">{intent}</h4>
                {sizes.map((size) => (
                  <div
                    key={`${variant}-${intent}-${size}`}
                    className="flex justify-start"
                  >
                    <Button
                      variant={variant}
                      intent={intent}
                      size={size}
                      className="mr-2 capitalize"
                    >
                      {`${variant.charAt(0).toUpperCase() + variant.slice(1)} ${intent} ${size}`}
                    </Button>
                    <Button
                      variant={variant}
                      intent={intent}
                      size={size}
                      className="mr-2"
                    >
                      <Plus className="mr-2" size={16} />
                      {`With Icon`}
                    </Button>
                    <Button
                      variant={variant}
                      intent={intent}
                      size={size}
                      className="mr-2"
                      aria-label={`${variant} ${intent} ${size} icon only`}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

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

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Button",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus size={16} />
        With Icon
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: {
    children: <Plus size={16} />,
    "aria-label": "Add item",
  },
};

export const Focus: Story = {
  args: {
    children: "Button",
  },
  parameters: {
    pseudo: { focusVisible: true, focus: true },
  },
};

export const Hover: Story = {
  args: {
    children: "Button",
  },
  parameters: {
    pseudo: { hover: true },
  },
};
