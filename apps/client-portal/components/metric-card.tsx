import * as Text from "@repo/ui/components/ui/text";
import { Card, CardBody } from "@repo/ui/components/ui/card";

const INTENT_VS_COLORS: Record<string, string> = {
  neutral: "bg-blue-200",
  warn: "bg-yellow-200",
  danger: "bg-red-200",
  success: "bg-green-200",
};

export function MetricCard({
  title,
  value,
  intent,
}: {
  title: string;
  value: number;
  intent: "neutral" | "warn" | "danger" | "success";
}) {
  const color = INTENT_VS_COLORS[intent];

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
