import {deliveryClock} from '../store/store-clock.js';

const persianDigits = value => String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);

export const isoDate = date =>
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0');

// A cut-off time ("18:00") for a sentence; Persian digits, isolated so it stays left to right.
export const cutoffText = (cutoff, persian) =>
  persian ? '⁨' + persianDigits(cutoff) + '⁩' : cutoff;

// The next `days` days for a zone's cut-off, each marked sold out or past today's cut-off. Without
// `sameDay` the days start tomorrow.
export const deliveryDays = (
  cutoff,
  {days, soldOutDates = [], sameDay = true, timeZone},
  now = new Date()
) => {
  const clock = deliveryClock(now, timeZone);
  const [hour, minute] = cutoff.split(':').map(Number);
  const pastCutoff = clock.minutes >= hour * 60 + minute;
  return Array.from({length: days}, (_, index) => {
    const offset = sameDay ? index : index + 1;
    // Advance Gregorian calendar days in UTC so the device's DST cannot alter the sequence.
    const calendar = new Date(Date.UTC(clock.year, clock.month - 1, clock.day + offset, 12));
    const iso = calendar.toISOString().slice(0, 10);
    // A local-noon carrier for existing date-label formatters, not a delivery timestamp.
    const date = new Date(
      calendar.getUTCFullYear(),
      calendar.getUTCMonth(),
      calendar.getUTCDate(),
      12
    );
    return {
      iso,
      date,
      offset,
      soldOut: soldOutDates.includes(iso),
      pastCutoff: offset === 0 && pastCutoff
    };
  });
};

// The chosen day when it is still open, otherwise the first open day (undefined when none is).
export const openDay = (days, chosen) => {
  const open = days.filter(day => !day.soldOut && !day.pastCutoff);
  return (open.find(day => day.iso === chosen) || open[0] || {}).iso;
};

// Every slot ({start, end} hours) on a day, each marked closed when it is today and fewer than
// `leadMinutes` remain before it ends.
export const deliverySlots = (iso, slots, leadMinutes, now = new Date(), timeZone) => {
  const clock = deliveryClock(now, timeZone);
  const today =
      iso ===
      new Date(Date.UTC(clock.year, clock.month - 1, clock.day, 12)).toISOString().slice(0, 10),
    minutes = clock.minutes;
  return slots.map(({start, end}) => ({
    start,
    end,
    closed: today && minutes > Number(end) * 60 - leadMinutes
  }));
};

// The chosen slot's start when open, otherwise the first open slot's (undefined when none is).
export const openSlot = (slots, chosen) => {
  const open = slots.filter(slot => !slot.closed);
  return (open.find(slot => slot.start === chosen) || open[0])?.start;
};
