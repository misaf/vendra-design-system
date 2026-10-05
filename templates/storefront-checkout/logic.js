// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    placed: false,
    last4: '',
    ref: '',
    err: false,
    order: null,
    method: 'card',
    busy: false,
    failed: false
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
    const slotLabel = vfDeliveryWhen({...delivery, date: delivery.date || vfDeliveryDate(delivery)}, fa);
    const method = order ? order.method || 'card' : s.method,
      codOk = VF_STORE.paymentDemo.codZones.includes(delivery.zone),
      P = C.migration;
    const done = !!order || s.placed || this.props.step === 'done';
    return {
      ...S,
      t: {
        ...S.t,
        ...C,
        payA: method === 'card' ? C.payA : P.methods[method],
        payB: method === 'card' ? C.payB : '',
        payP: method === 'card' ? C.payP : P.descriptions[method],
        place: method === 'card' ? C.place : P.actions[method],
        orderNo: order ? C.labels.order + '\u2068' + order.id + '\u2069' : C.orderNo
      },
      paying: !done,
      isCard: method === 'card',
      isWa: method === 'wa',
      busy: s.busy,placeDisabled:s.busy||s.failed||done,
      failed: s.failed,
      paymentNotice: P.demo,
      method,
      methodOptions: Object.entries(P.methods).map(([id, label]) => ({
        value: id,
        label,
        description: id === 'cod' && !codOk ? P.codOff : undefined,
        checked: id === method,
        disabled: s.busy || id === 'cod' && !codOk
      })),
      setMethod: e => !s.busy&&this.setState({
        method: e.target.value,
        err: false,
        failed: false
      }),
      migration: P,
      waOrder: VF_STORE.whatsapp + '?text=' + encodeURIComponent(items.map(l => l[L][0] + ' × ' + l.qty).join('\n') + '\n' + m(totals.total)),
      retry: () => this.setState({
        failed: false
      }),
      otherMethod: () => this.setState({
        failed: false,
        method: 'card'
      }),
      paymentStatus: P.statuses[method],
      done,
      fmt: fa ? v => VF_FA_DIGITS(v) : v => String(v),
      steps: [{
        label: C.s1
      }, {
        label: C.s2
      }, {
        label: C.s3
      }],
      totalLabel: m(totals.total),
      caption: C.caption,
      payLabels: C.payLabels,
      copySheba: () => navigator.clipboard.writeText(VF_STORE.payment.sheba || ''),
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
        if (s.busy || done || items.some(l => !vfLineAvailable(l))) return;
        if (method === 'cod' && !codOk) return;
        if (method === 'card' && s.last4.length !== 4) {
          this.setState({
            err: true
          });
          setTimeout(() => {
            const el = document.getElementById('vf-last4');
            el && el.focus();
          }, 0);
          return;
        }
        window.VF_TRACK.event('add_payment_info', {
          payment_type: method
        });
        const complete = () => {
          const record = {
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
              date: delivery.date || vfDeliveryDate(delivery)
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
          window.VF_TRACK.event('purchase', {
            transaction_id: record.id,
            value: totals.total,
            payment_type: method
          });
        };
        if (method === 'online') {
          this.setState({
            busy: true
          });
          this._paymentTimer = setTimeout(() => {
            this.setState({
              busy: false
            });
            if (this.props.payFail || vfPageRoute(this.props).demo === 'error' || VF_STORE.paymentDemo.online === 'failure') {
              this.setState({
                failed: true
              });
              return;
            }
            complete();
          }, 500);
        } else complete();
      },
      lines: items.map(l => ({
        image: vfProductImage(l, L).src,
        name: l[L][0],
        meta: l[L][1] + ' · × ' + (fa ? VF_FA_DIGITS(l.qty) : l.qty),
        total: m(l.unit * l.qty)
      })),
      sums: vfSummaryRows(totals, delivery.promo, {...C, discount: S.t.discount}, m),
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
        value: P.methods[method] + ' · ' + m(totals.total)
      }, {
        icon: 'receipt',
        label: C.card,
        value: method === 'card' ? '•••• ' + (fa ? VF_FA_DIGITS(order ? order.last4 : s.last4) : order ? order.last4 : s.last4) : ''
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
  componentWillUnmount() {
    super.componentWillUnmount();
    clearTimeout(this._paymentTimer);
  }
}
