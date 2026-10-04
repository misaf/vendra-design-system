// Account preview with local, per-phone persistence. Copy and layout live beside this file.
class Component extends VFPage {
  state = {
    tab: null,
    account: null,
    form: null,
    errors: {},
    notice: '',
    profile: null
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
    const tab = s.tab || this.props.tab || 'orders',
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
      form: {
        kind: 'address',
        id: a && a.id,
        label: a ? tx(a.label) : '',
        line: a ? tx(a.line) : '',
        recipient: a ? tx(a.recipient) : profile.name || C.nameV,
        phone: a ? a.phone : '',
        zone: a ? a.zone : 'central'
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
        focusError();
        return;
      }
      const row = {
        ...f,
        id: f.id || f.kind + '-' + Date.now()
      };
      delete row.kind;
      if (isAddress) {
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
      tabItems: ['orders', 'addresses', 'reminders', 'profile'].map((id, i) => ({
        id,
        label: C.tabs[i]
      })),
      isOrders: tab === 'orders',
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
      addresses: account.addresses.map(a => ({
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
      })),
      addrLabels: C.addrLabels,
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
      setProfile: k => e => this.setState({
        profile: {
          ...profile,
          [k]: k === 'sms' ? e.target.checked : e.target.value
        },
        errors: {}
      }),
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
      formTitle: isAddress ? f.id ? E.editAddress : C.addAddr : f.id ? E.editReminder : E.addReminder,
      form: f,
      errors: s.errors,
      setField,
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
}
