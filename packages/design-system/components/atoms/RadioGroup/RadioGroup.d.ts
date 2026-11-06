export interface RadioGroupProps {
  /** aria-label (or use labelledBy) */
  label?: string;
  labelledBy?: string;
  /** Visible group label → renders <fieldset><legend> (legend labels the radiogroup). Overrides label/labelledBy. */
  legend?: React.ReactNode;
  /** Helper text under the radios, linked with aria-describedby */
  hint?: React.ReactNode;
  /** Error text: aria-invalid + aria-errormessage on the radiogroup */
  error?: React.ReactNode;
  id?: string;
  /** Form field name; the chosen Radio's value is posted under it */
  name?: string;
  /** Controlled: the chosen Radio's value (null for none) */
  value?: string | null;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Turns every Radio off */
  disabled?: boolean;
  required?: boolean;
  /** Radios */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
/** React Aria radiogroup: one Tab stop, arrow keys move and select (mirrored in RTL, following the page's language). */
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
