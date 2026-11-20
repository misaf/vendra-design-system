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
