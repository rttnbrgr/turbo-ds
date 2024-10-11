import * as Text from "@repo/ui/components/ui/text";
import { Layout } from "@/components/layout";
import { DataTable } from "@repo/ui/components/ui/data-table";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Document } from "@repo/types";
import { Button } from "@repo/ui/components/ui/button";

// utils
import {
  generateColumn,
  generateDateColumn,
} from "../components/table-cell-renderers";

import { formatFileSize } from "../utils/formatFileSize";

import router from "next/router";

export default function Uploads() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: documents, isLoading } = useQuery<Document[]>({
    queryKey: ["documents"],
    queryFn: () =>
      fetch("https://api.example.com/documents").then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  const columns: ColumnDef<Document>[] = [
    generateColumn({
      key: "name",
      header: "Name",
    }),
    generateDateColumn<Document>("uploadDate", "Upload Date"),
    generateColumn({
      key: "size",
      header: "File Size",
      cell: (value) => formatFileSize(value),
    }),
    generateColumn<Document>({
      key: "action",
      header: "",
      sortable: false,
      cell: (_, row) => (
        <div className="flex gap-2">
          <Button
            variant="fill"
            intent="action"
            size="sm"
            onClick={() => router.push(`/documents/${row.id}`)}
          >
            View Invoice
          </Button>
          <Button variant="outline" size="sm">
            Print
          </Button>
        </div>
      ),
    }),
  ] as ColumnDef<Document, unknown>[];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>Uploads</Text.Heading>
        <DataTable
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          columns={columns}
          data={documents || []}
        />
      </div>
    </Layout>
  );
}
