export interface ToastProps {
  tone?: 'success' | 'info' | 'warning' | 'danger';
  title: React.ReactNode;
  message?: React.ReactNode;
  /** Small ghost button inside the toast, e.g. { label: 'View bag', href: '?view=bag' }. The toast itself is never the click target. */
  action?: {label: React.ReactNode; onClick?: (e: React.MouseEvent) => void; href?: string};
  onClose?: () => void;
  closeLabel?: string;
  style?: React.CSSProperties;
}
export declare function Toast(props: ToastProps): JSX.Element;
