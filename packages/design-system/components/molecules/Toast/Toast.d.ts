export interface ToastProps {
  /** The queued toast, when a ToastRegion renders it (internal) */
  toast?: unknown;
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  title: React.ReactNode;
  message?: React.ReactNode;
  /** Small ghost button inside the toast, e.g. { label: 'View bag', href: '?view=bag' }. The toast itself is never the click target. */
  action?: {label: React.ReactNode; onClick?: (e: React.MouseEvent) => void; href?: string};
  onClose?: () => void;
  closeLabel?: string;
  style?: React.CSSProperties;
}
/** React Aria toast (alertdialog + atomic alert). On its own it renders in place; ToastRegion shows queued ones. */
export declare function Toast(props: ToastProps): JSX.Element;
/** What a queued toast shows. */
export interface ToastContent {
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  title: React.ReactNode;
  message?: React.ReactNode;
  action?: {label: React.ReactNode; onClick?: (e: React.MouseEvent) => void; href?: string};
}
