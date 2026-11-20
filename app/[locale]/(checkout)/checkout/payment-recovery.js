import {vfCustomerId} from '../../../../domain/account-data.js';
import {vfLiveStore} from '../../../../domain/store-config.js';
import {vfRuntime} from '../../../../shared/platform/runtime.js';

// An online payment leaves for the bank's page and comes back to a new page load, so the order it
// pays for waits in this tab's session meanwhile.
const vfPaymentKey = () => 'vf-online-payment:' + vfCustomerId();

// The sample store's simulated bank: a GET form back to this page's path, carrying the return
// link's query as fields (a GET form replaces the action's own query).
export function vfSimulatedBank(href) {
  const url = new URL(href, location.href);
  return {url: url.pathname, method: 'GET', fields: Object.fromEntries(url.searchParams)};
}
function vfPendingPayment(id) {
  try {
    const record = JSON.parse(sessionStorage.getItem(vfPaymentKey()) || 'null');
    return record && record.id === id ? record : null;
  } catch {
    return null;
  }
}
export function vfKeepPayment(record, customerId = record?.customerId || vfCustomerId()) {
  try {
    if (record) sessionStorage.setItem('vf-online-payment:' + customerId, JSON.stringify(record));
    else sessionStorage.removeItem('vf-online-payment:' + customerId);
    return true;
  } catch {
    return false;
  }
}
// Asks whether the bank took the payment for order `number`. A live store asks the API (
// API.md, B30), in whichever tab the bank returns to: a return link's `result` is never trusted. The
// sample store's simulated bank answers with `demoResult`, and only for an order this tab holds;
// otherwise the customer is told not to pay twice.
export function vfVerifyPayment(page, number, demoResult) {
  clearTimeout(page._paymentTimer);
  const record = vfPendingPayment(number);
  if (vfLiveStore()) {
    if (!number) {
      page.setState({payment: {status: 'pending', record, number}});
      return;
    }
    page.setState({payment: {status: 'verifying', record, number}});
    const check = (page._paymentCheck = vfRuntime.api.orderPayment(number).then(
      payment => {
        if (page._paymentCheck !== check) return;
        const status = payment ? payment.status : 'pending';
        if (status === 'paid' && record) page._paid({...record, ref: payment.reference || ''});
        else
          page.setState({
            payment: {
              status,
              record,
              number,
              reference: payment?.reference || undefined,
              amount: payment?.amount ?? undefined
            }
          });
      },
      () => {
        if (page._paymentCheck === check)
          page.setState({payment: {status: 'pending', record, number}});
      }
    ));
    return;
  }
  if (!record) {
    page.setState({payment: {status: 'pending', record: null, number}});
    return;
  }
  page.setState({payment: {status: 'verifying', record, number}});
  page._paymentTimer = setTimeout(() => {
    if (demoResult === 'paid') page._paid(record);
    else page.setState({payment: {status: demoResult, record, number}});
  }, 900);
}

// Retrying an existing live order requests a new bank redirect for that order.
export function vfRetryLivePayment(page, currentPayment, leavePaymentUrl) {
  const number = currentPayment.record?.id || currentPayment.number;
  const payment = {...currentPayment, status: 'verifying'};
  page.setState({payment, retryReview: false});
  leavePaymentUrl();
  const check = (page._paymentCheck = vfRuntime.api.payAgain(number).then(
    redirect => {
      if (page._paymentCheck !== check) return;
      page.setState({
        payment: redirect
          ? {...payment, status: 'redirecting', redirect}
          : {...payment, status: 'pending'}
      });
    },
    () => page._paymentCheck === check && page.setState({payment: {...payment, status: 'pending'}})
  ));
}
