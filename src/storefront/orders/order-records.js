import {VF_ADDONS, VF_PRODUCTS, VF_PRODUCT_PLACEHOLDER, VF_SIZES} from '../catalog/catalog.js';
import {vfLineDetail} from '../cart/cart-lines.js';
import {vfCustomerId} from '../customer/account-data.js';
import {VF_DELIVERY} from '../delivery/delivery.js';
import {commerce} from '../commerce/commerce.js';

// GET /api/sales/orders — sample orders shaped like the Vendra API (Order, OrderLine). Each line's
// metadata carries what the order needs beyond the API's fields, as strings: the product code
// (`token`), `size`, comma-separated `addons` and the handwritten `cardMessage`.
/** @type {[id: number, number: string, status: string, placedAt: string][]} */
export const VF_SAMPLE_ORDER_ROWS = [
  [9001, 'VN-10522', 'out_for_delivery', '2026-10-04T09:30:00+03:30'],
  [9002, 'VN-10431', 'delivered', '2026-09-21T11:05:00+03:30'],
  [9003, 'VN-10302', 'delivered', '2026-09-02T16:40:00+03:30'],
  [9004, 'VN-10187', 'cancelled', '2026-08-28T10:15:00+03:30']
];
export const VF_API_ORDERS = VF_SAMPLE_ORDER_ROWS.map(([id, number, status, placedAt]) => ({
  id,
  number,
  status,
  currencyCode: 'IRT',
  itemsAmount: 8_450_000,
  deliveryAmount: 0,
  totalAmount: 8_450_000,
  paymentReference: '1234',
  cardMessage: null,
  placedAt,
  lines: [
    {
      id: id * 10 + 1,
      sellableType: 'product',
      sellableId: 101,
      name: 'VF-7K2M4Q',
      quantity: 1,
      unitAmount: 5_050_000,
      lineAmount: 5_050_000,
      metadata: {
        token: 'VF-7K2M4Q',
        size: 'classic',
        addons: 'card',
        cardMessage: 'Happy birthday, Shirin.'
      }
    },
    {
      id: id * 10 + 2,
      sellableType: 'product',
      sellableId: 103,
      name: 'VF-8RD5WN',
      quantity: 1,
      unitAmount: 3_400_000,
      lineAmount: 3_400_000,
      metadata: {token: 'VF-8RD5WN'}
    }
  ]
}));

// Order fields the API doesn't provide yet (docs/API.md, "Order detail"), keyed by Order.number:
// the delivery details, payment method and the customer's preferred language. The sample orders share them.
export const VF_SAMPLE_ORDER_EXTRAS = {
  method: 'card',
  preferredLocale: 'fa',
  // A gift: the recipient's mobile differs from the sender's, so tracking shows both views.
  delivery: {
    name: 'Mina Karimi',
    phone: '09121230000',
    sender: 'Shirin Ahmadi',
    senderPhone: '09125649438',
    address: '12 Golha St, Azimiyeh',
    slot: '12'
  }
};

// The storefront's bag line from an API OrderLine.
export function vfLineFromApi(line) {
  return commerce.lineFromApi(line, {
    products: VF_PRODUCTS,
    sizes: VF_SIZES,
    addons: VF_ADDONS,
    placeholder: VF_PRODUCT_PLACEHOLDER,
    describe: vfLineDetail
  });
}

// The storefront's order object from an API Order plus its extras.
export function vfOrderFromApi(order, extras = VF_SAMPLE_ORDER_EXTRAS) {
  return commerce.orderFromApi(order, {
    line: vfLineFromApi,
    delivery: {...VF_DELIVERY, ...extras.delivery},
    method: extras.method,
    preferredLocale: extras.preferredLocale === 'fa' ? 'fa' : 'en'
  });
}

export function vfSampleOrders() {
  return VF_API_ORDERS.map(order => vfOrderFromApi(order));
}

// Session orders join the sample history without losing earlier checkouts or duplicating a number.
export function vfKnownOrders(store) {
  const own = !store?.customerId || store.customerId === vfCustomerId() ? store : null;
  return [...(own?.orders || []), own?.lastOrder, own?.order, ...vfSampleOrders()].filter(
    (order, index, orders) => order && orders.findIndex(item => item?.id === order.id) === index
  );
}
