// Shared shell values: menus, tabs, store links, favorites and focus helpers.

// The store's announcement in this language, or '' once the visitor has closed it this session.
function vfAnnouncementText(lang, st) {
  const text = VF_STORE.announcement && VF_STORE.announcement[lang];
  if (!text || st.vfAnnouncementClosed) return '';
  try {
    if (sessionStorage.getItem('vf-announcement-closed') === VF_STORE.announcement.en) return '';
  } catch (_) {}
  return text.replace('{freeDelivery}', VF_MONEY(VF_FREE_DELIVERY_THRESHOLD, lang === 'fa'));
}
// A value saved on this device, or '' when storage is empty or blocked.
function vfStored(key) {
  try {
    return localStorage.getItem(key) || '';
  } catch (_) {
    return '';
  }
}
function vfShell(props, page) {
  const self = this,
    st = self.state || {},
    store = props.store;
  self._vfPage = page;
  window.AG_SEO.register(...VF_ROUTES);
  const fa = props.lang === 'fa',
    L = fa ? 'fa' : 'en',
    T = VF_SHELL[L];
  const mob = !!props.mobile || (st.vfMobile === undefined ? window.innerWidth < 768 : st.vfMobile);
  const tab = page === 'home' ? 'home' : ['bag', 'checkout'].includes(page) ? 'bag' : ['shop', 'product', 'saved', 'search'].includes(page) ? 'shop' : '';
  const href = {},
    go = {};
  VF_ROUTES.forEach(r => {
    href[r] = (props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + window.AG_SEO.hrefFor({
      lang: L
    }, r, VF_ROUTE_EXTRA[r]);
    go[r] = props.go ? vfLinkHandler(route => props.go(route)) : undefined;
  });
  const close = () => self.setState({
    vfMenu: false
  });
  const cur = {
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
  const menuItems = ['home', 'shop', 'weddings', 'journal', 'saved', 'contact', 'account', 'track', 'faq'].map(r => ({
    label: T[r],
    current: cur[r],
    href: href[r],
    go: props.go ? vfLinkHandler(route => {
      close();
      props.go(route);
    }) : undefined
  }));
  const policyLink = doc => ({
    href: (props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang: L, view: 'policy', id: doc}),
    go: props.go ? vfLinkHandler(props.go) : undefined
  });
  const policyDoc = page === 'policy' ? props.doc ?? vfPageRoute(props).id ?? VF_POLICIES[0] : '';
  // The click-through site switches in place; a standalone page opens itself in the site in that language.
  const setLang = props.setLang || (lang => {
    location.href = (props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({...VF_ROUTE_EXTRA[page], ...vfPageRoute(props), view: page, lang});
  });
  // Focuses an element by id, waiting a few frames for one that this update is about to render.
  const focus = (id, tries = 10) => setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.focus();
    else if (tries > 1) focus(id, tries - 1);
  }, tries === 10 ? 0 : 50);
  // Footer newsletter: the draft lives in page state; a finished sign-up is remembered on this device.
  const N = T.newsletter, news = st.vfNews || {};
  const signedUp = news.done || vfStored('vf-newsletter');
  const accountPhone = vfAccountPhone();
  const profile = accountPhone ? vfAccountLoad(accountPhone, L).profile : {};
  const draft = news.draft ?? profile.email ?? '';
  const newsletter = {
    open: !signedUp,
    done: !!signedUp,
    doneText: N.done.replace('{email}', '\u2066' + signedUp + '\u2069'),
    draft,
    sending: !!news.sending,
    error: news.error || undefined,
    setDraft: e => self.setState({vfNews: {...news, draft: e.target.value, error: ''}}),
    submit: e => {
      e && e.preventDefault && e.preventDefault();
      if (news.sending) return;
      const email = draft.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        self.setState({vfNews: {...news, draft, error: N.error}});
        focus('vf-news-email');
        return;
      }
      self.setState({vfNews: {...news, draft, error: '', sending: true}});
      window.AG_API.newsletter(email, profile.name).then(() => {
        try { localStorage.setItem('vf-newsletter', email); } catch (_) {}
        window.AG_TRACK.event('generate_lead', {lead_source: 'newsletter'});
        self.setState({vfNews: {done: email}});
        focus('vf-news-done');
      }, () => {
        self.setState({vfNews: {...news, draft, sending: false, error: N.failed}});
        focus('vf-news-email');
      });
    }
  };
  // Consent banner: shown until the visitor chooses, and again from "Cookie settings" in the footer.
  // Closing it makes no choice (so nothing is sent) and hides it for this browser session only.
  let dismissed = !!st.vfConsentDismissed;
  try {
    dismissed = dismissed || sessionStorage.getItem('vf-consent-dismissed') === '1';
  } catch (_) {}
  const consentShown = !(st.vfConsent ?? window.AG_TRACK.consent()) && !dismissed || !!st.vfConsentOpen;
  const hideConsent = patch => {
    const reopened = st.vfConsentOpen;
    self.setState({...patch, vfConsentOpen: false});
    if (reopened) focus('vf-consent-settings');
  };
  const choose = value => {
    window.AG_TRACK.setConsent(value);
    hideConsent({vfConsent: value});
  };
  const consent = {
    desk: consentShown && !mob,
    mob: consentShown && mob,
    accept: () => choose('all'),
    essential: () => choose('essential'),
    close: () => {
      try {
        sessionStorage.setItem('vf-consent-dismissed', '1');
      } catch (_) {}
      hideConsent({vfConsentDismissed: true});
    },
    policy: policyLink('privacy'),
    open: () => {
      self.setState({vfConsentOpen: true});
      focus('vf-consent');
    }
  };
  const shopLink = cat => ({href: (props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang: L, view: 'shop', cat}), go: props.go ? vfLinkHandler(props.go) : undefined});
  // Footer link columns, social links, contact lines and the bottom line.
  const F = T.footer;
  const footerLink = (r, label) => ({label, href: href[r], go: go[r], current: cur[r] ? 'page' : undefined});
  const footer = {
    tagline: VF_STORE.tagline ? VF_STORE.tagline[L] : '',
    faqCurrent: cur.faq ? 'page' : undefined,
    shop: [{...shopLink('all'), label: F.allFlowers}, ...['bouquets', 'boxes', 'orchids', 'bridal'].map(cat => ({...shopLink(cat), label: VF_CATEGORY_COPY[L][cat]}))],
    studio: [footerLink('weddings', T.weddings), footerLink('journal', T.journal), footerLink('contact', T.contact), footerLink('track', T.track), footerLink('account', T.account), footerLink('saved', T.saved)],
    social: [
      ...(VF_STORE.instagram ? [{icon: 'instagram', label: F.instagram + ' ' + VF_STORE.instagram.label, href: VF_STORE.instagram.url, target: '_blank'}] : []),
      ...(VF_STORE.whatsapp ? [{icon: 'message-circle', label: T.wa, href: VF_STORE.whatsapp, target: '_blank'}] : []),
      {icon: 'phone', label: F.call + ' ' + VF_STORE.phoneLabel, href: 'tel:' + VF_STORE.phone}
    ],
    directions: VF_STORE.studio ? vfDirectionsUrl(VF_STORE.studio) : '',
    email: VF_STORE.email || '',
    emailHref: VF_STORE.email ? 'mailto:' + VF_STORE.email : '',
    copyright: '© ' + (fa ? new Intl.DateTimeFormat('fa-IR-u-ca-persian', {year: 'numeric'}).format(new Date()) : new Date().getFullYear()) + ' ' + T.brand + '. ' + F.rights,
    credit: VF_STORE.credit ? {before: F.credit, name: VF_STORE.credit.name, url: VF_STORE.credit.url} : null
  };
  const count = store ? store.count : 2,
    favList = store ? store.saved : st.vfFavs;
  return {
    go,
    href,
    policyLink,
    policyLinks: VF_POLICIES.map(doc => ({...policyLink(doc), label: T.policies[doc], current: doc === policyDoc ? 'page' : undefined})),
    productLink: id => ({href: (props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang:L,view:'product',id:vfProductId(id)||id,cat:(vfFindProduct(id)||{}).cat}), go: props.go ? vfLinkHandler(props.go) : undefined}),
    occasionLink: occasion => ({href: (props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang:L,view:'shop',cat:'all',occasion}), go: props.go ? vfLinkHandler(props.go) : undefined}),
    shopLink,
    lang: L,
    fa,
    dir: fa ? 'rtl' : 'ltr',
    tenant: vfPageTenant(props),
    mob,
    desk: !mob,
    previewMobile: !!props.mobile,
    frameW: mob ? '390px' : 'none',
    nav: {
      shop: cur.shop,
      weddings: cur.weddings,
      journal: cur.journal
    },
    bagCount: count ? fa ? VF_FA_DIGITS(count) : count : undefined,
    bagLabel: !count ? T.bag : count === 1 ? T.bagOne : T.bagMany.replace('{count}', fa ? VF_FA_DIGITS(count) : count),
    skipGo: e => {
      e.preventDefault();
      window.AG_NAV.focusHeading();
    },
    standalone: !props.store,
    announcement: vfAnnouncementText(L, st),
    closeAnnouncement: () => {
      // Keyed by the message, so a new announcement shows again.
      try { sessionStorage.setItem('vf-announcement-closed', VF_STORE.announcement.en); } catch (_) {}
      self.setState({vfAnnouncementClosed: true});
    },
    vfAnnouncement: st.vfAnnouncement || '',
    menuOpen: !!st.vfMenu,
    focusAfterRemoval: (selector, index) => setTimeout(()=>{
      const targets=[...document.querySelectorAll('main '+selector)];
      const target=/** @type {HTMLElement} */(targets[Math.min(index,targets.length-1)]||document.querySelector('main a[href]')||document.querySelector('main h1'));
      if(target){if(!target.hasAttribute('tabindex')&&target.tagName==='H1')target.setAttribute('tabindex','-1');target.focus();}
    },0),
    focus,
    newsletter,
    footer,
    consent,
    openMenu: () => self.setState({
      vfMenu: true
    }),
    closeMenu: close,
    menuItems,
    hasLang: true,
    setLang,
    // Mobile headers have room for one button: it switches to the other language.
    otherLang: {
      label: fa ? 'EN' : 'فا',
      name: fa ? 'English' : 'فارسی',
      lang: fa ? 'en' : 'fa',
      pick: () => setLang(fa ? 'en' : 'fa')
    },
    langOpts: [{
      id: 'en',
      label: 'EN'
    }, {
      id: 'fa',
      label: 'فا'
    }],
    waHref: VF_STORE.whatsapp,
    // A WhatsApp chat with the message already written; pages use it to quote product codes.
    waWith: text => VF_STORE.whatsapp ? VF_STORE.whatsapp + '?text=' + encodeURIComponent(text) : '',
    phoneHref: 'tel:'+VF_STORE.phone,
    phoneLabel: VF_STORE.phoneLabel,
    instagram: VF_STORE.instagram,
    payment: {...VF_STORE.payment,holder:VF_STORE.payment.holder[L],bank:VF_STORE.payment.bank[L]},
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
    tabs: [{
      id: 'home',
      icon: 'house',
      label: T.home,
      href: href.home,
      onClick: go.home,
      current: tab === 'home'
    }, {
      id: 'shop',
      icon: 'layout-grid',
      label: T.shop,
      href: href.shop,
      onClick: go.shop,
      current: tab === 'shop'
    }, {
      id: 'wa',
      icon: 'message-circle',
      label: T.wa,
      href: VF_STORE.whatsapp,
      target: '_blank'
    }, {
      id: 'bag',
      icon: 'shopping-bag',
      label: T.bag,
      href: href.bag,
      onClick: go.bag,
      count: count ? fa ? VF_FA_DIGITS(count) : count : undefined,
      current: tab === 'bag'
    }],
    n: v => fa ? VF_FA_DIGITS(v) : String(v),
    m: v => VF_MONEY(v, fa),
    t: T
  };
}
