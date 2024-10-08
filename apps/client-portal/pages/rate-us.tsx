// utils
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { StarRating } from "@repo/ui/components/ui/star-rating";
import * as Text from "@repo/ui/components/ui/text";
import { Textarea } from "@repo/ui/components/ui/textarea";

// components
import { Layout } from "@/components/layout";

const formSchema = z.object({
  service: z.string(),
  review: z.string(),
  rating: z.number().int().min(1).max(5),
});

export default function RateUs() {
  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      review: "",
      rating: 0,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("data", data);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>Rate Us</Text.Heading>
        <div className="flex flex-col gap-3 border rounded-lg bg-background p-4 ">
          <Text.Heading size="md">Rate And Review Us</Text.Heading>
          <Text.Body>
            Please take a minute to rate and review Madison Handyman! Tell us
            how we've saved you time, made your life easier, what you liked
            about our service, or what we could do better. Your feedback is
            greatly appreciated!
          </Text.Body>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <div>
                <Text.Body>Madison Handyman Rating</Text.Body>
                <StarRating
                  rating={form.watch("rating")}
                  totalStars={5}
                  onRatingChange={(value) => {
                    form.setValue("rating", value);
                  }}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => <input type="hidden" {...field} />}
                />
              </div>

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Performed</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lawn care, landscaping, snow removal, etc"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Submit Rating</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
