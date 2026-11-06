import * as React from 'react';
export interface MeterProps {
  /** What it measures, shown above the bar and naming the meter */
  label?: React.ReactNode;
  value: number;
  /** Default 0 */
  minValue?: number;
  /** The target. Default 100 */
  maxValue?: number;
  /** Replaces the percentage, shown and announced: "3,800,000 of 5,000,000 Toman" */
  valueLabel?: string;
  /** Show the value text beside the label. Default true */
  showValue?: boolean;
  /** The target is reached: the fill takes the success colour */
  done?: boolean;
  id?: string;
  /** Name it when there is no visible `label` */
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** A value towards a target (role="meter"), with a label and value text. */
export declare function Meter(props: MeterProps): React.JSX.Element;
