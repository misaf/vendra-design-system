export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Helper text below the control, linked with aria-describedby="{id}-hint" */
  hint?: string;
  /** Error message: danger border, aria-invalid, and aria-errormessage → the hint element */
  error?: string;
  iconStart?: string;
  /** Render a textarea (gift notes) */
  multiline?: boolean;
  rows?: number;
}
export declare function Input(props: InputProps): JSX.Element;
