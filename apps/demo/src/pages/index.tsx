import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MockViewAutomationsHistory,
  MockViewAutomationsReview,
} from "@/components/views";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AutomationCard } from "@/components/ui/automation-card";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { MockBreadcrumb } from "@/components/ui/mock";
import { SideNav } from "@/components/sidenav";

// clean unused parts here
// move mocks to their own file
// move nav wip to its own file

export default function Home() {
  // tab state
  return (
    <main className={`flex min-h-screen flex-row font-sans`}>
      {/* side */}
      <SideNav />
      {/* main */}
      <div className="flex flex-col flex-1">
        {/* Headbar */}
        <div className="px-8 py-4 bg-white flex flex-row justify-between items-center">
          <MockBreadcrumb />
          <div className="flex flex-row gap-3">
            <Button variant="outline">New Sequence Automation</Button>
            <Button variant="default">New +</Button>
          </div>
        </div>
        <div className="p-8 flex-1 flex flex-col bg-slate-200">
          {/* tabs */}
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
                <AutomationCard
                  title="Email Customer when Negatively Reviewed"
                  description="This is an automation description that can be long but will eventually wrap."
                  visible
                  on={false}
                />
                <AutomationCard
                  title="Keanu Reaves is that dude"
                  description="This is an automation description that can be long but will eventually wrap."
                  on
                  visible={false}
                  locked
                />
                <AutomationCard
                  title="Email Customer when Negatively Reviewed"
                  description="This is an automation description that can be long but will eventually wrap."
                  visible
                  on={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
