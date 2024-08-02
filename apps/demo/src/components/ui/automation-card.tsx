import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Camera,
  ChevronRight,
  Lock,
  LockOpen,
  Eye,
  EyeOff,
} from "lucide-react";

const IconWrap = ({ className = "", ...props }) => (
  <span
    className={cn("p-1 inline-flex justify-center items-center", className)}
    {...props}
  />
);

type StatusChipProps = {
  on: boolean;
};

const StatusChip = ({ on, ...props }: StatusChipProps) => {
  const _sharedWrap = `rounded py-1 px-2 inline-flex flex-row gap-1 items-center`;
  const _sharedDot = `w-3 h-3 rounded-full`;

  //
  const _uniqueWrap = on ? `bg-green-100` : `bg-red-100`;
  const _uniqueDot = on ? `bg-green-800` : `bg-red-800`;
  const _uniqueChildren = on ? `On` : `Off`;

  return (
    <div className={cn(_sharedWrap, _uniqueWrap)}>
      <span className={cn(_sharedDot, _uniqueDot)} />
      <Text.Body size="sm">{_uniqueChildren}</Text.Body>
    </div>
  );
};

type AutomationCardProps = {
  visible?: boolean;
  locked?: boolean;
  on: boolean;
  title: string;
  description: string;
};

export const AutomationCard = ({
  visible: isVisible = true,
  locked: isLocked = false,
  on: isOn = false,
  title,
  description,
  ...props
}: AutomationCardProps) => {
  function onEditAutomation() {
    console.log("🤖 edit automation");
  }

  // tab state
  return (
    <Collapsible>
      {/* items */}
      <div className="p-4 flex flex-row bg-white rounded-lg drop-shadow-md">
        <div className="flex flex-row justify-start items-start gap-3 flex-grow">
          {/* toggle */}
          <CollapsibleTrigger>
            <IconWrap>
              <ChevronRight size={16} />
            </IconWrap>
          </CollapsibleTrigger>

          {/* main */}
          <div className="flex flex-col flex-1">
            {/* header row */}
            <div className="flex flex-row">
              <div className="flex flex-col flex-1">
                <div className="flex flex-row items-center gap-1">
                  <Text.Header size="sm">{title}</Text.Header>

                  <IconWrap>
                    {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                  </IconWrap>
                  <IconWrap>
                    {isLocked ? <Lock size={16} /> : <LockOpen size={16} />}
                  </IconWrap>
                </div>
                <Text.Body>{description}</Text.Body>
              </div>
              {/* Right Sice */}
              <div className="flex flex-row justify-start items-center gap-6 ">
                <StatusChip on={isOn} />
                <Button variant="outline" onClick={onEditAutomation}>
                  Edit Automation
                </Button>
              </div>
            </div>
            {/* content */}
            <CollapsibleContent className="CollapsibleContent">
              <div className="pt-6 pb-2">
                {/* box wrapp */}
                <div className="bg-gray-100 py-3 px-4 flex flex-col gap-3 max-w-[700px] border border-solid border-gray-300 rounded">
                  {/* row */}
                  <Text.Body>
                    <span className="font-bold">IF</span> a visit is completed
                    and the customer left a negative review (0 – 3.5 stars)...
                  </Text.Body>
                  <Text.Body>
                    <span className="font-bold">THEN </span>
                    email customer the template “Response to Negative Review”
                    after 1 day, <span className="font-bold">ADD </span>
                    the tag “Dissatisfied” to the customer immediately.
                  </Text.Body>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </div>
      </div>
    </Collapsible>
  );
};

// <div>
//   This is an automation description that can be long but
//   will eventually wrap.
// </div>
// {/* description */}
