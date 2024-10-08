// components
import { Layout } from "@/components/layout";
import { AutomationInfoCard } from "../components/automation-info-card";

// ui
import { Button } from "@repo/ui/components/ui/button";
import * as Text from "@repo/ui/components/ui/text";
import {
  Card,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Breadcrumbs } from "@repo/ui/components/ui/breadcrumbs";
import { Toggle } from "@repo/ui/components/ui/toggle";

import {
  Divider,
  IfBuilder,
  NestedCard,
  StopBlock,
  ThenBlock,
} from "../components/automation-components";

import { AUTOMATION_MOCK_DATA } from "@repo/mocks/automation-builder";

export default function AutomationBuilder() {
  const mockAutomation = AUTOMATION_MOCK_DATA[1];
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
