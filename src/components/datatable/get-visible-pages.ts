export const getVisiblePages = (
  current: number,
  total: number
): (number | string)[] => {
  const pages: (number | string)[] = [];

  if (current > 2) {
    pages.push("...");
  }

  const start = Math.max(current - 1, 1);
  const end = Math.min(current + 1, total);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 1) {
    pages.push("...");
  }

  return pages;
};
