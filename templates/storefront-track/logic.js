// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {vfSampleOrders} from '../_shared/account-data.js';
import {vfCardMessages, vfLineToken, vfProductImage, vfSampleBag} from '../_shared/catalog.js';
import {vfMobile, vfTotals, vfZone} from '../_shared/delivery.js';
import {VF_FA_DIGITS, vfLatin} from '../_shared/formatting.js';
import {vfShell} from '../_shared/navigation.js';
import {vfSummaryRows} from '../_shared/promotions.js';
import {vfPageRoute} from '../_shared/routing.js';
import {VF_STORE} from '../_shared/store-config.js';
import {vfDeliveryWhen} from '../_shared/translations/time.js';
import {VF_NAV} from '../_shared/page-focus.js';
import {usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// Orders this browser can look up: the latest order from this session, then the sample orders.
function vfKnownOrders(store) {
  const own = store ? [store.lastOrder, store.order].filter(Boolean) : [];
  return [...own, ...vfSampleOrders()];
}
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      lookup: false,
      lookupId: '',
      lookupPhone: '',
      lookupTried: false,
      lookupFailed: false,
      found: null
    };
  });
  useStorefrontPage(page);
  return vals(page);
}

function vals(page) {
  const S = vfShell(page, 'track');
  const fa = S.fa;
  const L = S.lang;
  const m = S.m;
  const ls = page.state;
  const requested = ls.found || vfPageRoute(page.props).id;
  const snapshot = page.props.store && (page.props.store.lastOrder || page.props.store.order);
  const order = requested
    ? snapshot && snapshot.id === requested
      ? snapshot
      : vfSampleOrders().find(o => o.id === requested)
    : snapshot;
  const hasOrder =
    !ls.lookup && (!page.props.store || (!!order && (!requested || requested === order.id)));
  const rawStatus = order ? order.status || 'received' : (page.props.status ?? 'onTheWay');
  const st = /cancel|refund/.test(rawStatus)
    ? 'cancelled'
    : {
        arranging: 'preparing',
        ready: 'preparing',
        out_for_delivery: 'onTheWay'
      }[rawStatus] || rawStatus;
  const C = vfCopy(S);
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
      ['map-pin', C.labels.deliverTo, d.address + ' · ' + zone[L]],
      ['calendar', C.labels.delivery, vfDeliveryWhen(d, fa)],
      ['user', C.labels.recipient, d.name + ' · ' + (fa ? VF_FA_DIGITS(d.phone) : d.phone)],
      ['quote', C.labels.cardMessage, vfCardMessages(order.lines, d, L) || C.labels.noMessage],
      [
        'banknote',
        C.labels.payment,
        (C.paymentMethods[order.method || 'card'] || C.labels.cardToCard) +
          (order.method && order.method !== 'card' ? '' : ' · •••• ' + S.n(order.last4 || ''))
      ]
    ];
    C.times = ['', '', '', '', ''];
  }
  // A card-to-card or WhatsApp order waits for the studio to confirm payment before it is arranged.
  const method = order ? order.method || 'card' : 'card';
  const pending = !!order && st === 'received' && ['card', 'whatsapp'].includes(method);
  const contact = order ? order.delivery.senderPhone || order.delivery.phone : '';
  const lookupErrors = {
    id: ls.lookupTried && !ls.lookupId.trim() ? C.lookup.idErr : undefined,
    phone: ls.lookupTried && !vfMobile(ls.lookupPhone) ? C.lookup.phoneErr : undefined
  };
  const idx = {
    received: 0,
    preparing: 2,
    onTheWay: 3,
    delivered: 4,
    cancelled: 1
  }[st];
  const h = C.h[st] || C.h.received;
  return {
    ...S,
    hasOrder,
    waHref: order
      ? VF_STORE.whatsapp +
        '?text=' +
        encodeURIComponent((fa ? 'درباره سفارش ' : 'About order ') + order.id)
      : S.waHref,
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
        S.focus('vf-lookup-failed');
        return;
      }
      page.setState({lookup: false, lookupTried: false, lookupId: '', lookupPhone: ''});
      if (page.props.go) page.props.go({view: 'track', id: match.id});
      else page.setState({found: match.id});
    },
    trackAnother: () => {
      page.setState({lookup: true, lookupFailed: false});
      S.focus('vf-lookup-id');
    },
    reorder: order
      ? e => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          window.VF_TRACK.event('order_again', {
            transaction_id: order.id
          });
          page.props.store.reorder(order);
          page.props.go('bag');
        }
      : undefined,
    t: {
      ...S.t,
      ...C,
      browse: C.labels.browseTheShop
    },
    titleA: h[0],
    titleB: h[1],
    statusP: h[2],
    current: idx,
    delivered: st === 'delivered',
    // A real order carries the courier's photo URL; samples show the placeholder.
    photo: (order && order.deliveryPhoto) || undefined,
    tlStatus: st === 'cancelled' ? 'cancelled' : st === 'delivered' ? 'done' : 'active',
    steps: C.steps.map((l, i) => ({
      label: l,
      time: i <= idx ? C.times[i] || undefined : undefined
    })),
    rows: C.rows.map(r => ({
      icon: r[0],
      label: r[1],
      value: r[2]
    })),
    lines: sampleLines.map(line => ({
      image: vfProductImage(line, L),
      name: vfLineToken(line),
      meta: line[L][1] + ' · × ' + S.n(line.qty),
      note: vfCardMessages([line], {}, L) || undefined,
      total: m(line.unit * line.qty)
    })),
    sums: vfSummaryRows(
      sampleTotals,
      order && order.delivery.promo,
      {...C, free: C.labels.free, discount: S.t.discount, balanceDiscount: S.t.balanceDiscount},
      m,
      S.n
    )
  };
}
