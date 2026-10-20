import * as React from 'react';
export interface LoadMoreProps {
  /** Items showing now. */
  shown: number;
  /** Items in the whole list (the API's total). */
  total: number;
  /** e.g. "Showing 4 of 6 designs" (Persian digits for fa). */
  status: React.ReactNode;
  /** Button text, e.g. "Show more". */
  label: React.ReactNode;
  /** The next page's URL; the button renders as a link. */
  href?: string;
  /** Loads the next page in place (preventDefault when `href` is set). */
  onClick?: (event: React.MouseEvent) => void;
  /** A page is loading: the button shows a spinner and is disabled. */
  busy?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** "Show more" paging: status, progress bar and a button for the next page. */
export declare function LoadMore(props: LoadMoreProps): React.JSX.Element;
