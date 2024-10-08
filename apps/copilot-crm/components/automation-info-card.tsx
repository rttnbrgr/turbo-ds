import * as React from "react";
import * as Text from "@repo/ui/components/ui/text";
import { AutomationCardProps } from "@repo/ui/components/ui/automation-card";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Checkbox } from "@repo/ui/components/ui/checkbox";

export const AutomationInfoCard = ({
  title,
  description,
  isActive,
  isLocked,
  isVisible,
  ...props
}: AutomationCardProps) => {
  return (
    <Card className="basis-[320px] grow gap-6 max-w-[400px]">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardBody className="flex flex-col gap-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="automation-name">Automation Name</Label>
          <Input type="text" id="automation-name" placeholder={title} />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="automation-description">Automation Description</Label>
          <Input
            type="text"
            id="automation-description"
            placeholder={description}
          />
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
