import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { AutomationCard } from "@/components/ui/automation-card";
import { Layout } from "@/components/layout";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";
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
import { Plus } from "lucide-react";

const conditionsSelect = [
  { value: "apple", text: "Visit is added" },
  { value: "banana", text: "Visit is completed" },
  { value: "blueberry", text: "Invoice becomes past due" },
  { value: "grapes", text: "Work request is submitted" },
  { value: "pineapple", text: "Estimate is sent" },
];

// const IfBlock = ({ canDelete }) => {
const IfBlock = ({ ...props }) => {
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

const IfBuilder = () => {
  const [blockCount, setBlockCount] = React.useState(1);
  return (
    <div className="flex flex-col gap-4">
      {/* row */}
      {Array.from(Array(blockCount)).map((block, i) => (
        <IfBlock key={i} />
      ))}
      <div className="flex flex-row gap-3 items-center">
        {/* if */}
        <Text.Body className="uppercase" weight="bold">
          If
        </Text.Body>

        {/* dropdown */}
        <Select>
          <SelectTrigger className="w-[180px] flex-1">
            <SelectValue placeholder="Select a condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Visit is added</SelectItem>
            <SelectItem value="banana">Visit is completed</SelectItem>
            <SelectItem value="blueberry">Invoice becomes past due</SelectItem>
            <SelectItem value="grapes">Work request is submitted</SelectItem>
            <SelectItem value="pineapple">Estimate is sent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row gap-3 items-center">
        <Button
          variant="ghost"
          className="text-blue-500"
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

const ThenBlock = () => {
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
        <Button variant="ghost" className="text-blue-500">
          <Plus />
          Add Action
        </Button>
      </div>
    </div>
  );
};

const StopBlock = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-center">
        <Button variant="ghost" className="text-red-500">
          <Plus />
          Add STOP condition
        </Button>
      </div>
    </div>
  );
};

export default function AutomationBuilder() {
  // tab state
  return (
    <Layout
      headbar={
        <>
          <Breadcrumbs layers={["Automation", "Edit Automation X"]} />
          <div className="flex flex-row gap-3">
            <Button variant="outline">New Sequence Automation</Button>
            <Button variant="fill">New +</Button>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <AutomationCard
          title="Email Customer when Negatively Reviewed"
          description="This is an automation description that can be long but will eventually wrap."
          isVisible
          isActive={false}
        />
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="flex flex-col gap-6">
              <div className="border border-solid border-gray-300 px-4 py-4 rounded bg-gray-100">
                {/*  */}
                <div className="flex flex-col gap-6">
                  <IfBuilder />
                  <div className="h-[1px] w-full bg-gray-300" />
                  <ThenBlock />
                </div>
              </div>

              <div className="border border-solid border-gray-300 px-4 py-4 rounded bg-gray-100">
                {/*  */}
                <div className="flex flex-col gap-4">
                  <StopBlock />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
