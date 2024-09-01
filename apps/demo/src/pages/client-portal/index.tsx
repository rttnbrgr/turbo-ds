import { Button } from "@/components/ui/button";
import * as Text from "@/components/ui/text";
import { Layout } from "@client-portal/layout";

export default function ClientPortalIndex() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Header size={"xl"}>Home</Text.Header>
      </div>
    </Layout>
  );
}
