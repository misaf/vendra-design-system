// Page behavior. Edit here, then run npm --prefix templates run build.
// Two checkout steps share this page: the bag (?view=bag) and delivery details (&step=delivery).
class Component extends VFPage {
  state = {
    lines: vfSampleBag(),
    step: null,
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
    const step = s.step || vfPageRoute(this.props).step || 'bag';
    const onDelivery = step === 'delivery';
    const live = st ? st.bag : s.lines;
    const delivery = st ? st.delivery : s.delivery;
    const totals = vfTotals(live.filter(vfLineAvailable), delivery);
    const {sub, total} = totals;
    const z = vfZone(delivery.zone);
    const date = vfDeliveryDate(delivery);
    const slot = vfDeliverySlot(delivery);
    const invalid = vfErrors(delivery, live);
    const update = patch => this._update(patch);
    const errors = C.errors;
    const shown = key => s.submitted && invalid[key];
    const pinned = vfValidLocation(delivery.location);
    // A signed-in customer can fill the delivery from an address saved in their account.
    const phone = vfAccountPhone();
    const tx = v => typeof v === 'string' ? v : v[L] || v.en;
    const saved = phone ? vfAccountLoad(phone, L).addresses : [];
    const zoneLabel = zone => (fa ? zone.fa : zone.en) + ' · ' + (vfFreeDelivery(zone.id, sub) ? C.free : m(zone.fee));
    const cardPrice = m(VF_ADDONS.find(a => a[0] === 'card')[1]);
    const missingCard = l => s.submitted && vfLineHasCard(l) && !String(l.card || '').trim();
    // Error summary rows in form order; each links to the field that needs attention.
    const problems = [
      ['name', 'vf-name', errors.name],
      ['phone', 'vf-phone', errors.phone],
      ['location', 'vf-map', errors.location],
      ['outside', 'vf-map', errors.outside],
      ['address', 'vf-address', s.mapFailed ? errors.addressFull : errors.address]
    ].filter(([key]) => invalid[key])
      .concat(live.map((l, i) => vfLineHasCard(l) && !String(l.card || '').trim() ? ['cards', 'vf-card-' + i, C.cardFor.replace('{name}', vfTokenText(vfLineToken(l))) + ': ' + errors.card] : null).filter(Boolean))
      .concat([['sender', 'vf-sender', errors.sender], ['senderPhone', 'vf-sender-phone', errors.senderPhone]].filter(([key]) => invalid[key]))
      .map(([, id, text]) => ({
        text,
        href: '#' + id,
        go: e => {
          e && e.preventDefault && e.preventDefault();
          S.focus(id);
        }
      }));
    const stepTo = next => {
      if (this.props.go) this.props.go({view: 'bag', step: next});
      else this.setState({step: next});
    };
    // "Order on WhatsApp" carries the bag, so the studio knows each product by its code.
    const waOrder = [C.wa.order, ...live.map(l => '- ' + C.wa.line.replace('{name}', vfLineToken(l)).replace('{detail}', l[L][1]).replace('{qty}', n(l.qty)))].join('\n');
    return {
      ...S,
      waHref: live.length ? S.waWith(waOrder) : S.waHref,
      t: {
        ...S.t,
        ...C
      },
      onBag: !onDelivery,
      onDelivery,
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
      setSender: e => update({
        sender: e.target.value
      }),
      setSenderPhone: e => update({
        senderPhone: e.target.value
      }),
      nameError: shown('name') ? errors.name : undefined,
      phoneError: shown('phone') ? errors.phone : undefined,
      senderError: shown('sender') ? errors.sender : undefined,
      senderPhoneError: shown('senderPhone') ? errors.senderPhone : undefined,
      addressError: shown('address') ? s.mapFailed ? errors.addressFull : errors.address : undefined,
      addressLabel: s.mapFailed ? C.addressFull : C.address2,
      addressHint: s.mapFailed ? undefined : C.addressHint,
      mapOk: !s.mapFailed,
      mapFailed: s.mapFailed,
      pinStatus: pinned ? C.pinSet.replace('{location}', vfLocationText(delivery.location, fa)) : C.pinHint,
      pinError: shown('location') ? errors.location : invalid.outside ? errors.outside : s.locateFailed ? C.locateFailed : '',
      locating: s.locating,
      // With a map, the pin decides the zone; the select is only the fallback when the map fails.
      zoneText: pinned && !invalid.outside ? zoneLabel(z) : '',
      zoneStatus: pinned && !invalid.outside ? C.zoneSet + vfDeliveryHint(z, fa) : C.zonePending,
      hasSaved: saved.length > 0,
      // Guests can sign in to use saved addresses, then come back to this step.
      guest: !phone,
      signinHref: (this.props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang: L, view: 'signin', next: 'delivery'}),
      goSignin: e => {
        if (!this.props.go) return;
        e && e.preventDefault && e.preventDefault();
        this.props.go({view: 'signin', next: 'delivery'});
      },
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
      hasProblems: s.submitted && problems.length > 0,
      problems,
      problemTitle: C.errorTitle.replace('{count}', n(problems.length)),
      toDelivery: () => {
        if (live.some(l => !vfLineAvailable(l))) return;
        stepTo('delivery');
      },
      backToBag: e => {
        e && e.preventDefault && e.preventDefault();
        stepTo('bag');
      },
      bagHref: (this.props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang: L, view: 'bag'}),
      stepClick: i => i === 0 && stepTo('bag'),
      next: () => {
        if (live.some(l => !vfLineAvailable(l))) return;
        this.setState({
          submitted: true
        });
        if (problems.length) {
          // One problem goes straight to its field; several go to the summary that lists them.
          // The map can't carry aria-invalid, so it is focused directly.
          if (problems.length > 1) S.focus('vf-errors');
          else if (problems[0].href === '#vf-map') S.focus('vf-map');
          else window.AG_NAV.focusFirstInvalid();
          return;
        }
        if (st) st.setDelivery({
          ...delivery,
          date,
          slot,
          phone: vfPhone(delivery.phone),
          senderPhone: vfPhone(delivery.senderPhone)
        });
        if (this.props.go) this.props.go('checkout');
      },
      hasItems: live.length > 0,
      noItems: live.length === 0,
      steps: [C.s1, C.s2, C.s3, C.s4].map(label => ({
        label
      })),
      stepIndex: onDelivery ? 1 : 0,
      caption: (i, count, label) => C.caption.replace('{n}', i).replace('{total}', count).replace('{label}', label),
      fmt: fa ? v => VF_FA_DIGITS(v) : v => String(v),
      qtyLabels: {
        dec: C.dec,
        inc: C.inc
      },
      lines: live.map((l, i) => ({
        unavailable: !vfLineAvailable(l),
        unavailableLabel: fa ? 'ناموجود؛ برای ادامه از سبد حذف کنید' : 'Unavailable; remove to continue',
        image: vfProductImage(l, L).src,
        name: vfLineToken(l),
        meta: l[L][1] + ' · ' + C.labels.each + m(l.unit),
        note: String(l.card || '').trim() ? vfCardMessages([l], {}, L) : vfLineHasCard(l) ? C.cardNext : undefined,
        price: m(l.unit * l.qty),
        qty: l.qty,
        setQty: q => st ? st.setQty(l.id, q) : this._lines(lines => lines.map(x => x.id === l.id ? {...x, qty: q} : x)),
        remove: () => {
          st ? st.remove(l.id) : this._lines(lines => lines.filter(x => x.id !== l.id));
          S.focusAfterRemoval('.ag-line__remove', i);
        }
      })),
      // Lines with a handwritten card need its message; the others can add one here.
      cardLines: live.map((l, i) => ({
        id: 'vf-card-' + i,
        hasCard: vfLineHasCard(l),
        noCard: !vfLineHasCard(l),
        label: C.cardFor.replace('{name}', vfTokenText(vfLineToken(l))),
        name: vfLineToken(l),
        detail: l[L][1],
        value: l.card || '',
        error: missingCard(l) ? errors.card : undefined,
        setCard: e => st ? st.setCard(l.id, e.target.value) : this._lines(lines => lines.map(x => x.id === l.id ? {...x, card: e.target.value} : x)),
        addLabel: C.addCard.replace('{price}', cardPrice),
        addAria: C.addCardLabel.replace('{price}', cardPrice).replace('{name}', vfTokenText(vfLineToken(l))),
        add: () => {
          if (st) st.addCard(l.id);
          else this._lines(lines => lines.map(x => x.id === l.id ? vfLineWithCard(x) : x));
          setTimeout(() => S.focus('vf-card-' + i), 0);
        }
      })),
      zone: delivery.zone,
      setZone: e => update({
        zone: e.target.value
      }),
      zoneHint: vfDeliveryHint(z, fa),
      zones: VF_ZONES.map(zone => ({
        value: zone.id,
        label: zoneLabel(zone)
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
      slots: vfDeliverySlots(date).map(({start, end, closed}) => ({
        label: vfSlotLabel(start, end, fa),
        desc: closed ? C.slotClosed : undefined,
        on: slot === start,
        off: closed,
        pick: () => update({
          slot: start
        })
      })),
      summary: live.map(l => ({
        image: vfProductImage(l, L).src,
        name: vfLineToken(l),
        meta: l[L][1] + ' · × ' + n(l.qty),
        total: m(l.unit * l.qty)
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
      hasPromo: !onDelivery && !!delivery.promo,
      noPromo: !onDelivery && !delivery.promo,
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
      sums: vfSummaryRows(totals, delivery.promo, {...C, discount: S.t.discount, balanceDiscount: S.t.balanceDiscount}, m, S.n),
      restore: e => {
        e && e.preventDefault && e.preventDefault();
        if (st) {
          st.reset();
          return;
        }
        this.setState({
          lines: vfSampleBag()
        });
      }
    };
  }
  _lines(change) {
    this.setState(prev => ({lines: change(prev.lines)}));
  }
  _update(patch) {
    const st = this.props.store;
    // A pin inside a delivery zone sets the zone, and with it the fee and cut-off.
    if (patch.location && !this._delivery().noMap && vfZoneAt(patch.location)) patch = {...patch, zone: vfZoneAt(patch.location)};
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
  // A signed-in customer's own name and mobile fill "Your details" when they are empty.
  _prefillSender() {
    const phone = vfAccountPhone(), d = this._delivery();
    if (!phone || d.sender || d.senderPhone) return;
    const profile = vfAccountLoad(phone, this.props.lang === 'fa' ? 'fa' : 'en').profile || {};
    this._update({sender: profile.name || '', senderPhone: phone});
  }
  componentDidMount() {
    super.componentDidMount();
    this._prefillSender();
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
