import * as React from 'react';
export interface ErrorSummaryError {
  /** What to fix, as the field's own error says it (it may name the field: "Card for Rosa: …") */
  text: React.ReactNode;
  /** The id of the field (or of a group or map holding it); the link goes there and focuses it */
  target: string;
}
export interface ErrorSummaryProps {
  /** In form order. Nothing renders without any */
  errors: ErrorSummaryError[];
  /** Default: the built-in "Check {count} details to continue." in the page's language */
  title?: React.ReactNode;
  /** Its id, to focus it after a failed submit (it has tabIndex -1) */
  id?: string;
  /** Focus it when errors first appear. Default false: the app decides (one error may go straight to its field) */
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
/** After a failed submit, a danger Alert listing what to fix, each a link that focuses its field. */
export declare function ErrorSummary(props: ErrorSummaryProps): React.JSX.Element | null;
