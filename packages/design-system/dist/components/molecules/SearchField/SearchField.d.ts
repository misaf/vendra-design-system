import * as React from 'react';
export interface SearchFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onSubmit' | 'value' | 'defaultValue' | 'type'
> {
  value?: string;
  defaultValue?: string;
  /** The text as typed */
  onChange?: (value: string) => void;
  /** Enter was pressed */
  onSubmit?: (value: string) => void;
  /** The clear button or Esc emptied the field */
  onClear?: () => void;
  label?: string;
  /** Helper text below the control, linked with aria-describedby="{id}-hint" */
  hint?: string;
  /** Error message: danger border, aria-invalid, and aria-errormessage → the hint element */
  error?: string;
  /** The clear button's accessible name. Default: "Clear search" in the current language */
  clearLabel?: string;
}
/** React Aria SearchField styled like Input: Esc or the clear button empties it, Enter submits. */
export declare function SearchField(props: SearchFieldProps): React.JSX.Element;
