import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';
import {
  vfLineAvailable,
  vfLineItems,
  vfLineQuantityValid,
  vfRepriceLines
} from '../../cart/cart-lines.js';
import {vfAccountLocale, vfCustomerId} from '../../customer/account-data.js';
import {vfDeliveryDate} from '../../delivery/delivery-schedule.js';
import {vfDeliveryChanged} from '../../delivery/delivery-validation.js';
import {vfLiveStore} from '../../store/store-config.js';
import {vfCheckoutRequest} from '../checkout-request.js';
import {vfKeepPayment} from './payment-recovery.js';
import {checkoutSubmissionFailure} from './submission-state.js';

export function checkoutOrderReady(page, items, delivery, event = undefined) {
  const changed = vfDeliveryChanged(delivery, new Date(), items);
  const stockChanged = items.some(
    line => !vfLineAvailable(line) || !vfLineQuantityValid(line, items)
  );
  // A price changed since the bag was checked: the bag shows the new price beside its line.
  // Prices already updated but not yet seen in the bag (a reload or a direct visit) count too.
  const priceChanged =
    vfRepriceLines(items).changes.length > 0 ||
    Object.keys(page.props.store?.priceChanges || {}).length > 0;
  if (!changed && !stockChanged && !priceChanged) return true;
  event?.preventDefault();
  if (priceChanged) page.props.store?.reprice?.();
  page.props.go?.({view: 'bag', step: stockChanged || priceChanged ? 'bag' : 'delivery'});
  return false;
}

// An order's analytics parameters (amounts in Toman; vfRuntime.track reports them in an ISO currency).
export const orderParams = record => ({
  transaction_id: record.id,
  value: record.totals.total,
  payment_type: record.method,
  items: vfLineItems(record.lines)
});

export async function submitOrder(
  page,
  {items, delivery, totals, method, usable, receiptChanged, paymentStatus, lang, completeOrder}
) {
  const state = page.state;
  const {store, step} = page.props;
  if (
    state.busy ||
    state.failed ||
    state.placed ||
    state.payment ||
    store?.checkoutPending ||
    store?.order ||
    step === 'done'
  )
    return;

  const live = vfLiveStore();
  const customerId = store?.customerId || vfCustomerId();
  const previousAttempt = state.unconfirmedAttempt;
  if (previousAttempt) {
    // The original request may have succeeded. Only retry it in the same live customer scope.
    if (!live || previousAttempt.record.customerId !== customerId) return;
  } else {
    if (!checkoutOrderReady(page, items, delivery) || !usable || !method) return;
    if (receiptChanged) {
      VF_NAV.focusById('vf-receipt-changed');
      return;
    }
    if (method === 'card' && state.last4.length !== 4) {
      page.setState({err: true});
      setTimeout(() => document.getElementById('vf-last4')?.focus(), 0);
      return;
    }
  }

  // The session lock also protects against duplicate clicks across checkout remounts.
  if (live && store?.beginCheckout && !store.beginCheckout()) return;
  page.setState({busy: true});
  try {
    const attempt =
      previousAttempt ||
      createAttempt({
        items,
        delivery,
        totals,
        method,
        paymentStatus,
        lang,
        customerId,
        checkoutSnapshot: store?.checkoutSnapshot,
        last4: state.last4,
        ref: state.ref,
        live
      });
    const {record, request} = attempt;

    vfRuntime.track.event('add_payment_info', {payment_type: record.method});
    // Save online recovery before the request or redirect can leave the page.
    if (record.method === 'online' && !vfKeepPayment(record)) {
      page.setState({paymentSaveError: true});
      return;
    }
    page.setState({paymentSaveError: false});

    let result = null;
    if (live) {
      try {
        result = await vfRuntime.api.checkout(request);
      } catch (error) {
        page.setState(checkoutSubmissionFailure(error, attempt, previousAttempt));
        VF_NAV.focusById('vf-checkout-submit-error');
        return;
      }
    }

    page.setState({unconfirmedAttempt: null});
    const placed = live
      ? {
          ...record,
          id: result?.number || record.id,
          // Use the entire total from the API so discounts are only counted once.
          totals: result?.totals || record.totals
        }
      : record;
    if (record.method !== 'online') {
      completeOrder(placed);
      return;
    }

    // Checkout placed the order. The bank return will confirm whether it was paid.
    vfRuntime.track.event('order_placed', {...orderParams(placed), payment_status: 'pending'});
    if (live) vfKeepPayment(placed);
    const redirect = result?.redirect || null;
    page.setState({
      payment:
        live && !redirect
          ? {status: 'pending', record: placed, number: placed.id}
          : {status: 'redirecting', record: placed, redirect}
    });
  } finally {
    if (live) store?.endCheckout?.();
    page.setState({busy: false});
  }
}

function createAttempt({
  items,
  delivery,
  totals,
  method,
  paymentStatus,
  lang,
  customerId,
  checkoutSnapshot,
  last4,
  ref,
  live
}) {
  const now = new Date();
  const record = {
    customerId,
    checkoutSnapshot,
    method,
    paymentStatus,
    preferredLocale: vfAccountLocale() || lang,
    id: 'VN-' + now.getTime(),
    status: 'received',
    createdAt: now.toISOString(),
    lines: items.map(line => ({...line})),
    delivery: {...delivery, date: delivery.date || vfDeliveryDate(delivery, now, items)},
    totals: {...totals},
    last4,
    ref
  };
  return {
    record,
    request: live ? vfCheckoutRequest(record.lines, record.delivery, {method, last4, ref}) : null
  };
}
