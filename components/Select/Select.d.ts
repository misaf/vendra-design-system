export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
/** What onChange receives: the chosen option's value on target.value, as a native select's event. */
export interface SelectChangeEvent {
  target: {value: string; name?: string; id: string};
  currentTarget: {value: string; name?: string; id: string};
  type: 'change';
}
export interface SelectProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue' | 'placeholder'
> {
  label?: string;
  /** Helper text below the control, linked with aria-describedby="{id}-hint" */
  hint?: string;
  /** Error message: danger border, aria-invalid, and aria-errormessage → the hint element */
  error?: string;
  options: (string | SelectOption)[];
  /** Shown while nothing is chosen. Default: empty */
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: SelectChangeEvent) => void;
  disabled?: boolean;
  required?: boolean;
  /** Form field name; React Aria keeps a hidden native select for forms and autofill */
  name?: string;
  autoComplete?: string;
}
/** React Aria Select: a button that opens a listbox; ↑/↓, Home/End and typing move, Enter/Space choose, Esc closes. */
export declare function Select(props: SelectProps): JSX.Element;
