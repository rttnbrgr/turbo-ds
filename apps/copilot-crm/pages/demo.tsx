import { Button } from "@repo/ui/components/ui/button";

// this is a root page for a next App
export default function Demo() {
  return (
    <div className="flex flex-col gap-3  items-start">
      <h1 className="text-3xl font-bold">Demo</h1>
      <p className="text-lg mt-4">
        This page demonstrates how to use the Button component from the UI with
        overrides
      </p>
      <Button variant="fill" className="bg-primary">
        This button uses a primary background
      </Button>
      <Button variant="fill" className="bg-custom">
        This button uses a custom background
      </Button>
    </div>
  );
}
