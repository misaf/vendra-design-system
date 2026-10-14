// Page behavior. Edit here, then run npm --prefix templates run build.
import {vfCopy} from './copy.js';
import {vfAccountLoad, vfAccountPhone} from '../_shared/account-data.js';
import {
  VF_ADDONS,
  vfCardMessages,
  vfLineAvailable,
  vfLineHasCard,
  vfLineItems,
  vfLineToken,
  vfLineWithCard,
  vfProductImage,
  vfSampleBag,
  vfTokenText
} from '../_shared/catalog.js';
import {
  VF_DELIVERY,
  VF_FREE_DELIVERY_THRESHOLD,
  VF_FREE_DELIVERY_ZONES,
  VF_ZONES,
  vfDeliveryCutoff,
  vfDeliveryDate,
  vfDeliveryDays,
  vfDeliveryHint,
  vfDeliverySlot,
  vfDeliverySlots,
  vfErrors,
  vfFreeDelivery,
  vfMobile,
  vfTotals,
  vfZone,
  vfZoneAt
} from '../_shared/delivery.js';
import {VF_FA_DIGITS, VF_MONEY} from '../_shared/formatting.js';
import {vfLoadLeaflet, vfLocationText, vfValidLocation} from '../_shared/location.js';
import {vfShell} from '../_shared/navigation.js';
import {VF_PROMOS, vfPromoCheck, vfSummaryRows} from '../_shared/promotions.js';
import {vfPageRoute, vfRouteParams} from '../_shared/routing.js';
import {VF_STORE, vfFeatures, vfPaymentMethods} from '../_shared/store-config.js';
import {vfDayMonth, vfDayName, vfSlotLabel} from '../_shared/translations/time.js';
import {VF_NAV} from '../_shared/page-focus.js';
import {useLifecycle, usePageLogic} from '../_shared/page-state.js';
import {useStorefrontPage} from '../_shared/page-lifecycle.js';
// Two checkout steps share this page: the bag (?view=bag) and delivery details (&step=delivery).
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function usePage(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      lines: vfSampleBag(),
      step: null,
      delivery: {
        ...VF_DELIVERY
      },
      submitted: false,
      promoDraft: '',
      promoError: null,
      mapFailed: false,
      locateFailed: false
    };
    page._lines = change => {
      page.setState(prev => ({lines: change(prev.lines)}));
    };
    page._update = patch => {
      const st = page.props.store;
      // A pin inside a delivery zone sets the zone, and with it the fee and cut-off.
      if (patch.location && !page._delivery().noMap && vfZoneAt(patch.location))
        patch = {...patch, zone: vfZoneAt(patch.location)};
      if (st) st.setDelivery(patch);
      else
        page.setState(prev => ({
          delivery: {
            ...prev.delivery,
            ...patch
          }
        }));
    };
    page._delivery = () => {
      return page.props.store ? page.props.store.delivery : page.state.delivery;
    };
    // A signed-in customer's own name and mobile fill "Your details" when they are empty.
    page._prefillSender = () => {
      const phone = vfAccountPhone(),
        d = page._delivery();
      if (!phone || d.sender || d.senderPhone) return;
      const profile = vfAccountLoad(phone, page.props.lang === 'fa' ? 'fa' : 'en').profile || {};
      page._update({sender: profile.name || '', senderPhone: phone});
    };
  });
  useStorefrontPage(page);
  useLifecycle(page, {
    didMount() {
      page._prefillSender();
      const st = page.props.store;
      const lines = st ? st.bag : page.state.lines;
      if ((page.state.step || vfPageRoute(page.props).step || 'bag') === 'bag')
        window.VF_TRACK.event('view_cart', {
          items: vfLineItems(lines),
          value: lines.reduce((sum, line) => sum + line.unit * line.qty, 0)
        });
    }
  });
  return vals(page);
}

function vals(page) {
  const fa = page.props.lang === 'fa';
  const L = fa ? 'fa' : 'en';
  const S = vfShell(page, 'bag');
  const s = page.state;
  const m = v => VF_MONEY(v, fa);
  const n = v => (fa ? VF_FA_DIGITS(v) : String(v));
  const C = vfCopy(S);
  const st = page.props.store;
  const step = s.step || vfPageRoute(page.props).step || 'bag';
  const onDelivery = step === 'delivery';
  const live = st ? st.bag : s.lines;
  const delivery = st ? st.delivery : s.delivery;
  const totals = vfTotals(live.filter(vfLineAvailable), delivery);
  const {sub, total} = totals;
  const z = vfZone(delivery.zone);
  const date = vfDeliveryDate(delivery);
  const slot = vfDeliverySlot(delivery);
  const invalid = vfErrors(delivery, live);
  const update = patch => page._update(patch);
  const errors = C.errors;
  const shown = key => s.submitted && invalid[key];
  const pinned = vfValidLocation(delivery.location);
  // A signed-in customer can fill the delivery from an address saved in their account.
  const phone = vfAccountPhone();
  const tx = v => (typeof v === 'string' ? v : v[L] || v.en);
  const saved = phone ? vfAccountLoad(phone, L).addresses : [];
  const zoneLabel = zone =>
    (fa ? zone.fa : zone.en) + ' · ' + (vfFreeDelivery(zone.id, sub) ? C.free : m(zone.fee));
  // The handwritten card is an add-on (VF_ADDONS): a store without it has no card messages.
  const cardAddon = VF_ADDONS.find(addon => addon.id === 'card');
  const cardPrice = cardAddon ? m(cardAddon.price) : '';
  const missingCard = l => s.submitted && vfLineHasCard(l) && !String(l.card || '').trim();
  // Error summary rows in form order; each links to the field that needs attention.
  const problems = [
    ['name', 'vf-name', errors.name],
    ['phone', 'vf-phone', errors.phone],
    ['location', 'vf-map', errors.location],
    ['outside', 'vf-map', errors.outside],
    ['address', 'vf-address', s.mapFailed ? errors.addressFull : errors.address]
  ]
    .filter(([key]) => invalid[key])
    .concat(
      live
        .map((l, i) =>
          vfLineHasCard(l) && !String(l.card || '').trim()
            ? [
                'cards',
                'vf-card-' + i,
                C.cardFor.replace('{name}', vfTokenText(vfLineToken(l))) + ': ' + errors.card
              ]
            : null
        )
        .filter(Boolean)
    )
    .concat(
      [
        ['sender', 'vf-sender', errors.sender],
        ['senderPhone', 'vf-sender-phone', errors.senderPhone]
      ].filter(([key]) => invalid[key])
    )
    .map(([, target, text]) => ({text, target}));
  const stepTo = next => {
    if (page.props.go) page.props.go({view: 'bag', step: next});
    else page.setState({step: next});
  };
  // "Order on WhatsApp" carries the bag, so the studio knows each product by its code.
  const waOrder = [
    C.wa.order,
    ...live.map(
      l =>
        '- ' +
        C.wa.line
          .replace('{name}', vfLineToken(l))
          .replace('{detail}', l[L][1])
          .replace('{qty}', n(l.qty))
    )
  ].join('\n');
  return {
    ...S,
    waHref: live.length ? S.waWith(waOrder) : S.waHref,
    t: {
      ...S.t,
      ...C,
      payNote: C.payNote.replace(
        '{methods}',
        vfPaymentMethods()
          .map(method => C.payWays[method.id])
          .filter(Boolean)
          .join(fa ? '، ' : ', ')
          .replace(/(.*)(، |, )/, '$1' + C.payOr)
      )
    },
    onBag: !onDelivery,
    onDelivery,
    delivery,
    setName: value =>
      update({
        name: value
      }),
    setPhone: value =>
      update({
        phone: value
      }),
    setAddress: value =>
      update({
        address: value
      }),
    setSender: value =>
      update({
        sender: value
      }),
    setSenderPhone: value =>
      update({
        senderPhone: value
      }),
    nameError: shown('name') ? errors.name : undefined,
    phoneError: shown('phone') ? errors.phone : undefined,
    senderError: shown('sender') ? errors.sender : undefined,
    senderPhoneError: shown('senderPhone') ? errors.senderPhone : undefined,
    addressError: shown('address')
      ? s.mapFailed
        ? errors.addressFull
        : errors.address
      : undefined,
    addressLabel: s.mapFailed ? C.addressFull : C.address2,
    addressHint: s.mapFailed ? undefined : C.addressHint,
    mapOk: !s.mapFailed,
    mapFailed: s.mapFailed,
    pinStatus: pinned
      ? C.pinSet.replace('{location}', vfLocationText(delivery.location, fa))
      : C.pinHint,
    pinError: shown('location')
      ? errors.location
      : invalid.outside
        ? errors.outside
        : s.locateFailed
          ? C.locateFailed
          : '',
    // With a map, the pin decides the zone; the select is only the fallback when the map fails.
    zoneText: pinned && !invalid.outside ? zoneLabel(z) : '',
    zoneStatus: pinned && !invalid.outside ? C.zoneSet + vfDeliveryHint(z, fa) : C.zonePending,
    hasSaved: saved.length > 0,
    // Guests can sign in to use saved addresses, then come back to this step.
    guest: !phone,
    signinHref:
      (page.props.go ? '' : '../app/') + vfRouteParams({lang: L, view: 'signin', next: 'delivery'}),
    goSignin: e => {
      if (!page.props.go) return;
      e && e.preventDefault && e.preventDefault();
      page.props.go({view: 'signin', next: 'delivery'});
    },
    savedAddresses: saved.map(a => ({
      label: tx(a.label),
      on:
        tx(a.line) === delivery.address &&
        (!vfValidLocation(a.location) ||
          vfLocationText(a.location) === vfLocationText(delivery.location)),
      pick: () => {
        update({
          name: tx(a.recipient),
          phone: a.phone,
          zone: a.zone,
          address: tx(a.line),
          ...(vfValidLocation(a.location) ? {location: a.location} : {})
        });
      }
    })),
    // The delivery pin (LocationPicker): Leaflet from the vendored copy, tiles from the store's map settings.
    map: {
      change: location => {
        page.setState({locateFailed: false});
        page._update({location});
      },
      load: vfLoadLeaflet,
      tiles: {url: VF_STORE.map.tiles, attribution: VF_STORE.map.attribution},
      center: VF_STORE.map.center,
      zoom: VF_STORE.map.zoom,
      locateError: () => page.setState({locateFailed: true}),
      // A fallback left over from an earlier failed load no longer applies once the map is here.
      ready: () => page._delivery().noMap && page._update({noMap: false}),
      fail: () => {
        page.setState({mapFailed: true});
        page._update({noMap: true});
      }
    },
    problems: s.submitted ? problems : [],
    toDelivery: () => {
      if (live.some(l => !vfLineAvailable(l))) return;
      stepTo('delivery');
    },
    backToBag: e => {
      e && e.preventDefault && e.preventDefault();
      stepTo('bag');
    },
    bagHref: (page.props.go ? '' : '../app/') + vfRouteParams({lang: L, view: 'bag'}),
    stepClick: i => i === 0 && stepTo('bag'),
    next: () => {
      if (live.some(l => !vfLineAvailable(l))) return;
      page.setState({
        submitted: true
      });
      if (problems.length) {
        // One problem goes straight to its field; several go to the summary that lists them.
        // The map can't carry aria-invalid, so it is focused directly.
        if (problems.length > 1) S.focus('vf-errors');
        else if (problems[0].target === 'vf-map') S.focus('vf-map');
        else VF_NAV.focusFirstInvalid();
        return;
      }
      if (st)
        st.setDelivery({
          ...delivery,
          date,
          slot,
          phone: vfMobile(delivery.phone),
          senderPhone: vfMobile(delivery.senderPhone)
        });
      window.VF_TRACK.event('begin_checkout', {
        items: vfLineItems(live.filter(vfLineAvailable)),
        value: total
      });
      if (page.props.go) page.props.go('checkout');
    },
    hasItems: live.length > 0,
    noItems: live.length === 0,
    steps: [C.s1, C.s2, C.s3, C.s4].map(label => ({
      label
    })),
    stepIndex: onDelivery ? 1 : 0,
    caption: (i, count, label) =>
      C.caption.replace('{n}', i).replace('{total}', count).replace('{label}', label),
    fmt: fa ? v => VF_FA_DIGITS(v) : v => String(v),
    qtyLabels: {
      dec: C.dec,
      inc: C.inc,
      value: C.quantity
    },
    lines: live.map((l, i) => ({
      unavailable: !vfLineAvailable(l),
      unavailableLabel: fa
        ? 'ناموجود؛ برای ادامه از سبد حذف کنید'
        : 'Unavailable; remove to continue',
      image: vfProductImage(l, L),
      name: vfLineToken(l),
      meta: l[L][1] + ' · ' + C.labels.each + m(l.unit),
      note: String(l.card || '').trim()
        ? vfCardMessages([l], {}, L)
        : vfLineHasCard(l)
          ? C.cardNext
          : undefined,
      price: m(l.unit * l.qty),
      qty: l.qty,
      setQty: q =>
        st
          ? st.setQty(l.id, q)
          : page._lines(lines => lines.map(x => (x.id === l.id ? {...x, qty: q} : x))),
      remove: () => {
        st ? st.remove(l.id) : page._lines(lines => lines.filter(x => x.id !== l.id));
        S.focusAfterRemoval('.ag-line__remove', i);
      }
    })),
    // Lines with a handwritten card need its message; the others can add one here.
    cardsShown: !!cardAddon || live.some(vfLineHasCard),
    cardLines: live.map((l, i) => ({
      id: 'vf-card-' + i,
      hasCard: vfLineHasCard(l),
      noCard: !vfLineHasCard(l) && !!cardAddon,
      label: C.cardFor.replace('{name}', vfTokenText(vfLineToken(l))),
      name: vfLineToken(l),
      detail: l[L][1],
      value: l.card || '',
      error: missingCard(l) ? errors.card : undefined,
      setCard: value =>
        st
          ? st.setCard(l.id, value)
          : page._lines(lines => lines.map(x => (x.id === l.id ? {...x, card: value} : x))),
      addLabel: C.addCard.replace('{price}', cardPrice),
      addAria: C.addCardLabel
        .replace('{price}', cardPrice)
        .replace('{name}', vfTokenText(vfLineToken(l))),
      add: () => {
        if (st) st.addCard(l.id);
        else page._lines(lines => lines.map(x => (x.id === l.id ? vfLineWithCard(x) : x)));
        setTimeout(() => S.focus('vf-card-' + i), 0);
      }
    })),
    zone: delivery.zone,
    setZone: value =>
      update({
        zone: value
      }),
    zoneHint: vfDeliveryHint(z, fa),
    zones: VF_ZONES.map(zone => ({
      value: zone.id,
      label: zoneLabel(zone)
    })),
    days: vfDeliveryDays(delivery.zone).map(day => {
      const off = day.soldOut || day.pastCutoff;
      return {
        label: vfDayName(day, fa),
        desc: day.soldOut
          ? C.soldOut
          : day.pastCutoff
            ? C.pastCutoff.replace('{time}', vfDeliveryCutoff(z, fa))
            : vfDayMonth(day.date, fa),
        value: day.iso,
        off
      };
    }),
    slots: vfDeliverySlots(date).map(({start, end, closed}) => ({
      label: vfSlotLabel(start, end, fa),
      desc: closed ? C.slotClosed : undefined,
      value: String(start),
      off: closed
    })),
    date,
    setDate: iso => update({date: iso}),
    slot: slot == null ? null : String(slot),
    setSlot: value => {
      const chosen = vfDeliverySlots(date).find(({start}) => String(start) === value);
      if (chosen) update({slot: chosen.start});
    },
    summary: live.map(l => ({
      image: vfProductImage(l, L),
      name: vfLineToken(l),
      meta: l[L][1] + ' · × ' + n(l.qty),
      total: m(l.unit * l.qty)
    })),
    totalLabel: m(total),
    promoDraft: s.promoDraft,
    setPromoDraft: value =>
      page.setState({
        promoDraft: value,
        promoError: null
      }),
    // PromoCodeField moves focus: to the field when a code is refused or removed, to Remove when
    // one applies.
    applyPromo: code => {
      const check = vfPromoCheck(code, sub);
      if ('error' in check) {
        page.setState({
          promoError: check
        });
        return;
      }
      update({
        promo: check.promo.code
      });
      page.setState({
        promoDraft: '',
        promoError: null
      });
    },
    promoError: s.promoError
      ? s.promoError.error === 'min'
        ? C.promoMin.replace('{min}', m(s.promoError.min))
        : C.promoUnknown
      : undefined,
    promoShown: !onDelivery && vfFeatures().promoCodes,
    // How far the subtotal is from free delivery, while the chosen zone can deliver free.
    freeDelivery: VF_FREE_DELIVERY_ZONES.includes(z.id)
      ? {
          label:
            sub >= VF_FREE_DELIVERY_THRESHOLD
              ? C.freeReached
              : C.freeLeft.replace('{amount}', m(VF_FREE_DELIVERY_THRESHOLD - sub)),
          value: Math.min(sub, VF_FREE_DELIVERY_THRESHOLD),
          max: VF_FREE_DELIVERY_THRESHOLD,
          valueLabel: C.freeOf
            .replace('{sub}', m(sub))
            .replace('{threshold}', m(VF_FREE_DELIVERY_THRESHOLD)),
          done: sub >= VF_FREE_DELIVERY_THRESHOLD
        }
      : null,
    promoStatus: (() => {
      const promo = VF_PROMOS.find(p => p.code === delivery.promo);
      if (!promo) return '';
      return (
        totals.discount
          ? C.promoOn.replace('{percent}', n(promo.percent))
          : C.promoPaused.replace('{min}', m(promo.min))
      ).replace('{code}', promo.code);
    })(),
    removePromo: () =>
      update({
        promo: ''
      }),
    sums: vfSummaryRows(
      totals,
      delivery.promo,
      {...C, discount: S.t.discount, balanceDiscount: S.t.balanceDiscount},
      m,
      S.n
    ),
    restore: e => {
      e && e.preventDefault && e.preventDefault();
      if (st) {
        st.reset();
        return;
      }
      page.setState({
        lines: vfSampleBag()
      });
    }
  };
}
