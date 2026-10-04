export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Status tones match Alert and Toast. Deprecated aliases: sage → success, ochre → warning, plum → info. */
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'info' | 'danger' | 'solid';
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;