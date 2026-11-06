import * as React from 'react';
export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom';
  /** Force visible (previews) */
  open?: boolean;
  children: React.ReactNode;
}
/** React Aria tooltip: hover (after 300ms) and keyboard focus show it, a tap toggles it on touch, Esc hides it. It describes the trigger while shown. */
export declare function Tooltip(props: TooltipProps): React.JSX.Element;
