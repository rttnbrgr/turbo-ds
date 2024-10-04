import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { PaymentInfo } from "@repo/types";
import { useState } from "react";

const fields = [
  {
    title: "Name on Card",
    id: "name_on_card",
    type: "text",
    placeholder: "Enter the name on your card",
  },
  {
    title: "Card Number",
    id: "card_number",
    type: "text",
    placeholder: "Enter your card number",
  },
  {
    title: "Expiration Date",
    id: "expiration_date",
    type: "text",
    placeholder: "MM/YY",
  },
  {
    title: "CVV or CSC",
    id: "cvv",
    type: "password",
    placeholder: "Enter CVV or CSC",
  },
  {
    title: "ZIP or Postal Code",
    id: "zip",
    type: "text",
    placeholder: "Enter ZIP or Postal Code",
  },
];

// TODO JT - we should have a way to store the card info on the server and then just store a reference to it in the user object

const FormSchema = z.object({
  name_on_card: z.string().min(1, "Name on Card is required"),
  card_number: z
    .string()
    .min(13, "Invalid card number")
    .max(19, "Invalid card number")
    .transform((val) => val.replace(/\D/g, "")), // Remove non-digit characters
  expiration_date: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration date (MM/YY)"),
  cvv: z.string().min(3, "Invalid CVV/CSC").max(4, "Invalid CVV/CSC"),
  zip: z.string().min(1, "ZIP or Postal Code is required"),
});

export function PaymentInfoForm({
  paymentInfo,
  userId,
}: {
  paymentInfo: PaymentInfo;
  userId: string;
}) {
  const [maskedCardNumber, setMaskedCardNumber] = useState(
    obfuscateCardNumber(paymentInfo.card_number),
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name_on_card: paymentInfo.name,
      card_number: paymentInfo.card_number,
      expiration_date: paymentInfo.card_expiry,
      cvv: paymentInfo.card_cvv,
      zip: paymentInfo.zip,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentInfo: data }),
      });

      if (!response.ok) {
        throw new Error("Failed to update payment information");
      }

      const updatedUser = await response.json();
      console.log("Payment information updated:", updatedUser);
      // TODO: Handle successful update (e.g., show success message, update local state)
    } catch (error) {
      console.error("Error updating payment information:", error);
      // TODO: Handle error (e.g., show error message to user)
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    form.setValue("card_number", value);
    setMaskedCardNumber(obfuscateCardNumber(value));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {fields.map((field) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.id as keyof z.infer<typeof FormSchema>}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.title}</FormLabel>
                <FormControl>
                  {field.id === "card_number" ? (
                    <Input
                      type="text"
                      placeholder={field.placeholder}
                      value={maskedCardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                    />
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          type="submit"
          intent="action"
          className="self-end"
          disabled={!form.formState.isDirty}
        >
          {"Save Changes"}
        </Button>
      </form>
    </Form>
  );
}

function obfuscateCardNumber(cardNumber: string): string {
  const visibleDigits = 4;
  const obfuscated = cardNumber
    .slice(-visibleDigits)
    .padStart(cardNumber.length, "*");
  return obfuscated.replace(/(.{4})/g, "$1 ").trim();
}
