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
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
          isVisible
          isActive={false}
        />
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border border-solid border-gray-300 px-4 py-4 rounded gray-100">
              {/* row */}
              <div className="flex flex-row gap-3 items-center">
                {/* if */}
                <Text.Body className="uppercase" weight="bold">
                  If
                </Text.Body>

                {/* dropdown */}
                <Select open>
                  <SelectTrigger className="w-[180px] flex-1">
                    <SelectValue placeholder="Select a condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Visit is added</SelectItem>
                    <SelectItem value="banana">Visit is completed</SelectItem>
                    <SelectItem value="blueberry">
                      Invoice becomes past due
                    </SelectItem>
                    <SelectItem value="grapes">
                      Work request is submitted
                    </SelectItem>
                    <SelectItem value="pineapple">Estimate is sent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

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
