import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@repo/ui/components/ui/accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  // TODO - props aren't showing up in the docs for this component.
  // Either try and solve or just manually add props to the ArgTypes.
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const MultiAccordion: Story = {
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can it be used in multiple mode?</AccordionTrigger>
        <AccordionContent>
          Yes, you can set the type prop to "multiple" to allow multiple items
          to be open at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styleable?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses Tailwind CSS which makes it easy to style.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleAccordion: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is an accordion?</AccordionTrigger>
        <AccordionContent>
          An accordion is a vertically stacked set of interactive headings that
          each reveal a section of content.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How does it work?</AccordionTrigger>
        <AccordionContent>
          It uses JavaScript to expand and collapse content sections when the
          headings are clicked.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

// You can add a new story to demonstrate the usage of controls
export const WithControls: Story = {
  args: {
    type: "single",
    collapsible: true,
    defaultValue: "item-1",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["multiple", "single"],
    },
    asChild: {
      table: {
        disable: true,
      },
    },
  },
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>Content for the first item.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>Content for the second item.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
