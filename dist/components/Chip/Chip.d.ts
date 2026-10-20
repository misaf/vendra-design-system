import * as React from 'react';
import type {ButtonDOMProps} from '../atoms/Button/Button.js';

export interface ChipProps extends ButtonDOMProps {
  /** Filled ink when selected */
  selected?: boolean;
  children?: React.ReactNode;
}
export declare function Chip(props: ChipProps): React.JSX.Element;
