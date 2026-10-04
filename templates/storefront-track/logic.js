// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  renderVals() {
    const S = vfShell.call(this, this.props, 'track');
    const fa = S.fa;
    const L = S.lang;
    const m = S.m;
    const order = this.props.store && (this.props.store.lastOrder || this.props.store.order);
    const requested = vfPageRoute(this.props).id;
    const hasOrder = !this.props.store || !!order && (!requested || requested === order.id);
    const st = order ? order.status || 'received' : this.props.status ?? 'onTheWay';
    const C = vfCopy(S);
    const sampleLines = order ? order.lines : vfSampleBag();
    const sampleTotals = order ? order.totals : vfTotals(sampleLines, {
      zone: 'central'
    });
    if (order) {
      const d = order.delivery;
      const zone = VF_ZONES.find(z => z.id === d.zone) || VF_ZONES[0];
      const end = (VF_SLOTS.find(s => s[0] === d.slot) || VF_SLOTS[1])[1];
      C.orderNo = C.labels.order + '\u2068' + order.id + '\u2069';
      C.rows = [['map-pin', C.labels.deliverTo, d.address + ' · ' + zone[L]], ['calendar', C.labels.delivery, '\u2068' + S.n(d.slot + ':00') + '–' + S.n(end + ':00') + '\u2069'], ['user', C.labels.recipient, d.name + ' · ' + (fa ? VF_FA_DIGITS(d.phone) : d.phone)], ['quote', C.labels.cardMessage, d.card || C.labels.noMessage], ['banknote', C.labels.payment, C.labels.cardToCard + ' · •••• ' + S.n(order.last4)]];
      C.times = ['', '', '', '', ''];
    }
    const idx = {
      received: 0,
      preparing: 2,
      onTheWay: 3,
      delivered: 4,
      cancelled: 1
    }[st];
    const h = C.h[st];
    return {
      ...S,
      hasOrder,
      noOrder: !hasOrder,
      reorder: order ? e => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
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
      sums: [{
        label: C.sub,
        value: m(sampleTotals.sub)
      }, {
        label: C.fee,
        value: sampleTotals.fee ? m(sampleTotals.fee) : C.labels.free
      }, {
        label: C.total,
        value: m(sampleTotals.total),
        strong: true
      }]
    };
  }
}
