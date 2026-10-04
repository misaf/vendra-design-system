export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Filled ink when selected */
  selected?: boolean;
  /** Shows a remove (x) affordance */
  onRemove?: () => void;
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): JSX.Element;