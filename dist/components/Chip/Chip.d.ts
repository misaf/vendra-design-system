import * as React from 'react';
export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Filled ink when selected */
  selected?: boolean;
  /** Shows a remove (x) affordance */
  onRemove?: () => void;
  children?: React.ReactNode;
}
export declare function Chip(props: TagProps): React.JSX.Element;
