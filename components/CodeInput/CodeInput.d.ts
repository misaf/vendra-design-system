import type {InputProps} from '../Input/Input.js';
export interface CodeInputProps extends Omit<InputProps, 'type' | 'multiline' | 'maxLength'> {
  /** Digits in the code; default 5. */
  length?: number;
  /** The code so far: digits only. */
  value?: string;
  /** The cleaned code (Latin digits, at most `length`). */
  onValueChange?: (code: string) => void;
  /** Runs once the code has `length` digits. Submitting from here is the form's choice. */
  onComplete?: (code: string) => void;
}
/** A one-time code field: digits only, Persian digits accepted, SMS autofill. */
export declare function CodeInput(props: CodeInputProps): JSX.Element;
