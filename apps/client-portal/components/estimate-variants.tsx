import { Estimate } from "@repo/mocks/estimates";
import { Body, Heading } from "@repo/ui/components/ui/text";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";

export function LineItems({ estimate }: { estimate: Estimate }) {
  const strikeThrough =
    estimate.status === "Changes Requested" ? "line-through" : "";

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-t border-black">
          <TableHead className="w-2/3">Description</TableHead>
          <TableHead className="text-right">Qty./Hrs.</TableHead>
          <TableHead className="text-right">Cost/Rate</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {estimate.lineItems?.map((lineItem) => (
          <TableRow
            key={lineItem.name}
            className={`border-t border-solid ${strikeThrough}`}
          >
            <TableCell className="font-bold w-1/5">
              <Heading size="sm">{lineItem.name}</Heading>
              <Body size="sm">{lineItem.description}</Body>
            </TableCell>
            <TableCell className="text-right">{lineItem.quantity}</TableCell>
            <TableCell className="text-right">{lineItem.price}</TableCell>
            <TableCell className="text-right">
              {lineItem.price * lineItem.quantity}
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
