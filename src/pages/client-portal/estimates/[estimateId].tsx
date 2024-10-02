import { Layout } from "@/components/client-portal/layout";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { Body, Heading } from "@/components/ui/text";
import { STATUS_VS_CHIP_INTENT } from "@/lib/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { ChevronsLeft } from "lucide-react";
import { LineItems, Overview } from "@/components/ui/estimate-variants";
import { Estimate as EstimateType } from "@/mocks/estimates";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as Text from "@/components/ui/text";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const STATUS_VARIANT_MAP: { [key in EstimateType["status"]]: any } = {
  "Ready for Review": LineItems,
  Approved: LineItems,
  "Changes Requested": LineItems,
  Declined: LineItems,
  "Request Submitted": Overview,
};

const FormSchema = z.object({
  changes: z.string().min(10, {
    message: "Changes must be at least 10 characters.",
  }),
});

export default function Estimate() {
  const router = useRouter();
  const { estimateId } = router.query;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { data: estimate, isLoading } = useQuery<EstimateType>({
    queryKey: ["estimate", estimateId],
    queryFn: async () => {
      const response = await fetch(
        `https://api.example.com/estimate/${estimateId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const queryClient = useQueryClient();

  const { mutate: deleteEstimate, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `https://api.example.com/estimate/${estimateId}`,
        { method: "DELETE" }
      );
      // update the cache
      if (response.ok) {
        queryClient.invalidateQueries({ queryKey: ["estimates"] });
      }
      return response.json();
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    // close the dialog
    form.reset();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Request</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-fullspace-y-6"
                  >
                    <DialogHeader>
                      <DialogTitle>Request Changes</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <Text.Body>
                        In as much detail as possible, please describe the
                        updates you'd like to your original request.
                      </Text.Body>
                      <FormField
                        control={form.control}
                        name="changes"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline">Cancel</Button>
                        <DialogClose asChild>
                          <Button variant="fill" intent="action" type="submit">
                            Submit Changes
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="fill" intent="danger">
                  Delete Request
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Estimate</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <Text.Body>
                    Are you sure you want to delete this estimate?{" "}
                    <strong>This action cannot be undone</strong> and a new
                    estimate will have to be made.
                  </Text.Body>
                </div>
                <DialogFooter>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline">Cancel</Button>
                    <Button
                      variant="fill"
                      intent="danger"
                      onClick={() => {
                        deleteEstimate();
                        // navigate back to the estimates page
                        router.push("/client-portal/estimates");
                      }}
                    >
                      Delete Estimate
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {estimate?.status === "Changes Requested" && (
          <Alert variant="warn">
            <AlertTitle>Changes were requested on 08/10/24</AlertTitle>
            <AlertDescription>
              Could we please update so that this estimate includes resodding
              the full yard, not just the front? Thank you!
            </AlertDescription>
          </Alert>
        )}

        <div className="border border-solid rounded-md bg-white p-8">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
      </div>
    </Layout>
  );
}
