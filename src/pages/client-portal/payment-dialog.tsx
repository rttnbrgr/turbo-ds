import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Body, Heading } from "@/components/ui/text";

type PaymentType = "invoice" | "balance" | "other";
type PaymentMethod = "card" | "paypal" | "other";

export function PaymentDialog() {
  const [paymentType, setPaymentType] = useState<PaymentType>("invoice");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState<string>("20.00");

  const invoiceAmount = 110.5;
  const accountBalance = 135.5;

  const calculateTip = () => {
    if (tipPercentage === null) {
      return parseFloat(customTip);
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
              <svg
                className="h-6 w-6 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 21C5.09554 21 4.08934 19.7889 4.33882 18.4222L6.67843 6.56101C6.86411 5.52659 7.78276 4.75 8.83922 4.75H17.1608C18.2172 4.75 19.1359 5.52659 19.3216 6.56101L21.6612 18.4222C21.9107 19.7889 20.9045 21 19.5 21H6.5Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 8H20"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 12.5C15 14.0188 14.0188 14.5 12.5 14.5C10.9812 14.5 10 14.0188 10 12.5C10 10.9812 10.9812 10 12.5 10C14.0188 10 15 10.9812 15 12.5Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                />
              </svg>
              PayPal
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

        <div className="flex space-x-2 mb-2">
          <Button
            variant={tipPercentage === null ? "outline" : "fill"}
            onClick={() => setTipPercentage(null)}
          >
            No Tip
          </Button>
          <Button
            variant={tipPercentage === 10 ? "fill" : "outline"}
            onClick={() => setTipPercentage(10)}
          >
            10%
          </Button>
          <Button
            variant={tipPercentage === 15 ? "fill" : "outline"}
            onClick={() => setTipPercentage(15)}
          >
            15%
          </Button>
          <Button
            variant={tipPercentage === 20 ? "fill" : "outline"}
            onClick={() => setTipPercentage(20)}
          >
            20%
          </Button>
          <Button
            variant={tipPercentage === null ? "fill" : "outline"}
            onClick={() => setTipPercentage(null)}
          >
            Custom
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">$</span>
          <Input
            type="number"
            value={customTip}
            onChange={e => setCustomTip(e.target.value)}
            className="text-md"
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Tip based on invoice amount before taxes.
        </p>
      </div>
      <CardFooter className="flex-col items-stretch">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${invoiceAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tip</span>
          <span>${tip.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold mb-4">
          <span>TOTAL</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button className="flex-1">Pay ${total.toFixed(2)}</Button>
        </div>
      </CardFooter>
    </div>
  );
}
