// Opening status on the store's clock, run in customers' device zones independently of the runner's TZ.
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
if (!process.env.VENDRA_OPENING_TZ_TEST) {
  for (const TZ of ['America/Los_Angeles', 'Pacific/Kiritimati', 'UTC']) {
    const result = spawnSync(process.execPath, [__filename], {
      env: {...process.env, TZ, VENDRA_OPENING_TZ_TEST: '1'},
      encoding: 'utf8'
    });
    assert.equal(result.status, 0, `${TZ}: ${result.stdout}${result.stderr}`);
  }
  console.log('Passed store opening hours across three customer time zones.');
} else {
  (async () => {
    const {commerce} = await import('../../../packages/design-system/components/utils/commerce.js');
    const zone = 'Asia/Tehran';
    // Tehran is UTC+03:30 all year.
    const tehran = (date, time) => new Date(`${date}T${time}:00+03:30`);
    const daily = {week: [{days: [0, 1, 2, 3, 4, 5, 6], opens: '08:00', closes: '22:00'}]};
    const status = (hours, date, time) => commerce.openingStatus(hours, tehran(date, time), zone);

    // 2026-10-05 is a Monday.
    assert.deepEqual(status(daily, '2026-10-05', '09:00'), {
      open: true,
      next: {iso: '2026-10-05', offset: 0, time: '22:00'},
      exception: null
    });
    assert.deepEqual(status(daily, '2026-10-05', '07:59').next, {
      iso: '2026-10-05',
      offset: 0,
      time: '08:00'
    });
    assert.equal(status(daily, '2026-10-05', '08:00').open, true);
    assert.equal(status(daily, '2026-10-05', '22:00').open, false);
    assert.deepEqual(status(daily, '2026-10-05', '22:00').next, {
      iso: '2026-10-06',
      offset: 1,
      time: '08:00'
    });

    // Fridays (5) closed; Thursdays (4) short.
    const weekly = {
      week: [
        {days: [6, 0, 1, 2, 3], opens: '08:00', closes: '22:00'},
        {days: [4], opens: '10:00', closes: '18:00'}
      ]
    };
    // Thursday 2026-10-08 at 19:00 → closed until Saturday 08:00.
    assert.deepEqual(status(weekly, '2026-10-08', '19:00'), {
      open: false,
      next: {iso: '2026-10-10', offset: 2, time: '08:00'},
      exception: null
    });
    assert.deepEqual(commerce.hoursSummary(weekly), [
      {days: [6, 0, 1, 2, 3], ranges: [{opens: '08:00', closes: '22:00'}]},
      {days: [4], ranges: [{opens: '10:00', closes: '18:00'}]},
      {days: [5], ranges: []}
    ]);
    assert.deepEqual(commerce.hoursSummary(daily), [
      {days: [6, 0, 1, 2, 3, 4, 5], ranges: [{opens: '08:00', closes: '22:00'}]}
    ]);

    // Past midnight: Friday 18:00–02:00 is still open early Saturday.
    const late = {week: [{days: [5], opens: '18:00', closes: '02:00'}]};
    assert.deepEqual(status(late, '2026-10-10', '01:00'), {
      open: true,
      next: {iso: '2026-10-10', offset: 0, time: '02:00'},
      exception: null
    });
    assert.equal(status(late, '2026-10-10', '02:00').open, false);

    // Touching ranges across midnight are one opening; always open never changes.
    const allDay = {week: [{days: [0, 1, 2, 3, 4, 5, 6], opens: '00:00', closes: '24:00'}]};
    assert.deepEqual(status(allDay, '2026-10-05', '12:00'), {
      open: true,
      next: null,
      exception: null
    });
    assert.deepEqual(status({week: []}, '2026-10-05', '12:00'), {
      open: false,
      next: null,
      exception: null
    });

    // Exceptions replace the weekly hours on their dates (Nowruz 1406).
    const nowruz = {
      ...daily,
      exceptions: [
        {date: '2027-03-22', opens: '12:00', closes: '20:00', label: {en: 'Nowruz', fa: 'نوروز'}},
        {date: '2027-03-21', closed: true, label: {en: 'Nowruz', fa: 'نوروز'}}
      ]
    };
    const closedDay = status(nowruz, '2027-03-21', '10:00');
    assert.equal(closedDay.open, false);
    assert.equal(closedDay.exception.date, '2027-03-21');
    assert.deepEqual(closedDay.next, {iso: '2027-03-22', offset: 1, time: '12:00'});
    assert.deepEqual(status(nowruz, '2027-03-22', '19:00').next.time, '20:00');
    assert.deepEqual(status(nowruz, '2027-03-20', '21:00').next, {
      iso: '2027-03-20',
      offset: 0,
      time: '22:00'
    });
    assert.deepEqual(
      commerce
        .hoursExceptions(nowruz, 14, tehran('2027-03-10', '12:00'), zone)
        .map(item => item.date),
      ['2027-03-21', '2027-03-22']
    );
    assert.deepEqual(commerce.hoursExceptions(nowruz, 7, tehran('2027-03-10', '12:00'), zone), []);
    assert.deepEqual(
      commerce
        .hoursExceptions(nowruz, 0, tehran('2027-03-22', '23:59'), zone)
        .map(item => item.date),
      ['2027-03-22']
    );

    // The store's date, not the device's: 00:30 Friday in Tehran is still Thursday in Los Angeles.
    assert.deepEqual(status(weekly, '2026-10-09', '00:30').next, {
      iso: '2026-10-10',
      offset: 1,
      time: '08:00'
    });
    assert.throws(() => commerce.openingStatus(daily, new Date(), 'Invalid/Zone'), RangeError);
    // "Closed today" only on an all-day closure; shortened holiday hours say closed for now.
    const {vfOpeningStatus} = await import('../shared/domain/store-hours.js');
    const wording = (lang, date, time) => vfOpeningStatus(lang, tehran(date, time), nowruz).text;
    assert.equal(
      wording('en', '2027-03-21', '10:00'),
      'Closed today for Nowruz · opens 12:00 tomorrow'
    );
    assert.equal(wording('en', '2027-03-22', '10:00'), 'Closed (Nowruz hours) · opens 12:00');
    assert.equal(wording('en', '2027-03-22', '13:00'), 'Open now · closes 20:00 (Nowruz hours)');
    assert.ok(!wording('fa', '2027-03-22', '10:00').includes('تعطیل'));
    assert.ok(wording('fa', '2027-03-21', '10:00').includes('تعطیل'));
  })().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
