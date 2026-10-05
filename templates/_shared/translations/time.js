// Shared localized delivery-window text. Parameters are the chosen start/end hours.
function vfSlotLabel(start, end, fa) {
  return fa ? '\u2068' + VF_FA_DIGITS(start) + ':۰۰\u2069 تا \u2068' + VF_FA_DIGITS(end) + ':۰۰\u2069' : start + ':00–' + end + ':00';
}

// "Today", "Tomorrow" or the weekday, for delivery day choices.
function vfDayName(day, fa) {
  if (day.offset === 0) return fa ? 'امروز' : 'Today';
  if (day.offset === 1) return fa ? 'فردا' : 'Tomorrow';
  return new Intl.DateTimeFormat(fa ? 'fa-IR' : 'en-GB', {weekday: fa ? 'long' : 'short'}).format(day.date);
}

// "5 October" or «۱۴ مهر».
function vfDayMonth(date, fa) {
  const D = window.AG_DATES;
  return D.dayMonth(date, D.locale(fa ? 'fa' : 'en', fa ? 'j' : 'g'));
}

// When an order arrives: «سه‌شنبه، ۱۴ مهر · ۱۲:۰۰ تا ۱۶:۰۰» / "Tue 6 October · 12:00–16:00".
function vfDeliveryWhen(delivery, fa) {
  const end = (VF_SLOTS.find(slot => slot[0] === delivery.slot) || VF_SLOTS[1])[1];
  const slot = vfSlotLabel(delivery.slot, end, fa);
  if (!delivery.date) return slot;
  const date = window.AG_DATES.fromIso(delivery.date);
  const weekday = new Intl.DateTimeFormat(fa ? 'fa-IR' : 'en-GB', {weekday: fa ? 'long' : 'short'}).format(date);
  return weekday + (fa ? '، ' : ' ') + vfDayMonth(date, fa) + ' · ' + slot;
}
