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
import { Plus } from "lucide-react";
import { AutomationInfoCard } from "@/components/automation-builder/automation-info-card";
import {
  Divider,
  IfBuilder,
  NestedCard,
  StopBlock,
  ThenBlock,
} from "@/components/automation-builder";
import { automationMockData } from "@/mocks/automation-builder";

export default function AutomationBuilder() {
  const mockAutomation = automationMockData[1];
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
          <CardBody className="flex flex-col gap-6">
            <NestedCard className="flex flex-col gap-6">
              <IfBuilder />
              <Divider />
              <ThenBlock />
            </NestedCard>

            <NestedCard className="flex flex-col gap-4">
              <StopBlock />
            </NestedCard>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
