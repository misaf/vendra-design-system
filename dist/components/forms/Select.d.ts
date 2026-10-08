import * as React from 'react';
export interface SelectOption { value: string; label: string; disabled?: boolean; }
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  /** Helper text below the control, linked with aria-describedby="{id}-hint" */
  hint?: string;
  /** Error message: danger border, aria-invalid, and aria-errormessage → the hint element */
  error?: string;
  options: (string | SelectOption)[];
  placeholder?: string;
}
export declare function Select(props: SelectProps): React.JSX.Element;