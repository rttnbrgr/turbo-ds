import { cn } from "@/lib/utils";
import { ChevronToggle } from "../ui/chevron-toggle";

/**
 * Shared styles for both list items and nested list items
 */
const _liBase = `inline-flex flex-row items-center flex-1 bg-transparent rounded`;
const _liTypography = `text-sm/4 font-semibold text-white`; // #TODO: non-standard text style
const _liHover = `cursor-pointer hover:bg-blue-500`;

/**
 *
 * Nav Item
 * -
 * The list items for top level nav items
 *
 */
export type SideNavItemProps = {
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
  icon?: boolean;
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
  icon = true,
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
      {icon && <div className="h-4 w-4 rounded bg-white flex-grow-0"></div>}
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

export type SideNavSubItemProps = {
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
