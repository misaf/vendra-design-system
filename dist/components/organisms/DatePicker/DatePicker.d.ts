import * as React from 'react';
export interface YearlyDate {
  cal: 'j' | 'g';
  m: number;
  d: number;
}
export interface DatePickerLabels {
  /** Names the calendar switch. Default "Calendar" · «تقویم» */
  calendar?: string;
  jalali?: string;
  gregorian?: string;
  year?: string;
  month?: string;
  day?: string;
  /** The calendar button. Default "Choose a date" · «انتخاب از تقویم» */
  open?: string;
  /** Month grid arrows. Default "Previous month"/"Next month" · «ماه قبل»/«ماه بعد» */
  previous?: string;
  next?: string;
  /** "That’s {date}" · fa «برابر با {date}» */ equivalent?: string;
}
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
  /** Number of years offered, starting from the current (or minDate's) year; later days are off. Default 3 */
  years?: number;
  /** ISO; earlier months/days are disabled */
  minDate?: string;
  hint?: string;
  /** Rendered in #{id}-hint; the date segments (or, yearly, the day Select) are marked invalid */
  error?: string;
  /** Labels, digits and the preferred calendar. Defaults to VendraProvider's language (else en). */
  lang?: 'en' | 'fa';
  labels?: DatePickerLabels;
  /** "That’s {fullDate in the other calendar}", aria-live="polite". Default true */
  showEquivalent?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}
/** <fieldset><legend> + a Shamsi/Gregorian switch (React Aria ToggleButtonGroup) + React Aria's DatePicker (typed segments and a month grid in the chosen calendar); yearly dates use month/day Selects, clamped with daysInMonth. */
export declare function DatePicker(props: DatePickerProps): React.JSX.Element;
