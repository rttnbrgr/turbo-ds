import { renderHook } from "@testing-library/react-hooks";
import { MOCK_ASSETS } from "@repo/mocks/assets.mock";
import { Asset } from "@repo/types";
import { describe, it, expect } from "vitest";
import { useGroupedByDate } from "./useGroupedByDate";

// not using this test anymore.. I was get vitest errors about importing react - probably need a plugin or something to support react? will check when back online.
describe("useGroupedByDate", () => {
  const additionalAsset = {
    id: 3,
    src: "/asset3.png",
    alt: "Asset 3",
    width: 800,
    height: 600,
    uploadDate: "2024-08-01",
  };

  it("should group assets by date", () => {
    const { result } = renderHook(() =>
      useGroupedByDate(MOCK_ASSETS as Asset[], "uploadDate"),
    );

    expect(result.current).toEqual({
      "2024-07-31": MOCK_ASSETS,
    });
  });

  it("should handle empty array", () => {
    const { result } = renderHook(() => useGroupedByDate([], "uploadDate"));

    expect(result.current).toEqual({});
  });

  it("should handle assets with different dates", () => {
    const assetsWithDifferentDates = [
      ...MOCK_ASSETS,
      additionalAsset,
    ] as Asset[];

    const { result } = renderHook(() =>
      useGroupedByDate(assetsWithDifferentDates, "uploadDate"),
    );

    expect(result.current).toEqual({
      "2024-07-31": MOCK_ASSETS,
      "2024-08-01": [additionalAsset],
    });
  });
});
