import {vfLineToken} from '../cart/cart-lines.js';
import {VF_API_DELIVERY_SCHEDULE, vfDeliveryDate} from '../delivery/delivery-schedule.js';
import {VF_STORE} from '../store/store-config.js';
import {validLocation} from '../../design-system/utils/coordinates.js';

// The Checkout request (POST /api/sales/checkout) for bag lines and delivery details. `slots` are the
// schedule's DeliverySlots; `lineToken(line)` names a line in a combined card message.
export const checkoutRequest = (
  lines,
  delivery,
  {
    slots,
    currencyCode = 'IRT',
    deliveryDate = delivery.date,
    lineToken = line => line.token,
    method = 'card',
    last4 = '',
    ref = '',
    cartToken = ''
  }
) => {
  const cards = lines.filter(line => String(line.card || '').trim());
  const slot = slots.find(
    item => item.startsAt.slice(0, 2) === String(delivery.slot).padStart(2, '0')
  );
  const location = validLocation(delivery.location) ? delivery.location : null;
  return {
    cartToken,
    currencyCode,
    gateway: method,
    paymentReference: method === 'card' ? [last4, ref].filter(Boolean).join(' ') || null : null,
    cardMessage:
      cards.length === 1
        ? cards[0].card
        : cards.map(line => lineToken(line) + ': ' + line.card).join('\n') || null,
    recipientName: delivery.name || null,
    addressId: null,
    latitude: location ? location.lat : null,
    longitude: location ? location.lng : null,
    deliveryDate: deliveryDate || null,
    deliverySlotId: slot ? slot.id : null
  };
};

// The Checkout request (POST /api/sales/checkout) for a bag and its delivery details. Fields the API
// doesn't take yet (recipient phone, sender, typed address, promo code, sizes and add-ons) are listed
// in docs/API.md. `cartToken` is empty until the API can create carts.
export function vfCheckoutRequest(
  lines,
  delivery,
  {method = 'card', last4 = '', ref = '', cartToken = ''} = {}
) {
  return checkoutRequest(lines, delivery, {
    slots: VF_API_DELIVERY_SCHEDULE.slots,
    currencyCode: VF_STORE.currency || 'IRT',
    deliveryDate: delivery.date || vfDeliveryDate(delivery, new Date(), lines),
    lineToken: vfLineToken,
    method,
    last4,
    ref,
    cartToken
  });
}
