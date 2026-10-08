import * as React from 'react';
export interface RangeSliderProps {
  /** true (default) = two handles with value [lo, hi]; false = one handle with a number */
  range?: boolean;
  min?: number;
  max?: number;
  /** Handles are always kept at least one step apart */
  step?: number;
  /** Controlled: [lo, hi] in range mode, a number otherwise */
  value?: [number, number] | number;
  defaultValue?: [number, number] | number;
  onChange?: (value: [number, number] | number) => void;
  /** Formats the labels under the track and aria-valuetext, e.g. v => money(v, { lang }) */
  formatValue?: (v: number) => string;
  /** aria-labels for the two handles (range mode) */
  labels?: {min: string; max: string};
  /** aria-label for the single handle */
  label?: string;
  showValues?: boolean;
  className?: string;
}
export declare function RangeSlider(props: RangeSliderProps): React.JSX.Element;
