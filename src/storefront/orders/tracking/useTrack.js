// Page behavior. Edit here, then run npm run build.
import React from 'react';
import {vfCopy} from './copy.js';
import {vfCustomerId} from '../../customer/account-data.js';
import {orderLineDisplay} from '../order-line-view.js';
import {vfKnownOrders} from '../order-records.js';
import {vfProductImage} from '../../catalog/catalog.js';
import {vfCardMessages, vfLineToken, vfSampleBag} from '../../cart/cart-lines.js';
import {vfReorderBag, vfReorderLines} from '../../cart/cart-lines.js';
import {mobile as vfMobile} from '../../../design-system/utils/input.js';
import {vfTotals} from '../../pricing/order-totals.js';
import {vfZone} from '../../delivery/delivery-zones.js';
import {VF_FA_DIGITS, vfLatin, vfSeparator} from '../../pricing/formatting.js';
import {vfShell} from '../../shell/shell-props.js';
import {vfSummaryRows} from '../../pricing/promotions.js';
import {vfPageRoute} from '../../shell/routing.js';
import {vfDeliveryWhen} from '../../delivery/time.js';
import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {usePageLogic} from '../../shell/page-state.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {vfRuntime} from '../../../platform/browser/runtime.js';

const LOOKUP_FOCUS_KEY = 'vf-track-lookup-focus';

// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function useTrack(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      lookup: false,
      // A link to an order this visitor hasn't verified opens the lookup with its number filled in.
      lookupId: vfPageRoute(page.props).id || '',
      lookupPhone: '',
      lookupTried: false,
      lookupFailed: false,
      found: null,
      foundViewer: null,
      reorderOpen: false,
      reorderMode: 'add'
    };
  });
  useStorefrontPage(page, 'track');
  const view = vals(page);
  const orderId = vfPageRoute(props).id;
  React.useEffect(() => {
    if (!props.ready || !orderId) return;
    // Order URLs load through the static host's fallback document. Carry the focus
    // request across that load and apply it only after the verified result renders.
    let requested;
    try {
      requested = sessionStorage.getItem(LOOKUP_FOCUS_KEY);
      if (requested) sessionStorage.removeItem(LOOKUP_FOCUS_KEY);
    } catch {
      return;
    }
    if (view.hasOrder && requested === orderId) VF_NAV.focusHeading({preserveFocus: true});
  }, [props.ready, orderId, view.hasOrder]);
  return view;
}

// Who may see an order, and how much of it: 'buyer' sees everything, 'recipient' only its
// progress and delivery, null nothing (the visitor has to look it up first). The storefront
// matches locally; the tracking API must make the same split (docs/API.md, 16).
function vfTrackViewer(store, order, foundViewer) {
  // A single page without the site shows its sample order, with or without a looked-up one.
  if (!store) return foundViewer || 'buyer';
  if (!order) return null;
  // This customer's own checkouts in this session.
  if ([store.order, store.lastOrder, ...(store.orders || [])].some(own => own?.id === order.id))
    return 'buyer';
  const tracked = store.tracked?.[order.id] || null;
  // A lookup with the sender's mobile opens the whole order, even for a signed-in recipient.
  if (tracked === 'buyer') return 'buyer';
  const customer = store.customerId && store.customerId !== 'guest' ? store.customerId : '';
  if (customer && store.customerId === vfCustomerId()) {
    if (vfMobile(order.delivery?.senderPhone) === customer) return 'buyer';
    if (vfMobile(order.delivery?.phone) === customer) return 'recipient';
  }
  return tracked;
}

function vals(page) {
  const S = vfShell(page, 'track');
  const fa = S.fa;
  const L = S.lang;
  const m = S.m;
  const ls = page.state;
  const requested = ls.found || vfPageRoute(page.props).id;
  const snapshot = page.props.store && (page.props.store.lastOrder || page.props.store.order);
  const known = vfKnownOrders(page.props.store);
  const order = requested
    ? snapshot && snapshot.id === requested
      ? snapshot
      : known.find(o => o.id === requested)
    : snapshot;
  const viewer = vfTrackViewer(page.props.store, order, ls.foundViewer);
  const buyer = viewer === 'buyer';
  const hasOrder =
    !ls.lookup &&
    (!page.props.store || (!!order && !!viewer && (!requested || requested === order.id)));
  const rawStatus = order ? order.status || 'received' : (page.props.status ?? 'onTheWay');
  const st = /cancel|refund/.test(rawStatus)
    ? 'cancelled'
    : {
        arranging: 'preparing',
        ready: 'preparing',
        out_for_delivery: 'onTheWay'
      }[rawStatus] || rawStatus;
  const C = vfCopy(S);
  const currentBag = page.props.store?.bag || [];
  const reorderBag = vfReorderBag(order?.lines || [], currentBag, ls.reorderMode);
  const reorderCandidates = (order?.lines || []).map(line => ({
    line,
    updated: vfReorderLines([line])[0]
  }));
  const canReorder = reorderCandidates.some(({updated}) => Boolean(updated));
  const reorderChanges = reorderCandidates.flatMap(({line, updated}) => {
    const name = vfLineToken(line);
    if (!updated) return [C.reorderUnavailable.replace('{name}', name)];
    const messages = [];
    if (updated.unit !== line.unit)
      messages.push(
        C.reorderPrice
          .replace('{name}', name)
          .replace('{old}', m(line.unit))
          .replace('{new}', m(updated.unit))
      );
    const previous =
      ls.reorderMode === 'add' ? currentBag.find(item => item.id === updated.id)?.qty || 0 : 0;
    const added = Math.max(
      0,
      (reorderBag.find(item => item.id === updated.id)?.qty || 0) - previous
    );
    if (added !== line.qty)
      messages.push(C.reorderQuantity.replace('{name}', name).replace('{qty}', S.n(added)));
    return messages;
  });
  const sampleLines = order ? order.lines : vfSampleBag();
  const sampleTotals = order
    ? order.totals
    : vfTotals(sampleLines, {
        zone: 'central'
      });
  if (order) {
    const d = order.delivery;
    const zone = vfZone(d.zone);
    C.orderNo = C.labels.order + '\u2068' + order.id + '\u2069';
    C.rows = [
      ['map-pin', C.labels.deliverTo, d.address + vfSeparator(L) + zone[L]],
      ['calendar', C.labels.delivery, vfDeliveryWhen(d, fa)],
      [
        'user',
        C.labels.recipient,
        d.name + vfSeparator(L) + (fa ? VF_FA_DIGITS(d.phone) : d.phone)
      ],
      buyer
        ? ['quote', C.labels.cardMessage, vfCardMessages(order.lines, d, L) || C.labels.noMessage]
        : // The recipient learns there is a card, not what it says.
          vfCardMessages(order.lines, d, L)
          ? ['quote', C.labels.cardMessage, C.labels.cardWaiting]
          : null,
      buyer
        ? [
            'banknote',
            C.labels.payment,
            (C.paymentMethods[order.method || 'card'] || C.labels.cardToCard) +
              (order.method && order.method !== 'card' ? '' : ' · •••• ' + S.n(order.last4 || ''))
          ]
        : null
    ].filter(Boolean);
    C.times = ['', '', '', '', ''];
  }
  // A card-to-card or WhatsApp order waits for the studio to confirm payment before it is arranged.
  const method = order ? order.method || 'card' : 'card';
  const pending = !!order && buyer && st === 'received' && ['card', 'whatsapp'].includes(method);
  const contact = order ? order.delivery.senderPhone || order.delivery.phone : '';
  const lookupErrors = {
    id: ls.lookupTried && !ls.lookupId.trim() ? C.lookup.idErr : undefined,
    phone: ls.lookupTried && !vfMobile(ls.lookupPhone) ? C.lookup.phoneErr : undefined
  };
  const currentStep = {
    received: 0,
    preparing: 2,
    onTheWay: 3,
    delivered: 4,
    cancelled: 1
  }[st];
  const h = (!buyer && C.hRecipient[st]) || C.h[st] || C.h.received;
  return {
    ...S,
    hasOrder,
    // Prices, payment and the card's words are the buyer's: a recipient sees none of them.
    showSummary: buyer,
    waHref: order ? S.waWith((fa ? 'درباره سفارش ' : 'About order ') + order.id) : S.waHref,
    noOrder: !hasOrder,
    pending,
    pendingTitle: C.pending.title,
    pendingBody:
      method === 'whatsapp'
        ? C.pending.whatsapp
        : C.pending.card
            .replace('{last4}', S.n((order && order.last4) || ''))
            .replace('{phone}', '\u2068' + S.n(contact) + '\u2069'),
    // Guests find an order with its number and the mobile used for it (the recipient's or their own).
    lookupId: ls.lookupId,
    lookupPhone: ls.lookupPhone,
    setLookupId: value => page.setState({lookupId: value, lookupFailed: false}),
    setLookupPhone: value => page.setState({lookupPhone: value, lookupFailed: false}),
    lookupIdError: lookupErrors.id,
    lookupPhoneError: lookupErrors.phone,
    lookupFailed: ls.lookupFailed,
    findOrder: e => {
      e && e.preventDefault && e.preventDefault();
      const id = vfLatin(ls.lookupId).trim().toUpperCase(),
        phone = vfMobile(ls.lookupPhone);
      page.setState({lookupTried: true});
      if (!id || !phone) {
        VF_NAV.focusFirstInvalid();
        return;
      }
      const match = vfKnownOrders(page.props.store).find(
        o =>
          o.id.toUpperCase() === id &&
          [o.delivery.phone, o.delivery.senderPhone].some(p => p && vfMobile(p) === phone)
      );
      if (!match) {
        page.setState({lookupFailed: true});
        VF_NAV.focusById('vf-lookup-failed');
        return;
      }
      // The sender's mobile opens the whole order; the recipient's only its progress.
      const matchedViewer = vfMobile(match.delivery.senderPhone) === phone ? 'buyer' : 'recipient';
      page.setState({lookup: false, lookupTried: false, lookupId: '', lookupPhone: ''});
      if (page.props.store?.trackOrder) page.props.store.trackOrder(match.id, matchedViewer);
      if (page.props.go) {
        try {
          sessionStorage.setItem(LOOKUP_FOCUS_KEY, match.id);
        } catch {}
        page.props.go({view: 'track', id: match.id});
      } else page.setState({found: match.id, foundViewer: matchedViewer});
    },
    trackAnother: () => {
      page.setState({lookup: true, lookupFailed: false, lookupId: '', lookupPhone: ''});
      VF_NAV.focusById('vf-lookup-id');
    },
    reorder:
      order && buyer
        ? () =>
            page.setState({reorderOpen: true, reorderMode: currentBag.length ? 'add' : 'replace'})
        : undefined,
    reorderOpen: ls.reorderOpen,
    reorderMode: ls.reorderMode,
    setReorderMode: reorderMode => page.setState({reorderMode}),
    closeReorder: () => page.setState({reorderOpen: false}),
    reorderChanges,
    reorderEmpty: !canReorder,
    hasBag: currentBag.length > 0,
    confirmReorder: () => {
      if (!order || !buyer || !canReorder) return;
      vfRuntime.track.event('order_again', {transaction_id: order.id});
      page.props.store.reorder(order, ls.reorderMode);
      page.props.go('bag');
    },
    t: {
      ...S.t,
      ...C,
      browse: C.labels.browseTheShop
    },
    titleA: h[0],
    titleB: h[1],
    statusP: h[2],
    current: currentStep,
    delivered: st === 'delivered',
    // A real order carries the courier's photo URL; samples show the placeholder.
    photo: (order && order.deliveryPhoto) || undefined,
    tlStatus: st === 'cancelled' ? 'cancelled' : st === 'delivered' ? 'done' : 'active',
    steps: C.steps.map((l, i) => ({
      label: l,
      time: i <= currentStep ? C.times[i] || undefined : undefined
    })),
    rows: C.rows.map(r => ({
      icon: r[0],
      label: r[1],
      value: r[2]
    })),
    lines: sampleLines.map(line => {
      const {name, detail, quantity, amount} = orderLineDisplay(line, L);
      return {
        image: vfProductImage(line, L),
        name,
        meta: (detail ? detail + ' · ' : '') + '× ' + S.n(quantity),
        note: vfCardMessages([line], {}, L) || undefined,
        total: m(amount)
      };
    }),
    sums: vfSummaryRows(
      sampleTotals,
      order && order.delivery.promo,
      {...C, free: C.labels.free, discount: S.t.discount, balanceDiscount: S.t.balanceDiscount},
      m,
      S.n
    )
  };
}
