export interface Document {
  id: string;
  name: string;
  uploadDate: string;
  size: number;
  type: "PDF" | "DOCX" | string;
}
