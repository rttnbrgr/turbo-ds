import { getSortedGroups } from "@/utils/getSortedGroups";
import { useMemo } from "react";

export function useGroupedByDate<T>(data: T[], key: keyof T) {
  return useMemo(() => getSortedGroups(data, key), [data, key]);
}
