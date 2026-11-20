// "Show more" paging: the first `page` pages of `size` items (page 1 = the first page). `total`
// defaults to the list's length; pass the API's total when the list holds only the pages loaded so far.
export const page = (list, current, size, total = list.length) => {
  const pages = Math.max(1, Math.floor(Number(current)) || 1);
  const shown = Math.min(total, pages * size);
  return {items: list.slice(0, shown), page: pages, shown, total, hasMore: shown < total};
};
