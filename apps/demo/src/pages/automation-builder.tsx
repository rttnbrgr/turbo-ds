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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Toggle } from "@/components/ui/toggle";
import { automationMockData } from ".";

const AutomationInfoCard = ({
  title,
  description,
  isActive,
  isLocked,
  isVisible,
  ...props
}: AutomationCardProps & {}) => {
  return (
    <Card className="basis-[320px] grow gap-6 max-w-[400px]">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="automation-name">Automation Name</Label>
          <Input type="text" id="automation-name" value={title} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="automation-description">Automation Description</Label>
          <Input type="text" id="automation-description" value={description} />
          <Text.Body size="sm">
            This will appear under this automation’s name in the summary view.
          </Text.Body>
        </div>
        <div className="h-[1px] w-full bg-gray-300" />
        <div className="items-top flex space-x-2">
          <Checkbox id="automation-review" defaultChecked={isVisible} />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="automation-review" weight="medium">
              Review Before Activation
            </Label>
            <Text.Body size={"sm"} className="text-slate-500">
              When checked, this automation sequence will be reviewed before it
              can be activated.
            </Text.Body>
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox id="automation-password" defaultChecked={isLocked} />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="automation-password" weight="medium">
              Password Protect Automation
            </Label>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default function AutomationBuilder() {
  const mockAutomation = automationMockData[2];
  // tab state
  return (
    <Layout
      headbar={
        <>
          <Breadcrumbs layers={["Automation", "Edit Automation X"]} />
          <div className="flex flex-row gap-3 items-stretch ">
            <div className="flex flex-row gap-3 items-center">
              <Text.Body>This automation is </Text.Body>
              <Toggle variant="off-on" size="md" />
            </div>
            <span className="w-[1px] h-9 bg-gray-300" />
            <Button intent="action" variant="fill" disabled>
              Save and Exit
            </Button>
          </div>
        </>
      }
    >
      <div className="flex flex-row gap-4 flex-wrap">
        <AutomationInfoCard {...mockAutomation} />
        <Card className="basis-[500px] grow-[3]">
          <CardHeader>
            <CardTitle>Automation Conditions</CardTitle>
            <CardDescription>
              New to automations? Check out our{" "}
              <span className="text-blue-600 underline">
                automations resources
              </span>{" "}
              at Copilot University.
            </CardDescription>
          </CardHeader>
          <CardBody>
            <div className="border border-solid border-gray-300 px-4 py-4 rounded gray-100">
              {/* row */}
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
                    <SelectItem value="blueberry">
                      Invoice becomes past due
                    </SelectItem>
                    <SelectItem value="grapes" disabled>
                      Work request is submitted
                    </SelectItem>
                    <SelectItem value="pineapple">Estimate is sent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p>Card Content</p>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
