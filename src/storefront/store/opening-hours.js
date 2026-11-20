import {deliveryClock} from './store-clock.js';

// Opening hours: {week: [{days, opens, closes}], exceptions?: [{date, closed?, opens?, closes?}]}.
// `days` are weekday numbers (0 Sunday … 6 Saturday); times are "HH:MM" on the store's clock. A
// `closes` at or before `opens` runs past midnight ("24:00" is midnight). An exception replaces the
// weekly hours on its ISO date: `closed: true`, or its own opens/closes.
const DAY_MINUTES = 1440;
const clockMinutes = time => {
  const [hour, minute] = String(time).split(':').map(Number);
  return hour * 60 + minute;
};
const clockTime = minutes =>
  String(Math.floor(minutes / 60)).padStart(2, '0') + ':' + String(minutes % 60).padStart(2, '0');
const calendarIso = (clock, offset) =>
  new Date(Date.UTC(clock.year, clock.month - 1, clock.day + offset, 12))
    .toISOString()
    .slice(0, 10);
const weekdayOf = iso => new Date(iso + 'T12:00:00Z').getUTCDay();

// The hours on one ISO date: its exception (or null) and the {opens, closes} ranges, [] when closed.
const hoursOn = (hours, iso) => {
  const exception = (hours.exceptions || []).find(item => item.date === iso) || null;
  if (exception)
    return {
      exception,
      ranges:
        exception.closed || !exception.opens
          ? []
          : [{opens: exception.opens, closes: exception.closes}]
    };
  const weekday = weekdayOf(iso);
  return {
    exception: null,
    ranges: (hours.week || [])
      .filter(range => range.days.includes(weekday))
      .map(({opens, closes}) => ({opens, closes}))
  };
};

// Whether the store is open at `now` on its own clock, and when that next changes:
// {open, next: {iso, offset, time} | null, exception}. `offset` counts days from today; `next` is null
// when nothing changes within a week. `exception` is today's exception, when there is one.
export const openingStatus = (hours, now = new Date(), timeZone) => {
  const clock = deliveryClock(now, timeZone);
  const horizon = 8 * DAY_MINUTES;
  const spans = [];
  // Yesterday too, for hours that run past midnight into today.
  for (let offset = -1; offset <= 8; offset++)
    for (const {opens, closes} of hoursOn(hours, calendarIso(clock, offset)).ranges) {
      const start = offset * DAY_MINUTES + clockMinutes(opens);
      let end = offset * DAY_MINUTES + clockMinutes(closes);
      if (end <= start) end += DAY_MINUTES;
      spans.push([start, end]);
    }
  spans.sort((a, b) => a[0] - b[0]);
  // Touching spans (22:00–24:00 then 00:00–02:00) are one opening.
  const merged = [];
  for (const span of spans) {
    const last = merged[merged.length - 1];
    if (last && span[0] <= last[1]) last[1] = Math.max(last[1], span[1]);
    else merged.push([...span]);
  }
  const at = minutes => {
    const offset = Math.floor(minutes / DAY_MINUTES);
    return {
      iso: calendarIso(clock, offset),
      offset,
      time: clockTime(minutes - offset * DAY_MINUTES)
    };
  };
  const exception = hoursOn(hours, calendarIso(clock, 0)).exception;
  const current = merged.find(([start, end]) => start <= clock.minutes && clock.minutes < end);
  if (current) return {open: true, next: current[1] < horizon ? at(current[1]) : null, exception};
  const upcoming = merged.find(([start]) => start > clock.minutes && start < horizon);
  return {open: false, next: upcoming ? at(upcoming[0]) : null, exception};
};

// The weekly hours as runs of consecutive weekdays with the same ranges, starting the week on
// `firstDay` (6, Saturday, by default): [{days, ranges}], where empty ranges mean closed.
export const hoursSummary = (hours, firstDay = 6) => {
  const groups = [];
  for (let index = 0; index < 7; index++) {
    const day = (firstDay + index) % 7;
    const ranges = (hours.week || [])
      .filter(range => range.days.includes(day))
      .map(({opens, closes}) => ({opens, closes}))
      .sort((a, b) => clockMinutes(a.opens) - clockMinutes(b.opens));
    const last = groups[groups.length - 1];
    if (last && JSON.stringify(last.ranges) === JSON.stringify(ranges)) last.days.push(day);
    else groups.push({days: [day], ranges});
  }
  return groups;
};

// Exceptions dated from today through `days` days ahead on the store's clock, in date order.
export const hoursExceptions = (hours, days, now = new Date(), timeZone) => {
  const clock = deliveryClock(now, timeZone);
  const first = calendarIso(clock, 0);
  const last = calendarIso(clock, days);
  return (hours.exceptions || [])
    .filter(item => item.date >= first && item.date <= last)
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
};
