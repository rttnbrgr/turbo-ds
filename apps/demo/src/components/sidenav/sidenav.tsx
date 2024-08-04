import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { cn } from "@/lib/utils";
import React, { Children, JSXElementConstructor, useState } from "react";
import { ChevronToggle } from "../ui/chevron-toggle";
import {
  Book,
  Calculator,
  ChartNoAxesColumn,
  ChartPie,
  Clock,
  FileInput,
  LayoutGrid,
  LifeBuoy,
  Megaphone,
  Receipt,
  Users,
  Wallet,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

/**
 * Shared styles for both list items and nested list items
 */
const _liBase = `inline-flex flex-row items-center flex-1 bg-transparent rounded`;
const _liTypography = `text-sm/4 font-semibold text-white`; // #TODO: non-standard text style
const _liHover = `cursor-pointer hover:bg-blue-500`;

const navIconSize = 16;

/**
 *
 * Nav Item
 * -
 * The list items for top level nav items
 *
 */
type SideNavItemProps = {
  /**
   * Extend classnames for styles
   */
  className?: string;
  /**
   * Text of the sublist item
   */
  children?: any;
  /**
   * Click handler
   */
  onClick?: any;
  /**
   * Is the subitem active
   */
  isActive: boolean;
  /**
   * Is the list item collapsed or not
   */
  isExpanded: boolean;
  /**
   * Icon for the list item
   */
  icon?: any;
  /**
   * Does the nav list item have a sublist
   */
  isNested: boolean;
};

// Should maybe be a button?
// Will need routing concerns
const SideNavItem = ({
  isNested = true,
  onClick,
  isActive,
  icon,
  className,
  ...props
}: SideNavItemProps) => {
  // Adjust base spacing
  const _navLiBase = `${_liBase} gap-3 py-2 px-3`;
  // Compute open
  const _navLiOpen = isActive && "bg-blue-600";

  return (
    <div
      className={cn(_navLiBase, _liTypography, _liHover, _navLiOpen, className)}
      onClick={() => {
        onClick(props.children);
      }}
    >
      {/* Icon */}
      {icon && icon}
      {props.isExpanded && (
        <>
          <span className="flex-1 text-left">{props.children}</span>
          {isNested && <ChevronToggle isOpen={isActive} />}
        </>
      )}
    </div>
  );
};

/**
 *
 * Sublist Item
 * -
 * The list items for nested items within a nav item
 *
 */

type SideNavSubItemProps = {
  /**
   * Extend classnames for styles
   */
  className?: string;
  /**
   * Text of the sublist item
   */
  children?: any;
  /**
   * Click handler
   */
  onClick?: any;
  /**
   * Is the subitem active
   */
  isActive: boolean;
};

// Should maybe be a button?
// Will need routing concerns
const SideNavSubItem = ({
  onClick = () => {
    console.log("subnav click");
  },
  isActive,
  className,
  ...props
}: SideNavSubItemProps) => {
  // Adjust base spacing
  const _navSubLiBase = `${_liBase} py-1 px-3`;
  // Compute open
  const _navSubLiOpen = isActive && "bg-blue-600";

  return (
    <div
      className={cn(
        _navSubLiBase,
        _liTypography,
        _liHover,
        _navSubLiOpen,
        className
      )}
      onClick={() => {
        onClick(props.children);
      }}
    >
      <span className="flex-1">{props.children}</span>
    </div>
  );
};

/**
 *
 * Sublist Wrapper
 * -
 * Extracted for ease of composing (for now)
 *
 */
const SideNavSublist = ({ children }) => (
  <div className="flex flex-row gap-4">
    {/* Border */}
    <div className="w-4 border-r border-solid border-white" />
    {/* Stack for Sublist */}
    <div className="flex flex-col gap-1 fle-1">
      {/* comment to keep fold */}
      {children}
    </div>
  </div>
);

/**
 *
 * Nav data
 * -
 * Mock the data for us to use
 * Eventually this should come from the pages/router info
 *
 */
const navArray = [
  {
    title: "My Day",
    type: "flat",
    icon: <LayoutGrid size={navIconSize} />,
  },
  {
    title: "KPI Cockpit",
    type: "flat",
    icon: <ChartNoAxesColumn size={navIconSize} />,
  },
  {
    title: "Customers",
    type: "nested",
    icon: <Wallet size={navIconSize} />,
    children: ["Customers", "Properties", "Work Requests", "Map"],
  },
  {
    title: "Team",
    type: "nested",
    icon: <Users size={navIconSize} />,
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
    icon: <Book size={navIconSize} />,
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
    icon: <Megaphone size={navIconSize} />,
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
    icon: <Calculator size={navIconSize} />,
    children: ["Aerial Measurements", "Service Caclulators", "BH Calculator"],
  },
  {
    title: "Finances",
    type: "nested",
    icon: <Receipt size={navIconSize} />,
    children: [
      "Invoices",
      "Estimates",
      "Payments",
      "Expenses",
      "Level Billing",
      "Customer Statements",
    ],
  },
  {
    title: "Reports",
    type: "flat",
    icon: <ChartPie size={navIconSize} />,
  },
  {
    title: "CSV Imports",
    type: "flat",
    icon: <FileInput size={navIconSize} />,
  },
  {
    title: "Support",
    type: "nested",
    icon: <LifeBuoy size={navIconSize} />,
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

const NAV_WIDTH = 280;
const NAV_PX = 24;

/**
 *
 * Nav Header
 * -
 * The header of the nav;
 * Contains loggle and toggle
 *
 */

type SideNavProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavHeader = ({
  expanded,
  setExpanded,
  ...props
}: SideNavProps) => {
  //

  // Padding X
  const px = `px-${NAV_PX / 4}`; // px-5

  // Image wrapper
  // this sets the width when expanded
  const blockWidth = NAV_WIDTH - NAV_PX * 2;
  const imageWidth = expanded ? `w-[${blockWidth}px]` : `w-0`;
  const imageOpacity = expanded ? `opacity-100` : `opacity-0`;
  // #TODO: fine tune the transition

  // Icon Button
  // #TODO: extract this to a icon button component
  const iconBtnCn = "p-2 hover:bg-white/5 rounded-full text-white";

  return (
    <div
      className={cn(px, "py-5 flex flex-row justify-between items-center", {})}
    >
      <div className={cn(imageWidth, imageOpacity, "transition-all")}>
        <Image src={"/watermark.png"} alt="Logo" width="108" height="32" />
      </div>
      <button
        onClick={() => {
          setExpanded(cv => !cv);
        }}
        className={iconBtnCn}
      >
        <ChevronToggle alt isOpen={expanded} />
      </button>
    </div>
  );
};

/**
 *
 * Sidenav
 * -
 * The entire sidenav feature
 * Might just call this the NAV?
 * Since, there isn't another nav
 *
 */
export const SideNav = ({ ...props }) => {
  //
  const [open, setOpen] = useState<undefined | string>();
  const [expanded, setExpanded] = useState(true);

  // build footer mock

  return (
    <aside className={`flex flex-col  bg-blue-900`}>
      {/* top */}

      <NavHeader expanded={expanded} setExpanded={setExpanded} />
      <div className="flex flex-col px-6py-2 text-white hidden">
        <Text.Body>{expanded ? "Expanded" : "Not Expanded"}</Text.Body>
      </div>
      {/* body */}
      <div className="py-4 px-3 flex flex-col gap-8 flex-1 hidden">
        <div className="flex flex-col gap-3">
          {/* mock search */}
          <div className="w-full h-9 bg-white border border-solid border-grey-300 rounded" />
          {/* mock clock */}
          <div className="w-full bg-blue-600 p-2 flex flex-row justify-between items-center">
            <div className="flex flex-col text-white">
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
                    icon={item.icon}
                    // icon={props => <PostIcon {...props} color={'#fff'} />}
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
