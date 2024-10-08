import * as Text from "@repo/ui/components/ui/text";
import { Card, CardBody } from "@repo/ui/components/ui/card";

const TITLE_VS_COLORS: Record<string, string> = {
  "Outstanding Balance": "bg-blue-200",
  Credit: "bg-yellow-200",
  "Past Due": "bg-red-200",
};

export function MetricCard({ title, value }: { title: string; value: number }) {
  const color = TITLE_VS_COLORS[title];

  return (
    <Card>
      <CardBody>
        <div className="flex gap-6">
          <div className={`square ${color} w-16 h-16 rounded-md`} />
          <div className="flex flex-col gap-1">
            <Text.Body size="md" className="text-gray-800">
              {title}
            </Text.Body>
            <Text.Heading size="xl">{value}</Text.Heading>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
