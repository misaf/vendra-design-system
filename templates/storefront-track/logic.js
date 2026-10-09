// Page behavior. Edit here, then run npm --prefix templates run build.
// Orders this browser can look up: the latest order from this session, then the sample orders.
function vfKnownOrders(store) {
  const own = store ? [store.lastOrder, store.order].filter(Boolean) : [];
  return [...own, ...vfSampleOrders()];
}
class Component extends VFPage {
  state = {
    lookup: false,
    lookupId: '',
    lookupPhone: '',
    lookupTried: false,
    lookupFailed: false,
    found: null
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'track');
    const fa = S.fa;
    const L = S.lang;
    const m = S.m;
    const ls = this.state;
    const requested = ls.found || vfPageRoute(this.props).id;
    const snapshot = this.props.store && (this.props.store.lastOrder || this.props.store.order);
    const order = requested
      ? snapshot && snapshot.id === requested
        ? snapshot
        : vfSampleOrders().find(o => o.id === requested)
      : snapshot;
    const hasOrder =
      !ls.lookup && (!this.props.store || (!!order && (!requested || requested === order.id)));
    const rawStatus = order ? order.status || 'received' : (this.props.status ?? 'onTheWay');
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
    const pending = !!order && st === 'received' && ['card', 'wa'].includes(method);
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
        method === 'wa'
          ? C.pending.wa
          : C.pending.card
              .replace('{last4}', S.n((order && order.last4) || ''))
              .replace('{phone}', '\u2068' + S.n(contact) + '\u2069'),
      // Guests find an order with its number and the mobile used for it (the recipient's or their own).
      lookupId: ls.lookupId,
      lookupPhone: ls.lookupPhone,
      setLookupId: e => this.setState({lookupId: e.target.value, lookupFailed: false}),
      setLookupPhone: e => this.setState({lookupPhone: e.target.value, lookupFailed: false}),
      lookupIdError: lookupErrors.id,
      lookupPhoneError: lookupErrors.phone,
      lookupFailed: ls.lookupFailed,
      findOrder: e => {
        e && e.preventDefault && e.preventDefault();
        const id = vfLatin(ls.lookupId).trim().toUpperCase(),
          phone = vfMobile(ls.lookupPhone);
        this.setState({lookupTried: true});
        if (!id || !phone) {
          window.VF_NAV.focusFirstInvalid();
          return;
        }
        const match = vfKnownOrders(this.props.store).find(
          o =>
            o.id.toUpperCase() === id &&
            [o.delivery.phone, o.delivery.senderPhone].some(p => p && vfMobile(p) === phone)
        );
        if (!match) {
          this.setState({lookupFailed: true});
          S.focus('vf-lookup-failed');
          return;
        }
        this.setState({lookup: false, lookupTried: false, lookupId: '', lookupPhone: ''});
        if (this.props.go) this.props.go({view: 'track', id: match.id});
        else this.setState({found: match.id});
      },
      trackAnother: () => {
        this.setState({lookup: true, lookupFailed: false});
        S.focus('vf-lookup-id');
      },
      reorder: order
        ? e => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            window.VF_TRACK.event('order_again', {
              transaction_id: order.id
            });
            this.props.store.reorder(order);
            this.props.go('bag');
          }
        : S.go.bag,
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
        image: vfProductImage(line, L).src,
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
}
