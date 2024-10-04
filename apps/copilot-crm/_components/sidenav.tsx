import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import * as Text from "@repo/ui/components/ui/text";
import { cn } from "@repo/ui/lib/utils";
import React, { useState } from "react";
import { ChevronToggle } from "@repo/ui/components/ui/chevron-toggle";
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
} from "@repo/ui/components/ui/collapsible";
import Link, { LinkProps } from "next/link";

/**
 * Shared styles for both list items and nested list items
 */
const _liBase = `inline-flex flex-row items-center flex-1 bg-transparent rounded`;
const _liTypography = `text-sm/4 font-semibold text-white`; // #TODO: non-standard text style
const _liHover = `cursor-pointer hover:bg-blue-500`;

export const navIconSize = 16;

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
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
export const SideNavItem = ({
  isNested = true,
  onClick,
  isActive,
  isExpanded,
  icon,
  className,
  ...props
}: SideNavItemProps) => {
  // Adjust base spacing
  const _navLiBase = `${_liBase} gap-3 py-2 px-3`;
  // Compute open
  const _navLiOpen = isActive && "bg-blue-600";

  const _navLiExpanded = isExpanded ? "w-full" : "px-2";

  return (
    <CollapsibleTrigger
      className={cn(
        _navLiBase,
        _liTypography,
        _liHover,
        _navLiOpen,
        _navLiExpanded,
        className,
      )}
      // onClick={e: React.mou => {
      //   onClick(e);
      // }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("before click");
        // onClick(e);
        console.log("click");
      }}
    >
      {/* Icon */}
      {icon && icon}
      {isExpanded && (
        <>
          <span className="flex-1 text-left">{props.children}</span>
          {isNested && <ChevronToggle isOpen={isActive} />}
        </>
      )}
    </CollapsibleTrigger>
  );
};

type SideNavItemSimpleProps = Omit<
  SideNavItemProps,
  "isNested" | "isExpanded" | "onClick"
> & {
  href: LinkProps["href"];
};

export const SideNavItemSimple = ({
  isActive,
  icon,
  className,
  href,
  ...props
}: SideNavItemSimpleProps) => {
  // Adjust base spacing
  const _navLiBase = `${_liBase} gap-3 py-2 px-3`;
  // Compute open
  const _navLiActive = isActive && "bg-blue-600";
  // Overrides
  const _overrides = `text-foreground hover:bg-gray-50`;

  return (
    <Link
      href={href}
      className={cn(
        _navLiBase,
        _liTypography,
        _liHover,
        _navLiActive,
        _overrides,
        className,
      )}
    >
      {/* Icon */}
      {icon && icon}
      <span className="flex-1 text-left">{props.children}</span>
    </Link>
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
export const SideNavSubItem = ({
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
        className,
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
type SideNavSublistProps = {
  children?: React.ReactNode;
  className?: string;
  expanded: boolean;
};

export const SideNavSublist = ({
  className,
  children,
  expanded,
}: SideNavSublistProps) => {
  const expandedCn = expanded ? "pt-3" : "hidden";
  return (
    <CollapsibleContent
      className={cn("flex flex-row gap-4", expandedCn, className)}
    >
      {/* Border */}
      <div className="w-4 border-r border-solid border-white" />
      {/* Stack for Sublist */}
      <div className="flex flex-col gap-1 fle-1">
        {/* comment to keep fold */}
        {children}
      </div>
    </CollapsibleContent>
  );
};

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

type NavHeaderProps = {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavHeader = ({
  expanded,
  setExpanded,
  ...props
}: NavHeaderProps) => {
  //

  // Padding X
  // const px = `px-${NAV_PX / 4}`; // px-5
  const px = `px-5`; // px-5

  // Image wrapper
  // this sets the width when expanded
  const blockWidth = NAV_WIDTH - NAV_PX * 2;
  // const blockWidthClass = `w-[${blockWidth}px]`; // fucking tailwind
  const blockWidthClass = `w-[232px]`;
  const imageWidth = expanded ? blockWidthClass : `w-0`;
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
        <Image
          src={"/watermark.png"}
          alt="Logo"
          width="108"
          height="32"
          className="max-w-none"
        />
      </div>
      <button
        onClick={() => {
          setExpanded((cv) => !cv);
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

  const bodyCn = expanded ? "" : "items-center";

  return (
    <aside
      className={`flex flex-col  bg-blue-900`}
      onClick={() => {
        setOpen(undefined);
      }}
    >
      {/* top */}

      <NavHeader expanded={expanded} setExpanded={setExpanded} />
      <div className="flex flex-col px-6py-2 text-white hidden">
        <Text.Body>{expanded ? "Expanded" : "Not Expanded"}</Text.Body>
      </div>
      {/* body */}
      <div className="py-4 px-3 flex flex-col gap-8 flex-1">
        {/* Clock + Search */}
        <div className="flex flex-col gap-3 hidden">
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

        {/* Nav items */}
        <div className={cn(bodyCn, "flex flex-col gap-3")}>
          <div className="flex flex-col gap-2 text-white w-full p-2 px-4 bg-blue-800 rounded hidden">
            <Text.Body>{expanded ? "Expanded" : "Not Expanded"}</Text.Body>
            <Text.Body>{open ? open : "Nothing Open"}</Text.Body>
          </div>
          {/* from here down should be its own component */}
          {navArray.map((item, i) => (
            <Collapsible key={i}>
              <SideNavItem
                isNested={item.type === "nested"}
                isActive={open === item.title}
                isExpanded={expanded}
                onClick={(e) => {
                  setOpen(item.title);
                  // e.preventDefault();
                }}
                icon={item.icon}
              >
                {item.title}
              </SideNavItem>
              {item.type === "nested" && (
                <SideNavSublist expanded={expanded}>
                  {item.children &&
                    item.children.map((x, j) => (
                      <SideNavSubItem
                        key={j}
                        isActive={false}
                        className="flex-1"
                      >
                        {x}
                      </SideNavSubItem>
                    ))}
                </SideNavSublist>
              )}
            </Collapsible>
          ))}
        </div>
      </div>
      {/* footer */}
      {/*  */}

      {/*  */}
    </aside>
  );
};
