// Page behavior. Edit here, then run npm --prefix templates run build.
const VF_LINES = vfSampleBag();
class Component extends VFPage {
  state = {
    qty: {
      'ivory-classic': 1,
      orchid: 1
    },
    removed: [],
    delivery: {
      ...VF_DELIVERY
    },
    submitted: false
  };
  renderVals() {
    const fa = this.props.lang === 'fa';
    const L = fa ? 'fa' : 'en';
    const S = vfShell.call(this, this.props, 'bag');
    const s = this.state;
    const m = v => VF_MONEY(v, fa);
    const n = v => fa ? VF_FA_DIGITS(v) : String(v);
    const C = vfCopy(S);
    const st = this.props.store;
    const Q = id => st ? (st.bag.find(x => x.id === id) || {
      qty: 0
    }).qty : s.qty[id];
    const live = st ? st.bag : VF_LINES.filter(l => !s.removed.includes(l.id));
    const delivery = st ? st.delivery : s.delivery;
    const items = live.map(l => ({
      ...l,
      qty: Q(l.id)
    }));
    const {
      sub,
      fee
    } = vfTotals(items.filter(vfLineAvailable), delivery);
    const z = VF_ZONES.find(x => x[0] === delivery.zone) || VF_ZONES[0];
    const invalid = vfErrors(delivery);
    const update = patch => st ? st.setDelivery(patch) : this.setState({
      delivery: {
        ...s.delivery,
        ...patch
      }
    });
    const errors = C.errors;
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      delivery,
      setName: e => update({
        name: e.target.value
      }),
      setPhone: e => update({
        phone: e.target.value
      }),
      setAddress: e => update({
        address: e.target.value
      }),
      setCard: e => update({
        card: e.target.value
      }),
      nameError: s.submitted && invalid.name ? errors.name : undefined,
      phoneError: s.submitted && invalid.phone ? errors.phone : undefined,
      addressError: s.submitted && invalid.address ? errors.address : undefined,
      next: () => {
        if (live.some(l => !vfLineAvailable(l))) return;
        this.setState({
          submitted: true
        });
        if (Object.values(invalid).some(Boolean)) {
          window.AG_NAV.focusFirstInvalid();
          return;
        }
        if (st) st.setDelivery({
          ...delivery,
          phone: vfPhone(delivery.phone)
        });
        if (this.props.go) this.props.go('checkout');
      },
      hasItems: live.length > 0,
      noItems: live.length === 0,
      steps: [{
        label: C.s1
      }, {
        label: C.s2
      }, {
        label: C.s3
      }],
      fmt: fa ? v => VF_FA_DIGITS(v) : v => String(v),
      qtyLabels: {
        dec: C.dec,
        inc: C.inc
      },
      lines: live.map((l, i) => ({
        unavailable: !vfLineAvailable(l),
        unavailableLabel: fa ? 'ناموجود؛ برای ادامه از سبد حذف کنید' : 'Unavailable; remove to continue',
        image: vfProductImage(l, L).src,
        name: l[L][0],
        meta: l[L][1] + ' · ' + C.labels.each + m(l.unit),
        note: l[L][2],
        price: m(l.unit * Q(l.id)),
        qty: Q(l.id),
        setQty: q => st ? st.setQty(l.id, q) : this.setState({
          qty: {
            ...s.qty,
            [l.id]: q
          }
        }),
        remove: () => {
          st ? st.remove(l.id) : this.setState({
            removed: [...s.removed, l.id]
          });
          S.focusAfterRemoval('.ag-line__remove', i);
        }
      })),
      zone: delivery.zone,
      setZone: e => update({
        zone: e.target.value
      }),
      zoneHint: vfDeliveryHint(z, fa),
      zones: VF_ZONES.map(zone => ({
        value: zone.id,
        label: (fa ? zone.fa : zone.en) + ' · ' + m(zone.fee)
      })),
      slots: VF_SLOTS.map(([a, b]) => ({
        label: vfSlotLabel(a, b, fa),
        on: delivery.slot === a,
        pick: () => update({
          slot: a
        })
      })),
      summary: live.map(l => ({
        image: vfProductImage(l, L).src,
        name: l[L][0],
        meta: l[L][1] + ' · × ' + n(Q(l.id)),
        total: m(l.unit * Q(l.id))
      })),
      totalLabel: m(sub + fee),
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
      restore: e => {
        e && e.preventDefault && e.preventDefault();
        if (st) {
          st.reset();
          return;
        }
        this.setState({
          removed: [],
          qty: {
            'ivory-classic': 1,
            orchid: 1
          }
        });
      }
    };
  }
}
