import * as React from 'react';
import type {ButtonDOMProps} from '../Button/Button.js';

export interface ChipProps extends ButtonDOMProps {
  /** Filled ink when selected */
  selected?: boolean;
  /** Shows a remove (x) affordance */
  onRemove?: () => void;
  children?: React.ReactNode;
}
export declare function Chip(props: ChipProps): React.JSX.Element;
