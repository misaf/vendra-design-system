import {vfFindProduct} from '../catalog/catalog.js';
import {vfLineProductId} from '../cart/cart-lines.js';
import {VF_STORE, vfFeatures} from '../store/store-config.js';
import {vfNow} from '../../platform/browser/environment.js';
import {VF_ZONES, vfZone} from './delivery-zones.js';
import {openDay, deliverySlots, deliveryDays} from './delivery-window.js';

// GET /api/delivery/schedule (dates are worked out from the rules below until the API sends them)
export const VF_API_DELIVERY_SCHEDULE = {
  id: 'default',
  dates: [],
  slots: [
    {id: 1, name: {en: 'Morning', fa: 'صبح'}, startsAt: '08:00', endsAt: '12:00'},
    {id: 2, name: {en: 'Midday', fa: 'ظهر'}, startsAt: '12:00', endsAt: '16:00'},
    {id: 3, name: {en: 'Afternoon', fa: 'عصر'}, startsAt: '16:00', endsAt: '20:00'},
    {id: 4, name: {en: 'Evening', fa: 'شب'}, startsAt: '20:00', endsAt: '22:00'}
  ]
};

// Each slot's start and end hour; the start hour is the slot's key in the bag and orders.
export const VF_SLOTS = VF_API_DELIVERY_SCHEDULE.slots.map(slot => ({
  start: slot.startsAt.slice(0, 2),
  end: slot.endsAt.slice(0, 2)
}));
// Store IANA time zone, also used for delivery dates and same-day cut-offs.
export const VF_DELIVERY_TIME_ZONE = VF_STORE.timeZone;
// A slot today stops taking orders this many minutes before it ends.
export const VF_SLOT_LEAD_MINUTES = 120;
// Delivery days offered, counting today. Today drops off after the zone's cut-off.
export const VF_DELIVERY_DAYS = 7;
// Days with no capacity left, as ISO dates (e.g. '2027-02-14').
export const VF_SOLD_OUT_DATES = [];
// Sample only: shows a sold-out day this many days ahead. Set to null for a real store.
export const VF_SAMPLE_SOLD_OUT_IN_DAYS = 2;

// The next VF_DELIVERY_DAYS days for a zone, starting tomorrow when same-day delivery is disabled.
export function vfDeliveryDays(zoneId, now = vfNow(), lines = []) {
  return deliveryDays(
    vfZone(zoneId).cutoff,
    {
      days: VF_DELIVERY_DAYS,
      timeZone: VF_DELIVERY_TIME_ZONE,
      soldOutDates: VF_SOLD_OUT_DATES,
      sameDay: vfFeatures().sameDay && vfBagSameDay(lines)
    },
    now
  ).map(day => ({
    ...day,
    soldOut: day.soldOut || day.offset === VF_SAMPLE_SOLD_OUT_IN_DAYS,
    noOpenSlots:
      VF_SLOTS.length === 0 ||
      (day.offset === 0 &&
        !day.pastCutoff &&
        vfDeliverySlots(day.iso, now).every(slot => slot.closed))
  }));
}

// Every configuration in a mixed bag must be ready for same-day delivery.
export function vfBagSameDay(lines) {
  return lines.every(line => !!vfFindProduct(vfLineProductId(line))?.same);
}

// Whether a product can be delivered on a day in the main delivery zone: it is in stock, the day is open,
// and it is a same-day design or the day is tomorrow or later.
export function vfDeliverableOn(product, iso, now = vfNow()) {
  if (product.inStock === false) return false;
  const day = vfDeliveryDays(VF_ZONES[0].id, now).find(d => d.iso === iso);
  return (
    !!day &&
    !day.soldOut &&
    !day.pastCutoff &&
    !day.noOpenSlots &&
    (!!product.same || day.offset > 0)
  );
}

// The chosen day when it is still open, otherwise the first open day.
export function vfDeliveryDate(delivery, now = vfNow(), lines = []) {
  const days = vfDeliveryDays(delivery.zone, now, lines).filter(day => !day.noOpenSlots);
  return openDay(days, delivery.date);
}

// Every slot on a day, each marked closed when it is today and too close to its end.
export function vfDeliverySlots(iso, now = vfNow()) {
  if (!iso) return [];
  return deliverySlots(iso, VF_SLOTS, VF_SLOT_LEAD_MINUTES, now, VF_DELIVERY_TIME_ZONE);
}

// A time choice belongs to its date and must still be open.
export function vfDeliverySlot(delivery, now = vfNow(), lines = []) {
  if (!delivery.date || delivery.date !== vfDeliveryDate(delivery, now, lines)) return;
  return vfDeliverySlots(delivery.date, now).find(
    slot => !slot.closed && String(slot.start) === String(delivery.slot)
  )?.start;
}
