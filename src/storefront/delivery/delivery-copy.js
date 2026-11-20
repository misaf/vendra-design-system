import {VF_FREE_DELIVERY_THRESHOLD} from '../pricing/order-totals.js';
import {vfFeatures} from '../store/store-config.js';
import {cutoffText} from './delivery-window.js';
import {vfZone} from './delivery-zones.js';

// Fills placeholders in text from the API: {fee:<zone>}, {cutoff:<zone>} and {freeDeliveryFrom}.
// `values` gives each one's text: {fee(zoneId), cutoff(zoneId), freeDeliveryFrom()}.
export const fillText = (text, values) =>
  String(text || '')
    .replace(/\{fee:([\w-]+)\}/g, (_, id) => values.fee(id))
    .replace(/\{cutoff:([\w-]+)\}/g, (_, id) => values.cutoff(id))
    .replace(/\{freeDeliveryFrom\}/g, () => values.freeDeliveryFrom());

export function vfDeliveryCutoff(zone, persian) {
  return cutoffText(zone.cutoff, persian);
}

// "Same day before 18:00"; '' when the store doesn't deliver the same day.
export function vfDeliveryHint(zone, persian) {
  if (!vfFeatures().sameDay) return '';
  return (persian ? 'ارسال همان روز تا ' : 'Same day before ') + vfDeliveryCutoff(zone, persian);
}

// Fills delivery placeholders in text from the API (FAQ answers, pages), so fees and cut-offs stay
// current: {fee:<zone>}, {cutoff:<zone>} (zone keys as in VF_ZONES) and {freeDeliveryFrom}.
export function vfStoreText(text, money, persian) {
  return fillText(text, {
    fee: id => money(vfZone(id).fee),
    cutoff: id => vfDeliveryCutoff(vfZone(id), persian),
    freeDeliveryFrom: () => money(VF_FREE_DELIVERY_THRESHOLD)
  });
}
