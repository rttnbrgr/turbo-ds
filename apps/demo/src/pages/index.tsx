import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MockViewAutomationsHistory,
  MockViewAutomationsReview,
} from "@/components/views";

const Tab = props => (
  <a
    href="#"
    className="p-2 border-b-2 border-solid border-blue-500 font-sans font-bold text-sm"
  >
    {props.children && props.children}
  </a>
);

const AutomationItem = props => (
  <a
    href="#"
    className="p-2 border-b-2 border-solid border-blue-500 font-sans font-bold text-sm"
  >
    {props.children && props.children}
  </a>
);

const MockBreadcrumb = () => (
  <div className="flex flex-row gap-1 text-gray-950">
    <Text.Body weight="bold">Marketing</Text.Body>
    <Text.Body>/</Text.Body>
    <Text.Body>Automations (2)</Text.Body>
  </div>
);

export default function Home() {
  // tab state
  return (
    <main className={`flex min-h-screen flex-row font-sans`}>
      {/* side */}
      <aside className={`flex w-[280px] p-24 bg-blue-900`}>sidenav</aside>
      {/* main */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="px-8 py-4 bg-white flex flex-row justify-between items-center">
          {/* breadcrumb */}
          <MockBreadcrumb />

          <div className="flex flex-row gap-3">
            <Button variant="outline">New Sequence Automation</Button>
            <Button variant="default">New +</Button>
          </div>
        </div>
        <div className="p-8 flex-1 flex flex-col bg-slate-200">
          {/* tabs */}
          <Tabs
            defaultValue="automations-index"
            className="border border-solid border-red-50"
          >
            <TabsList>
              <TabsTrigger value="automations-index">Automations</TabsTrigger>
              <TabsTrigger value="automations-history">History</TabsTrigger>
              <TabsTrigger value="automations-review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="automations-history">
              <MockViewAutomationsHistory />
            </TabsContent>
            <TabsContent value="automations-review">
              <MockViewAutomationsReview />
            </TabsContent>

            <TabsContent value="automations-index">
              {/* items */}
              <div className="p-2 flex flex-row">
                {/* toggle */}
                <span className="p-1">{`>`}</span>
                {/* main */}
                <div className="flex flex-col">
                  <div className="flex flex-row p-0 5">
                    <span>Email customer when job is scheduled</span>
                    <span>👁️</span>
                    <span>🔒</span>
                  </div>
                  <div>
                    This is an automation description that can be long but will
                    eventually wrap.
                  </div>
                  {/* description */}
                  <div className="px-4 py-3 bg-slate-300">
                    This is an automation description that can be long but will
                    eventually wrap.
                    {/* blocks */}
                    <div>
                      <span className="font-bold">IF</span>a visit is completed
                      and the customer left a negative review (0 – 3.5 stars)...
                    </div>
                    <div>
                      <span className="font-bold">THEN</span>
                      email customer the template “Response to Negative Review”
                      after 1 day, <span className="font-bold">ADD</span>
                      the tag “Dissatisfied” to the customer immediately.
                    </div>
                    <div></div>
                  </div>
                </div>
                {/* status */}
                <div className="p-2">Off</div>
                {/* button */}
                <Button variant="outline">Edit Automation</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}

/* Body/fw-bold */
// color: var(--text-default-grey-1000, var(--grey-1000, #0C0D0D));
// font-family: var(--font-family-ff-standard, Inter);
// font-size: var(--font-size-fs-200, 14px);
// font-style: normal;
// font-weight: 700;
// line-height: var(--font-line-height-lh-200, 20px); /* 142.857% */
