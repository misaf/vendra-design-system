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
    submitted: false,
    promoDraft: '',
    promoError: null,
    mapFailed: false,
    locating: false,
    locateFailed: false
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
    const totals = vfTotals(items.filter(vfLineAvailable), delivery);
    const {sub, total} = totals;
    const z = vfZone(delivery.zone);
    const date = vfDeliveryDate(delivery);
    const invalid = vfErrors(delivery);
    const update = patch => this._update(patch);
    const errors = C.errors;
    // A signed-in customer can fill the delivery from an address saved in their account.
    const phone = vfAccountPhone();
    const tx = v => typeof v === 'string' ? v : v[L] || v.en;
    const saved = phone ? vfAccountLoad(phone, L).addresses : [];
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
      addressError: s.submitted && invalid.address ? s.mapFailed ? errors.addressFull : errors.address : undefined,
      addressLabel: s.mapFailed ? C.addressFull : C.address2,
      addressHint: s.mapFailed ? undefined : C.addressHint,
      mapOk: !s.mapFailed,
      mapFailed: s.mapFailed,
      pinStatus: vfValidLocation(delivery.location) ? C.pinSet.replace('{location}', vfLocationText(delivery.location, fa)) : C.pinHint,
      pinError: s.submitted && invalid.location ? errors.location : s.locateFailed ? C.locateFailed : '',
      locating: s.locating,
      hasSaved: saved.length > 0,
      savedAddresses: saved.map(a => ({
        label: tx(a.label),
        on: tx(a.line) === delivery.address && (!vfValidLocation(a.location) || vfLocationText(a.location) === vfLocationText(delivery.location)),
        pick: () => {
          update({
            name: tx(a.recipient),
            phone: a.phone,
            zone: a.zone,
            address: tx(a.line),
            ...(vfValidLocation(a.location) ? {location: a.location} : {})
          });
          if (vfValidLocation(a.location)) this._pin().moveTo(a.location);
        }
      })),
      locate: () => this._locate(),
      next: () => {
        if (live.some(l => !vfLineAvailable(l))) return;
        this.setState({
          submitted: true
        });
        if (Object.values(invalid).some(Boolean)) {
          // The map can't carry aria-invalid, so focus it directly when the pin is the first problem.
          if (['name', 'phone', 'location', 'address'].find(k => invalid[k]) === 'location') S.focus('vf-map');
          else window.AG_NAV.focusFirstInvalid();
          return;
        }
        if (st) st.setDelivery({
          ...delivery,
          date,
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
      days: vfDeliveryDays(delivery.zone).map(day => {
        const off = day.soldOut || day.pastCutoff;
        return {
          label: vfDayName(day, fa),
          desc: day.soldOut ? C.soldOut : day.pastCutoff ? C.pastCutoff.replace('{time}', vfDeliveryCutoff(z, fa)) : vfDayMonth(day.date, fa),
          on: day.iso === date,
          off,
          pick: () => update({
            date: day.iso
          })
        };
      }),
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
      totalLabel: m(total),
      promoDraft: s.promoDraft,
      setPromoDraft: e => this.setState({
        promoDraft: e.target.value,
        promoError: null
      }),
      applyPromo: e => {
        e && e.preventDefault && e.preventDefault();
        const check = vfPromoCheck(s.promoDraft, sub);
        if (check.error) {
          this.setState({
            promoError: check
          });
          S.focus('vf-promo');
          return;
        }
        update({
          promo: check.promo.code
        });
        this.setState({
          promoDraft: '',
          promoError: null
        });
      },
      promoError: s.promoError ? s.promoError.error === 'min' ? C.promoMin.replace('{min}', m(s.promoError.min)) : C.promoUnknown : undefined,
      hasPromo: !!delivery.promo,
      noPromo: !delivery.promo,
      promoStatus: (() => {
        const promo = VF_PROMOS.find(p => p.code === delivery.promo);
        if (!promo) return '';
        return (totals.discount ? C.promoOn.replace('{percent}', n(promo.percent)) : C.promoPaused.replace('{min}', m(promo.min))).replace('{code}', promo.code);
      })(),
      removePromo: () => {
        update({
          promo: ''
        });
        S.focus('vf-promo');
      },
      sums: vfSummaryRows(totals, delivery.promo, {...C, discount: S.t.discount}, m),
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
  _update(patch) {
    const st = this.props.store;
    if (st) st.setDelivery(patch);
    else this.setState(prev => ({
      delivery: {
        ...prev.delivery,
        ...patch
      }
    }));
  }
  _delivery() {
    return this.props.store ? this.props.store.delivery : this.state.delivery;
  }
  // Leaflet owns #vf-map's contents; the shared pin map recreates it whenever the page replaces the element.
  _pin() {
    if (!this._pinMap) this._pinMap = vfPinMap({
      id: 'vf-map',
      location: () => this._delivery().location,
      onMove: location => this._update({location}),
      // A fallback left over from an earlier failed load no longer applies once the map is here.
      onReady: () => this._delivery().noMap && this._update({noMap: false}),
      onFail: () => {
        this.setState({mapFailed: true});
        this._update({noMap: true});
      }
    });
    return this._pinMap;
  }
  _locate() {
    this.setState({locating: true, locateFailed: false});
    vfLocate(here => {
      this.setState({locating: false});
      if (!this._pin().moveTo(here)) this._update({location: here});
    }, () => this.setState({locating: false, locateFailed: true}));
  }
  componentDidMount() {
    super.componentDidMount();
    this._pin().sync();
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    this._pin().sync();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this._pin().remove();
  }
}
