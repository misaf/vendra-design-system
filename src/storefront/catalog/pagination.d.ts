/** "Show more" paging: the first `page` pages of `size` items. `total` defaults to the list's
 * length; pass the API's total when the list holds only the pages loaded so far. */
export declare function page<T>(
  list: T[],
  page: number,
  size: number,
  total?: number
): {items: T[]; page: number; shown: number; total: number; hasMore: boolean};
