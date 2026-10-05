// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  renderVals() {
    const S = vfShell.call(this, this.props, 'track');
    const fa = S.fa;
    const L = S.lang;
    const m = S.m;
    const requested = vfPageRoute(this.props).id;
    const snapshot = this.props.store && (this.props.store.lastOrder || this.props.store.order);
    const order = requested ? snapshot && snapshot.id === requested ? snapshot : vfSampleOrders().find(o => o.id === requested) : snapshot;
    const hasOrder = !this.props.store || !!order && (!requested || requested === order.id);
    const rawStatus = order ? order.status || 'received' : this.props.status ?? 'onTheWay';
    const st = /cancel|refund/.test(rawStatus) ? 'cancelled' : {
      arranging: 'preparing',
      ready: 'preparing',
      out_for_delivery: 'onTheWay'
    }[rawStatus] || rawStatus;
    const C = vfCopy(S);
    const sampleLines = order ? order.lines : vfSampleBag();
    const sampleTotals = order ? order.totals : vfTotals(sampleLines, {
      zone: 'central'
    });
    if (order) {
      const d = order.delivery;
      const zone = vfZone(d.zone);
      C.orderNo = C.labels.order + '\u2068' + order.id + '\u2069';
      C.rows = [['map-pin', C.labels.deliverTo, d.address + ' · ' + zone[L]], ['calendar', C.labels.delivery, vfDeliveryWhen(d, fa)], ['user', C.labels.recipient, d.name + ' · ' + (fa ? VF_FA_DIGITS(d.phone) : d.phone)], ['quote', C.labels.cardMessage, d.card || C.labels.noMessage], ['banknote', C.labels.payment, (C.paymentMethods[order.method || 'card'] || C.labels.cardToCard) + (order.method && order.method !== 'card' ? '' : ' · •••• ' + S.n(order.last4 || ''))]];
      C.times = ['', '', '', '', ''];
    }
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
      waHref: order ? VF_STORE.whatsapp + '?text=' + encodeURIComponent((fa ? 'درباره سفارش ' : 'About order ') + order.id) : S.waHref,
      noOrder: !hasOrder,
      reorder: order ? e => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        window.VF_TRACK.event('order_again', {
          transaction_id: order.id
        });
        this.props.store.reorder(order);
        this.props.go('bag');
      } : S.go.bag,
      t: {
        ...S.t,
        ...C,
        missingTitle: C.labels.noOrderFound,
        missingBody: C.labels.thereIsNoCompletedOrderMatchingThisLinkInThisBrowserSessionCompleteADemoCheckoutToSeeYourOrderHere,
        browse: C.labels.browseTheShop
      },
      titleA: h[0],
      titleB: h[1],
      statusP: h[2],
      current: idx,
      delivered: st === 'delivered',
      // A real order carries the courier's photo URL; samples show the placeholder.
      photo: order && order.deliveryPhoto || undefined,
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
        name: line[L][0],
        meta: line[L][1] + ' · × ' + S.n(line.qty),
        note: line[L][2],
        total: m(line.unit * line.qty)
      })),
      sums: vfSummaryRows(sampleTotals, order && order.delivery.promo, {...C, free: C.labels.free, discount: S.t.discount}, m)
    };
  }
}
