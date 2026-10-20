import * as React from 'react';
export interface ErrorBoundaryProps {
  children?: React.ReactNode;
  /** Report the failure (the app's error log). Default: console.error */
  onError?: (error: unknown, info: React.ErrorInfo) => void;
  /** When this changes after a failure, the part renders again (a new product, route or filter) */
  resetKey?: unknown;
  /** Instead of the built-in note: an element, or a function given the error and `retry` */
  fallback?: React.ReactNode | ((props: {error: unknown; retry: () => void}) => React.ReactNode);
  /** The note's title. Default: built-in "This part of the page didn’t load." in the page's language */
  title?: string;
  /** Default: built-in "Try again" */
  retryLabel?: string;
  /** On the built-in note's wrapper */
  className?: string;
}
/** Shows a short note with Try again in place of a part of the page that failed to render. */
export declare function ErrorBoundary(props: ErrorBoundaryProps): React.JSX.Element;
