// Page behavior. Edit here, then run npm run build.
import React from 'react';
import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {vfCopy} from './copy.js';
import {
  vfKeepPayment,
  vfRetryLivePayment,
  vfSimulatedBank,
  vfVerifyPayment
} from './payment-recovery.js';
import {vfAccountPhone, vfCustomerId} from '../../customer/account-data.js';
import {vfProductImage} from '../../catalog/catalog.js';
import {
  vfCardMessages,
  vfLineAvailable,
  vfLineQuantityValid,
  vfSampleBag
} from '../../cart/cart-lines.js';
import {paymentOptions, defaultPaymentMethod} from '../payment-options.js';
import {VF_DELIVERY} from '../../delivery/delivery-draft.js';
import {vfDeliveryDate} from '../../delivery/delivery-schedule.js';
import {vfDeliveryChanged} from '../../delivery/delivery-validation.js';
import {vfTotals} from '../../pricing/order-totals.js';
import {vfZone} from '../../delivery/delivery-zones.js';
import {VF_FA_DIGITS, vfSeparator} from '../../pricing/formatting.js';
import {vfShell} from '../../shell/shell-props.js';
import {vfSummaryRows} from '../../pricing/promotions.js';
import {vfPageRoute, vfRouteUrl} from '../../shell/routing.js';
import {VF_STORE, vfLiveStore, vfPaymentMethods} from '../../store/store-config.js';
import {vfDeliveryWhen} from '../../delivery/time.js';
import {vfOrderMessage} from '../order-message.js';
import {orderLineDisplay} from '../../orders/order-line-view.js';
import {
  vfBalanceDiscountOn,
  vfWalletBalance,
  vfWalletChange,
  vfWalletOf
} from '../../customer/wallet.js';
import {usePageLogic} from '../../shell/page-state.js';
import {vfNow} from '../../../platform/browser/environment.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';
import {checkoutOrderReady, orderParams, submitOrder} from './submit-order.js';
import {dismissCheckoutFailure} from './submission-state.js';

export function useCheckout(props) {
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
      unconfirmedAttempt: null,
      apiFailure: null,
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
  React.useEffect(
    function startPaymentReturn() {
      const {paymentOrder, paymentResult} = vfPageRoute(page.props);
      const timer =
        paymentOrder === undefined
          ? undefined
          : setTimeout(() => vfVerifyPayment(page, paymentOrder, paymentResult), 0);
      return () => {
        clearTimeout(timer);
        clearTimeout(page._paymentTimer);
        page._paymentCheck = null;
      };
    },
    [page]
  );
  return checkoutViewProps(page);
}

function checkoutViewProps(page) {
  const S = vfShell(page, 'checkout');
  const fa = S.fa;
  const L = S.lang;
  const m = S.m;
  const s = page.state;
  const C = vfCopy(S);
  const st = page.props.store;
  const order = st ? st.order : s.order;
  const busy = s.busy || !!st?.checkoutPending;
  const attempt = s.unconfirmedAttempt;
  const methodLocked = !!attempt;
  const canEditPayment = () =>
    !page.props.store?.checkoutPending && !page.state.busy && !page.state.unconfirmedAttempt;
  const displayedOrder = order || attempt?.record;
  const delivery = displayedOrder
    ? displayedOrder.delivery
    : st
      ? st.delivery
      : {...VF_DELIVERY, name: 'Mina', address: '12 Golha St, Azimiyeh'};
  const items = displayedOrder ? displayedOrder.lines : st ? st.bag : vfSampleBag();
  // Signed-in customers can pay from their account balance when it covers the order; a large enough
  // balance takes the balance discount off the products (VF_STORE.wallet).
  const phone = vfAccountPhone(),
    balance = vfWalletBalance();
  const balanceTotals = vfTotals(items, delivery, balance);
  const canUseBalance = balance != null && balance >= balanceTotals.total;
  // The methods this store offers (VF_STORE.paymentMethods), each usable for this order or not.
  const methods = vfPaymentMethods();
  const options = paymentOptions(methods, {
    zone: delivery.zone,
    balance,
    total: balanceTotals.total
  });
  const card = methods.find(method => method.id === 'card');
  const payment = card ? {...card, holder: card.holder[L], bank: card.bank[L]} : null;
  const offers = id => options.some(option => option.id === id);
  // After a failed payment or order: the first usable method that isn't the one that failed.
  const otherThan = id => (options.find(option => option.available && option.id !== id) || {id}).id;
  const method = displayedOrder
    ? displayedOrder.method || 'card'
    : defaultPaymentMethod(options, s.method);
  const P = C.migration;
  const PW = P.wallet;
  const apiFailure = s.apiFailure;
  const recovery = apiFailure?.recovery;
  const reviewStep = recovery?.bag
    ? 'bag'
    : Object.keys(recovery?.delivery || {}).length
      ? 'delivery'
      : null;
  const review =
    reviewStep && page.props.go && st?.setCheckoutErrors
      ? {
          label: P.apiErrors[reviewStep],
          onClick: () => {
            st.setCheckoutErrors(recovery);
            page.props.go({view: 'bag', step: reviewStep});
            VF_NAV.focusById(reviewStep === 'bag' ? 'vf-checkout-bag-error' : 'vf-errors');
          }
        }
      : null;
  const codZones = (options.find(option => option.id === 'cod') || {}).zones || [];
  const totals = displayedOrder
    ? displayedOrder.totals
    : method === 'wallet'
      ? balanceTotals
      : vfTotals(items, delivery);
  const receiptChanged =
    !methodLocked && method === 'card' && !!(s.last4 || s.ref) && s.receiptAmount !== totals.total;
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
    // Every order counts as placed; only a payment already verified here (the bank confirmed it, or
    // the balance paid it) counts as a purchase. Card-to-card, pay on delivery and WhatsApp orders
    // wait for payment: the store reports their purchase once it confirms the money arrived. An
    // online order was reported as placed when checkout created it, before the bank trip.
    const params = orderParams(record);
    if (record.method === 'wallet')
      vfRuntime.track.event('order_placed', {...params, payment_status: 'paid'});
    else if (record.method !== 'online')
      vfRuntime.track.event('order_placed', {...params, payment_status: 'pending'});
    if (record.method === 'online' || record.method === 'wallet')
      vfRuntime.track.event('purchase', params);
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
    apiFailure,
    apiFailureText: apiFailure && P.apiErrors[apiFailure.kind],
    review,
    receiptLocked: busy || methodLocked,
    // No answer came back (a timeout or a lost connection): the order may exist, so say so, and keep
    // the request unchanged so a retry reuses its idempotency key.
    unconfirmed: s.failed && methodLocked,
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
      canEditPayment() &&
      page._draft({
        method: value,
        paymentSaveError: false,
        retryReview: false,
        err: false,
        failed: false,
        apiFailure: null
      }),
    migration: P,
    waOrder: S.waWith(vfOrderMessage(items, delivery, totals.total, L)),
    openWhatsapp: event => {
      checkoutOrderReady(page, items, delivery, event);
    },
    retry: () => {
      page.setState(dismissCheckoutFailure);
      if (apiFailure?.recovery.payment && method === 'card') VF_NAV.focusById('vf-ref');
    },
    otherMethod: () =>
      canEditPayment() &&
      page._draft({
        failed: false,
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
    payment,
    copySheba: () => navigator.clipboard.writeText(payment?.sheba || ''),
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
    confirmReceipt: () => canEditPayment() && page._draft({receiptAmount: totals.total}),
    last4: attempt?.record.last4 ?? s.last4,
    last4Err: s.err ? C.last4Err : undefined,
    ref: attempt?.record.ref ?? s.ref,
    refError: recovery?.payment,
    setRef: value =>
      canEditPayment() &&
      page._draft({
        method,
        ref: value,
        receiptAmount: !s.last4 && !s.ref ? totals.total : s.receiptAmount,
        apiFailure: null,
        failed: false
      }),
    setLast4: value =>
      canEditPayment() &&
      page._draft({
        method,
        last4: value
          .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
          .replace(/\D/g, '')
          .slice(0, 4),
        receiptAmount: !s.last4 && !s.ref ? totals.total : s.receiptAmount,
        err: false,
        apiFailure: null,
        failed: false
      }),
    submitOrder: () =>
      submitOrder(page, {
        items,
        delivery,
        totals,
        method,
        usable: options.some(option => option.id === method && option.available),
        receiptChanged,
        paymentStatus: P.statuses[method],
        lang: L,
        completeOrder
      }),
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
      // A live store sends the browser where the API says (docs/API.md, B3 and B30). The sample
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
      if (vfLiveStore()) {
        vfRetryLivePayment(page, s.payment, leavePaymentUrl);
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
        VF_NAV.focusById('vf-payment-review');
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
    lines: items.map(line => {
      const {name, detail, quantity, amount} = orderLineDisplay(line, L);
      return {
        image: vfProductImage(line, L),
        name,
        meta: (detail ? detail + ' · ' : '') + '× ' + (fa ? VF_FA_DIGITS(quantity) : quantity),
        total: m(amount)
      };
    }),
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
