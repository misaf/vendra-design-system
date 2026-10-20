import * as React from 'react';
import type {InputProps} from '../atoms/Input/Input.js';
export interface CodeInputProps extends Omit<
  InputProps,
  'type' | 'multiline' | 'maxLength' | 'onChange'
> {
  /** Digits in the code; default 5. */
  length?: number;
  /** The code so far: digits only. */
  value?: string;
  /** The cleaned code (Latin digits, at most `length`). */
  onChange?: (code: string) => void;
  /** Runs once the code has `length` digits. Submitting from here is the form's choice. */
  onComplete?: (code: string) => void;
  /** Fill the code from the SMS where the browser can (Web OTP: Chrome on Android) while the field
   * is mounted. The SMS's last line must be "@<site domain> #<code>". Default true */
  webOtp?: boolean;
}
/** A one-time code field: digits only, Persian digits accepted, SMS autofill and Web OTP. */
export declare function CodeInput(props: CodeInputProps): React.JSX.Element;
