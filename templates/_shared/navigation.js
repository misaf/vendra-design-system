// Shared shell values: menus, tabs, store links, favorites and focus helpers.
import {vfFindProduct, vfProductId} from './catalog.js';
import {
  VF_FREE_DELIVERY_THRESHOLD,
  VF_ZONES,
  vfDeliveryCutoff,
  vfDeliveryDays
} from './delivery.js';
import {VF_FA_DIGITS, VF_MONEY} from './formatting.js';
import {vfDirectionsUrl} from './location.js';
import {vfPageTenant} from './page-lifecycle.js';
import {VF_POLICIES, VF_ROUTES, VF_ROUTE_EXTRA, vfPageRoute, vfRouteParams} from './routing.js';
import {VF_STORE, vfFeatures} from './store-config.js';
import {VF_CATEGORY_COPY} from './translations/categories.js';
import {VF_SHELL} from './translations/shell.js';
import {vfDayMonth, vfDayName} from './translations/time.js';
import {VF_SEO} from './seo.js';
import {VF_NAV} from './page-focus.js';

// When an order placed now arrives in the first zone: today until its cut-off, otherwise the next
// open day ('' when none is open). sameDay says whether it is today.
export function vfNextDelivery(lang) {
  const fa = lang === 'fa';
  const T = VF_SHELL[lang];
  const zone = VF_ZONES[0];
  const next = vfDeliveryDays(zone.id).find(day => !day.soldOut && !day.pastCutoff);
  if (!next) return {text: '', sameDay: false};
  if (next.offset === 0)
    return {text: T.sameDay.replace('{time}', vfDeliveryCutoff(zone, fa)), sameDay: true};
  return {
    text: T.nextDay
      .replace('{day}', vfDayName(next, fa))
      .replace('{date}', vfDayMonth(next.date, fa)),
    sameDay: false
  };
}
// The store's announcement in this language (its shorter phone version with `phone`, when it has one),
// or '' once the visitor has closed it this session. {delivery} becomes when an order placed now
// arrives; {freeDelivery} the free-delivery threshold.
export function vfAnnouncementSource(lang, phone) {
  const announcement = VF_STORE.announcement;
  return (announcement && ((phone && announcement.mobile?.[lang]) || announcement[lang])) || '';
}
export function vfAnnouncementText(lang, st, phone = false) {
  const text = vfAnnouncementSource(lang, phone);
  if (!text || st.vfAnnouncementClosed) return '';
  try {
    if (sessionStorage.getItem('vf-announcement-closed') === VF_STORE.announcement.en) return '';
  } catch {}
  return text
    .replace('{delivery}', vfNextDelivery(lang).text)
    .replace('{freeDelivery}', VF_MONEY(VF_FREE_DELIVERY_THRESHOLD, lang === 'fa'))
    .trim();
}
// A value saved on this device, or '' when storage is empty or blocked.
export function vfStored(key) {
  try {
    return localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}
// The shell's values for a page (header, menu, footer, consent, tabs) and its own bits of state on
// the page object (menu, consent, favourites).
export function vfShell(self, page) {
  const props = self.props,
    st = self.state || {},
    store = props.store;
  self._vfPage = page;
  VF_SEO.register(...VF_ROUTES);
  const fa = props.lang === 'fa';
  const features = vfFeatures();
  // Pages a store can turn off, and their links with them.
  const offered = route => features[route] !== false;
  /** @type {'en' | 'fa'} */
  const L = fa ? 'fa' : 'en';
  const T = VF_SHELL[L];
  const tab =
    page === 'home'
      ? 'home'
      : ['bag', 'checkout'].includes(page)
        ? 'bag'
        : ['shop', 'product', 'saved', 'search'].includes(page)
          ? 'shop'
          : '';
  const href = {};
  VF_ROUTES.forEach(r => {
    href[r] =
      (props.go ? '' : '../app/') +
      VF_SEO.hrefFor(
        {
          lang: L
        },
        r,
        VF_ROUTE_EXTRA[r]
      );
  });
  const close = () =>
    self.setState({
      vfMenu: false
    });
  const isCurrent = {
    home: page === 'home',
    shop: ['shop', 'product'].includes(page),
    weddings: page === 'weddings',
    journal: ['journal', 'post'].includes(page),
    saved: page === 'saved',
    contact: page === 'contact',
    account: ['account', 'signin'].includes(page),
    track: page === 'track',
    faq: page === 'faq'
  };
  const menuItems = [
    'home',
    'shop',
    'weddings',
    'journal',
    'saved',
    'contact',
    'account',
    'track',
    'faq'
  ]
    .filter(offered)
    .map(r => ({
      label: T[r],
      current: isCurrent[r],
      href: href[r],
      // Closes the drawer; the link itself navigates (React Aria's router).
      close
    }));
  const policyLink = doc => ({
    href: (props.go ? '' : '../app/') + vfRouteParams({lang: L, view: 'policy', id: doc})
  });
  const policyDoc = page === 'policy' ? (props.doc ?? vfPageRoute(props).id ?? VF_POLICIES[0]) : '';
  // The click-through site switches in place; a standalone page opens itself in the site in that language.
  const setLang =
    props.setLang ||
    (lang => {
      location.href =
        (props.go ? '' : '../app/') +
        vfRouteParams({...VF_ROUTE_EXTRA[page], ...vfPageRoute(props), view: page, lang});
    });
  // Focuses an element by id, waiting a few frames for one that this update is about to render.
  const focus = (id, tries = 10) =>
    setTimeout(
      () => {
        const target = document.getElementById(id);
        if (target) target.focus();
        else if (tries > 1) focus(id, tries - 1);
      },
      tries === 10 ? 0 : 50
    );
  // Consent banner: shown until the visitor chooses, and again from "Cookie settings" in the footer.
  // Closing it makes no choice (so nothing is sent) and hides it for this browser session only.
  let dismissed = !!st.vfConsentDismissed;
  try {
    dismissed = dismissed || sessionStorage.getItem('vf-consent-dismissed') === '1';
  } catch {}
  const consentShown =
    (!(st.vfConsent ?? window.VF_TRACK.consent()) && !dismissed) || !!st.vfConsentOpen;
  const hideConsent = patch => {
    const reopened = st.vfConsentOpen;
    self.setState({...patch, vfConsentOpen: false});
    if (reopened) focus(self._vfConsentTrigger || 'vf-consent-settings');
  };
  const choose = value => {
    window.VF_TRACK.setConsent(value);
    hideConsent({vfConsent: value});
  };
  const consent = {
    shown: consentShown,
    accept: () => choose('all'),
    essential: () => choose('essential'),
    close: () => {
      try {
        sessionStorage.setItem('vf-consent-dismissed', '1');
      } catch {}
      hideConsent({vfConsentDismissed: true});
    },
    policy: policyLink('privacy'),
    open: event => {
      self._vfConsentTrigger = event?.currentTarget?.id || 'vf-consent-settings';
      self.setState({vfConsentOpen: true});
      focus('vf-consent');
    }
  };
  const shopLink = cat => ({
    href: (props.go ? '' : '../app/') + vfRouteParams({lang: L, view: 'shop', cat})
  });
  // Footer link columns, social links, contact lines and the bottom line.
  const F = T.footer;
  const footerLink = (r, label) => ({
    label,
    href: href[r],
    current: isCurrent[r] ? 'page' : undefined
  });
  const footer = {
    address: VF_STORE.address[L],
    tagline: VF_STORE.tagline ? VF_STORE.tagline[L] : '',
    faqCurrent: isCurrent.faq ? 'page' : undefined,
    shop: [
      {...shopLink('all'), label: F.allFlowers},
      ...['bouquets', 'boxes', 'orchids', 'bridal'].map(cat => ({
        ...shopLink(cat),
        label: VF_CATEGORY_COPY[L][cat]
      }))
    ],
    studio: ['weddings', 'journal', 'contact', 'track', 'account', 'saved']
      .filter(offered)
      .map(r => footerLink(r, T[r])),
    social: [
      ...(VF_STORE.instagram
        ? [
            {
              icon: 'instagram',
              label: F.instagram + ' ' + VF_STORE.instagram.label,
              href: VF_STORE.instagram.url,
              target: '_blank'
            }
          ]
        : []),
      ...(VF_STORE.whatsapp
        ? [{icon: 'message-circle', label: T.wa, href: VF_STORE.whatsapp, target: '_blank'}]
        : []),
      {icon: 'phone', label: F.call + ' ' + VF_STORE.phoneLabel, href: 'tel:' + VF_STORE.phone}
    ],
    directions: VF_STORE.studio ? vfDirectionsUrl(VF_STORE.studio) : '',
    email: VF_STORE.email || '',
    emailHref: VF_STORE.email ? 'mailto:' + VF_STORE.email : '',
    seals: VF_STORE.trustSeals || [],
    copyright:
      '© ' +
      (fa
        ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {year: 'numeric'}).format(new Date())
        : new Date().getFullYear()) +
      ' ' +
      T.brand +
      '. ' +
      F.rights,
    credit: VF_STORE.credit
      ? {before: F.credit, name: VF_STORE.credit.name, url: VF_STORE.credit.url}
      : null
  };
  const count = store ? store.count : 2,
    favList = store ? store.saved : st.vfFavs;
  return {
    href,
    policyLink,
    policyLinks: VF_POLICIES.map(doc => ({
      ...policyLink(doc),
      label: T.policies[doc],
      current: doc === policyDoc ? 'page' : undefined
    })),
    productLink: (id, context = {}) => ({
      href:
        (props.go ? '' : '../app/') +
        vfRouteParams({
          lang: L,
          view: 'product',
          id: vfProductId(id) || id,
          cat: (vfFindProduct(id) || {}).cat,
          date: vfPageRoute(props).date,
          ...context
        })
    }),
    occasionLink: occasion => ({
      href:
        (props.go ? '' : '../app/') + vfRouteParams({lang: L, view: 'shop', cat: 'all', occasion})
    }),
    shopLink,
    lang: L,
    fa,
    dir: fa ? 'rtl' : 'ltr',
    tenant: vfPageTenant(props),
    nav: {
      shop: isCurrent.shop,
      weddings: isCurrent.weddings,
      journal: isCurrent.journal
    },
    bagCount: count ? (fa ? VF_FA_DIGITS(count) : count) : undefined,
    bagLabel: !count
      ? T.bag
      : count === 1
        ? T.bagOne
        : T.bagMany.replace('{count}', fa ? VF_FA_DIGITS(count) : count),
    skipGo: e => {
      e.preventDefault();
      VF_NAV.focusHeading();
    },
    standalone: !props.store,
    // Both versions render; CSS shows the phone one below 768px.
    announcement: vfAnnouncementText(L, st),
    announcementPhone: vfAnnouncementText(L, st, true),
    // While same-day delivery is open, a delivery announcement links to the same-day designs.
    announcementLink:
      vfAnnouncementSource(L).includes('{delivery}') && vfNextDelivery(L).sameDay
        ? {
            label: T.shopSameDay,
            href:
              href.shop.split('?')[0] +
              vfRouteParams({view: 'shop', lang: L, cat: 'all', filters: ['same']})
          }
        : null,
    closeAnnouncement: () => {
      // Keyed by the message, so a new announcement shows again.
      try {
        sessionStorage.setItem('vf-announcement-closed', VF_STORE.announcement.en);
      } catch {}
      self.setState({vfAnnouncementClosed: true});
    },
    vfAnnouncement: st.vfAnnouncement || '',
    menuOpen: !!st.vfMenu,
    focusAfterRemoval: (selector, index) =>
      setTimeout(() => {
        const targets = [...document.querySelectorAll('main ' + selector)];
        const target = /** @type {HTMLElement} */ (
          targets[Math.min(index, targets.length - 1)] ||
            document.querySelector('main a[href]') ||
            document.querySelector('main h1')
        );
        if (target) {
          if (!target.hasAttribute('tabindex') && target.tagName === 'H1')
            target.setAttribute('tabindex', '-1');
          target.focus();
        }
      }, 0),
    focus,
    footer,
    consent,
    openMenu: () =>
      self.setState({
        vfMenu: true
      }),
    closeMenu: close,
    menuItems,
    features,
    hasLang: VF_STORE.languages.length > 1,
    setLang,
    // Mobile headers have room for one button: it switches to the other language. Its name starts
    // with the visible abbreviation, so voice control can activate it by what it shows.
    otherLang: {
      label: fa ? 'EN' : 'فا',
      name: fa ? 'EN, English' : 'فا، فارسی',
      lang: fa ? 'en' : 'fa',
      pick: () => setLang(fa ? 'en' : 'fa')
    },
    langOpts: [
      {
        id: 'en',
        label: 'EN'
      },
      {
        id: 'fa',
        label: 'فا'
      }
    ],
    waHref: VF_STORE.whatsapp || '',
    // A WhatsApp chat with the message already written; pages use it to quote product codes.
    waWith: text =>
      VF_STORE.whatsapp ? VF_STORE.whatsapp + '?text=' + encodeURIComponent(text) : '',
    phoneHref: 'tel:' + VF_STORE.phone,
    phoneLabel: VF_STORE.phoneLabel,
    instagram: VF_STORE.instagram,
    // The store's card for card-to-card transfers, in the page's language; null when it doesn't take them.
    payment: (card => (card ? {...card, holder: card.holder[L], bank: card.bank[L]} : null))(
      VF_STORE.paymentMethods.find(method => method.id === 'card')
    ),
    isFav: (id, def) => (favList || def).includes(id),
    toggleFav: (id, def) => () => {
      if (store) {
        store.toggleSave(id);
        return;
      }
      const c = st.vfFavs || def;
      self.setState({
        vfFavs: c.includes(id) ? c.filter(x => x !== id) : [...c, id]
      });
    },
    tabs: [
      {
        id: 'home',
        icon: 'house',
        label: T.home,
        href: href.home,
        current: tab === 'home'
      },
      {
        id: 'shop',
        icon: 'layout-grid',
        label: T.shop,
        href: href.shop,
        current: tab === 'shop'
      },
      ...(VF_STORE.whatsapp
        ? [
            {
              id: 'wa',
              icon: 'message-circle',
              label: T.wa,
              href: VF_STORE.whatsapp,
              target: '_blank'
            }
          ]
        : []),
      {
        id: 'bag',
        icon: 'shopping-bag',
        label: T.bag,
        href: href.bag,
        count: count ? (fa ? VF_FA_DIGITS(count) : count) : undefined,
        current: tab === 'bag'
      }
    ],
    n: v => (fa ? VF_FA_DIGITS(v) : String(v)),
    m: v => VF_MONEY(v, fa),
    shellText: T,
    t: T
  };
}
