// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    placed: false,
    last4: '',
    ref: '',
    err: false,
    order: null,
    method: null,
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
    // Signed-in customers can pay from their account balance when it covers the order; a large enough
    // balance takes the balance discount off the products (VF_STORE.wallet).
    const phone = vfAccountPhone(), balance = vfWalletBalance();
    const balanceTotals = vfTotals(items, delivery, balance);
    const canUseBalance = balance != null && balance >= balanceTotals.total;
    const method = order ? order.method || 'card' : s.method || (canUseBalance ? 'wallet' : 'card'),
      codOk = VF_STORE.paymentDemo.codZones.includes(delivery.zone),
      P = C.migration, PW = P.wallet;
    const totals = order ? order.totals : method === 'wallet' ? balanceTotals : vfTotals(items, delivery);
    const slotLabel = vfDeliveryWhen({...delivery, date: delivery.date || vfDeliveryDate(delivery)}, fa);
    const fillWallet = (text, amount) => text.replace('{balance}', m(amount)).replace('{percent}', S.n(VF_STORE.wallet.discountPercent))
      .replace('{left}', m(Math.max(0, balanceTotals.total - (balance || 0))));
    const walletNote = balance == null ? PW.signIn : !canUseBalance ? fillWallet(PW.short, balance) : fillWallet(vfBalanceDiscountOn(balance) ? PW.discount : PW.balance, balance);
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
      // After an order, a guest can sign in with the mobile they gave to keep it with their account.
      offerAccount: done && !vfAccountPhone(),
      accountBody: C.accountBody.replace('{phone}', '\u2068' + (fa ? VF_FA_DIGITS(delivery.senderPhone || '') : delivery.senderPhone || '') + '\u2069'),
      isCard: method === 'card',
      isWa: method === 'wa',
      isWallet: method === 'wallet',
      walletAfter: fillWallet(PW.after, (balance || 0) - totals.total),
      // A signed-in customer whose balance is short can top up first; the bag waits here.
      showTopUp: balance != null && !canUseBalance && !done,
      topUpLabel: PW.topUp,
      topUpHref: (this.props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang: L, view: 'account', tab: 'balance'}),
      topUpGo: this.props.go ? vfLinkHandler(this.props.go) : undefined,
      busy: s.busy,placeDisabled:s.busy||s.failed||done||(method === 'wallet' && !canUseBalance),
      failed: s.failed,
      paymentNotice: P.demo,
      method,
      methodOptions: Object.entries(P.methods).map(([id, label]) => ({
        value: id,
        label,
        description: id === 'cod' && !codOk ? P.codOff : id === 'wallet' ? walletNote : undefined,
        checked: id === method,
        disabled: s.busy || id === 'cod' && !codOk || id === 'wallet' && !canUseBalance
      })),
      setMethod: e => !s.busy&&this.setState({
        method: e.target.value,
        err: false,
        failed: false
      }),
      migration: P,
      waOrder: VF_STORE.whatsapp + '?text=' + encodeURIComponent(items.map(l => vfLineToken(l) + ', ' + l[L][1] + ' × ' + l.qty).join('\n') + '\n' + m(totals.total)),
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
      steps: [C.s1, C.s2, C.s3, C.s4].map(label => ({
        label
      })),
      // Earlier steps stay reachable: the bag, then delivery details.
      stepClick: i => !done && this.props.go && i < 2 && this.props.go(i === 0 ? 'bag' : {view: 'bag', step: 'delivery'}),
      backHref: (this.props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang: L, view: 'bag', step: 'delivery'}),
      goBack: e => {
        if (!this.props.go) return;
        e && e.preventDefault && e.preventDefault();
        this.props.go({view: 'bag', step: 'delivery'});
      },
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
        if (method === 'wallet' && !canUseBalance) return;
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
          const id = 'VN-' + Date.now();
          // Paying from the balance takes the total out of it now; a failed deduction stops the order.
          let balanceAfter;
          if (method === 'wallet') {
            const account = vfWalletChange(phone, -totals.total, {kind: 'order', order: id});
            if (!account) {
              this.setState({failed: true});
              return;
            }
            balanceAfter = vfWalletOf(account).balance;
          }
          const record = {
            method,
            paymentStatus: P.statuses[method],
            preferredLocale: vfAccountLocale() || L,
            id,
            ...(balanceAfter != null ? {balanceAfter} : {}),
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
        name: vfLineToken(l),
        meta: l[L][1] + ' · × ' + (fa ? VF_FA_DIGITS(l.qty) : l.qty),
        total: m(l.unit * l.qty)
      })),
      sums: vfSummaryRows(totals, delivery.promo, {...C, discount: S.t.discount, balanceDiscount: S.t.balanceDiscount}, m, S.n),
      doneRows: [{
        icon: 'calendar',
        label: C.when,
        value: slotLabel
      }, {
        icon: 'map-pin',
        label: C.to,
        value: delivery.name + ' · ' + delivery.address + ' · \u2068' + delivery.phone + '\u2069'
      }, {
        icon: 'user',
        label: C.labels.from,
        value: delivery.sender ? delivery.sender + ' · \u2068' + delivery.senderPhone + '\u2069' : ''
      }, {
        icon: 'banknote',
        label: C.pay,
        value: P.methods[method] + ' · ' + m(totals.total)
      }, {
        icon: 'banknote',
        label: PW.left,
        value: method === 'wallet' && order && order.balanceAfter != null ? m(order.balanceAfter) : ''
      }, {
        icon: 'receipt',
        label: C.card,
        value: method === 'card' ? '•••• ' + (fa ? VF_FA_DIGITS(order ? order.last4 : s.last4) : order ? order.last4 : s.last4) : ''
      }, {
        icon: 'message-square',
        label: C.labels.cardMessage,
        value: vfCardMessages(items, delivery, L)
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
