import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ARRIVAL_TIMES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { serviceTypeS } from "@/mocks/estimates";
import { STATES_US } from "@/mocks/states";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, Check, CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { Body, Heading } from "../ui/text";
import { Textarea } from "../ui/textarea";
import { USER_2 } from "@/mocks/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const formSchema = z.object({
  serviceType: z.enum(["Service Type 1", "Service Type 2", "Service Type 3"]),
  details: z.string(),
  visitDate: z.date(),
  visitDateAlternate: z.date().optional(),
  preferredArrivalTimes: z.array(
    z.enum(["Anytime", "Morning", "Afternoon", "Evening"])
  ),
  frequency: z.enum(["One Time", "Weekly", "Bi-Weekly", "Monthly"]),
  property: z.object({
    address: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
  }),
});

export function RequestEstimateDialog({
  userId,
  onSubmit,
  trigger,
}: {
  userId: string;
  onSubmit: any;
  trigger: JSX.Element;
}) {
  // fetch the user info
  const user = USER_2;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: "Service Type 1",
      details: "",
      visitDate: new Date(),
      visitDateAlternate: new Date(),
      preferredArrivalTimes: ["Anytime"],
      frequency: "One Time",
      property: {
        address: user.address,
        address2: user.address2,
        city: user.city,
        state: user.state,
        zip: user.zip,
        country: "USA",
      },
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Request An Estimate</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col">
                      <Heading size="sm">Contact Details</Heading>
                      <Body size="sm">{user.name}</Body>
                      <Body size="sm">{user.address} </Body>
                      <Body size="sm">{`${user.city}, ${user.state} ${user.zip}`}</Body>
                      <Body size="sm">{user.phone}</Body>
                      <Body size="sm">{user.email}</Body>
                    </div>

                    <div className="flex gap-3 justify-between">
                      <FormField
                        control={form.control}
                        name="property.address"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Street Address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="property.address2"
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Address 2</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Street Address 2"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-3">
                      <FormField
                        control={form.control}
                        name="property.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="city" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="property.state"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-2">
                            <FormLabel>State</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[75px] justify-between bg-input-background text-input-text",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? STATES_US.find(
                                          usState =>
                                            usState.value === field.value
                                        )?.label
                                      : "Select State"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Search state..." />
                                  <CommandList>
                                    <CommandEmpty>No state found.</CommandEmpty>
                                    <CommandGroup>
                                      {STATES_US.map(state => (
                                        <CommandItem
                                          value={state.label}
                                          key={state.value}
                                          onSelect={() => {
                                            form.setValue(
                                              "property.state",
                                              state.value
                                            );
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              state.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {state.label}
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="property.zip"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zip</FormLabel>
                            <FormControl>
                              <Input placeholder="zip" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="property.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="select country" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <Separator className="my-8" />

                <FormField
                  control={form.control}
                  name="serviceType"
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
                            {Object.keys(serviceTypeS).map(serviceType => (
                              <SelectItem key={serviceType} value={serviceType}>
                                {serviceType}
                              </SelectItem>
                            ))}
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
                        Please be as detailed as possible to ensure an accurate
                        estimate.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-6">
                  <FormField
                    control={form.control}
                    name="visitDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Requested Visit Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal bg-input-background text-input-text",
                                  !field.value && "text-muted-foreground"
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
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={date =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          We will try our best to accommodate this request but
                          if necessary, will propose another date.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visitDateAlternate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Alternate Visit Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal bg-input-background text-input-text",
                                  !field.value && "text-muted-foreground"
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
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={date =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>This is optional.</FormDescription>
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
                        {ARRIVAL_TIMES.map(item => (
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
                                      onCheckedChange={checked => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                value => value !== item.id
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
  );
}
