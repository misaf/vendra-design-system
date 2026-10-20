export interface PaginationProps {
  /** The current page, from 1 */
  page: number;
  /** Pages in the whole list (from the API's total and itemsPerPage). Renders nothing below 2 */
  pageCount: number;
  /** Each page's URL: pages render as real links */
  href?: (page: number) => string;
  /** Change the page in place (with `href`, the link's navigation is prevented) */
  onChange?: (page: number) => void;
  /** Pages shown either side of the current one. Default 1 */
  siblings?: number;
  /** The nav's accessible name. Default: "Pages" in the current language */
  label?: string;
  /** Default: "Previous page" in the current language */
  previousLabel?: string;
  /** Default: "Next page" in the current language */
  nextLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** Numbered pages in a labelled nav: previous, page numbers with gaps, next; aria-current on the current page. */
export declare function Pagination(props: PaginationProps): JSX.Element | null;
/** The page numbers to show, with null for each gap: (5, 10) → [1, null, 4, 5, 6, null, 10]. */
export declare function paginationRange(
  page: number,
  pageCount: number,
  siblings?: number
): (number | null)[];
