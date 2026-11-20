export interface DeliveryDay {
  iso: string;
  date: Date;
  offset: number;
  soldOut: boolean;
  pastCutoff: boolean;
}

/** A delivery slot's start and end hour, e.g. {start: '08', end: '12'}. */
export interface SlotHours {
  start: string;
  end: string;
}

export interface DeliverySlotState {
  start: string;
  end: string;
  closed: boolean;
}

/** "YYYY-MM-DD" in local time. */
export declare function isoDate(date: Date): string;

/** "18:00", or Persian digits isolated for a Persian sentence. */
export declare function cutoffText(cutoff: string, persian: boolean): string;

export declare function deliveryDays(
  cutoff: string,
  /** sameDay: false starts tomorrow. timeZone is the store IANA zone (omitted: device zone).
   * Invalid zones throw RangeError. Dates are local-noon label carriers, not timestamps. */
  options: {days: number; soldOutDates?: string[]; sameDay?: boolean; timeZone?: string},
  now?: Date
): DeliveryDay[];

/** The chosen day when open, otherwise the first open day. */
export declare function openDay(days: DeliveryDay[], chosen?: string): string | undefined;

export declare function deliverySlots(
  iso: string,
  slots: SlotHours[],
  leadMinutes: number,
  now?: Date,
  /** Store IANA time zone; omitted uses the device zone. Invalid zones throw RangeError. */
  timeZone?: string
): DeliverySlotState[];

/** The chosen slot's start when open, otherwise the first open slot's. Undefined when none is open. */
export declare function openSlot(slots: DeliverySlotState[], chosen: string): string | undefined;
