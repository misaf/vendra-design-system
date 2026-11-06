export interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target landmark. Default "#main" */
  href?: string;
  /** Localised label, e.g. "Skip to content" / «رفتن به محتوا» */
  children: React.ReactNode;
}
/** Visually hidden until keyboard focus, then a pill on the inverse surface (top inline-start). Render it first in the page. */
export declare function SkipLink(props: SkipLinkProps): JSX.Element;
