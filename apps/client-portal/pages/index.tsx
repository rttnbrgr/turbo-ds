import * as Text from "@repo/ui/components/ui/text";
import { Layout } from "@/components/layout";

export default function ClientPortalIndex() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>Home</Text.Heading>
      </div>
    </Layout>
  );
}
