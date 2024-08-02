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

type ChevronToggleProps = {
  isOpen: boolean;
  alt?: boolean;
  classNames?: string;
  size?: number;
};

const ChevronToggle = ({
  isOpen = false,
  classNames,
  size = 12,
  alt = false,
  ...props
}: ChevronToggleProps) => {
  const _base = "rounded text-current transition";
  let _rotate;

  if (alt) {
    _rotate = isOpen ? "rotate" : "rotate-180";

    return (
      <div className={cn(_base, _rotate, classNames)}>
        <ChevronRight size={size} />
      </div>
    );
  }

  _rotate = isOpen ? "rotate-90" : "rotate";

  return (
    <div className={cn(_base, _rotate, classNames)}>
      <ChevronRight size={size} />
    </div>
  );
};

type SideNavItemProps = {
  isNested: boolean;
  className?: string;
  children?: any;
  onClick?: any;
  isActive: boolean;
};

const _navLiBase = `inline-flex flex-row items-center flex-1 gap-3 py-2 px-3 bg-transparent`;
const _navLiTypography = `text-sm/4 font-semibold text-grey-800`;
const _navLiHover = `cursor-pointer hover:bg-blue-500`;

const SideNavItem = ({
  isNested = true,
  onClick,
  isActive,
  ...props
}: SideNavItemProps) => {
  const [open, setOpen] = useState(false);
  //
  const _navLiOpen = isActive && "bg-blue-600";

  return (
    //
    <div
      className={cn(
        _navLiBase,
        _navLiTypography,
        _navLiHover,
        _navLiOpen,
        "rounded text-white"
      )}
      onClick={() => {
        onClick(props.children);
      }}
    >
      <div className="h-4 w-4 rounded bg-white flex-grow-0"></div>
      <span className="flex-1">{props.children}</span>
      {isNested && <ChevronToggle isOpen={isActive} />}
    </div>
  );
};

const navArray = [
  { title: "My Day", type: "flat" },
  { title: "KPI Cockpit", type: "flat" },
  { title: "Customers", type: "nested" },
  { title: "Team", type: "nested" },
  { title: "Resources", type: "nested" },
  { title: "Marketing", type: "nested" },
  { title: "Calculator", type: "nested" },
  { title: "Finances", type: "nested" },
  { title: "Reports", type: "flat" },
  { title: "CSV Imports", type: "flat" },
  { title: "Support", type: "nested" },
];

const SideNav = ({ ...props }) => {
  //
  const [open, setOpen] = useState<undefined | string>();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`flex flex-col w-[280px] min-w-[280px] bg-blue-900`}>
      {/* top */}
      <div className="py-5 px-6 flex flex-row justify-between items-center">
        <div className="w-[108px] h-6 bg-blue-950" />
        <ChevronToggle alt isOpen={expanded} />
      </div>
      {/* body */}
      <div className="py-4 px-3 flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-3">
          {navArray.map((item, i) => (
            <SideNavItem
              key={i}
              isNested={item.type === "nested"}
              isActive={open === item.title}
              onClick={() => setOpen(item.title)}
            >
              {item.title}
            </SideNavItem>
          ))}
        </div>
      </div>
      {/* footer */}
      {/*  */}

      {/*  */}
    </aside>
  );
};

export default function Home() {
  // tab state
  return (
    <main className={`flex min-h-screen flex-row font-sans`}>
      {/* side */}
      <SideNav></SideNav>
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
