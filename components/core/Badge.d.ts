export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Status tones match Alert and Toast. */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'info' | 'danger' | 'solid';
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;