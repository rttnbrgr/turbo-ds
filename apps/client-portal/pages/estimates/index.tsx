import { ChangeEvent, useCallback, useState } from "react";
import router from "next/router";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

// components
import { Layout } from "@/components/layout";
import { RequestEstimateDialog } from "../../components/request-estimate";

// ui
import * as Text from "@repo/ui/components/ui/text";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { DataTable } from "@repo/ui/components/ui/data-table";
import { Body } from "@repo/ui/components/ui/text";

// types
import { Estimate } from "@repo/types";

// constants
import { ESTIMATE_STATUSES, STATUS_VS_CHIP_INTENT } from "@/constants";

// utils
import {
  generateColumn,
  generateDateColumn,
  generateStatusColumn,
  generateActionColumn,
} from "@/components/table-cell-renderers";

export const columns: ColumnDef<Estimate>[] = [
  generateColumn<Estimate>({
    key: "id",
    header: "Estimates",
  }),
  generateDateColumn<Estimate>("requestDate", "Request Date"),
  generateDateColumn<Estimate>("visitDate", "Visit Date"),
  generateColumn<Estimate>({
    key: "total",
    header: "Total",
    cell: (value) => {
      const total = parseFloat(value);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(total);

      return (
        <div className="text-right font-medium">{total ? formatted : "--"}</div>
      );
    },
  }),
  generateStatusColumn<Estimate>("status", "Status", ESTIMATE_STATUSES),
  generateActionColumn<Estimate>("", "View Estimate", (row) =>
    router.push(`/estimates/${row.id}`),
  ),
];

export default function Estimates() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: estimates, isLoading } = useQuery<Estimate[]>({
    queryKey: ["estimates"],
    queryFn: () =>
      fetch("https://api.example.com/estimates").then((res) => res.json()),
  });

  const handleSubmit = useCallback((args: any) => {
    console.log("submit", args);
  }, []);

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLFormElement>) => {
    const value = e.target.value;
    if (value === "default") {
      return setColumnFilters([]);
    }

    setColumnFilters([
      {
        id: "status",
        value,
      },
    ]);
  }, []);

  return (
    <Layout>
      <div className="flex flex-col gap-9">
        <div className="flex justify-between">
          <Text.Heading size={"xl"}>Estimates</Text.Heading>
          <div className="flex gap-3 items-center">
            <Body>Status</Body>
            <form onChange={handleFilterChange}>
              <Select defaultValue="default">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={"all"} value={"default"}>
                    All Statuses
                  </SelectItem>
                  {Object.keys(STATUS_VS_CHIP_INTENT).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </form>

            <RequestEstimateDialog
              userId="00124"
              onSubmit={handleSubmit}
              trigger={<Button intent="action">+ Request an Estimate</Button>}
            />
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : estimates?.length ? (
          <DataTable
            columns={columns}
            data={estimates}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
          />
        ) : (
          <div>No estimates found</div>
        )}
      </div>
    </Layout>
  );
}
