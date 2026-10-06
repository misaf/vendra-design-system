// Account preview with local, per-phone persistence. Copy and layout live beside this file.
const VF_ACCOUNT_SAVED = ['VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE'];
class Component extends VFPage {
  state = {
    tab: null,
    account: null,
    form: null,
    errors: {},
    notice: '',
    profile: null,
    mapFailed: false,
    placesFailed: false,
    locating: false,
    locateFailed: false,
    topUp: '',
    topUpError: '',
    topUpBusy: false,
    topUpDone: ''
  };
  renderVals() {
    const S = vfShell.call(this, this.props, 'account'),
      C = vfCopy(S),
      E = C.editor,
      s = this.state,
      L = S.lang;
    const phone = vfAccountPhone() || '09125649438',
      account = s.account || vfAccountLoad(phone, L),
      profile = s.profile || account.profile;
    const latest = this.props.store && (this.props.store.lastOrder || this.props.store.order);
    const orders = [...(latest ? [latest] : []), ...vfSampleOrders()].filter((o, i, list) => list.findIndex(x => x.id === o.id) === i);
    const tab = s.tab || vfPageRoute(this.props).tab || this.props.tab || 'orders',
      tx = v => typeof v === 'string' ? v : v[L] || v.en;
    const commit = data => {
      vfAccountSave(phone, data);
      this.setState({
        account: data,
        form: null,
        profile: null,
        errors: {},
        notice: E.saved
      });
    };
    const focusError = () => setTimeout(() => window.AG_NAV.focusFirstInvalid(), 0);
    const openAddress = a => this.setState({
      errors: {},
      locateFailed: false,
      form: {
        kind: 'address',
        id: a && a.id,
        label: a ? tx(a.label) : '',
        line: a ? tx(a.line) : '',
        recipient: a ? tx(a.recipient) : profile.name || C.nameV,
        phone: a ? a.phone : '',
        zone: a ? a.zone : 'central',
        location: a && vfValidLocation(a.location) ? a.location : null
      }
    });
    const openReminder = r => this.setState({
      errors: {},
      form: {
        kind: 'reminder',
        id: null,
        name: '',
        occ: 'birthday',
        cal: L === 'fa' ? 'j' : 'g',
        m: 1,
        d: 1,
        before: 3,
        channel: 'sms',
        on: true,
        ...r,
        ...(r ? {
          name: tx(r.name)
        } : {})
      }
    });
    const removeAddress = a => {
      let rest = account.addresses.filter(x => x.id !== a.id);
      if (a.isDefault && rest.length) rest = rest.map((x, i) => ({
        ...x,
        isDefault: i === 0
      }));
      commit({
        ...account,
        addresses: rest
      });
      S.focus('vf-add-address');
    };
    const reminders = account.reminders.slice().sort((a, b) => Number(b.on) - Number(a.on) || vfReminderNext(a).days - vfReminderNext(b).days).map(r => {
      const next = vfReminderNext(r),
        o = VF_OCCASIONS.find(o => o.id === r.occ) || VF_OCCASIONS[0],
        date = window.AG_DATES.parts(r.cal, next.date);
      return {
        name: tx(r.name),
        day: S.n(date[2]),
        month: window.AG_DATES.monthNames(r.cal, L)[date[1] - 1],
        occasion: o[L],
        icon: o.icon,
        before: E.beforeOptions[r.before],
        channel: r.channel,
        on: r.on,
        soon: r.on && next.days <= 14,
        when: S.n(next.days) + ' ' + E.inDays,
        altDate: window.AG_DATES.dayMonth(next.date, window.AG_DATES.locale(L, r.cal === 'j' ? 'g' : 'j')),
        toggle: v => commit({
          ...account,
          reminders: account.reminders.map(x => x.id === r.id ? {
            ...x,
            on: v
          } : x)
        }),
        edit: () => openReminder(r),
        remove: () => {
          commit({
            ...account,
            reminders: account.reminders.filter(x => x.id !== r.id)
          });
          S.focus('vf-add-reminder');
        }
      };
    });
    const f = s.form || {},
      isAddress = f.kind === 'address',
      isReminder = f.kind === 'reminder',
      occasion = VF_OCCASIONS.find(o => o.id === f.occ);
    // Templates can't call functions, so each field gets its own handler.
    const setField = k => e => this.setState({
      form: {
        ...f,
        [k]: e.target.value
      },
      errors: {
        ...s.errors,
        [k]: undefined
      }
    });
    const saveForm = () => {
      const errors = {};
      if (isAddress) {
        if (!s.mapFailed && !vfValidLocation(f.location)) errors.location = E.pinError;
        if (f.line.trim().length < 6) errors.line = E.addressError;
        if (vfLatin(f.phone).replace(/\D/g, '').length < 10) errors.phone = E.phoneError;
      } else {
        if (!f.name.trim()) errors.name = E.required;
        if (!(f.m >= 1 && f.m <= 12 && f.d >= 1 && f.d <= window.AG_DATES.daysInMonth(f.cal, f.cal === 'j' ? 1403 : 2024, f.m))) errors.name = E.required;
      }
      if (Object.keys(errors).length) {
        this.setState({
          errors
        });
        // The map comes first in the form and can't carry aria-invalid, so it takes focus itself.
        if (errors.location) S.focus('vf-address-map');
        else focusError();
        return;
      }
      const row = {
        ...f,
        id: f.id || f.kind + '-' + Date.now()
      };
      delete row.kind;
      if (isAddress) {
        if (!row.location) delete row.location;
        row.isDefault = f.id ? account.addresses.find(a => a.id === f.id).isDefault : !account.addresses.length;
        row.label = row.label.trim() || C.addAddr;
        commit({
          ...account,
          addresses: f.id ? account.addresses.map(a => a.id === f.id ? row : a) : [...account.addresses, row]
        });
      } else {
        if (!f.id) window.VF_TRACK.event('reminder_created', {
          occasion: f.occ,
          calendar: f.cal,
          days_before: f.before,
          channel: f.channel
        });
        commit({
          ...account,
          reminders: f.id ? account.reminders.map(r => r.id === f.id ? row : r) : [...account.reminders, row]
        });
      }
    };
    const addresses = account.addresses.map(a => ({
      ...a,
      label: tx(a.label),
      line: tx(a.line),
      recipient: tx(a.recipient),
      zone: (VF_ZONES.find(z => z.id === a.zone) || VF_ZONES[0])[L],
      edit: () => openAddress(a),
      remove: () => removeAddress(a),
      makeDefault: () => commit({
        ...account,
        addresses: account.addresses.map(x => ({
          ...x,
          isDefault: x.id === a.id
        }))
      })
    }));
    // Read by the addresses map after each render.
    this._places = addresses.map(a => ({
      id: a.id,
      label: a.label,
      title: C.addrLabels.edit.replace('{name}', a.label),
      location: a.location,
      pick: a.edit
    }));
    const saved = VF_PRODUCTS.filter(p => S.isFav(p.id, VF_ACCOUNT_SAVED));
    // Balance: top-ups and order payments, with the balance discount rule from VF_STORE.wallet.
    const W = C.balance, rules = VF_STORE.wallet, wallet = vfWalletOf(account);
    const amount = vfTopUpAmount(s.topUp);
    const fill = text => text.replace('{percent}', S.n(rules.discountPercent)).replace('{from}', S.m(rules.discountFrom))
      .replace('{left}', S.m(Math.max(0, rules.discountFrom - wallet.balance))).replace('{min}', S.m(rules.minTopUp)).replace('{max}', S.m(rules.maxTopUp));
    const when = iso => new Intl.DateTimeFormat(S.fa ? 'fa-IR-u-ca-persian' : 'en-GB', {day: 'numeric', month: 'short', year: 'numeric'}).format(new Date(iso));
    return {
      ...S,
      t: {
        ...S.t,
        ...C
      },
      editor: E,
      notice: s.notice,
      tab,
      setTab: id => this.setState({
        tab: id
      }),
      tabItems: VF_ACCOUNT_TABS.map((id, i) => ({
        id,
        label: C.tabs[i]
      })),
      tabPanelId: 'vf-account-panel-' + tab,
      tabId: 'vf-account-tab-' + tab,
      isOrders: tab === 'orders',
      isSaved: tab === 'saved',
      isBalance: tab === 'balance',
      balance: {
        amount: S.m(wallet.balance),
        eligible: vfBalanceDiscountOn(wallet.balance),
        status: fill(vfBalanceDiscountOn(wallet.balance) ? W.eligible : W.progress),
        presets: rules.topUps.map(value => ({
          label: S.m(value),
          pressed: amount === value,
          pick: () => this.setState({topUp: String(value), topUpError: '', topUpDone: ''})
        })),
        value: s.topUp,
        set: e => this.setState({topUp: e.target.value, topUpError: '', topUpDone: ''}),
        hint: fill(W.amountHint),
        error: s.topUpError ? fill(W.errors[s.topUpError]) : undefined,
        busy: s.topUpBusy,
        payLabel: amount && !vfTopUpError(amount) ? W.pay.replace('{amount}', S.m(amount)) : W.topUp,
        done: s.topUpDone,
        submit: () => {
          if (s.topUpBusy) return;
          const error = vfTopUpError(amount);
          if (error) {
            this.setState({topUpError: error, topUpDone: ''});
            S.focus('vf-topup-amount');
            return;
          }
          // Demo payment: a real store confirms the top-up with its payment provider before adding it.
          this.setState({topUpBusy: true, topUpDone: ''});
          this._topUpTimer = setTimeout(() => {
            const next = vfWalletChange(phone, amount, {kind: 'topup'});
            window.VF_TRACK.event('top_up', {value: amount});
            this.setState({account: next, topUp: '', topUpBusy: false, topUpDone: W.done.replace('{amount}', S.m(amount))});
            S.focus('vf-topup-done');
          }, 600);
        },
        hasHistory: wallet.history.length > 0,
        noHistory: !wallet.history.length,
        history: wallet.history.map(h => ({
          label: h.kind === 'order' ? W.kinds.order.replace('{id}', '\u2068' + h.order + '\u2069') : W.kinds.topup,
          date: when(h.at),
          amount: (h.amount < 0 ? '−' : '+') + '\u2068' + S.m(Math.abs(h.amount)) + '\u2069',
          tone: h.amount < 0 ? 'out' : 'in'
        }))
      },
      isAddresses: tab === 'addresses',
      isReminders: tab === 'reminders',
      isProfile: tab === 'profile',
      orders: orders.map(o => ({
        href: S.href.track.split('?')[0] + vfRouteParams({
          view: 'track',
          id: o.id,
          lang: L
        }),
        go: this.props.go ? vfLinkHandler(this.props.go) : undefined,
        id: o.id,
        status: (C.status[o.status] || [o.status === 'cancelled' ? S.fa ? 'لغو شده' : 'Cancelled' : S.fa ? 'دریافت شد' : 'Received', 'neutral'])[0],
        tone: (C.status[o.status] || ['', 'neutral'])[1],
        meta: C.itemCount(o.lines.reduce((sum, l) => sum + l.qty, 0)),
        total: S.m(o.totals.total),
        cta: o.status === 'delivered' || o.status === 'cancelled' ? C.labels.viewOrder : C.labels.trackOrder
      })),
      addresses,
      placesMap: !s.placesFailed && addresses.some(a => vfValidLocation(a.location)),
      addrLabels: C.addrLabels,
      hasSaved: saved.length > 0,
      noSaved: !saved.length,
      savedItems: saved.map((p, i) => ({
        ...S.productLink(p.id),
        images: [vfProductImage(p, L)],
        name: p.id,
        sub: vfProductSub(p, L),
        badge: p[L].badge,
        price: S.m(p.price),
        remove: () => {
          S.toggleFav(p.id, VF_ACCOUNT_SAVED)();
          S.focusAfterRemoval('.ag-product__fav', i);
        }
      })),
      addAddress: () => openAddress(null),
      reminders,
      remLabels: C.remLabels,
      hasReminders: reminders.length > 0,
      noReminders: !reminders.length,
      coming: reminders.find(r => r.soon),
      addReminder: () => openReminder(null),
      profile: {
        ...profile,
        name: profile.name || C.nameV,
        phone
      },
      setProfile: Object.fromEntries(['name', 'email', 'locale', 'sms'].map(k => [k, e => this.setState({
        profile: {
          ...profile,
          [k]: k === 'sms' ? e.target.checked : e.target.value
        },
        errors: {}
      })])),
      emailError: s.errors.email,
      saveProfile: () => {
        if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(profile.email.trim())) {
          this.setState({
            errors: {
              email: E.emailError
            }
          });
          focusError();
          return;
        }
        commit({
          ...account,
          profile
        });
        if (this.props.setLang) this.props.setLang(profile.locale);
      },
      signOut: () => {
        vfAccountSignOut();
        if (this.props.go) this.props.go({
          view: 'home',
          lang: L
        });else location.href = S.href.home;
      },
      langOptions: C.langOptions,
      formOpen: !!s.form,
      isAddress,
      isReminder,
      mapOk: !s.mapFailed,
      mapFailed: s.mapFailed,
      pinStatus: vfValidLocation(f.location) ? E.pinSet.replace('{location}', vfLocationText(f.location, S.fa)) : E.pinHint,
      pinError: s.errors.location || (s.locateFailed ? E.locateFailed : ''),
      locating: s.locating,
      locate: () => this._locate(),
      formTitle: isAddress ? f.id ? E.editAddress : C.addAddr : f.id ? E.editReminder : E.addReminder,
      form: f,
      errors: s.errors,
      set: Object.fromEntries(['label', 'zone', 'line', 'recipient', 'phone', 'name', 'channel'].map(k => [k, setField(k)])),
      saveForm,
      closeForm: () => this.setState({
        form: null,
        errors: {}
      }),
      zoneOptions: VF_ZONES.map(z => ({
        value: z.id,
        label: z[L]
      })),
      occasionOptions: VF_OCCASIONS.map(o => ({
        value: o.id,
        label: o[L]
      })),
      beforeOptions: [1, 3, 7].map(n => ({
        value: String(n),
        label: E.beforeOptions[n]
      })),
      channelOptions: [{
        value: 'sms',
        label: E.sms
      }, {
        value: 'wa',
        label: E.wa
      }],
      dateValue: {
        cal: f.cal,
        m: f.m,
        d: f.d
      },
      dateLocked: !!(occasion && (occasion.fixed || occasion.hijri)),
      dateHint: occasion && occasion.fixed ? E.fixed : occasion && occasion.hijri ? E.movable : undefined,
      dateLabels: {
        jalali: E.jalali,
        gregorian: E.gregorian,
        month: E.month,
        day: E.day
      },
      setDate: value => this.setState({
        form: {
          ...f,
          ...value
        }
      }),
      setBefore: e => this.setState({
        form: {
          ...f,
          before: +e.target.value
        }
      }),
      setOccasion: e => {
        const o = VF_OCCASIONS.find(o => o.id === e.target.value);
        let date = o.fixed || {};
        if (o.hijri) {
          const n = vfReminderNext({
              occ: o.id
            }),
            p = window.AG_DATES.parts(f.cal, n.date);
          date = {
            cal: f.cal,
            m: p[1],
            d: p[2]
          };
        }
        this.setState({
          form: {
            ...f,
            occ: o.id,
            ...date
          }
        });
      }
    };
  }
  // The pin in the address editor. Its element only exists while the editor is open.
  _pin() {
    if (!this._pinMap) this._pinMap = vfPinMap({
      id: 'vf-address-map',
      location: () => this.state.form && this.state.form.location,
      onMove: location => this._setLocation(location),
      onFail: () => this.setState({mapFailed: true})
    });
    return this._pinMap;
  }
  _setLocation(location) {
    this.setState(prev => prev.form ? {
      form: {...prev.form, location},
      errors: {...prev.errors, location: undefined},
      locateFailed: false
    } : null);
  }
  _placesMap() {
    if (!this._placesView) this._placesView = vfPlacesMap({
      id: 'vf-account-map',
      places: () => this._places || [],
      onFail: () => this.setState({placesFailed: true})
    });
    return this._placesView;
  }
  _locate() {
    this.setState({locating: true, locateFailed: false});
    vfLocate(here => {
      this.setState({locating: false});
      if (!this._pin().moveTo(here)) this._setLocation(here);
    }, () => this.setState({locating: false, locateFailed: true}));
  }
  componentDidMount() {
    super.componentDidMount();
    this._pin().sync();
    this._placesMap().sync();
  }
  componentDidUpdate() {
    super.componentDidUpdate();
    this._pin().sync();
    this._placesMap().sync();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    clearTimeout(this._topUpTimer);
    this._pin().remove();
    this._placesMap().remove();
  }
}
