// Page behavior. Edit here, then run npm --prefix apps/storefront run build.
import {vfCopy} from './copy.js';
import {vfAccountLocale, vfAccountPhone, vfCustomerId} from '../_shared/domain/account-data.js';
import {
  vfCardMessages,
  vfLineAvailable,
  vfLineQuantityValid,
  vfLineItems,
  vfLineToken,
  vfProductImage,
  vfSampleBag
} from '../_shared/domain/catalog.js';
import {commerce} from '../../../packages/design-system/components/utils/commerce.js';
import {
  VF_DELIVERY,
  vfCheckoutRequest,
  vfDeliveryDate,
  vfDeliveryChanged,
  vfTotals,
  vfZone
} from '../_shared/domain/delivery.js';
import {VF_FA_DIGITS, vfSeparator} from '../_shared/domain/formatting.js';
import {vfShell} from '../_shared/services/navigation.js';
import {vfSummaryRows} from '../_shared/domain/promotions.js';
import {vfPageRoute, vfRouteUrl} from '../_shared/services/routing.js';
import {VF_STORE, vfLiveStore, vfPaymentMethods} from '../_shared/domain/store-config.js';
import {vfDeliveryWhen} from '../_shared/translations/time.js';
import {vfOrderMessage} from '../_shared/domain/order-message.js';
import {
  vfBalanceDiscountOn,
  vfWalletBalance,
  vfWalletChange,
  vfWalletOf
} from '../_shared/domain/wallet.js';
import {useLifecycle, usePageLogic} from '../_shared/services/page-state.js';
import {vfNow} from '../_shared/platform/environment.js';
import {useStorefrontPage} from '../_shared/services/page-lifecycle.js';
// An online payment leaves for the bank's page and comes back to a new page load, so the order it
// pays for waits in this tab's session meanwhile.
const vfPaymentKey = () => 'vf-online-payment:' + vfCustomerId();

// The sample store's simulated bank: a GET form back to this page's path, carrying the return
// link's query as fields (a GET form replaces the action's own query).
function vfSimulatedBank(href) {
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
function vfKeepPayment(record, customerId = record?.customerId || vfCustomerId()) {
  try {
    if (record) sessionStorage.setItem('vf-online-payment:' + customerId, JSON.stringify(record));
    else sessionStorage.removeItem('vf-online-payment:' + customerId);
    return true;
  } catch {
    return false;
  }
}
// Asks whether the bank took the payment for order `number`. A live store asks the API (apps/storefront/
// API.md, B30), in whichever tab the bank returns to: a return link's `result` is never trusted. The
// sample store's simulated bank answers with `demoResult`, and only for an order this tab holds;
// otherwise the customer is told not to pay twice.
function vfVerifyPayment(page, number, demoResult) {
  clearTimeout(page._paymentTimer);
  const record = vfPendingPayment(number);
  if (vfLiveStore()) {
    if (!number) {
      page.setState({payment: {status: 'pending', record, number}});
      return;
    }
    page.setState({payment: {status: 'verifying', record, number}});
    const check = (page._paymentCheck = window.VF_API.orderPayment(number).then(
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
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      placed: false,
      last4: '',
      ref: '',
      receiptAmount: null,
      err: false,
      order: null,
      method: null,
      busy: false,
      failed: false,
      unconfirmed: false,
      payment: null,
      paymentSaveError: false,
      retryReview: false,
      ...page.props.store?.paymentDraft
    };
    page._draft = patch => {
      page.setState(patch);
      const {method, last4, ref, receiptAmount} = page.state;
      page.props.store?.setPaymentDraft?.({method, last4, ref, receiptAmount});
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
    didMount() {
      const route = vfPageRoute(page.props);
      if (route.paymentOrder !== undefined)
        vfVerifyPayment(page, route.paymentOrder, route.paymentResult);
    },
    willUnmount() {
      clearTimeout(page._paymentTimer);
      page._paymentCheck = null;
    }
  });
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'checkout');
  const fa = S.fa;
  const L = S.lang;
  const m = S.m;
  const s = page.state;
  const C = vfCopy(S);
  const st = page.props.store;
  const order = st ? st.order : s.order;
  const busy = s.busy || !!st?.checkoutPending;
  // Once an attempt got no answer the order may exist, so the method stays as sent until an attempt
  // is answered: another method would be a different request under a new idempotency key, and so
  // a second order. Retrying keeps this lock; only the warning is dismissed.
  const methodLocked = !!s.unconfirmed;
  const unconfirmed = s.failed && methodLocked;
  const delivery = order
    ? order.delivery
    : st
      ? st.delivery
      : {
          ...VF_DELIVERY,
          name: 'Mina',
          address: '12 Golha St, Azimiyeh'
        };
  const items = order ? order.lines : st ? st.bag : vfSampleBag();
  // Signed-in customers can pay from their account balance when it covers the order; a large enough
  // balance takes the balance discount off the products (VF_STORE.wallet).
  const phone = vfAccountPhone(),
    balance = vfWalletBalance();
  const balanceTotals = vfTotals(items, delivery, balance);
  const canUseBalance = balance != null && balance >= balanceTotals.total;
  // The methods this store offers (VF_STORE.paymentMethods), each usable for this order or not.
  const options = commerce.paymentOptions(vfPaymentMethods(), {
    zone: delivery.zone,
    balance,
    total: balanceTotals.total
  });
  const offers = id => options.some(option => option.id === id);
  const usable = id => options.some(option => option.id === id && option.available);
  // After a failed payment or order: the first usable method that isn't the one that failed.
  const otherThan = id => (options.find(option => option.available && option.id !== id) || {id}).id;
  const method = order ? order.method || 'card' : commerce.defaultPaymentMethod(options, s.method),
    P = C.migration,
    PW = P.wallet;
  const codZones = (options.find(option => option.id === 'cod') || {}).zones || [];
  const totals = order
    ? order.totals
    : method === 'wallet'
      ? balanceTotals
      : vfTotals(items, delivery);
  const receiptChanged =
    method === 'card' && !!(s.last4 || s.ref) && s.receiptAmount !== totals.total;
  const slotLabel = vfDeliveryWhen(
    {...delivery, date: delivery.date || vfDeliveryDate(delivery, vfNow(), items)},
    fa
  );
  const fillWallet = (text, amount) =>
    text
      .replace('{balance}', m(amount))
      .replace('{percent}', S.n(VF_STORE.wallet.discountPercent))
      .replace('{left}', m(Math.max(0, balanceTotals.total - (balance || 0))));
  const walletNote =
    balance == null
      ? PW.signIn
      : !canUseBalance
        ? fillWallet(PW.short, balance)
        : fillWallet(vfBalanceDiscountOn(balance) ? PW.discount : PW.balance, balance);
  const done = !!order || s.placed || page.props.step === 'done';
  const orderReady = event => {
    const changed = vfDeliveryChanged(delivery, new Date(), items);
    const stockChanged = items.some(
      line => !vfLineAvailable(line) || !vfLineQuantityValid(line, items)
    );
    if (!changed && !stockChanged) return true;
    event?.preventDefault();
    page.props.go?.({view: 'bag', step: stockChanged ? 'bag' : 'delivery'});
    return false;
  };
  // Below the discount line, say what topping up would save on this order: enough to reach the line
  // and to cover the discounted total.
  const rules = VF_STORE.wallet,
    discounted = vfTotals(items, delivery, rules.discountFrom);
  const discountGap =
    balance != null && !done && !vfBalanceDiscountOn(balance) && discounted.balanceDiscount
      ? Math.max(rules.discountFrom, discounted.total) - balance
      : 0;
  const discountHint = discountGap
    ? fillWallet(PW.hint, 0)
        .replace('{gap}', m(discountGap))
        .replace('{saving}', m(discounted.balanceDiscount))
    : '';
  // The checkout link without the bank's return parameters, so a reload doesn't verify again.
  const leavePaymentUrl = () => {
    if (vfPageRoute(page.props).paymentOrder)
      history.replaceState(history.state, '', vfRouteUrl({lang: L, view: 'checkout'}));
  };
  const completeOrder = record => {
    // Paying from the balance takes the total out of it now; a failed deduction stops the order.
    if (record.method === 'wallet') {
      const account = vfWalletChange(phone, -record.totals.total, {
        kind: 'order',
        order: record.id
      });
      if (!account) {
        page.setState({failed: true});
        return;
      }
      record = {...record, balanceAfter: vfWalletOf(account).balance};
    }
    if (st) {
      st.complete(record);
    } else
      page.setState({
        placed: true,
        order: record
      });
    window.VF_TRACK.event('purchase', {
      transaction_id: record.id,
      value: record.totals.total,
      payment_type: record.method,
      items: vfLineItems(record.lines)
    });
  };
  // The bank confirmed an online payment: the order is placed, with the bank's tracking number. A
  // live store shows the one the API reported; the simulated bank makes one up.
  page._paid = record => {
    vfKeepPayment(null, record.customerId);
    leavePaymentUrl();
    page.setState({payment: null});
    completeOrder({
      ...record,
      ref: record.ref || (vfLiveStore() ? '' : String(Date.now()).slice(-12))
    });
  };
  return {
    ...S,
    t: {
      ...S.t,
      ...C,
      payA: method === 'card' ? C.payA : P.methods[method] || C.pay,
      payB: method === 'card' ? C.payB : '',
      payP: method === 'card' ? C.payP : method ? P.descriptions[method] : '',
      place: method === 'card' ? C.place : P.actions[method],
      orderNo: order ? C.labels.order + '\u2068' + order.id + '\u2069' : C.orderNo
    },
    paying: !done && !s.payment,
    // After an order, a guest can sign in with the mobile they gave to keep it with their account.
    offerAccount: done && !vfAccountPhone(),
    accountBody: C.accountBody.replace(
      '{phone}',
      '\u2068' +
        (fa ? VF_FA_DIGITS(delivery.senderPhone || '') : delivery.senderPhone || '') +
        '\u2069'
    ),
    isCard: method === 'card',
    isWhatsapp: method === 'whatsapp',
    isWallet: method === 'wallet',
    // None of the store's methods reaches this order (pay on delivery only, outside its zones).
    noMethod: !done && !method,
    walletAfter: fillWallet(PW.after, (balance || 0) - totals.total),
    // A signed-in customer whose balance is short can top up first; the bag waits here.
    showTopUp:
      offers('wallet') &&
      !vfLiveStore() &&
      balance != null &&
      (!canUseBalance || !!discountHint) &&
      !done,
    discountHint: offers('wallet') ? discountHint : '',
    topUpLabel: PW.topUp,
    topUpHref: vfRouteUrl({lang: L, view: 'account', tab: 'balance', next: 'checkout'}),
    busy,
    placeDisabled: busy || s.failed || done || !method,
    failed: s.failed,
    // No answer came back (a timeout or a lost connection): the order may exist, so say so, and keep
    // the request unchanged so a retry reuses its idempotency key.
    unconfirmed,
    paymentNotice: P.demo,
    method,
    // With one method there is nothing to choose: its own heading and steps show.
    showMethods: options.length > 1,
    methodOptions: options.map(option => ({
      value: option.id,
      label: P.methods[option.id],
      description:
        option.reason === 'zone'
          ? P.codOff.replace('{zones}', codZones.map(id => vfZone(id)[L]).join(fa ? '، ' : ', '))
          : option.id === 'wallet'
            ? walletNote
            : undefined,
      disabled: busy || methodLocked || !option.available
    })),
    setMethod: value =>
      !busy &&
      !methodLocked &&
      page._draft({
        method: value,
        paymentSaveError: false,
        retryReview: false,
        err: false,
        failed: false,
        unconfirmed: false
      }),
    migration: P,
    waOrder: S.waWith(vfOrderMessage(items, delivery, totals.total, L)),
    openWhatsapp: event => {
      orderReady(event);
    },
    retry: () =>
      page.setState({
        failed: false
      }),
    otherMethod: () =>
      page._draft({
        failed: false,
        unconfirmed: false,
        method: otherThan(method)
      }),
    paymentStatus: P.statuses[method],
    done,
    fmt: fa ? v => VF_FA_DIGITS(v) : v => String(v),
    steps: [C.s1, C.s2, C.s3, C.s4].map(label => ({
      label
    })),
    // Earlier steps stay reachable: the bag, then delivery details.
    stepClick: i =>
      !done &&
      page.props.go &&
      i < 2 &&
      page.props.go(i === 0 ? 'bag' : {view: 'bag', step: 'delivery'}),
    backHref: vfRouteUrl({lang: L, view: 'bag', step: 'delivery'}),
    goBack: e => {
      if (!page.props.go) return;
      e && e.preventDefault && e.preventDefault();
      page.props.go({view: 'bag', step: 'delivery'});
    },
    totalLabel: m(totals.total),
    deliveryRows: [
      {
        label: C.to,
        value: delivery.name + vfSeparator(L) + '\u2068' + (delivery.phone || '') + '\u2069'
      },
      {label: C.address, value: vfZone(delivery.zone)[L] + vfSeparator(L) + delivery.address},
      {label: C.when, value: slotLabel}
    ],
    caption: C.caption,
    payLabels: C.payLabels,
    copySheba: () => navigator.clipboard.writeText((S.payment && S.payment.sheba) || ''),
    paymentSaveError: s.paymentSaveError ? C.paymentSaveError : '',
    retryReview: s.retryReview,
    reviewRetry: () => {
      const record = page.state.payment?.record;
      const stockChanged =
        !record ||
        record.lines.some(
          line => !vfLineAvailable(line) || !vfLineQuantityValid(line, record.lines)
        );
      vfKeepPayment(null, record?.customerId);
      page.setState({payment: null, retryReview: false});
      page.props.go?.({view: 'bag', step: stockChanged ? 'bag' : 'delivery'});
    },
    receiptChanged,
    receiptChangeText: C.receiptChanged.replace('{amount}', m(totals.total)),
    confirmReceipt: () => page._draft({receiptAmount: totals.total}),
    last4: s.last4,
    last4Err: s.err ? C.last4Err : undefined,
    ref: s.ref,
    setRef: value =>
      page._draft({
        method,
        ref: value,
        receiptAmount: !s.last4 && !s.ref ? totals.total : s.receiptAmount
      }),
    setLast4: value =>
      page._draft({
        method,
        last4: value
          .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
          .replace(/\D/g, '')
          .slice(0, 4),
        receiptAmount: !s.last4 && !s.ref ? totals.total : s.receiptAmount,
        err: false
      }),
    place: () => {
      if (busy || done || !orderReady()) return;
      if (!usable(method)) return;
      if (receiptChanged) {
        S.focus('vf-receipt-changed');
        return;
      }
      if (method === 'card' && s.last4.length !== 4) {
        page.setState({
          err: true
        });
        setTimeout(() => {
          const lastFourField = document.getElementById('vf-last4');
          lastFourField && lastFourField.focus();
        }, 0);
        return;
      }
      window.VF_TRACK.event('add_payment_info', {
        payment_type: method
      });
      const record = {
        customerId: st?.customerId || vfCustomerId(),
        checkoutSnapshot: st?.checkoutSnapshot,
        method,
        paymentStatus: P.statuses[method],
        preferredLocale: vfAccountLocale() || L,
        id: 'VN-' + Date.now(),
        status: 'received',
        createdAt: new Date().toISOString(),
        lines: items.map(l => ({
          ...l
        })),
        delivery: {
          ...delivery,
          date: delivery.date || vfDeliveryDate(delivery, new Date(), items)
        },
        totals: {
          ...totals
        },
        last4: s.last4,
        ref: s.ref
      };
      // Persist the recovery record before any submission or redirect can leave this page.
      if (method === 'online' && !vfKeepPayment(record)) {
        page.setState({paymentSaveError: true});
        return;
      }
      page.setState({paymentSaveError: false});
      // With an API base, the order is sent as a Checkout request first, and the order the server
      // created replaces the browser's: its number and totals (API.md B3). The demo goes on at once.
      const send = then => {
        if (!vfLiveStore()) return then(record, null);
        if (st?.beginCheckout && !st.beginCheckout()) return;
        const request = vfCheckoutRequest(items, delivery, {method, last4: s.last4, ref: s.ref});
        page.setState({busy: true});
        window.VF_API.checkout(request)
          .then(
            result => {
              page.setState({busy: false, unconfirmed: false});
              const placed = {
                ...record,
                id: result?.number || record.id,
                // The server's totals replace the browser's whole: its discount already includes any
                // balance discount, which would otherwise show twice.
                totals: result?.totals || record.totals
              };
              then(placed, result?.redirect || null);
            },
            error =>
              page.setState({
                busy: false,
                failed: true,
                // 409: the first request with this key is still running on the server.
                unconfirmed:
                  error?.kind === 'timeout' ||
                  error?.kind === 'network' ||
                  (error?.kind === 'http' && error.status === 409)
              })
          )
          .finally(() => st?.endCheckout?.());
      };
      // Online, the customer pays on the bank's page and comes back to this page. A live store goes
      // where the API's checkout result says; without that, the order exists but can't be paid
      // here, so the customer is told not to pay twice and to call (never the simulated bank).
      if (method === 'online')
        send((placed, redirect) => {
          if (placed !== record) vfKeepPayment(placed);
          if (vfLiveStore() && !redirect)
            page.setState({payment: {status: 'pending', record: placed, number: placed.id}});
          else page.setState({payment: {status: 'redirecting', record: placed, redirect}});
        });
      else send(placed => completeOrder(placed));
    },
    bankTrip: s.payment && {
      status: s.payment.status,
      amount: s.payment.record
        ? m(s.payment.record.totals.total)
        : s.payment.amount != null
          ? m(s.payment.amount)
          : undefined,
      orderNumber: s.payment.record ? s.payment.record.id : s.payment.number || undefined,
      reference: s.payment.reference,
      gateway: VF_STORE.gateway ? VF_STORE.gateway[L] : undefined,
      // A live store sends the browser where the API says (apps/storefront/API.md, B3 and B30). The sample
      // store's simulated bank is this page: the return link carries its answer.
      redirect:
        s.payment.status !== 'redirecting'
          ? undefined
          : vfLiveStore()
            ? s.payment.redirect || undefined
            : vfSimulatedBank(
                vfRouteUrl({
                  lang: L,
                  view: 'checkout',
                  paymentOrder: s.payment.record.id,
                  paymentResult:
                    vfPageRoute(page.props).demo === 'error'
                      ? 'failed'
                      : s.payment.record.attempt > 1
                        ? 'paid'
                        : VF_STORE.paymentDemo.online
                })
              ),
      supportHref: 'tel:' + VF_STORE.phone
    },
    payRetry: () => {
      // A live store asks the API for a new attempt on the same order, never a second order.
      if (vfLiveStore()) {
        const number = s.payment.record?.id || s.payment.number;
        const payment = {...s.payment, status: 'verifying'};
        page.setState({payment, retryReview: false});
        leavePaymentUrl();
        const check = (page._paymentCheck = window.VF_API.payAgain(number).then(
          redirect => {
            if (page._paymentCheck !== check) return;
            page.setState({
              payment: redirect
                ? {...payment, status: 'redirecting', redirect}
                : {...payment, status: 'pending'}
            });
          },
          () =>
            page._paymentCheck === check &&
            page.setState({payment: {...payment, status: 'pending'}})
        ));
        return;
      }
      const previous = page.state.payment?.record;
      if (
        !previous ||
        (previous.customerId && previous.customerId !== vfCustomerId()) ||
        vfDeliveryChanged(previous.delivery, new Date(), previous.lines) ||
        previous.lines.some(
          line => !vfLineAvailable(line) || !vfLineQuantityValid(line, previous.lines)
        )
      ) {
        page.setState({retryReview: true});
        S.focus('vf-payment-review');
        return;
      }
      page.setState({retryReview: false});
      const record = {...s.payment.record, attempt: (s.payment.record.attempt || 1) + 1};
      if (!vfKeepPayment(record)) {
        page.setState({paymentSaveError: true});
        return;
      }
      page.setState({paymentSaveError: false});
      leavePaymentUrl();
      page.setState({payment: {status: 'redirecting', record}});
    },
    // A live order already exists on the server: another method would place a second one.
    payOther: vfLiveStore()
      ? undefined
      : () => {
          vfKeepPayment(null);
          leavePaymentUrl();
          page._draft({
            payment: null,
            method: otherThan('online'),
            retryReview: false,
            paymentSaveError: false
          });
        },
    // Asks again: the API in a live store; the simulated bank answers paid this time.
    payCheckAgain: () => {
      const number = s.payment.record?.id || s.payment.number;
      if (vfLiveStore()) vfVerifyPayment(page, number);
      else if (s.payment.record) vfVerifyPayment(page, number, 'paid');
      else leavePaymentUrl();
    },
    lines: items.map(l => ({
      image: vfProductImage(l, L),
      name: vfLineToken(l),
      meta: l[L][1] + ' · × ' + (fa ? VF_FA_DIGITS(l.qty) : l.qty),
      total: m(l.unit * l.qty)
    })),
    sums: vfSummaryRows(
      totals,
      delivery.promo,
      {...C, discount: S.t.discount, balanceDiscount: S.t.balanceDiscount},
      m,
      S.n
    ),
    doneRows: [
      {
        icon: 'calendar',
        label: C.when,
        value: slotLabel
      },
      {
        icon: 'map-pin',
        label: C.to,
        value:
          delivery.name +
          vfSeparator(L) +
          delivery.address +
          vfSeparator(L) +
          '\u2068' +
          delivery.phone +
          '\u2069'
      },
      {
        icon: 'user',
        label: C.labels.from,
        value: delivery.sender
          ? delivery.sender + vfSeparator(L) + '\u2068' + delivery.senderPhone + '\u2069'
          : ''
      },
      {
        icon: 'banknote',
        label: C.pay,
        value: P.methods[method] + vfSeparator(L) + m(totals.total)
      },
      {
        icon: 'banknote',
        label: PW.left,
        value:
          method === 'wallet' && order && order.balanceAfter != null ? m(order.balanceAfter) : ''
      },
      {
        icon: 'receipt',
        label: C.card,
        value:
          method === 'card'
            ? '•••• ' +
              (fa ? VF_FA_DIGITS(order ? order.last4 : s.last4) : order ? order.last4 : s.last4)
            : ''
      },
      {
        icon: 'message-square',
        label: C.labels.cardMessage,
        value: vfCardMessages(items, delivery, L)
      },
      {
        icon: 'receipt',
        label: C.ref,
        value: order ? order.ref : s.ref
      }
    ].filter(r => r.value)
  };
}
