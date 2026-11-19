/** 'j' = Jalali (Shamsi), 'g' = Gregorian. */
export type Calendar = 'j' | 'g';
export type Lang = 'en' | 'fa';
export interface Dates {
  /** Jalali → Gregorian; a local Date at 12:00 (DST-safe). */
  j2g(jy: number, jm: number, jd: number): Date;
  /** Gregorian Date → [year, month, day] in Jalali. */
  g2j(date: Date): [number, number, number];
  jYear(date: Date): number;
  isJLeap(jy: number): boolean;
  daysInMonth(cal: Calendar, y: number, m: number): number;
  toDate(cal: Calendar, y: number, m: number, d: number): Date;
  parts(cal: Calendar, date: Date): [number, number, number];
  yearOf(cal: Calendar, date: Date): number;
  /** "YYYY-MM-DD" in local time. */
  iso(date: Date): string;
  fromIso(s: string | null | undefined): Date | null;
  daysBetween(a: Date, b: Date): number;
  /** Next occurrence of a yearly date, today included. */
  nextYearly(
    when: {cal?: Calendar; m: number; d: number},
    today?: Date
  ): {date: Date; days: number};
  /** Next Hijri (Umm al-Qura) month/day within 400 days. */
  nextHijri(hm: number, hd: number, today?: Date): {date: Date; days: number} | null;
  /** Explicit Intl locale for a language + calendar, e.g. 'fa-IR-u-ca-persian'. */
  locale(lang: Lang, cal?: Calendar): string;
  fullDate(date: Date | null | undefined, loc?: string, withWeekday?: boolean): string;
  dayMonth(date: Date, loc: string): string;
  monthNames(cal: Calendar, lang: Lang): string[];
  /** Persian digits for 'fa'. */
  digits(n: number | string, lang: Lang): string;
}
/** Jalali (Shamsi) / Gregorian date helpers. */
export declare const dates: Dates;
