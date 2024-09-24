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
import { ChevronsLeft } from "lucide-react";
import { LineItems, Overview } from "@/components/ui/estimate-variants";
import { Estimate as EstimateType } from "@/mocks/estimates";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const STATUS_VARIANT_MAP: { [key in EstimateType["status"]]: any } = {
  "Ready for Review": LineItems,
  Approved: LineItems,
  "Changes Requested": LineItems,
  Declined: LineItems,
  "Request Submitted": Overview,
};

export default function Estimate({}) {
  const router = useRouter();
  const { estimateId } = router.query;

  const estimate = ESTIMATES_FIXTURE.find((e) => e.id === estimateId);

  if (!estimate) {
    return <div>Estimate not found</div>;
  }

  const StatusVariant = STATUS_VARIANT_MAP[estimate.status];

  return (
    <Layout>
      <div className="flex flex-col gap-9">
        <div className="flex justify-between">
          <Link
            href="/client-portal/estimates"
            className="flex gap-2 items-center"
          >
            <ChevronsLeft className="text-blue-600" size={12} />
            <Body size="sm" className="text-blue-600">
              Back to all estimates
            </Body>
          </Link>
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

        {estimate.status === "Changes Requested" && (
          <Alert variant="warn">
            <AlertTitle>Changes were requested on 08/10/24</AlertTitle>
            <AlertDescription>
              Could we please update so that this estimate includes resodding
              the full yard, not just the front? Thank you!
            </AlertDescription>
          </Alert>
        )}

        <div className="border border-solid rounded-md bg-white p-8">
          <div className="flex flex-col gap-6">
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

            <div className={`grid grid-cols-4 w-full items-start`}>
              <div className="flex flex-col">
                <Heading size="sm">Requested By</Heading>
                <Body size="sm">Jane Doe</Body>
                <Body size="sm">456 Grand Ave</Body>
                <Body size="sm">Madison, WI 53703</Body>
              </div>
              {estimate.notes ? (
                <div className="col-start-2">
                  <Heading size="sm">Notes</Heading>
                  <Body size="sm">{estimate.notes}</Body>
                </div>
              ) : null}
              <div className="grid grid-cols-2 items-center gap-x-3 self-end col-start-4">
                <Body size="sm" weight="bold">
                  Estimate Number
                </Body>
                <Body size="sm">{estimate.id}</Body>
                <Body size="sm" weight="bold">
                  Date Requested
                </Body>
                <Body size="sm">
                  {estimate.requestDate
                    ? new Date(estimate.requestDate).toLocaleDateString()
                    : "--"}
                </Body>
                <Body size="sm" weight="bold">
                  Visit Date
                </Body>
                <Body size="sm">
                  {estimate.visitDate
                    ? new Date(estimate.visitDate).toLocaleDateString()
                    : "--"}
                </Body>
              </div>
            </div>

            <StatusVariant estimate={estimate} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
