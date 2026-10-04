// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    placed: false,
    last4: '',
    ref: '',
    err: false,
    order: null
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'checkout');
    const fa = S.fa;
    const L = S.lang;
    const m = S.m;
    const s = this.state;
    const C = vfCopy(S);
    const st = this.props.store;
    const order = st ? st.order : s.order;
    const delivery = order ? order.delivery : st ? st.delivery : {
      ...VF_DELIVERY,
      name: 'Mina',
      address: '12 Golha St, Azimiyeh'
    };
    const items = order ? order.lines : st ? st.bag : vfSampleBag();
    const totals = order ? order.totals : vfTotals(items, delivery);
    const {
      sub,
      fee
    } = totals;
    const slotEnd = (VF_SLOTS.find(slot => slot[0] === delivery.slot) || VF_SLOTS[1])[1];
    const slotLabel = vfSlotLabel(delivery.slot, slotEnd, fa);
    const done = !!order || s.placed || this.props.step === 'done';
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        orderNo: order ? C.labels.order + '\u2068' + order.id + '\u2069' : C.orderNo
      },
      paying: !done,
      done,
      fmt: fa ? v => VF_FA_DIGITS(v) : v => String(v),
      steps: [{
        label: C.s1
      }, {
        label: C.s2
      }, {
        label: C.s3
      }],
      totalLabel: m(sub + fee),
      caption: C.caption,
      payLabels: C.payLabels,
      last4: s.last4,
      last4Err: s.err ? C.last4Err : undefined,
      ref: s.ref,
      setRef: e => this.setState({
        ref: e.target.value
      }),
      setLast4: e => this.setState({
        last4: e.target.value.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/\D/g, '').slice(0, 4),
        err: false
      }),
      place: () => {
        if (s.last4.length !== 4) {
          this.setState({
            err: true
          });
          setTimeout(() => {
            const el = document.getElementById('vf-last4');
            el && el.focus();
          }, 0);
          return;
        }
        const record = {
          id: 'VN-' + Date.now(),
          status: 'received',
          createdAt: new Date().toISOString(),
          lines: items.map(l => ({
            ...l
          })),
          delivery: {
            ...delivery
          },
          totals: {
            ...totals
          },
          last4: s.last4,
          ref: s.ref
        };
        if (st) {
          st.complete(record);
        } else this.setState({
          placed: true,
          order: record
        });
      },
      lines: items.map(l => ({
        image: vfProductImage(l, L).src,
        name: l[L][0],
        meta: l[L][1] + ' · × ' + (fa ? VF_FA_DIGITS(l.qty) : l.qty),
        total: m(l.unit * l.qty)
      })),
      sums: [{
        label: C.sub,
        value: m(sub)
      }, {
        label: C.fee,
        value: fee ? m(fee) : C.free
      }, {
        label: C.total,
        value: m(sub + fee),
        strong: true
      }],
      doneRows: [{
        icon: 'calendar',
        label: C.when,
        value: slotLabel
      }, {
        icon: 'map-pin',
        label: C.to,
        value: delivery.name + ' · ' + delivery.address + ' · \u2068' + delivery.phone + '\u2069'
      }, {
        icon: 'banknote',
        label: C.pay,
        value: C.labels.cardToCard + m(sub + fee)
      }, {
        icon: 'receipt',
        label: C.card,
        value: '•••• ' + (fa ? VF_FA_DIGITS(order ? order.last4 : s.last4) : order ? order.last4 : s.last4)
      }, {
        icon: 'message-square',
        label: C.labels.cardMessage,
        value: delivery.card
      }, {
        icon: 'receipt',
        label: C.ref,
        value: order ? order.ref : s.ref
      }].filter(r => r.value)
    };
  }
}
