import { cn } from "@repo/ui/lib/utils";
import { Nav } from "./nav";

const _root = `flex min-h-screen flex-col md:flex-row font-sans`;
const _body = `flex flex-col p-8 flex-1 bg-gray-50`;

/**
 *
 * Layout
 * -
 * Currently, the only layout component
 * Allows us to move shared app structure across routes w/o duplication
 *
 */

export type LayoutProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Layout = ({ children, className, ...props }: LayoutProps) => {
  // tab state
  return (
    <main className={cn(_root, className)}>
      <Nav />
      <div className={_body}>{children}</div>
    </main>
  );
};
