export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'accent' | 'sage' | 'ochre' | 'plum' | 'danger' | 'solid';
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;