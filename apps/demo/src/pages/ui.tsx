import * as React from "react";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { MockBreadcrumb } from "@/components/ui/mock";
import { Layout } from "@/components/ui/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { StatusChip } from "@/components/ui/status-chip";

export default function Ui() {
  // tab state
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Header>Button</Text.Header>
        <Text.Header>Size</Text.Header>
        <div className="flex flex-col gap-4 items-start">
          <Button variant="outline" size="sm">
            <Plus size={16} />
            Button
          </Button>
          <Button variant="outline" size="md">
            <Plus size={16} />
            Button
          </Button>
        </div>
        <Text.Header>Style + Intent</Text.Header>
        <div className="flex flex-row justify-start items-start gap-2">
          <div className="flex flex-col gap-4 items-start">
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
          </div>
          <Button variant="outline">
            <Plus size={16} />
            Button
          </Button>
          <div className="flex flex-col gap-4 items-start">
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
        </div>
      </div>
      {/* Status Chip */}
      <div className="flex flex-col gap-4">
        <Text.Header>Status Chip</Text.Header>
        <div className="flex flex-col gap-4 items-start">
          <StatusChip intent="neutral">Status</StatusChip>
          <StatusChip intent="success">Status</StatusChip>
          <StatusChip intent="warn">Status</StatusChip>
          <StatusChip intent="danger">Status</StatusChip>
          <StatusChip intent="action">Status</StatusChip>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex flex-col gap-4">
        <Text.Header>Tabs</Text.Header>
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
      </div>
    </Layout>
  );
}
