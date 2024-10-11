import { Document } from "@repo/types";

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Neighborhood Access Notes",
    uploadDate: "2024-07-31",
    size: 40960, // 40KB in bytes
    type: "PDF",
  },
  {
    id: "2",
    name: "Entry Survey",
    uploadDate: "2024-07-31",
    size: 1258291, // 1.2MB in bytes
    type: "DOCX",
  },
];
