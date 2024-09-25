import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StarRating } from "@/components/ui/star-rating";
import * as Text from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { Layout } from "@client-portal/layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  service: z.string(),
  review: z.string(),
  rating: z.number().int().min(1).max(5),
});

export default function RateUs() {
  const [rating, setRating] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    shouldUnregister: true,
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: "",
      review: "",
      rating: 0,
    },
  });

  const { setValue } = form;

  // updates the rating value in the form when the rating state changes
  useEffect(() => {
    setValue("rating", rating);
  }, [rating, setValue]);

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
                  totalStars={5}
                  initialRating={5}
                  onRatingChange={value => {
                    setRating(value);
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
