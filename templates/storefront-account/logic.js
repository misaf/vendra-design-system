// Page behavior. Edit here, then run npm --prefix templates run build.
class Component extends VFPage {
  state = {
    tab: null,
    def: 'home',
    rem: {
      mum: true,
      mina: true,
      sara: false
    }
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'account');
    const fa = S.fa;
    const m = S.m;
    const s = this.state;
    const tab = s.tab || this.props.tab || 'orders';
    const C = vfCopy(S);
    const ids = ['orders', 'addresses', 'reminders', 'profile'];
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      tab,
      setTab: id => this.setState({
        tab: id
      }),
      tabItems: ids.map((id, i) => ({
        id,
        label: C.tabs[i]
      })),
      isOrders: tab === 'orders',
      isAddresses: tab === 'addresses',
      isReminders: tab === 'reminders',
      isProfile: tab === 'profile',
      orders: C.orders.map(o => ({
        id: o[0],
        status: C.status[o[2]][0],
        tone: C.status[o[2]][1],
        meta: (fa ? o[5] : o[4]) + ' · ' + C.itemCount(o[1]),
        total: m(o[3]),
        cta: o[2] === 'delivered' ? C.labels.viewOrder : C.labels.trackOrder
      })),
      addresses: C.addresses.map(a => ({
        label: a[1],
        line: a[2],
        recipient: a[3],
        phone: '0912 564 9438',
        zone: a[4],
        isDefault: s.def === a[0],
        makeDefault: () => this.setState({
          def: a[0]
        })
      })),
      addrLabels: C.addrLabels,
      reminders: C.reminders.map(r => ({
        name: r[1],
        day: r[2],
        month: r[3],
        occasion: r[4],
        icon: r[5],
        before: r[6],
        channel: r[7],
        soon: r[8],
        on: s.rem[r[0]],
        toggle: v => this.setState({
          rem: {
            ...s.rem,
            [r[0]]: v
          }
        })
      })),
      remLabels: C.remLabels,
      langOptions: C.langOptions
    };
  }
}
