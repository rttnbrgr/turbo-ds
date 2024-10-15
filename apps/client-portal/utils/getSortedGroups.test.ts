import { getgroups, getSortedGroups } from "./getSortedGroups";
import { MOCK_ASSETS } from "@repo/mocks/assets.mock";
import { Asset } from "@repo/types";
import { describe, it, expect } from "vitest";

describe("getSortedGroups", () => {
  const additionalAsset = {
    id: 3,
    src: "/asset3.png",
    alt: "Asset 3",
    width: 800,
    height: 600,
    uploadDate: "2024-08-01",
  };
  it("should group by date - all items in same date", () => {
    const result = getgroups(MOCK_ASSETS as Asset[], "uploadDate");
    expect(result).toEqual({
      "2024-07-31": MOCK_ASSETS,
    });
  });
  it("should group by date - includes additional date", () => {
    const result = getgroups(
      [...MOCK_ASSETS, additionalAsset] as Asset[],
      "uploadDate",
    );
    expect(result).toEqual({
      "2024-07-31": MOCK_ASSETS,
      "2024-08-01": [additionalAsset],
    });
  });
  it("should return sorted groups", () => {
    const result = getSortedGroups(MOCK_ASSETS as Asset[], "uploadDate");
    expect(result).toEqual([["2024-07-31", MOCK_ASSETS]]);
  });
  it("should return sorted groups - multiple dates - out of order", () => {
    const result = getSortedGroups(
      [...MOCK_ASSETS, additionalAsset] as Asset[],
      "uploadDate",
    );
    expect(result).toEqual([
      ["2024-08-01", [additionalAsset]],
      ["2024-07-31", MOCK_ASSETS],
    ]);
  });
});
