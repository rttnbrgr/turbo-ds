import { describe, it, expect } from "vitest";
import { formatFileSize } from "./formatFileSize";

describe("formatFileSize", () => {
  it("formats 0 bytes correctly", () => {
    expect(formatFileSize(0)).toBe("0 Bytes");
  });

  it("formats bytes correctly", () => {
    expect(formatFileSize(500)).toBe("500 Bytes");
  });

  it("formats kilobytes correctly", () => {
    expect(formatFileSize(1024)).toBe("1 KB");
    expect(formatFileSize(1536)).toBe("1.5 KB");
  });

  it("formats megabytes correctly", () => {
    expect(formatFileSize(1048576)).toBe("1 MB");
    expect(formatFileSize(2097152)).toBe("2 MB");
  });

  it("formats gigabytes correctly", () => {
    expect(formatFileSize(1073741824)).toBe("1 GB");
    expect(formatFileSize(1610612736)).toBe("1.5 GB");
  });

  it("formats terabytes correctly", () => {
    expect(formatFileSize(1099511627776)).toBe("1 TB");
    expect(formatFileSize(2199023255552)).toBe("2 TB");
  });

  it("rounds to two decimal places", () => {
    expect(formatFileSize(1234567)).toBe("1.18 MB");
  });
});
