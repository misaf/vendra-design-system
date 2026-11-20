import {vfCustomerId} from '../../../storefront/customer/account-data.js';
import {
  vfCheckoutResultFromApi,
  vfGatewayRedirect,
  vfPaymentFromApi
} from '../../../storefront/checkout/payment-api.js';

/**
 * @param {{live: boolean}} client
 * @param {ReturnType<typeof import('./request.js').createRequest>} request
 * @param {ReturnType<typeof import('./idempotency.js').createIdempotentSubmission>['submit']} submit
 */
export function createCheckoutMethods(client, request, submit) {
  // POST /api/sales/checkout {cartToken, currencyCode, gateway, paymentReference, …} (vfCheckoutRequest)
  // -> the created order: {number, totals, redirect} (vfCheckoutResultFromApi; API.md B3, B30).
  // Retries reuse the same Idempotency-Key for the same customer and order content.
  const checkout = async body => {
    if (!client.live) return null;
    return vfCheckoutResultFromApi(
      await submit('checkout:' + vfCustomerId(), '/api/sales/checkout', body)
    );
  };
  // GET /api/sales/orders?number=… -> the order's online payment {status, reference, amount}, asked
  // after the bank sends the customer back, in any tab (API.md B30). null in demo mode or when the
  // API doesn't know the order; a status it doesn't report is pending, never paid.
  const orderPayment = async number => {
    if (!client.live || !number) return null;
    const r = await request('GET', '/api/sales/orders?number=' + encodeURIComponent(number));
    const orders = (r && (r['hydra:member'] || r.member || r.data)) || (r && r.number ? [r] : []);
    const order = orders.find(item => item && item.number === number);
    return order ? vfPaymentFromApi(order) : null;
  };
  // POST /api/sales/payments {orderNumber} -> a new attempt for the same order after a failed or
  // cancelled payment: where to send the browser (API.md B30, "Pay again"). Never a second order.
  const payAgain = async number => {
    if (!client.live || !number) return null;
    const r = await request('POST', '/api/sales/payments', {orderNumber: number});
    return vfGatewayRedirect(r && (r.payment || r));
  };
  return {checkout, orderPayment, payAgain};
}
