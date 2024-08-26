import * as React from "react";
import * as Text from "@/components/ui/text";
import { AutomationCardProps } from "@/components/ui/automation-card";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const AutomationInfoCard = ({
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
