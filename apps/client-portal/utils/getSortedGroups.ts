export function getgroups<T>(data: T[], key: keyof T) {
  return data?.reduce(
    (groups, item) => {
      const date = item[key]?.toString() ?? "Unknown";
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
}

// creates sorted array of tuples with the first member being the key (date string) it was sorted by and the second member being the items
export function getSortedGroups<T>(data: T[], key: keyof T) {
  const grouped = getgroups(data, key);
  return Object.entries(grouped).sort(
    ([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime(),
  );
}
