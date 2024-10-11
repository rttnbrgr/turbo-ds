import { Estimate } from "@repo/types";
import { Body, Heading } from "@repo/ui/components/ui/text";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { formatUSD } from "@/utils/formatCurrency";

export function LineItems({ estimate }: { estimate: Estimate }) {
  const strikeThrough =
    estimate.status === "Changes Requested" ? "line-through" : "";

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-t border-black">
          <TableHead colSpan={isMobile ? 4 : 1} className="w-full md:w-2/3">
            Description
          </TableHead>
          <TableHead className="hidden md:table-cell text-right">
            Qty./Hrs.
          </TableHead>
          <TableHead className="hidden md:table-cell text-right">
            Cost/Rate
          </TableHead>
          <TableHead className="hidden md:table-cell text-right">
            Total
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {estimate.lineItems?.map((lineItem) => (
          <TableRow
            key={lineItem.name}
            className={`border-t border-solid ${strikeThrough}`}
          >
            <TableCell
              colSpan={isMobile ? 4 : 1}
              className="font-bold w-full md:w-1/5"
            >
              <Heading size="sm">{lineItem.name}</Heading>
              <Body size="sm">{lineItem.description}</Body>
              <div className="grid grid-cols-4 w-full md:hidden">
                <Body className="col-start-3">Quantity</Body>
                <Body className="col-start-4 text-right">
                  {lineItem.quantity}
                </Body>
                <Body className="col-start-3">Rate</Body>
                <Body className="col-start-4 text-right">
                  {formatUSD(lineItem.price)}
                </Body>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell text-right">
              {lineItem.quantity}
            </TableCell>
            <TableCell className="hidden md:table-cell text-right">
              {formatUSD(lineItem.price)}
            </TableCell>
            <TableCell className="hidden md:table-cell text-right">
              {formatUSD(lineItem.price * lineItem.quantity)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-inherit">
        <TableRow>
          <TableCell colSpan={3}>
            <div className="flex flex-col text-right">
              SubTotal <span>Tax (4.00%)</span>
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className={`flex flex-col text-right ${strikeThrough}`}>
              $106.25 <span>$4.25</span>
            </div>
          </TableCell>
        </TableRow>
        <TableRow className="bg-gray-100">
          <TableCell colSpan={3} className="text-right">
            Estimated Total
          </TableCell>
          <TableCell className={`text-right ${strikeThrough}`}>
            $60.50
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export function Overview({ estimate }: { estimate: Estimate }) {
  const factTable = [
    { label: "Service Type", value: estimate.serviceType },
    { label: "Additional Details", value: estimate.details },
    { label: "Requested Visit Date", value: estimate.requestDate },
    { label: "Alternate Visit Date", value: estimate.visitDate },
    {
      label: "Preferred Arrival Times",
      value: estimate.preferredArrivalTimes.join(", "),
    },
    { label: "Frequency", value: estimate.frequency },
  ];

  return (
    <Table>
      <TableBody>
        {factTable.map((fact) => (
          <TableRow key={fact.label} className="border-t border-solid">
            <TableCell className="font-bold w-1/5">{fact.label}</TableCell>
            <TableCell>{fact.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
