// Account preview with local, per-phone persistence. Copy and layout live beside this file.
import {vfSavedItems} from '../saved-items.js';
import {VF_NAV} from '../../../platform/browser/page-focus.js';
import {vfCopy} from './copy.js';
import {
  VF_OCCASIONS,
  vfAccountLoad,
  vfAccountPhone,
  vfAccountSignOut,
  vfReminderNext
} from '../account-data.js';
import {vfKnownOrders} from '../../orders/order-records.js';
import {VF_PRODUCTS, vfProductBadge, vfProductImage, vfProductSub} from '../../catalog/catalog.js';
import {VF_ZONES} from '../../delivery/delivery-zones.js';
import {vfLoadLeaflet} from '../../../platform/browser/integrations/leaflet.js';
import {vfLocationText, vfValidLocation} from '../../delivery/location.js';
import {vfShell} from '../../shell/shell-props.js';
import {VF_ACCOUNT_TABS} from '../account-tabs.js';
import {vfPageRoute, vfRouteUrl} from '../../shell/routing.js';
import {VF_STORE, vfFeatures} from '../../store/store-config.js';
import {vfBalanceDiscountOn, vfWalletOf} from '../wallet.js';
import {vfAmountInputMode} from '../../pricing/formatting.js';
import {dates} from '../../../design-system/utils/dates.js';
import {usePageLogic} from '../../shell/page-state.js';
import {useStorefrontPage} from '../../shell/page-lifecycle.js';
import {createAccountEditorActions} from './account-editor-actions.js';
import {useAccountWallet} from './useAccountWallet.js';
const VF_ACCOUNT_SAVED = ['VF-8RD5WN', 'VF-4CJ6ZB', 'VF-9FA2KE'];
// The page: its state (applied at once, as the logic reads it back), effects and the values
// its View renders.
export function useAccount(props) {
  const page = usePageLogic(props, page => {
    page.state = {
      tab: null,
      account: null,
      form: null,
      errors: {},
      notice: '',
      saveError: '',
      profile: null,
      profileChanges: {},
      mapFailed: false,
      placesFailed: false,
      locateFailed: false,
      topUp: '',
      topUpPreset: null,
      topUpError: '',
      topUpBusy: false,
      topUpDone: ''
    };
  });
  useStorefrontPage(page);

  const savedItems = vfSavedItems(page, VF_ACCOUNT_SAVED);
  const S = vfShell(page, 'account'),
    C = vfCopy(S),
    E = C.editor,
    s = page.state,
    L = S.lang;
  const phone = vfAccountPhone() || '09125649438',
    account = s.account || vfAccountLoad(phone, L),
    profile = s.profile || account.profile;
  const orders = vfKnownOrders(page.props.store);
  // The Balance tab is the account side of paying from a balance: it shows only when the store takes
  // that method (VF_STORE.paymentMethods). Reminders show when the store offers them (VF_STORE.features).
  const tabs = VF_ACCOUNT_TABS.filter(id =>
    id === 'balance'
      ? VF_STORE.paymentMethods.some(method => method.id === 'wallet')
      : id !== 'reminders' || vfFeatures().reminders
  );
  const route = vfPageRoute(page.props);
  const asked = s.tab || route.tab || page.props.tab;
  const tab = tabs.includes(asked) ? asked : 'orders',
    tx = v => (typeof v === 'string' ? v : v[L] || v.en);
  const f = s.form || {},
    isAddress = f.kind === 'address',
    isReminder = f.kind === 'reminder',
    occasion = VF_OCCASIONS.find(o => o.id === f.occ);
  const editorActions = createAccountEditorActions({
    phone,
    lang: L,
    form: f,
    errors: s.errors,
    mapFailed: s.mapFailed,
    profile,
    profileChanges: s.profileChanges,
    editor: E,
    defaultName: C.nameV,
    defaultAddressLabel: C.addAddr,
    translate: tx,
    setState: page.setState,
    setLang: page.props.setLang,
    focus: VF_NAV.focusById
  });
  const reminders = account.reminders
    .slice()
    .sort((a, b) => Number(b.on) - Number(a.on) || vfReminderNext(a).days - vfReminderNext(b).days)
    .map(r => {
      const next = vfReminderNext(r),
        o = VF_OCCASIONS.find(o => o.id === r.occ) || VF_OCCASIONS[0],
        date = dates.parts(r.cal, next.date);
      return {
        name: tx(r.name),
        day: S.n(date[2]),
        month: dates.monthNames(r.cal, L)[date[1] - 1],
        occasion: o[L],
        icon: o.icon,
        before: E.beforeOptions[r.before],
        channel: r.channel,
        on: r.on,
        soon: r.on && next.days <= 14,
        when: S.n(next.days) + ' ' + E.inDays,
        altDate: dates.dayMonth(next.date, dates.locale(L, r.cal === 'j' ? 'g' : 'j')),
        toggle: on => editorActions.toggleReminder(r.id, on),
        edit: () => editorActions.openReminder(r),
        remove: () => editorActions.removeReminder(r.id)
      };
    });
  const addresses = account.addresses.map(a => ({
    ...a,
    label: tx(a.label),
    line: tx(a.line),
    recipient: tx(a.recipient),
    zone: (VF_ZONES.find(z => z.id === a.zone) || VF_ZONES[0])[L],
    edit: () => editorActions.openAddress(a),
    remove: () => editorActions.removeAddress(a.id),
    makeDefault: () => editorActions.makeDefaultAddress(a.id)
  }));
  // The saved addresses on a read-only map (PlacesMap); each marker opens its address.
  const placesView = {
    places: addresses.map(a => ({
      id: a.id,
      label: a.label,
      title: C.addrLabels.edit.replace('{name}', a.label),
      location: a.location,
      onSelect: a.edit
    })),
    load: vfLoadLeaflet,
    tiles: {url: VF_STORE.map.tiles, attribution: VF_STORE.map.attribution},
    center: VF_STORE.map.center,
    zoom: VF_STORE.map.zoom,
    fail: () => page.setState({placesFailed: true})
  };
  const saved = VF_PRODUCTS.filter(p => savedItems.ids.includes(p.id));
  // Balance: top-ups and order payments, with the balance discount rule from VF_STORE.wallet.
  const W = C.balance,
    rules = VF_STORE.wallet,
    wallet = vfWalletOf(account);
  const topUp = useAccountWallet({
    phone,
    topUp: s.topUp,
    topUpPreset: s.topUpPreset,
    topUpBusy: s.topUpBusy,
    doneMessage: amount => W.done.replace('{amount}', S.m(amount)),
    setState: page.setState,
    focus: VF_NAV.focusById
  });
  const eligible = vfBalanceDiscountOn(wallet.balance);
  const fill = text =>
    text
      .replace('{percent}', S.n(rules.discountPercent))
      .replace('{from}', S.m(rules.discountFrom))
      .replace('{left}', S.m(Math.max(0, rules.discountFrom - wallet.balance)))
      .replace('{min}', S.m(rules.minTopUp))
      .replace('{max}', S.m(rules.maxTopUp));
  const when = iso =>
    new Intl.DateTimeFormat(S.fa ? 'fa-IR-u-ca-persian' : 'en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(new Date(iso));
  return {
    ...S,
    t: {
      ...S.t,
      ...C
    },
    editor: E,
    notice: s.notice,
    saveError: s.saveError,
    checkoutReturn: route.next === 'checkout' && !!page.props.store?.bag.length,
    checkoutHref: vfRouteUrl({lang: L, view: 'checkout'}),
    tab,
    setTab: id =>
      page.setState({
        tab: id
      }),
    tabItems: tabs.map(id => ({
      id,
      label: C.tabs[VF_ACCOUNT_TABS.indexOf(id)]
    })),
    isOrders: tab === 'orders',
    isSaved: tab === 'saved',
    isBalance: tab === 'balance',
    balance: {
      amount: S.m(wallet.balance),
      eligible,
      status: fill(eligible ? W.eligible : W.progress),
      canTopUp: topUp.canTopUp,
      presets: rules.topUps.map(value => ({
        label: S.m(value),
        pressed: topUp.amount === value,
        pick: () => topUp.pick(value)
      })),
      value: s.topUp,
      inputMode: vfAmountInputMode(),
      set: topUp.setAmount,
      hint: fill(W.amountHint),
      error: s.topUpError ? fill(W.errors[s.topUpError]) : undefined,
      busy: s.topUpBusy,
      payLabel:
        topUp.amount && !topUp.error ? W.pay.replace('{amount}', S.m(topUp.amount)) : W.topUp,
      done: s.topUpDone,
      submit: topUp.submit,
      hasHistory: wallet.history.length > 0,
      noHistory: !wallet.history.length,
      history: wallet.history.map(h => ({
        label:
          h.kind === 'order'
            ? W.kinds.order.replace('{id}', '\u2068' + h.order + '\u2069')
            : W.kinds.topup,
        date: when(h.at),
        amount: (h.amount < 0 ? '−' : '+') + '\u2068' + S.m(Math.abs(h.amount)) + '\u2069',
        tone: h.amount < 0 ? 'out' : 'in'
      }))
    },
    isAddresses: tab === 'addresses',
    isReminders: tab === 'reminders',
    isProfile: tab === 'profile',
    orders: orders.map(o => ({
      href: vfRouteUrl({
        view: 'track',
        id: o.id,
        lang: L
      }),
      id: o.id,
      status: (C.status[o.status] || [
        o.status === 'cancelled'
          ? S.fa
            ? 'لغو شده'
            : 'Cancelled'
          : S.fa
            ? 'دریافت شد'
            : 'Received',
        'neutral'
      ])[0],
      tone: (C.status[o.status] || ['', 'neutral'])[1],
      meta: C.itemCount(o.lines.reduce((sum, l) => sum + l.qty, 0)),
      total: S.m(o.totals.total),
      cta:
        o.status === 'delivered' || o.status === 'cancelled'
          ? C.labels.viewOrder
          : C.labels.trackOrder
    })),
    addresses,
    placesMap: !s.placesFailed && addresses.some(a => vfValidLocation(a.location)),
    placesView,
    addrLabels: C.addrLabels,
    hasSaved: saved.length > 0,
    noSaved: !saved.length,
    savedItems: saved.map((p, i) => ({
      ...S.productLink(p.id),
      images: [vfProductImage(p, L)],
      name: p.id,
      sub: vfProductSub(p, L),
      badge: vfProductBadge(p, L),
      price: S.m(p.price),
      stock: p.stock,
      remove: () => {
        savedItems.toggle(p.id);
        VF_NAV.focusAfterRemoval('.ag-product__fav', i);
      }
    })),
    addAddress: () => editorActions.openAddress(null),
    reminders,
    remLabels: C.remLabels,
    hasReminders: reminders.length > 0,
    noReminders: !reminders.length,
    coming: reminders.find(r => r.soon),
    addReminder: () => editorActions.openReminder(null),
    profile: {
      ...profile,
      name: profile.name || C.nameV,
      phone
    },
    setProfile: Object.fromEntries(
      ['name', 'email', 'locale', 'sms'].map(key => [key, editorActions.setProfileField(key)])
    ),
    emailError: s.errors.email,
    profileProblems: s.errors.email ? [{text: s.errors.email, target: 'vf-pemail'}] : [],
    saveProfile: editorActions.saveProfile,
    signOut: () => {
      vfAccountSignOut();
      if (page.props.go)
        page.props.go({
          view: 'home',
          lang: L
        });
      else location.href = S.href.home;
    },
    langOptions: C.langOptions,
    formOpen: !!s.form,
    isAddress,
    isReminder,
    mapOk: !s.mapFailed,
    mapFailed: s.mapFailed,
    pinStatus: vfValidLocation(f.location)
      ? E.pinSet.replace('{location}', vfLocationText(f.location, S.fa))
      : E.pinHint,
    pinError: s.errors.location || (s.locateFailed ? E.locateFailed : ''),
    // The address pin (LocationPicker) uses the store's map settings.
    map: {
      change: editorActions.setLocation,
      load: vfLoadLeaflet,
      tiles: {url: VF_STORE.map.tiles, attribution: VF_STORE.map.attribution},
      center: VF_STORE.map.center,
      zoom: VF_STORE.map.zoom,
      locateError: () => page.setState({locateFailed: true}),
      fail: () => page.setState({mapFailed: true})
    },
    formTitle: isAddress
      ? f.id
        ? E.editAddress
        : C.addAddr
      : f.id
        ? E.editReminder
        : E.addReminder,
    form: f,
    errors: s.errors,
    // After a failed save, what to fix in form order, each linking to its field.
    editorProblems: [
      ['location', 'vf-address-map'],
      ['line', 'vf-address-line'],
      ['phone', 'vf-address-phone'],
      ['name', 'vf-reminder-name']
    ]
      .filter(([key]) => s.errors[key])
      .map(([key, target]) => ({text: s.errors[key], target})),
    set: Object.fromEntries(
      ['label', 'zone', 'line', 'recipient', 'phone', 'name', 'channel'].map(k => [
        k,
        editorActions.setField(k)
      ])
    ),
    saveForm: editorActions.saveForm,
    closeForm: editorActions.closeForm,
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
    channelOptions: [
      {
        value: 'sms',
        label: E.sms
      },
      {
        value: 'wa',
        label: E.wa
      }
    ],
    dateValue: {
      cal: f.cal,
      m: f.m,
      d: f.d
    },
    dateLocked: !!(occasion && (occasion.fixed || occasion.hijri)),
    dateHint:
      occasion && occasion.fixed ? E.fixed : occasion && occasion.hijri ? E.movable : undefined,
    dateLabels: {
      jalali: E.jalali,
      gregorian: E.gregorian,
      month: E.month,
      day: E.day
    },
    setDate: editorActions.setDate,
    setBefore: editorActions.setBefore,
    setOccasion: editorActions.setOccasion
  };
}
