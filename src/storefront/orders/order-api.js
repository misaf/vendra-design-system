// API order statuses under the storefront's step names.
export const ORDER_STATUS = {
  placed: 'received',
  arranging: 'preparing',
  ready: 'preparing',
  out_for_delivery: 'onTheWay'
};

// A storefront order from an API Order. `line` turns each OrderLine into a bag line; `delivery`,
// `method` and `preferredLocale` are what Order doesn't carry yet.
export const orderFromApi = (order, {line, delivery, method, preferredLocale}) => ({
  id: order.number,
  status: ORDER_STATUS[order.status] || order.status,
  lines: order.lines.map(line),
  delivery,
  totals: {
    sub: order.itemsAmount,
    fee: order.deliveryAmount,
    discount: order.itemsAmount + order.deliveryAmount - order.totalAmount,
    total: order.totalAmount
  },
  method,
  last4: order.paymentReference,
  preferredLocale
});
