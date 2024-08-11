import * as React from "react";
import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { MockBreadcrumb } from "@/components/ui/mock";
import { Layout } from "@/components/ui/layout";
import { Plus } from "lucide-react";

export default function Ui() {
  // tab state
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Header>Button</Text.Header>
        <Text.Header>Size</Text.Header>
        <div className="flex flex-col gap-4 items-start">
          <Button variant="outline" size="sm">
            <Plus size={16} />
            Button
          </Button>
          <Button variant="outline" size="md">
            <Plus size={16} />
            Button
          </Button>
        </div>
        <Text.Header>Style + Intent</Text.Header>
        <div className="flex flex-row justify-start items-start gap-2">
          <div className="flex flex-col gap-4 items-start">
            <Button variant="fill" intent="default">
              <Plus size={16} />
              Button
            </Button>
            <Button variant="fill" intent="action">
              <Plus size={16} />
              Button
            </Button>
            <Button variant="fill" intent="danger">
              <Plus size={16} />
              Button
            </Button>
          </div>
          <Button variant="outline">
            <Plus size={16} />
            Button
          </Button>
          <div className="flex flex-col gap-4 items-start">
            <Button variant="ghost" intent="default">
              <Plus size={16} />
              Button
            </Button>
            <Button variant="ghost" intent="action">
              <Plus size={16} />
              Button
            </Button>
            <Button variant="ghost" intent="danger">
              <Plus size={16} />
              Button
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
