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
  // Leaflet owns #vf-map's contents. Create the map once the element exists, and again if the page replaces it.
  _syncMap() {
    const box = document.getElementById('vf-map');
    if (this._map && (!box || this._map.getContainer() !== box)) {
      this._map.remove();
      this._map = null;
    }
    if (!box || this._map || this._mapPending || this.state.mapFailed) return;
    this._mapPending = true;
    vfLoadLeaflet().then(Leaflet => {
      this._mapPending = false;
      const el = document.getElementById('vf-map');
      if (!el || this._map || this._unmounted) return;
      const pinned = this._delivery().location;
      const ok = vfValidLocation(pinned);
      const map = Leaflet.map(el, {
        center: ok ? [pinned.lat, pinned.lng] : VF_STORE.map.center,
        zoom: ok ? 17 : VF_STORE.map.zoom,
        scrollWheelZoom: false
      });
      Leaflet.tileLayer(VF_STORE.map.tiles, {
        maxZoom: 19,
        attribution: VF_STORE.map.attribution
      }).addTo(map);
      // The pin is fixed at the centre, so wherever the map stops is the delivery point.
      map.on('moveend', () => this._update({
        location: vfPinLocation(map.getCenter())
      }));
      map.on('click', e => map.panTo(e.latlng));
      this._map = map;
      if (this._delivery().noMap) this._update({
        noMap: false
      });
    }).catch(() => {
      this._mapPending = false;
      if (this._unmounted) return;
      this.setState({
        mapFailed: true
      });
      this._update({
        noMap: true
      });
    });
  }
  _locate() {
    if (!navigator.geolocation) {
      this.setState({
        locateFailed: true
      });
      return;
    }
    this.setState({
      locating: true,
      locateFailed: false
    });
    navigator.geolocation.getCurrentPosition(position => {
      const here = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.setState({
        locating: false
      });
      if (this._map) this._map.setView([here.lat, here.lng], 17);
      else this._update({
        location: vfPinLocation(here)
      });
    }, () => this.setState({
      locating: false,
      locateFailed: true
    }), {
      enableHighAccuracy: true,
      timeout: 10000
    });
  }
  componentDidMount() {
    super.componentDidMount();
    this._syncMap();
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    this._syncMap();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this._unmounted = true;
    if (this._map) this._map.remove();
    this._map = null;
  }
}
