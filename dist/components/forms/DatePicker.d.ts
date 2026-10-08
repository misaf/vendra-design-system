import * as React from 'react';
export interface YearlyDate { cal: 'j' | 'g'; m: number; d: number; }
export interface DatePickerLabels { jalali?: string; gregorian?: string; year?: string; month?: string; day?: string; /** "That’s {date}" · fa «برابر با {date}» */ equivalent?: string; }
export interface DatePickerProps {
  label?: string;
  /** ISO 'YYYY-MM-DD', or {cal, m, d} when yearly */
  value?: string | YearlyDate | null;
  onChange?: (value: string | YearlyDate) => void;
  /** Controlled calendar. Default 'j' for fa, 'g' for en */
  calendar?: 'j' | 'g';
  onCalendarChange?: (cal: 'j' | 'g') => void;
  /** Default ['j','g']; one entry hides the toggle and the equivalent line */
  calendars?: ('j' | 'g')[];
  /** Yearly date (birthdays, reminders): hides the year select, value is {cal, m, d}. Switching calendar converts the day. */
  yearly?: boolean;
  /** Number of years offered, starting from the current year. Default 3 */
  years?: number;
  /** ISO; earlier months/days are disabled */
  minDate?: string;
  hint?: string;
  /** Rendered in #{id}-hint; the day Select gets aria-invalid + aria-errormessage */
  error?: string;
  lang?: 'en' | 'fa';
  labels?: DatePickerLabels;
  /** "That’s {fullDate in the other calendar}", aria-live="polite". Default true */
  showEquivalent?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** <fieldset><legend> + pill calendar Tabs + year/month/day Selects. The day is clamped with daysInMonth and never rolls over. */
export declare function DatePicker(props: DatePickerProps): React.JSX.Element;
