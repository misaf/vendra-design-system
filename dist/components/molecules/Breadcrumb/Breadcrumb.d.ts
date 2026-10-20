import * as React from 'react';
export interface BreadcrumbItem {
  label: React.ReactNode;
  /** The page's URL; the last item (the current page) is not a link */
  href?: string;
  /** In-place navigation (call preventDefault to stop the link) */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}
export interface BreadcrumbProps {
  /** From the top of the site to the current page, which comes last */
  items: BreadcrumbItem[];
  /** The nav's accessible name. Default: "Breadcrumb" in the current language */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** React Aria Breadcrumbs in a labelled nav; the last item is the current page. */
export declare function Breadcrumb(props: BreadcrumbProps): React.JSX.Element;
