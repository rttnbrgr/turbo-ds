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
          <Button variant="default" size="sm">
            Button
          </Button>
          <Button variant="default" size="default">
            Button
          </Button>
        </div>
      </div>
    </Layout>
  );
}
