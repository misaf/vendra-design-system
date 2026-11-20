/** One run of opening hours: weekdays (0 Sunday … 6 Saturday) and "HH:MM" times on the store's clock.
 * A `closes` at or before `opens` runs past midnight; "24:00" is midnight. */
export interface OpeningRange {
  days: number[];
  opens: string;
  closes: string;
}

/** Hours on one ISO date that replace the weekly hours: `closed`, or its own opens/closes. */
export interface OpeningException {
  date: string;
  closed?: boolean;
  opens?: string;
  closes?: string;
  /** What the day is, e.g. {en: 'Nowruz', fa: 'نوروز'}. */
  label?: Record<'en' | 'fa', string>;
}

export interface OpeningHours {
  week: OpeningRange[];
  exceptions?: OpeningException[];
}

export interface OpeningStatus {
  open: boolean;
  /** When the store next opens or closes; null when nothing changes within a week. */
  next: {iso: string; offset: number; time: string} | null;
  /** Today's exception, when there is one. */
  exception: OpeningException | null;
}

export interface OpeningGroup {
  days: number[];
  /** Empty when closed. */
  ranges: {opens: string; closes: string}[];
}

/** Open or closed at `now` on the store's clock (IANA `timeZone`; omitted: device zone), and the
 * next change within a week. Invalid zones throw RangeError. */
export declare function openingStatus(
  hours: OpeningHours,
  now?: Date,
  timeZone?: string
): OpeningStatus;

/** Weekly hours as runs of consecutive weekdays with the same ranges, from `firstDay` (default 6). */
export declare function hoursSummary(hours: OpeningHours, firstDay?: number): OpeningGroup[];

/** Exceptions dated today through `days` days ahead on the store's clock, in date order. */
export declare function hoursExceptions(
  hours: OpeningHours,
  days: number,
  now?: Date,
  timeZone?: string
): OpeningException[];
