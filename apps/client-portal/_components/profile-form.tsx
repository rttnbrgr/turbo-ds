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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { getCode, getNames } from "country-list";
import { STATES_US } from "@/constants";
import { User } from "@repo/types";
import { useState } from "react";

const fields = [
  {
    title: "Full Name",
    id: "name",
    type: "text",
    placeholder: "",
  },
  {
    title: "Email Address",
    id: "email",
    type: "text",
  },
  {
    title: "Mobile Number",
    id: "mobile_number",
    type: "text",
  },
  {
    title: "Business Number",
    id: "business_number",
    type: "text",
  },
  {
    title: "Fax Number",
    id: "fax_number",
    type: "text",
  },
  {
    title: "Country",
    id: "country",
    type: "select",
    options: getNames()
      .sort((a, b) => a.localeCompare(b))
      .map((key) => ({
        value: getCode(key),
        label: key,
      })),
    placeholder: "Select a country",
  },
  {
    title: "Street Address Line 1",
    id: "address_1",
    type: "text",
  },
  {
    title: "Street Address Line 2",
    id: "address_2",
    type: "text",
  },
  {
    title: "City",
    id: "city",
    type: "text",
  },
  {
    title: "State",
    id: "state",
    type: "select",
    options: STATES_US,
    placeholder: "Select a state",
  },
  {
    title: "ZIP Code",
    id: "zip",
    type: "text",
  },
  {
    title: "Receive marketing emails",
    id: "receive_marketing_emails",
    type: "checkbox",
  },
];

const FormSchema = z.object({
  name: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  mobile_number: z.string().optional(),
  business_number: z.string().optional(),
  fax_number: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  address_1: z.string().min(1, "Street Address Line 1 is required"),
  address_2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP Code is required"),
  receive_marketing_emails: z.boolean().default(false),
});

export function ProfileForm({ user }: { user: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      mobile_number: user.phone,
      business_number: user.business_number,
      fax_number: user.fax_number,
      country: user.country,
      address_1: user.address,
      address_2: user.address2,
      city: user.city,
      state: user.state,
      zip: user.zip,
      receive_marketing_emails: user.receive_marketing_emails ?? false,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`https://api.example.com/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();
      console.log("User updated:", updatedUser);
      // TODO: Handle successful update (e.g., show success message, update local state)
    } catch (error) {
      console.error("Error updating user:", error);
      // TODO: Handle error (e.g., show error message)
    } finally {
      setIsSubmitting(false);
    }
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
                  {field.type === "select" ? (
                    <Select
                      onValueChange={formField.onChange}
                      defaultValue={formField.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((option) => (
                          <SelectItem
                            key={option.value ?? ""}
                            value={option.value ?? ""}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "checkbox" ? (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={formField.name}
                        checked={formField.value as boolean}
                        onChange={formField.onChange}
                        className="mr-2"
                      />
                      <label htmlFor={formField.name}>{field.title}</label>
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formField.value?.toString() ?? ""}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {/* check if form has changes and disable button if not */}
        <Button
          type="submit"
          intent="action"
          className="self-end"
          disabled={isSubmitting || !form.formState.isDirty}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
