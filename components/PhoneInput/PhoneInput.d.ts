import type {InputProps} from '../atoms/Input/Input.js';
export interface PhoneInputProps extends Omit<InputProps, 'type' | 'multiline' | 'onChange'> {
  /** 'tel' (default) for the customer's own number; 'off' for someone else's, such as a recipient. */
  autoComplete?: string;
  /** What was typed, plus the number as 09xxxxxxxxx when it is an Iranian mobile however it was
   * typed (+98…, 9…), otherwise in Latin digits without spaces, brackets or dashes; and whether it
   * is a mobile. */
  onChange?: (typed: string, phone: {number: string; mobile: boolean}) => void;
}
/** A phone number field: tel keypad, autofill, left to right in Persian, normalised value. */
export declare function PhoneInput(props: PhoneInputProps): JSX.Element;
