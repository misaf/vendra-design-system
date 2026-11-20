import {isMobile} from '../../design-system/utils/input.js';
import {vfLineHasCard} from '../cart/cart-lines.js';
import {VF_ZONES, vfZoneAt} from './delivery-zones.js';
import {vfDeliverySlot} from './delivery-schedule.js';
import {vfValidLocation} from './location.js';
import {vfNow} from '../../platform/browser/environment.js';

// Until a pin (or the map-failure address) establishes a destination, fees are provisional.
export function vfDeliveryQuoted(delivery) {
  if (delivery.noMap)
    return (
      String(delivery.address || '').trim().length >= 6 &&
      VF_ZONES.some(zone => zone.id === delivery.zone)
    );
  return vfValidLocation(delivery.location) && vfZoneAt(delivery.location) === delivery.zone;
}

// Checkout requires a chosen, still-available delivery window.
export function vfDeliveryChanged(delivery, now = vfNow(), lines = []) {
  return vfDeliverySlot(delivery, now, lines) == null;
}

// Problems in the delivery details, in form order. Bag lines with a handwritten card need its message.
export function vfErrors(delivery, lines = []) {
  const mobile = value => !isMobile(value);
  const pinned = !delivery.noMap && vfValidLocation(delivery.location);
  return {
    name: !String(delivery.name || '').trim(),
    phone: mobile(delivery.phone),
    location: !delivery.noMap && !vfValidLocation(delivery.location),
    outside: pinned && !vfZoneAt(delivery.location),
    address: delivery.noMap
      ? String(delivery.address || '').trim().length < 6
      : !String(delivery.address || '').trim(),
    cards: lines.some(line => vfLineHasCard(line) && !String(line.card || '').trim()),
    sender: !String(delivery.sender || '').trim(),
    senderPhone: mobile(delivery.senderPhone)
  };
}
