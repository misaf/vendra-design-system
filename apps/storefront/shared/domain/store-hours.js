// The studio's opening hours as text, from VF_STORE.hours on the store's clock (VF_STORE.timeZone).
// The rules are commerce.openingStatus/hoursSummary/hoursExceptions; this file only words them.
// Persian times use Persian digits, isolated so they stay left to right inside a sentence.
import {commerce} from '../../../../components/utils/commerce.js';
import {VF_STORE} from './store-config.js';
import {vfNow} from '../platform/environment.js';

const hoursDigits = value => String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
const hoursIsolate = text => '⁨' + text + '⁩';
const hoursClock = (value, fa) => (fa ? hoursIsolate(hoursDigits(value)) : value);
const hoursRange = ({opens, closes}, fa) =>
  fa ? hoursClock(opens, true) + ' تا ' + hoursClock(closes, true) : opens + '–' + closes;
// 4 October 2026 is a Sunday, so day 0 … 6 lands on Sunday … Saturday.
/** @param {number} day @param {boolean} fa @param {'long' | 'short'} [width] */
const hoursDayName = (day, fa, width = 'long') =>
  new Intl.DateTimeFormat(fa ? 'fa-IR' : 'en-GB', {weekday: width, timeZone: 'UTC'}).format(
    new Date(Date.UTC(2026, 9, 4 + day, 12))
  );
// An ISO date as the store's calendar shows it: "Sun 21 March", "یکشنبه ۱ فروردین".
const hoursDateName = (iso, fa) =>
  new Intl.DateTimeFormat(fa ? 'fa-IR-u-ca-persian' : 'en-GB', {
    weekday: fa ? 'long' : 'short',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  }).format(new Date(iso + 'T12:00:00Z'));

// The weekly hours in one line: "Daily 08:00–22:00", "Sat–Wed 08:00–22:00; Thu 10:00–18:00; Fri closed".
export function vfHoursText(lang, hours = VF_STORE.hours) {
  const fa = lang === 'fa';
  const groups = commerce.hoursSummary(hours);
  return groups
    .map(({days, ranges}) => {
      const first = days[0],
        last = days[days.length - 1];
      const daysText =
        days.length === 7
          ? fa
            ? 'همه‌روزه'
            : 'Daily'
          : days.length === 1
            ? hoursDayName(first, fa, fa ? 'long' : 'short')
            : fa
              ? hoursDayName(first, true) + ' تا ' + hoursDayName(last, true)
              : hoursDayName(first, false, 'short') + '–' + hoursDayName(last, false, 'short');
      const rangesText = ranges.length
        ? ranges.map(item => hoursRange(item, fa)).join(fa ? '، ' : ', ')
        : fa
          ? 'تعطیل'
          : 'closed';
      return daysText + ' ' + rangesText;
    })
    .join(fa ? '؛ ' : '; ');
}

// Whether the studio is open now, in words: {open, text}. "Open now · closes 22:00",
// "Closed · opens 08:00 tomorrow", "Closed today for Nowruz · opens 12:00 tomorrow".
export function vfOpeningStatus(lang, now = vfNow(), hours = VF_STORE.hours) {
  const fa = lang === 'fa';
  const status = commerce.openingStatus(hours, now, VF_STORE.timeZone);
  const label = status.exception?.label?.[fa ? 'fa' : 'en'] || '';
  const next = status.next;
  const when = !next
    ? ''
    : fa
      ? (next.offset === 0
          ? ''
          : next.offset === 1
            ? 'فردا '
            : hoursDayName(new Date(next.iso + 'T12:00:00Z').getUTCDay(), true) + ' ') +
        'ساعت ' +
        hoursClock(next.time, true)
      : next.offset === 0
        ? next.time
        : next.offset === 1
          ? next.time + ' tomorrow'
          : hoursDayName(new Date(next.iso + 'T12:00:00Z').getUTCDay(), false) + ' ' + next.time;
  let text;
  if (status.open)
    text = fa
      ? 'اکنون باز است' +
        (next ? ' · تا ' + when : '') +
        (label ? ' (ساعت کاری ' + label + ')' : '')
      : 'Open now' + (next ? ' · closes ' + when : '') + (label ? ' (' + label + ' hours)' : '');
  else {
    // "Closed today" only when the exception closes the whole day; shortened holiday hours are
    // closed for now, with the holiday named as the reason for the different hours.
    const closedAllDay = !!status.exception && (status.exception.closed || !status.exception.opens);
    text = fa
      ? (label && closedAllDay
          ? 'امروز به مناسبت ' + label + ' تعطیل است'
          : 'اکنون بسته است' + (label ? ' (ساعت کاری ' + label + ')' : '')) +
        (next ? ' · بازگشایی ' + when : '')
      : (label && closedAllDay
          ? 'Closed today for ' + label
          : 'Closed' + (label ? ' (' + label + ' hours)' : '')) + (next ? ' · opens ' + when : '');
  }
  return {open: status.open, text};
}

// Special hours coming up within `days` days, one line each: "Nowruz, Sun 21 March: closed".
export function vfHoursNotices(lang, now = vfNow(), days = 14, hours = VF_STORE.hours) {
  const fa = lang === 'fa';
  return commerce.hoursExceptions(hours, days, now, VF_STORE.timeZone).map(item => {
    const label = item.label?.[fa ? 'fa' : 'en'];
    const date = hoursDateName(item.date, fa);
    const value =
      item.closed || !item.opens
        ? fa
          ? 'تعطیل'
          : 'closed'
        : hoursRange({opens: item.opens, closes: item.closes}, fa);
    return (label ? label + (fa ? '، ' : ', ') : '') + date + ': ' + value;
  });
}
