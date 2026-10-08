import type {InputProps} from '../Input/Input.js';
export interface PhoneInputProps extends Omit<InputProps, 'type' | 'multiline'> {
  /** 'tel' (default) for the customer's own number; 'off' for someone else's, such as a recipient. */
  autoComplete?: string;
  /** The typed number in Latin digits without spaces, brackets or dashes, and whether it is an
   * Iranian mobile number (09xxxxxxxxx). */
  onValueChange?: (number: string, isMobile: boolean) => void;
}
/** A phone number field: tel keypad, autofill, left to right in Persian, normalised value. */
export declare function PhoneInput(props: PhoneInputProps): JSX.Element;
