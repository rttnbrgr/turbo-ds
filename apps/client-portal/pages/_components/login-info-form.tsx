import { useState } from "react";
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

const fields = [
  {
    title: "Username/Email",
    id: "username",
    type: "text",
    placeholder: "Enter your username or email",
  },
  {
    title: "Password",
    id: "password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const FormSchema = z.object({
  username: z.string().min(1, "Username/Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginInfoForm({
  username,
  password,
  userId,
}: {
  username: string;
  password: string;
  userId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username,
      password,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update login information");
      }

      const updatedUser = await response.json();
      console.log("Login information updated:", updatedUser);
      // TODO: Handle successful update (e.g., show success message, update local state)
    } catch (error) {
      console.error("Error updating login information:", error);
      setSubmitError("Failed to update login information. Please try again.");
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
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {submitError && <p className="text-red-500 text-sm">{submitError}</p>}
        <Button
          type="submit"
          intent="action"
          className="self-end"
          disabled={!form.formState.isDirty || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
}
