import * as React from "react";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import {
  AutomationCard,
  AutomationCardProps,
} from "@/components/ui/automation-card";
import { Layout } from "@/components/layout";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
// import { automationMockData } from ".";

const conditionsSelect = [
  { value: "apple", text: "Visit is added" },
  { value: "banana", text: "Visit is completed" },
  { value: "blueberry", text: "Invoice becomes past due" },
  { value: "grapes", text: "Work request is submitted" },
  { value: "pineapple", text: "Estimate is sent" },
];

// const IfBlock = ({ canDelete }) => {
export const IfBlock = ({ ...props }) => {
  return (
    <div className="flex flex-row gap-3 items-center">
      {/* if */}
      <Text.Body className="uppercase" weight="bold">
        If
      </Text.Body>
      {/* and/or */}

      {/* dropdown */}
      <Select>
        <SelectTrigger className="w-[180px] flex-1">
          <SelectValue placeholder="Select a condition" />
        </SelectTrigger>
        <SelectContent>
          {conditionsSelect.map((condition, i) => (
            <SelectItem key={i} value={condition.value}>
              {condition.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* delete */}
    </div>
  );
};

export const IfBuilder = () => {
  const [blockCount, setBlockCount] = React.useState(1);
  return (
    <div className="flex flex-col gap-4">
      {/* row */}
      {Array.from(Array(blockCount)).map((block, i) => (
        <IfBlock key={i} />
      ))}
      <div className="flex flex-row gap-3 items-center">
        <Button
          variant="ghost"
          intent={"action"}
          onClick={() => {
            setBlockCount(cv => ++cv);
          }}
        >
          <Plus />
          Add condition
        </Button>
      </div>
    </div>
  );
};

export const ThenBlock = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* row */}
      <div className="flex flex-row gap-3 items-center">
        {/* if */}
        <Text.Body className="uppercase" weight="bold">
          Then
        </Text.Body>

        {/* dropdown */}
        <Select>
          <SelectTrigger className="w-[180px] flex-1">
            <SelectValue placeholder="Select a condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Email Customer</SelectItem>
            <SelectItem value="banana">Visit is completed</SelectItem>
            <SelectItem value="blueberry">Invoice becomes past due</SelectItem>
            <SelectItem value="grapes">Work request is submitted</SelectItem>
            <SelectItem value="pineapple">Estimate is sent</SelectItem>
          </SelectContent>
        </Select>

        <Text.Body>the template</Text.Body>

        {/* dropdown */}
        <Select>
          <SelectTrigger className="w-[180px] flex-1">
            <SelectValue placeholder="Select a condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Pick up your dog shit</SelectItem>
            <SelectItem value="banana">Visit is completed</SelectItem>
            <SelectItem value="blueberry">Invoice becomes past due</SelectItem>
            <SelectItem value="grapes">Work request is submitted</SelectItem>
            <SelectItem value="pineapple">Estimate is sent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <Button variant="ghost" intent={"action"}>
          <Plus />
          Add Action
        </Button>
      </div>
    </div>
  );
};

export const StopBlock = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center">
        <Button variant="ghost" intent="danger">
          <Plus />
          Add STOP condition
        </Button>
      </div>
    </div>
  );
};

type foo = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const NestedCard = ({ className, ...props }: foo) => {
  return (
    <div
      className={cn(
        "border border-solid border-gray-300 px-4 py-4 rounded bg-gray-50",
        className
      )}
      {...props}
    />
  );
};

export const Divider = ({ className, ...props }: foo) => {
  return (
    <div className={cn("h-[1px] w-full bg-gray-300", className)} {...props} />
  );
};
