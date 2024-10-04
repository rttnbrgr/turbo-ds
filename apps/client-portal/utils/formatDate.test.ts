import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats a date correctly", () => {
    const date = new Date(2023, 0, 15); // January 15, 2023
    expect(formatDate(date)).toBe("01/15/2023");
  });

  it("handles single-digit month and day", () => {
    const date = new Date(2023, 8, 5); // September 5, 2023
    expect(formatDate(date)).toBe("09/05/2023");
  });

  it("formats the last day of the year correctly", () => {
    const date = new Date(2023, 11, 31); // December 31, 2023
    expect(formatDate(date)).toBe("12/31/2023");
  });

  it("formats the first day of the year correctly", () => {
    const date = new Date(2024, 0, 1); // January 1, 2024
    expect(formatDate(date)).toBe("01/01/2024");
  });

  it("handles leap year date", () => {
    const date = new Date(2024, 1, 29); // February 29, 2024 (leap year)
    expect(formatDate(date)).toBe("02/29/2024");
  });
});
