import React, { useState } from "react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Body } from "@/components/ui/text";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

type PaymentType = "invoice" | "balance" | "other";
type PaymentMethod = "card" | "paypal" | "other";

export function PaymentDialog({ onClose }: { onClose?: () => void }) {
  const [paymentType, setPaymentType] = useState<PaymentType>("invoice");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [tipPercentage, setTipPercentage] = useState<number | null | "custom">(
    null
  );
  const [customTip, setCustomTip] = useState<string>("20.00");

  const invoiceAmount = 110.5;
  const accountBalance = 135.5;

  const calculateTip = () => {
    if (tipPercentage === "custom") {
      return parseFloat(customTip);
    }
    if (tipPercentage === null) {
      return 0;
    }
    return (invoiceAmount * tipPercentage) / 100;
  };

  const tip = calculateTip();
  const total = invoiceAmount + tip;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Body size="md" className="font-semibold">
          Payment Type
        </Body>

        <RadioGroup
          value={paymentType}
          onValueChange={(value: PaymentType) => setPaymentType(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="invoice" id="invoice" />
            <Label htmlFor="invoice">
              Invoice Amount: ${invoiceAmount.toFixed(2)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="balance" id="balance" />
            <Label htmlFor="balance">
              Account Balance: ${accountBalance.toFixed(2)}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other Amount</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex flex-col gap-2">
        <Body size="md" className="font-semibold">
          Payment Method
        </Body>

        <RadioGroup
          value={paymentMethod}
          onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card">Card Ending in 3456</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center">
              <Image
                alt="Pay With Paypal"
                src="/paypal-logo.png"
                width={76}
                height={20}
              />
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other-method" />
            <Label htmlFor="other-method">Other Method</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex flex-col gap-2">
        <Body size="md" className="font-semibold">
          Add a Tip
        </Body>

        <div className="flex space-x-2 gap-3">
          <ToggleGroup type="single">
            <ToggleGroupItem value="5" onClick={() => setTipPercentage(null)}>
              <div className="whitespace-nowrap">No Tip</div>
            </ToggleGroupItem>
            <ToggleGroupItem value="10" onClick={() => setTipPercentage(10)}>
              10%
            </ToggleGroupItem>
            <ToggleGroupItem value="15" onClick={() => setTipPercentage(15)}>
              15%
            </ToggleGroupItem>
            <ToggleGroupItem value="20" onClick={() => setTipPercentage(20)}>
              20%
            </ToggleGroupItem>
            <ToggleGroupItem
              value="custom"
              onClick={() => setTipPercentage("custom")}
            >
              Custom
            </ToggleGroupItem>
          </ToggleGroup>

          {tipPercentage === "custom" ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm">$</span>
              <Input
                type="number"
                value={customTip}
                onChange={e => setCustomTip(e.target.value)}
                className="text-md"
              />
            </div>
          ) : null}
        </div>

        <p className="text-gray-400 text-xs">
          Tip based on invoice amount before taxes.
        </p>
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="p-2 w-full text-right">Subtotal</TableCell>
            <TableCell className="p-2 pr-5 text-right whitespace-nowrap">
              ${invoiceAmount.toFixed(2)}
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
              ${total.toFixed(2)}
            </TableCell>
          </TableRow>

          {/* separator row - likely better way to do this...*/}
          <TableRow className="h-4 border-none"></TableRow>

          <TableRow className="pt-3 border-none">
            <TableCell className="p-2 w-full text-right">
              <Button variant="outline" size="sm" onClick={() => onClose?.()}>
                Cancel
              </Button>
            </TableCell>
            <TableCell className="p-2 text-right whitespace-nowrap">
              <Button
                variant="fill"
                intent="action"
                className="flex-1 px-4"
                size="sm"
              >
                <Image src="/lock.svg" alt="Lock Icon" width={12} height={12} />
                Pay ${total.toFixed(2)}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
