import * as React from "react";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { Layout } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { StatusChip } from "@/components/ui/status-chip";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import {
  AutomationCard,
  AutomationCondition,
  ConditionBlock,
} from "@/components/ui/automation-card";

const _base = "flex flex-col";
const sectionStyles = "flex flex-col gap-4";

const sectionVariants = cva([_base], {
  variants: {
    variant: {
      section: "gap-2",
      subSection: "gap-1",
    },
  },
  defaultVariants: {
    variant: "section",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionVariants> {
  title?: string;
}

const Section = ({
  className,
  variant = "section",
  title,
  children,
  ...props
}: SectionProps) => {
  return (
    <div className={cn(sectionVariants({ variant, className }))} {...props}>
      {title && (
        <Text.Header size={variant === "section" ? "default" : "sm"}>
          {title}
        </Text.Header>
      )}
      {children}
    </div>
  );
};

export default function Ui() {
  // tab state
  return (
    <Layout>
      <div className="flex flex-col gap-16">
        {/* Button */}
        <Section title="Button">
          <Section variant="subSection" title="Size">
            <div className="flex flex-row justify-start items-center gap-2">
              <Button variant="outline" size="md">
                <Plus size={16} />
                Button
              </Button>
              <Button variant="outline" size="sm">
                <Plus size={16} />
                Button
              </Button>
            </div>
          </Section>
          <Section variant="subSection" title="Style + Intent">
            <div className="flex flex-row flex-wrap justify-start items-start gap-2">
              <Button variant="fill" intent="default">
                <Plus size={16} />
                Button
              </Button>
              <Button variant="fill" intent="action">
                <Plus size={16} />
                Button
              </Button>
              <Button variant="fill" intent="danger">
                <Plus size={16} />
                Button
              </Button>
              <Button variant="outline">
                <Plus size={16} />
                Button
              </Button>
              <Button variant="ghost" intent="default">
                <Plus size={16} />
                Button
              </Button>
              <Button variant="ghost" intent="action">
                <Plus size={16} />
                Button
              </Button>
              <Button variant="ghost" intent="danger">
                <Plus size={16} />
                Button
              </Button>
            </div>
          </Section>
        </Section>
        {/* Status Chip */}
        <Section title="Status Chip">
          <div className="flex flex-row gap-4 items-start">
            <StatusChip intent="neutral">Status</StatusChip>
            <StatusChip intent="success">Status</StatusChip>
            <StatusChip intent="warn">Status</StatusChip>
            <StatusChip intent="danger">Status</StatusChip>
            <StatusChip intent="action">Status</StatusChip>
          </div>
        </Section>
        {/* Tabs */}
        <Section title="Tabs">
          <div className="flex flex-col gap-4 items-start">
            <Tabs defaultValue="1" className="">
              <TabsList>
                <TabsTrigger value="1">Tab 1</TabsTrigger>
                <TabsTrigger value="2">Tab 2</TabsTrigger>
                <TabsTrigger value="3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="1">
                <div className="w-[400px] h-[100px] bg-red-100 flex justify-center items-center">
                  <Text.Header>One</Text.Header>
                </div>
              </TabsContent>
              <TabsContent value="2">
                <div className="w-[400px] h-[100px] bg-blue-100 flex justify-center items-center">
                  <Text.Header>Two</Text.Header>
                </div>
              </TabsContent>
              <TabsContent value="3">
                <div className="w-[400px] h-[100px] bg-green-100 flex justify-center items-center">
                  <Text.Header>Three</Text.Header>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Section>
        {/* Breadcrumbs */}
        <Section title="Breadcrumbs">
          <div className="flex flex-col gap-4 items-start">
            <Breadcrumbs
              layers={["Grandparent layer", "Parent layer", "Child layer (10)"]}
            />
          </div>
        </Section>

        {/* Automation Card */}
        <Section title="Automation Card">
          <div className="flex flex-col gap-4 items-start">
            <Section variant="subSection" title="Condition Block">
              <ConditionBlock block="IF">
                a visit is completed and the customer left a negative review (0
                – 3.5 stars)...
              </ConditionBlock>
            </Section>
            <Section variant="subSection" title="Automation Condition">
              <AutomationCondition>
                <ConditionBlock block="IF">
                  a visit is completed and the customer left a negative review
                  (0 – 3.5 stars)...
                </ConditionBlock>
                <ConditionBlock block="THEN">
                  email customer the template “Response to Negative Review”
                  after 1 day, <span className="font-bold">ADD </span>
                  the tag “Dissatisfied” to the customer immediately.
                </ConditionBlock>
              </AutomationCondition>
            </Section>
            <Section variant="subSection" title="Automation Card">
              <AutomationCard
                isVisible
                isLocked
                isActive
                title="Automation card title"
                description="This is an automation description that can be long but will eventually wrap."
              >
                <AutomationCondition>
                  <ConditionBlock block="IF">
                    a visit is completed and the customer left a negative review
                    (0 – 3.5 stars)...
                  </ConditionBlock>
                  <ConditionBlock block="THEN">
                    email customer the template “Response to Negative Review”
                    after 1 day, <span className="font-bold">ADD </span>
                    the tag “Dissatisfied” to the customer immediately.
                  </ConditionBlock>
                </AutomationCondition>
              </AutomationCard>
            </Section>
          </div>
        </Section>
      </div>
    </Layout>
  );
}
