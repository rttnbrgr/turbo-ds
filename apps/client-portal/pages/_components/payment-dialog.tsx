import React, { useEffect, useState } from "react";
import Image from "next/image";

// utils
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

// ui
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@repo/ui/components/ui/table";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@repo/ui/components/ui/toggle-group";
import { Body } from "@repo/ui/components/ui/text";

// components
import CardDetails, { CardDetailsPayload } from "./card-details";

// types
import { Invoice } from "@repo/types";

// constants
const ACCOUNT_BALANCE = 300.0;

const formSchema = z.object({
  paymentType: z.enum(["invoice", "balance", "other"]),
  paymentMethod: z.enum(["card", "paypal", "other"]),
  tipPercentage: z.enum(["0", "10", "15", "20", "custom"]),
  customTip: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === undefined) return true;
        const parsed = parseFloat(val);
        return !isNaN(parsed) && parsed >= 0;
      },
      { message: "Custom tip must be a non-negative number" },
    ),
  subTotal: z.number().min(0, "Subtotal must be a non-negative number"),
});

interface PaymentDialogProps {
  onClose: () => void;
  onPayment: (amount: number) => Promise<void>;
  invoice: Invoice;
}

export function PaymentDialog({
  onClose,
  onPayment,
  invoice,
}: PaymentDialogProps) {
  const { paid, total } = invoice;
  const invoiceAmount = total - paid || 0;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentType: "invoice",
      paymentMethod: "card",
      tipPercentage: "0",
      customTip: "20.00",
      subTotal: invoiceAmount,
    },
  });

  const {
    control,
    setValue,
    formState: { errors },
  } = form;
  const paymentType = useWatch({ control, name: "paymentType" });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const tipPercentage = useWatch({ control, name: "tipPercentage" });
  const customTip = useWatch({ control, name: "customTip" });
  const subTotal = useWatch({ control, name: "subTotal" });

  useEffect(() => {
    if (paymentType === "invoice") {
      setValue("subTotal", invoiceAmount);
    } else if (paymentType === "balance") {
      setValue("subTotal", ACCOUNT_BALANCE);
    }
  }, [paymentType, invoiceAmount, setValue]);

  const calculateTip = () => {
    if (tipPercentage === "custom") {
      return parseFloat(customTip || "0") || 0;
    }
    return (subTotal * parseInt(tipPercentage)) / 100;
  };

  const tip = calculateTip();
  const totalPayment = subTotal + tip;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    alert(JSON.stringify({ ...data, totalPayment }));
  };

  const [cardDetailsPayload, setCardDetailsPayload] =
    useState<CardDetailsPayload | null>(null);

  const handleCardDetails = (cardDetails: CardDetailsPayload) => {
    setCardDetailsPayload(cardDetails);
  };

  const canCheckout =
    (paymentMethod === "other" && !cardDetailsPayload?.hasErrors) ||
    paymentMethod !== "other";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Assuming you have a way to get the payment amount
    const amount = parseFloat(subTotal.toFixed(2));
    if (isNaN(amount) || amount <= 0) {
      // Handle invalid amount
      return;
    }
    await onPayment(amount);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="paymentType"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>
                <Body size="md" className="font-semibold">
                  Payment Type
                </Body>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="invoice" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Invoice Amount: ${invoiceAmount.toFixed(2)}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="balance" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Account Balance: ${ACCOUNT_BALANCE.toFixed(2)}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other Amount</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {paymentType === "other" && (
          <FormField
            control={form.control}
            name="subTotal"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">$</span>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      className="text-md"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel>
                <Body size="md" className="font-semibold">
                  Payment Method
                </Body>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="card" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Card Ending in 3456
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="paypal" />
                    </FormControl>
                    <FormLabel className="font-normal flex items-center">
                      <Image
                        alt="Pay With Paypal"
                        src="/paypal-logo.png"
                        width={76}
                        height={20}
                      />
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="other" />
                    </FormControl>
                    <FormLabel className="font-normal">Other Method</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="tipPercentage"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  <Body size="md" className="font-semibold">
                    Add a Tip
                  </Body>
                </FormLabel>
                <div className="flex gap-2">
                  <FormControl className="justify-start">
                    <ToggleGroup
                      type="single"
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <ToggleGroupItem value="0">
                        <div className="whitespace-nowrap">No Tip</div>
                      </ToggleGroupItem>
                      <ToggleGroupItem value="10">10%</ToggleGroupItem>
                      <ToggleGroupItem value="15">15%</ToggleGroupItem>
                      <ToggleGroupItem value="20">20%</ToggleGroupItem>
                      <ToggleGroupItem value="custom">Custom</ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  {tipPercentage === "custom" && (
                    <FormField
                      control={form.control}
                      name="customTip"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm">$</span>
                              <Input
                                type="number"
                                {...field}
                                className="text-md"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <p className="text-gray-400 text-xs">
            Tip based on invoice amount before taxes.
          </p>
        </div>

        {paymentMethod === "other" && (
          <CardDetails onCardDetails={handleCardDetails} />
        )}

        {Object.keys(errors).length > 0 && (
          <div className="text-red-500 text-sm">
            Please correct the errors above before submitting.
          </div>
        )}

        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="p-2 w-full text-right">Subtotal</TableCell>
              <TableCell className="p-2 pr-5 text-right whitespace-nowrap">
                ${subTotal.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="p-2 w-full text-right">Tip</TableCell>
              <TableCell className="p-2 pr-5 text-right whitespace-nowrap">
                ${tip.toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow className="font-bold" data-state="selected">
              <TableCell className="p-2 w-full text-right">TOTAL</TableCell>
              <TableCell className="p-2 pr-5 text-right whitespace-nowrap">
                ${totalPayment.toFixed(2)}
              </TableCell>
            </TableRow>

            <TableRow className="h-4 border-none"></TableRow>

            <TableRow className="pt-3 border-none">
              <TableCell className="p-2 w-full text-right">
                <Button variant="outline" size="sm" onClick={() => onClose?.()}>
                  Cancel
                </Button>
              </TableCell>

              {canCheckout ? (
                <TableCell className="p-2 text-right whitespace-nowrap">
                  <Button
                    type="submit"
                    variant="fill"
                    intent="action"
                    className="flex-1 px-4"
                    size="sm"
                  >
                    <Image
                      src="/lock.svg"
                      alt="Lock Icon"
                      width={12}
                      height={12}
                    />
                    Pay ${totalPayment.toFixed(2)}
                  </Button>
                </TableCell>
              ) : null}
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </Form>
  );
}
