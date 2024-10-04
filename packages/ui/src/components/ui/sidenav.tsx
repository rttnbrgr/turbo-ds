import Image from "next/image";

import { cn } from "@repo/ui/lib/utils";

import { ChevronToggle } from "@repo/ui/components/ui/chevron-toggle";

import {
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

const NAV_WIDTH = 280;
const NAV_PX = 24;

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
