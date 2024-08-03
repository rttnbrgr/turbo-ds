import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Children, useState } from "react";
import { ChevronToggle } from "../ui/chevron-toggle";
import { SideNavItem, SideNavSubItem } from "./sidenav-item";
import { Clock } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const SideNavSublist = ({ children }) => (
  <div className="flex flex-row gap-4">
    <div className="w-4 border-r border-solid border-white" />
    <div className="flex flex-col gap-1 fle-1">
      {/* comment to keep fold */}
      {children}
    </div>
  </div>
);

const navArray = [
  { title: "My Day", type: "flat" },
  { title: "KPI Cockpit", type: "flat" },
  {
    title: "Customers",
    type: "nested",
    children: ["Customers", "Properties", "Work Requests", "Map"],
  },
  {
    title: "Team",
    type: "nested",
    children: [
      "Schedule",
      "Dispatch Board",
      "Employees",
      "Time Tracking",
      "Crews",
      "Vendors & Supplies",
    ],
  },
  {
    title: "Resources",
    type: "nested",
    children: [
      "Schedule",
      "Dispatch Board",
      "Employees",
      "Time Tracking",
      "Crews",
      "Vendors & Supplies",
    ],
  },
  {
    title: "Marketing",
    type: "nested",
    children: [
      "Automations",
      "Email Templates",
      "Text",
      "Store",
      "Documents",
      "Visit Forms",
      "Notes Search",
      "Marketplace",
      "Upsells",
    ],
  },
  {
    title: "Calculator",
    type: "nested",
    children: ["Aerial Measurements", "Service Caclulators", "BH Calculator"],
  },
  {
    title: "Finances",
    type: "nested",
    children: [
      "Invoices",
      "Estimates",
      "Payments",
      "Expenses",
      "Level Billing",
      "Customer Statements",
    ],
  },
  { title: "Reports", type: "flat" },
  { title: "CSV Imports", type: "flat" },
  {
    title: "Support",
    type: "nested",
    children: [
      "Help Articles",
      "Release Notes",
      "Facebook Group",
      "Book a Call",
      "Copilot University",
    ],
  },
];

// build toggle
// build icon button
// build reusable icon
// build input <wait for automations>
// build subnav items
// dont build sub nav left rail <shopify version>

export const SideNav = ({ ...props }) => {
  //
  const [open, setOpen] = useState<undefined | string>();
  const [expanded, setExpanded] = useState(true);

  // build header
  // build footer mock

  return (
    <aside className={`flex flex-col w-[280px] min-w-[280px] bg-blue-900`}>
      {/* top */}

      <div className="py-5 px-6 flex flex-row justify-between items-center">
        <Image src={"/watermark.png"} alt="Logo" width="108" height="32" />
        <ChevronToggle alt isOpen={expanded} classNames="text-white" />
      </div>
      {/* body */}
      <div className="py-4 px-3 flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-3">
          {/* mock search */}
          <div className="w-full h-9 bg-white border border-solid border-grey-300 rounded" />
          {/* mock clock */}
          <div className="w-full bg-blue-600 p-2 flex flex-row justify-between items-center">
            <div className="flex flex-col text-white ">
              <Text.Body>Not Clocked In</Text.Body>
            </div>
            <Button variant="outline">
              <Clock />
              Clock In
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 text-white w-full p-2 px-4 bg-blue-800 rounded">
            <Text.Body>{expanded ? "Expanded" : "Not Expanded"}</Text.Body>
            <Text.Body>{open ? open : "Nothing Open"}</Text.Body>
          </div>
          {navArray.map((item, i) => (
            <>
              {/* from here down should be its own component */}
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <SideNavItem
                    key={i}
                    isNested={item.type === "nested"}
                    isActive={open === item.title}
                    isExpanded={expanded}
                    onClick={() => setOpen(item.title)}
                    className="w-full"
                  >
                    {item.title}
                  </SideNavItem>
                </CollapsibleTrigger>
                {item.type === "nested" && (
                  <CollapsibleContent className="pt-3">
                    <SideNavSublist>
                      {item.children &&
                        item.children.map((x, i) => (
                          <SideNavSubItem
                            key={i}
                            isActive={false}
                            className="flex-1"
                          >
                            {x}
                          </SideNavSubItem>
                        ))}
                    </SideNavSublist>
                  </CollapsibleContent>
                )}
              </Collapsible>
            </>
          ))}
        </div>
      </div>
      {/* footer */}
      {/*  */}

      {/*  */}
    </aside>
  );
};
