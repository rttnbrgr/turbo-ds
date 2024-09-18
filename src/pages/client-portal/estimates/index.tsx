import * as Text from "@/components/ui/text";
import { Layout } from "@client-portal/layout";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Estimate, ESTIMATES_FIXTURE, SERVICE_TYPES } from "@/mocks/estimates";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import router from "next/router";
import {
  ArrowUpDown,
  CalendarIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ARRIVAL_TIMES, STATUS_VS_CHIP_INTENT } from "@/lib/constants";
import { Body } from "@/components/ui/text";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function HeaderCell({ children, column, sortable = true }) {
  if (!sortable) {
    return <Text.Heading size="sm">{children}</Text.Heading>;
  }
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="text-sm font-bold p-0"
    >
      {children}
      {column.getIsSorted() === "asc" ? (
        <ChevronUp size={12} />
      ) : (
        <ChevronDown size={12} />
      )}
    </Button>
  );
}

export const columns: ColumnDef<Estimate>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return <HeaderCell column={column}>Estimates</HeaderCell>;
    },
  },
  {
    accessorKey: "request_date",
    header: ({ column }) => {
      return <HeaderCell column={column}>Request Date</HeaderCell>;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("request_date")
            ? new Date(row.getValue("request_date")).toLocaleDateString()
            : "--"}
        </div>
      );
    },
  },
  {
    accessorKey: "visit_date",
    header: ({ column }) => {
      return <HeaderCell column={column}>Visit Date</HeaderCell>;
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("visit_date")
            ? new Date(row.getValue("visit_date")).toLocaleDateString()
            : "--"}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return <HeaderCell column={column}>Total</HeaderCell>;
    },
    cell: ({ row }) => {
      const total = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total);

      return (
        <div className="text-right font-medium">{total ? formatted : "--"}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <HeaderCell column={column}>Status</HeaderCell>;
    },
    cell: ({ row }) => {
      const status: Estimate["status"] = row.getValue("status");
      return (
        <StatusChip intent={STATUS_VS_CHIP_INTENT[status]}>{status}</StatusChip>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <HeaderCell column={column} sortable={false}>
          {" "}
        </HeaderCell>
      );
    },
    cell: ({ row }) => {
      const estimateId = row.getValue("id");
      return (
        <Button
          variant="fill"
          intent="action"
          onClick={() => router.push(`/client-portal/estimates/${estimateId}`)}
        >
          View Estimate
        </Button>
      );
    },
  },
];

const formSchema = z.object({
  service_type: z.enum(["Service Type 1", "Service Type 2", "Service Type 3"]),
  details: z.string(),
  visit_date: z.date(),
  visit_date_alternate: z.date().optional(),
  preferredArrivalTimes: z.array(
    z.enum(["Anytime", "Morning", "Afternoon", "Evening"])
  ),
  frequency: z.enum(["One Time", "Weekly", "Bi-Weekly", "Monthly"]),
});

export default function Estimates() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_type: "Service Type 1",
      details: "",
      visit_date: new Date(),
      visit_date_alternate: new Date(),
      preferredArrivalTimes: ["Anytime"],
      frequency: "One Time",
    },
  });

  const onSubmit = useCallback(() => {
    console.log("submitting form");
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-9">
        <div className="flex justify-between">
          <Text.Heading size={"xl"}>Estimates</Text.Heading>
          <div className="flex gap-3 items-center">
            <Body>Status</Body>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(STATUS_VS_CHIP_INTENT).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Dialog>
              <DialogTrigger asChild>
                <Button intent="action">+ Request an Estimate</Button>
              </DialogTrigger>
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>Request An Estimate</DialogTitle>
                  <DialogDescription>
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <Text.Heading size="sm">Contact Details</Text.Heading>
                        <Body size="sm">Jane Doe</Body>
                        <Body size="sm">456 Grand Ave</Body>
                        <Body size="sm">Madison, WI 53703</Body>
                        <Body size="sm">(555) 555-5555</Body>
                        <Body size="sm">info@madisonhandyman.com</Body>
                      </div>
                      <Button variant="outline">Edit Details</Button>
                    </div>

                    <Separator className="my-8" />

                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="service_type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Type</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an Option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.keys(SERVICE_TYPES).map(
                                      (serviceType) => (
                                        <SelectItem
                                          key={serviceType}
                                          value={serviceType}
                                        >
                                          {serviceType}
                                        </SelectItem>
                                      )
                                    )}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="details"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Details</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormDescription>
                                Please be as detailed as possible to ensure an
                                accurate estimate.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-6">
                          <FormField
                            control={form.control}
                            name="visit_date"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Requested Visit Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  We will try our best to accommodate this
                                  request but if necessary, will propose another
                                  date.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="visit_date_alternate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Alternate Visit Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-[240px] pl-3 text-left font-normal",
                                          !field.value &&
                                            "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                      }
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormDescription>
                                  This is optional.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex gap-6">
                          <FormField
                            control={form.control}
                            name="preferredArrivalTimes"
                            render={() => (
                              <FormItem>
                                <div className="mb-4">
                                  <FormLabel className="text-base">
                                    Preferred Arrival Times
                                  </FormLabel>
                                </div>
                                {ARRIVAL_TIMES.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="preferredArrivalTimes"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(
                                                item.id as any
                                              )}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([
                                                      ...field.value,
                                                      item.id,
                                                    ])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) =>
                                                          value !== item.id
                                                      )
                                                    );
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    }}
                                  />
                                ))}
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Frequency</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="One Time" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        One Time
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="Weekly" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Weekly
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="Biweekly" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Biweekly (Every other week)
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="Monthly" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        Monthly
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-3 justify-end">
                          <DialogClose asChild>
                            <Button type="button" variant="outline">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button type="submit" intent="action">
                            Submit Request
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <DataTable columns={columns} data={ESTIMATES_FIXTURE} />
      </div>
    </Layout>
  );
}
