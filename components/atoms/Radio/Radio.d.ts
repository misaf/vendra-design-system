export interface RadioProps {
  label?: React.ReactNode;
  /** Secondary muted line under the label, exposed as the accessible description (not part of the name) */
  description?: React.ReactNode;
  /** What the RadioGroup's value becomes when this radio is chosen */
  value: string;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** A React Aria radio. Place it inside <RadioGroup>, which holds the value, name, hint and error. */
export declare function Radio(props: RadioProps): JSX.Element;
