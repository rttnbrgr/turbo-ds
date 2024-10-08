import * as React from "react";

import * as Text from "@repo/ui/components/ui/text";
import { cn } from "@repo/ui/lib/utils";

/**
 *
 * Breadrumb parent link
 * -
 * extend this as needed
 * does it need to be next link? regular link?
 *
 */
type BreadcrumbLinkProps = Text.TextBodyProps;
const BreadcrumbLink = ({
  children,
  className,
  ...props
}: BreadcrumbLinkProps) => {
  return (
    <Text.Body
      weight="bold"
      className={cn("hover:underline hover:cursor-pointer", className)}
      {...props}
    >
      {children}
    </Text.Body>
  );
};

/**
 * Single purpose seperator
 */
const BreadcrumbSeperator = ({ className, ...props }: BreadcrumbLinkProps) => {
  return (
    <Text.Body className={cn(className)} {...props}>
      /
    </Text.Body>
  );
};

/**
 * Breadcrumbs
 */
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  layers: string[];
}

const _base = "flex flex-row gap-1 justify-start items-center text-gray-950";

const Breadcrumbs = React.forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ children, className, layers, ...props }, ref) => {
    const layerDepth = layers.length;
    return (
      <div ref={ref} className={cn(_base)} {...props}>
        {layers.map((layer, i) => {
          const hasChildLayer = layerDepth > i + 1;
          if (hasChildLayer)
            return (
              <React.Fragment key={i}>
                <BreadcrumbLink>{layer}</BreadcrumbLink>
                <BreadcrumbSeperator />
              </React.Fragment>
            );
          else return <Text.Body key={i}>{layer}</Text.Body>;
        })}
      </div>
    );
  },
);
Breadcrumbs.displayName = "Breadcrumbs";

export { Breadcrumbs };
