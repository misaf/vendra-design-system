export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Filled ink when selected */
  selected?: boolean;
  /** Shows a remove (x) affordance */
  onRemove?: () => void;
  children?: React.ReactNode;
}
export declare function Chip(props: TagProps): JSX.Element;
