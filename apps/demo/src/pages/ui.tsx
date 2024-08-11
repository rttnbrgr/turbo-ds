import * as React from "react";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { MockBreadcrumb } from "@/components/ui/mock";
import { Layout } from "@/components/ui/layout";

export default function Ui() {
  // tab state
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Header>Button</Text.Header>
        <Text.Header>Size</Text.Header>
        <div className="flex flex-col gap-4 items-start">
          <Button variant="fill" size="sm">
            Button
          </Button>
          <Button variant="fill" size="md">
            Button
          </Button>
        </div>
        <Text.Header>Style + Intent</Text.Header>
        <div className="flex flex-row justify-start items-start gap-2">
          <div className="flex flex-col gap-4 items-start">
            <Button variant="fill" intent="default">
              Button
            </Button>
            <Button variant="fill" intent="action">
              Button
            </Button>
            <Button variant="fill" intent="danger">
              Button
            </Button>
          </div>
          <Button variant="outline">Button</Button>
          <div className="flex flex-col gap-4 items-start">
            <Button variant="ghost" intent="default">
              Button
            </Button>
            <Button variant="ghost" intent="action">
              Button
            </Button>
            <Button variant="ghost" intent="danger">
              Button
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
