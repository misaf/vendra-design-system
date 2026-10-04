export interface AlertProps {
  /** danger is an alias of error (e.g. an order failing mid-checkout) */
  tone?: 'neutral' | 'warning' | 'error' | 'danger' | 'success';
  /** Lucide icon name; defaults per tone. Pass false to hide. */
  icon?: string | false;
  title?: React.ReactNode;
  /** The message */
  children?: React.ReactNode;
  /** Inline action slot, e.g. <Button size="sm" variant="secondary">Try again</Button> — stays on one line, wraps under the message when narrow */
  action?: React.ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Alert(props: AlertProps): JSX.Element;
