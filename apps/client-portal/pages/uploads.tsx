import { useCallback, useState } from "react";

// components
import { Layout } from "@/components/layout";
import { AttachedImages } from "@/components/attached-images";

// ui
import { DataTable } from "@repo/ui/components/ui/data-table";
import * as Text from "@repo/ui/components/ui/text";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Heading } from "@repo/ui/components/ui/text";

// types
import { Document, Asset } from "@repo/types";
import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";

// utils
import { useQuery } from "@tanstack/react-query";
import {
  generateColumn,
  generateDateColumn,
} from "@/components/table-cell-renderers";
import { formatFileSize } from "@/utils/formatFileSize";
import { useGroupedByDate } from "@/hooks/useGroupedByDate";
import { formatDate } from "@/utils/formatDate";

// icons
import { Plus } from "lucide-react";

export default function Uploads() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data: documents, isLoading: documentsLoading } = useQuery<Document[]>(
    {
      queryKey: ["documents"],
      queryFn: () =>
        fetch("https://api.example.com/documents").then((res) => res.json()),
    },
  );
  console.log("🚀 ~ Uploads ~ documents:", documents);

  const { data: assets, isLoading: assetsLoading } = useQuery<Asset[]>({
    queryKey: ["assets"],
    queryFn: () =>
      fetch("https://api.example.com/assets").then((res) => res.json()),
  });

  const sortedGroupedAssets = useGroupedByDate(assets || [], "uploadDate");

  const handleViewDocument = useCallback((id: string) => {
    console.log("view document id:", id);
  }, []);

  const columns: ColumnDef<Document>[] = [
    generateColumn({
      key: "name",
      header: "Name",
    }),
    generateDateColumn<Document>("uploadDate", "Date Added"),
    generateColumn({
      key: "size",
      header: "File Size",
      cell: (value) => formatFileSize(value),
    }),
    generateColumn({
      key: "type",
      header: "Type",
      cell: (value) => value.toUpperCase(),
    }),
    generateColumn<Document>({
      key: "action",
      header: "",
      sortable: false,
      cell: (_, row) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewDocument(row.id)}
          >
            View Document
          </Button>
          <Button variant="fill" size="sm" intent="danger">
            Delete
          </Button>
        </div>
      ),
    }),
  ] as ColumnDef<Document, unknown>[];

  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <Text.Heading size={"xl"}>Uploads</Text.Heading>

        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle size="md">Documents</CardTitle>
            <Button variant="fill" intent="action">
              <Plus size={16} />
              Add Document
            </Button>
          </CardHeader>
          <CardBody className="[&>.data-table]:border-none">
            {!documentsLoading && (
              <DataTable
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                columns={columns}
                data={documents || []}
              />
            )}
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle size="md">Other Media</CardTitle>
            <Button variant="fill" intent="action">
              <Plus size={16} />
              Add Media
            </Button>
          </CardHeader>
          <CardBody>
            {!assetsLoading &&
              sortedGroupedAssets?.map((group) => {
                return (
                  <div key={group?.[0]} className="flex flex-col gap-2">
                    <div className="flex flex-row w-full items-center gap-3">
                      <Heading className="shrink-1" size="sm">
                        {/* TODO - should validate this is a valid date string before we call formatDate? */}
                        {formatDate(new Date(group?.[0]))}
                      </Heading>
                      <div className="bg-gray-300 flex h-[1px] shrink-0 grow" />
                    </div>

                    {assets ? <AttachedImages assets={group?.[1]} /> : null}
                  </div>
                );
              })}
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
