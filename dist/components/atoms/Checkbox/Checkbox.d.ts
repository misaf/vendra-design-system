import * as React from 'react';
export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  /** The new state */
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  /** Helper text below the control, linked with aria-describedby="{id}-hint" */
  hint?: React.ReactNode;
  /** Error message: danger border, aria-invalid, and aria-errormessage → the hint element */
  error?: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): React.JSX.Element;
