// Calendar fields and wall-clock minutes at the store. Omitting the zone preserves local-time
// behavior for existing callers; an invalid IANA zone throws rather than accepting unsafe orders.
export const deliveryClock = (now, timeZone) => {
  if (!timeZone)
    return {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate(),
      minutes: now.getHours() * 60 + now.getMinutes()
    };
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone,
      calendar: 'gregory',
      numberingSystem: 'latn',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23'
    })
      .formatToParts(now)
      .map(({type, value}) => [type, value])
  );
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    minutes: Number(parts.hour) * 60 + Number(parts.minute)
  };
};
