// The API's online-payment records under what the checkout page uses (templates/API.md B3, B30):
// pure functions, kept out of the package (components/utils/commerce.js) until the backend ships
// them, so they don't count against the package's size budget.
// Where a payment gateway expects the browser, as the backend gives it: {url, method, fields}, with
// `method` GET or POST (Shaparak gateways take a POSTed form). null unless `url` is an http(s) address.
export const vfGatewayRedirect = value => {
  if (!value || typeof value.url !== 'string' || !/^https?:\/\//i.test(value.url)) return null;
  const fields =
    value.fields && typeof value.fields === 'object' && !Array.isArray(value.fields)
      ? Object.fromEntries(
          Object.entries(value.fields)
            .filter(([, field]) => field != null)
            .map(([name, field]) => [name, String(field)])
        )
      : {};
  const method = String(value.method || 'GET').toUpperCase() === 'POST' ? 'POST' : 'GET';
  if (method === 'POST') return {url: value.url, method, fields};
  // A GET form replaces its action's query with its fields, so a token in the URL's query (a
  // Zarinpal StartPay link) becomes a field too.
  const url = new URL(value.url);
  const query = Object.fromEntries(url.searchParams);
  url.search = '';
  return {url: url.href, method, fields: {...query, ...fields}};
};

// The created order from a Checkout result (POST /api/sales/checkout): its `number`, its totals as
// the storefront shows them and, for an online payment, where to send the browser (`payment`). The
// order may be the result itself or its `order`; parts the result doesn't carry are null.
export const vfCheckoutResultFromApi = result => {
  const order = (result && typeof result === 'object' && (result.order || result)) || {};
  const amounts = [order.itemsAmount, order.deliveryAmount, order.totalAmount];
  return {
    number: typeof order.number === 'string' && order.number ? order.number : null,
    totals: amounts.every(Number.isFinite)
      ? {
          sub: order.itemsAmount,
          fee: order.deliveryAmount,
          discount: order.itemsAmount + order.deliveryAmount - order.totalAmount,
          total: order.totalAmount
        }
      : null,
    redirect: vfGatewayRedirect(
      result && (result.payment || (result.order && result.order.payment))
    )
  };
};

// Order.paymentStatus under PaymentStatus's states. `awaiting` and `unconfirmed` (money taken but
// not verified with the bank yet) are both `pending`: the customer is told not to pay again.
const VF_PAYMENT_STATUS = {
  awaiting: 'pending',
  unconfirmed: 'pending',
  paid: 'paid',
  cancelled: 'cancelled',
  failed: 'failed'
};

// An order's online payment as the backend reports it: {status, reference (the bank's tracking code),
// amount (paid)}. An unknown or missing status is `pending`, never `paid`.
export const vfPaymentFromApi = order => ({
  status: (order && VF_PAYMENT_STATUS[order.paymentStatus]) || 'pending',
  reference:
    order && typeof order.paymentTrackingCode === 'string' && order.paymentTrackingCode
      ? order.paymentTrackingCode
      : null,
  amount: order && Number.isFinite(order.paidAmount) ? order.paidAmount : null
});
