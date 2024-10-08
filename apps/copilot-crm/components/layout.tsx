import { cn } from "@repo/ui/lib/utils";
import { SideNav } from "./sidenav";

/**
 *
 * Root pane
 * -
 * App level container, extends edge to edge, top to bottom,  at the root of our app
 *
 */
type RootPaneProps = {
  className?: string;
  children?: React.ReactNode;
};

// only used here, so let's avoid abstracting this for now
const RootPane = ({ className, ...props }: RootPaneProps) => (
  <main
    className={cn(`flex min-h-screen flex-row font-sans`, className)}
    {...props}
  />
);

/**
 *
 * Primary pane
 * -
 * All the space that is not that nav, at the root level of the app
 *
 */
export type PrimaryPaneProps = RootPaneProps;

export const PrimaryPane = ({ className, ...props }: PrimaryPaneProps) => (
  <div className={cn(`flex flex-col flex-1`, className)} {...props} />
);

/**
 *
 * Body pane
 * -
 * these need wordsmithing
 *
 */
export type BodyPaneProps = RootPaneProps;

export const BodyPane = ({ className, ...props }: BodyPaneProps) => (
  <div
    className={cn(`p-8 flex-1 flex flex-col bg-gray-50`, className)}
    {...props}
  />
);

/**
 *
 * Header bar
 * -
 * In use for POC; may not move forward
 * Leave un-abstracted for now
 *
 */
export type HeadbarProps = RootPaneProps;

// only used here, so let's avoid abstracting this for now
export const Headbar = ({ className, ...props }: HeadbarProps) => (
  <div
    className={cn(
      `px-8 py-4 bg-white flex flex-row justify-between items-center`,
      className,
    )}
    {...props}
  />
);

/**
 *
 * Layout
 * -
 * Currently, the only layout component
 * Allows us to move shared app structure across routes w/o duplication
 *
 */
// export default function Home() {
export type LayoutProps = RootPaneProps & {
  headbar?: React.ReactNode;
};

export const Layout = ({ headbar, ...props }: LayoutProps) => {
  // tab state
  return (
    <RootPane>
      <SideNav />
      <PrimaryPane>
        <Headbar>{headbar && headbar}</Headbar>
        <BodyPane>{props.children}</BodyPane>
      </PrimaryPane>
    </RootPane>
  );
};
