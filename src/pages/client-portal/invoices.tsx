import * as Text from "@/components/ui/text";
import { Layout } from "@client-portal/layout";

export default function Invoices() {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Header size={"xl"}>Invoices</Text.Header>
      </div>
    </Layout>
  );
}
