import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MockViewAutomationsHistory,
  MockViewAutomationsReview,
} from "@/components/views";
import { AutomationCard } from "@/components/ui/automation-card";
import { MockBreadcrumb } from "@/components/ui/mock";
import { Layout } from "@/components/ui/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AutomationBuilder() {
  // tab state
  return (
    <Layout
      headbar={
        <>
          <MockBreadcrumb />
          <div className="flex flex-row gap-3">
            <Button variant="outline">New Sequence Automation</Button>
            <Button variant="default">New +</Button>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <AutomationCard
          title="Email Customer when Negatively Reviewed"
          description="This is an automation description that can be long but will eventually wrap."
          visible
          on={false}
        />
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
