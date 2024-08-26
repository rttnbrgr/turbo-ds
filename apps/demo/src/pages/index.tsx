import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AutomationCard,
  AutomationCardProps,
  ConditionBlock,
  AutomationCondition,
} from "@/components/ui/automation-card";
import { Layout } from "@/components/layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Fragment } from "react";

/**
 * Mock tab views
 */
export const MockViewAutomationsHistory = () => (
  <div>
    <Text.Header size="sm">Automations History</Text.Header>
    <Text.Body>
      Cold-pressed ethical next level tote bag poutine art party hashtag
      affogato polaroid seitan vibecession af bespoke. Humblebrag selfies
      whatever hoodie meggings health goth umami mukbang gastropub fashion axe.
      Blog vaporware echo park, pinterest man bun wayfarers fixie pickled
      jianbing ethical heirloom keytar. Kale chips knausgaard beard master
      cleanse sriracha listicle offal coloring book la croix. Asymmetrical
      kombucha poutine, normcore meggings hella pabst swag bitters kitsch marfa.
      Literally cray seitan hella chambray grailed solarpunk slow-carb ethical.
    </Text.Body>
  </div>
);

export const MockViewAutomationsReview = () => (
  <div>
    <Text.Header size="sm">Automations Review</Text.Header>
    <Text.Body>
      Cold-pressed ethical next level tote bag poutine art party hashtag
      affogato polaroid seitan vibecession af bespoke. Humblebrag selfies
      whatever hoodie meggings health goth umami mukbang gastropub fashion axe.
      Blog vaporware echo park, pinterest man bun wayfarers fixie pickled
      jianbing ethical heirloom keytar. Kale chips knausgaard beard master
      cleanse sriracha listicle offal coloring book la croix. Asymmetrical
      kombucha poutine, normcore meggings hella pabst swag bitters kitsch marfa.
      Literally cray seitan hella chambray grailed solarpunk slow-carb ethical.
    </Text.Body>
  </div>
);

type NestedBlock = {
  type: "bold";
  content: string;
};

type AutomationBlock = {
  block: string;
  children: (string | AutomationBlock)[];
};

// clean unused parts here
// move mocks to their own file
// move nav wip to its own file

type dataShape = AutomationCardProps & { blocks?: AutomationBlock[] };

const data: dataShape[] = [
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

export const automationMockData = data;

export default function Home() {
  // tab state
  return (
    <Layout
      headbar={
        <>
          <Breadcrumbs
            layers={["Marketing", "Mock", "Next", "Automations (2)"]}
          />
          <div className="flex flex-row gap-3">
            <Button variant="outline">New Sequence Automation</Button>
            <Button variant="fill">New +</Button>
          </div>
        </>
      }
    >
      <Tabs defaultValue="automations-index" className="">
        <TabsList>
          <TabsTrigger value="automations-index">Automations</TabsTrigger>
          <TabsTrigger value="automations-history">History</TabsTrigger>
          <TabsTrigger value="automations-review">Review</TabsTrigger>
        </TabsList>
        <TabsContent value="automations-history">
          <div className="max-w-[600px]">
            <MockViewAutomationsHistory />
          </div>
        </TabsContent>
        <TabsContent value="automations-review">
          <div className="max-w-[600px]">
            <MockViewAutomationsReview />
          </div>
        </TabsContent>

        <TabsContent value="automations-index">
          <div className="flex flex-col gap-4">
            {data.map(({ blocks, ...cardProps }, i) => (
              <AutomationCard key={i} {...cardProps}>
                {blocks && (
                  <AutomationCondition>
                    {blocks.map(({ block, children }, i) => (
                      <ConditionBlock block={block.toUpperCase()} key={i}>
                        {children.map((child, j) => {
                          // is this a single
                          const notNested = typeof child === "string";

                          if (notNested) {
                            return child;
                          }

                          // Probably need a cleaner recursive setup here
                          {
                            console.log(child);
                          }

                          return (
                            <ConditionBlock block={child.block} key={j}>
                              {child.children.map((x, k) => {
                                if (typeof x === "string") {
                                  return x;
                                }
                                console.log(
                                  "something didnt make it to the render"
                                );
                              })}
                            </ConditionBlock>
                          );
                        })}
                      </ConditionBlock>
                    ))}
                  </AutomationCondition>
                )}
              </AutomationCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
