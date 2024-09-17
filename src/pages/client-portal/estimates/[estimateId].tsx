import { Layout } from "@/components/client-portal/layout";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Body, Heading } from "@/components/ui/text";
import { STATUS_VS_CHIP_INTENT } from "@/lib/constants";
import { ESTIMATES_FIXTURE } from "@/mocks/estimates";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Estimate({}) {
  const router = useRouter();
  const { estimateId } = router.query;

  const estimate = ESTIMATES_FIXTURE.find((e) => e.id === estimateId);

  if (!estimate) {
    return <div>Estimate not found</div>;
  }

  const factTable = [
    { label: "Service Type", value: estimate.service_type },
    { label: "Additional Details", value: estimate.details },
    { label: "Requested Visit Date", value: estimate.request_date },
    { label: "Alternate Visit Date", value: estimate.visit_date },
    {
      label: "Preferred Arrival Times",
      value: estimate.preferredArrivalTimes.join(", "),
    },
    { label: "Frequency", value: estimate.frequency },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-9">
        <div className="flex justify-between">
          <Link href="/client-portal/estimates">{`<< Back to all estimates`}</Link>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() =>
                router.push(`/client-portal/estimates/${estimateId}/edit`)
              }
            >
              Edit Request
            </Button>
            <Button
              variant="fill"
              intent="danger"
              onClick={() => {
                console.log("delete request", estimateId);
              }}
            >
              Delete Request
            </Button>
          </div>
        </div>

        <div className="border border-solid rounded-md bg-white p-8">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Heading>Request</Heading>
                  <StatusChip intent={STATUS_VS_CHIP_INTENT[estimate.status]}>
                    {estimate.status}
                  </StatusChip>
                </div>

                <div className="flex flex-col">
                  <Heading size="sm">Madison Handyman</Heading>
                  <Body size="sm">123 Main St</Body>
                  <Body size="sm">Madison, WI 53703</Body>
                  <Body size="sm">(555) 555-5555</Body>
                  <Body size="sm">info@madisonhandyman.com</Body>
                </div>
              </div>
              <div>
                <Image
                  alt="Logo"
                  src="/logo.png"
                  width={208}
                  height={90}
                  className="w-full hidden md:block"
                />
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <Heading size="sm">Requested By</Heading>
                <Body size="sm">Jane Doe</Body>
                <Body size="sm">456 Grand Ave</Body>
                <Body size="sm">Madison, WI 53703</Body>
              </div>
              <div className="grid grid-cols-2 items-center gap-x-3 self-end">
                <Body size="sm" weight="bold">
                  Estimate Number
                </Body>
                <Body size="sm">{estimate.id}</Body>
                <Body size="sm" weight="bold">
                  Date Requested
                </Body>
                <Body size="sm">
                  {estimate.request_date
                    ? new Date(estimate.request_date).toLocaleDateString()
                    : "--"}
                </Body>
                <Body size="sm" weight="bold">
                  Visit Date
                </Body>
                <Body size="sm">
                  {estimate.visit_date
                    ? new Date(estimate.visit_date).toLocaleDateString()
                    : "--"}
                </Body>
              </div>
            </div>

            <Table>
              <TableBody>
                {factTable.map((fact) => (
                  <TableRow key={fact.label}>
                    <TableCell className="font-bold">{fact.label}</TableCell>
                    <TableCell>{fact.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
