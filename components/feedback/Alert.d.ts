export interface AlertProps {
  /** Matches Badge and Toast. 'error' is a deprecated alias of danger. */
  tone?: 'neutral' | 'warning' | 'danger' | 'success';
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
