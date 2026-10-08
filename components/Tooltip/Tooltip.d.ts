export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom';
  /** Force visible (previews) */
  open?: boolean;
  children: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
