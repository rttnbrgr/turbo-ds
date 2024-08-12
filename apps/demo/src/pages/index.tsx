import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AutomationCard,
  AutomationCardProps,
} from "@/components/ui/automation-card";
import { Layout } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

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

// clean unused parts here
// move mocks to their own file
// move nav wip to its own file

const data: AutomationCardProps[] = [
  {
    title: "Email Customer when Negatively Reviewed",
    description:
      "This is an automation description that can be long but will eventually wrap.",
    visible: true,
    on: false,
  },
  {
    title: "Keanu Reaves is that dude",
    description:
      "This is an automation description that can be long but will eventually wrap.",
    on: true,
    visible: false,
    locked: true,
  },

  {
    title: "Email Customer when Negatively Reviewed",
    description:
      "This is an automation description that can be long but will eventually wrap.",
    visible: true,
    on: false,
  },
];

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
            {data.map(({ ...cardProps }, i) => (
              <AutomationCard key={i} {...cardProps} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
