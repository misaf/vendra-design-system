// Run every case in customers' device zones, independently of the test runner's own TZ.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import test from 'node:test';
import {deliveryDays, deliverySlots, isoDate, openDay, openSlot} from './delivery-window.js';
import {vfProduct} from '../catalog/catalog.js';
import {
  VF_SLOTS,
  vfDeliverableOn,
  vfDeliveryDate,
  vfDeliveryDays,
  vfDeliverySlot,
  vfDeliverySlots
} from './delivery-schedule.js';
import {VF_ZONES} from './delivery-zones.js';
import {vfDeliveryChanged} from './delivery-validation.js';

if (!process.env.VENDRA_DELIVERY_TZ_TEST) {
  for (const TZ of [
    'Asia/Tehran',
    'UTC',
    'America/Los_Angeles',
    'Asia/Tokyo',
    'Pacific/Kiritimati'
  ]) {
    test(`delivery rules in ${TZ}`, () => {
      const result = spawnSync(process.execPath, [import.meta.filename], {
        env: {...process.env, TZ, VENDRA_DELIVERY_TZ_TEST: '1'},
        encoding: 'utf8'
      });
      assert.ifError(result.error);
      assert.equal(result.status, 0, result.stdout + result.stderr);
    });
  }
} else {
  // Each time zone gets its own process and module state.
  const timeZone = 'Asia/Tehran';
  const rules = {days: 3, timeZone};
  const now = new Date('2026-10-05T19:00:00Z'); // 22:30 Tehran, 12:00 Los Angeles.
  const days = deliveryDays('18:00', rules, now);
  assert.deepEqual(
    days.map(day => [day.iso, day.pastCutoff]),
    [
      ['2026-10-05', true],
      ['2026-10-06', false],
      ['2026-10-07', false]
    ]
  );
  assert.equal(openDay(days, '2026-10-05'), '2026-10-06');
  assert.equal(isoDate(days[0].date), days[0].iso, 'date label retains the store calendar day');
  assert.equal(deliveryDays('18:00', rules, new Date('2026-10-05T14:29:00Z'))[0].pastCutoff, false);
  assert.equal(deliveryDays('18:00', rules, new Date('2026-10-05T14:30:00Z'))[0].pastCutoff, true);
  const midnight = new Date('2026-12-31T20:30:00Z'); // Jan 1 00:00 Tehran.
  assert.equal(deliveryDays('18:00', rules, midnight)[0].iso, '2027-01-01');
  assert.equal(deliveryDays('18:00', rules, midnight)[0].pastCutoff, false);
  const tomorrow = deliveryDays(
    '18:00',
    {...rules, sameDay: false, soldOutDates: ['2027-01-02']},
    midnight
  );
  assert.equal(tomorrow[0].iso, '2027-01-02');
  assert.equal(tomorrow[0].soldOut, true);
  const slots = [
    {start: '08', end: '12'},
    {start: '20', end: '22'}
  ];
  const afterLastSlot = new Date('2026-10-05T17:30:00Z'); // 21:00 Tehran, before a 22:00 cutoff.
  const lateDays = deliveryDays('22:00', rules, afterLastSlot);
  const today = openDay(lateDays, '2026-10-05');
  assert.equal(today, '2026-10-05');
  const closedSlots = deliverySlots(today, slots, 120, afterLastSlot, timeZone);
  assert.ok(closedSlots.every(slot => slot.closed));
  assert.equal(openSlot(closedSlots, '20'), undefined);
  assert.equal(openSlot([], '20'), undefined);
  const tomorrowSlots = deliverySlots(lateDays[1].iso, slots, 120, afterLastSlot, timeZone);
  assert.equal(openSlot(tomorrowSlots, '20'), '20');
  assert.equal(openSlot(tomorrowSlots, '16'), '08');
  assert.deepEqual(
    deliverySlots('2026-10-05', slots, 120, now, timeZone).map(slot => slot.closed),
    [true, true]
  );
  assert.ok(deliverySlots('2026-10-06', slots, 120, now, timeZone).every(slot => !slot.closed));
  for (const [instant, closed] of [
    ['2026-10-05T06:30:00Z', false],
    ['2026-10-05T06:31:00Z', true]
  ]) {
    assert.equal(
      deliverySlots('2026-10-05', slots, 120, new Date(instant), timeZone)[0].closed,
      closed
    );
  }
  // The store's DST transition still advances calendar days without skipping or duplicating them.
  assert.deepEqual(
    deliveryDays(
      '18:00',
      {days: 3, timeZone: 'America/New_York'},
      new Date('2026-03-08T06:30:00Z')
    ).map(day => day.iso),
    ['2026-03-08', '2026-03-09', '2026-03-10']
  );
  assert.throws(() => deliveryDays('18:00', {...rules, timeZone: 'Invalid/Zone'}, now), RangeError);
  assert.throws(() => deliverySlots('2026-10-05', slots, 120, now, 'Invalid/Zone'), RangeError);
  // Existing package callers can still intentionally use local time.
  assert.equal(deliveryDays('18:00', {days: 1}, new Date(2026, 9, 5, 19))[0].pastCutoff, true);
  const rollover = new Date('2026-10-05T21:00:00Z'); // Oct 6 in Tehran, Oct 5 in LA.
  assert.equal(vfDeliveryDays('central', rollover)[0].iso, '2026-10-06');
  assert.equal(vfDeliveryDays('central', rollover)[2].iso, '2026-10-08');
  assert.equal(vfDeliveryDays('central', rollover)[2].soldOut, true);
  assert.equal(vfDeliveryDays('central', now)[0].pastCutoff, true);
  assert.ok(vfDeliverySlots('2026-10-05', now).every(slot => slot.closed));

  const ivory = vfProduct('ivory');
  const orchid = vfProduct('orchid');
  assert.equal(vfDeliverableOn(ivory, '2026-10-05', rollover), false, 'yesterday at the store');
  assert.equal(vfDeliverableOn(ivory, '2026-10-06', rollover), true, 'today at the store');
  assert.equal(vfDeliverableOn(orchid, '2026-10-06', rollover), false, 'requires preparation');
  assert.equal(vfDeliverableOn(orchid, '2026-10-07', rollover), true);
  assert.equal(vfDeliverableOn(ivory, '2026-10-08', rollover), false, 'sold-out day');
  assert.equal(vfDeliverableOn(vfProduct('bridal'), '2026-10-09', rollover), false, 'out of stock');
  assert.equal(vfDeliverableOn(ivory, '2026-10-05', now), false, 'past the store cutoff');

  VF_ZONES[0].cutoff = '22:00';
  const chosen = {zone: 'central', date: today, slot: '20'};
  assert.equal(vfDeliveryDays('central', afterLastSlot)[0].noOpenSlots, true);
  assert.equal(vfDeliverableOn(ivory, today, afterLastSlot), false, 'no open slots');
  const replacement = vfDeliveryDate(chosen, afterLastSlot);
  assert.equal(replacement, '2026-10-06');
  assert.equal(vfDeliverySlot(chosen, afterLastSlot), undefined);
  assert.equal(vfDeliveryChanged(chosen, afterLastSlot), true);
  assert.equal(vfDeliveryChanged({...chosen, date: replacement, slot: null}, afterLastSlot), true);
  assert.equal(vfDeliveryChanged({...chosen, date: ''}, afterLastSlot), true);
  assert.equal(vfDeliveryChanged({...chosen, date: replacement}, afterLastSlot), false);

  VF_SLOTS.length = 0;
  assert.equal(vfDeliveryDate(chosen, afterLastSlot), undefined);
  assert.equal(vfDeliverySlot(chosen, afterLastSlot), undefined);
  assert.equal(vfDeliveryChanged(chosen, afterLastSlot), true);
}
