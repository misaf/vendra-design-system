// Shared shell values: menus, tabs, store links, favorites and focus helpers.
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
  const count = store ? store.count : 2,
    favList = store ? store.saved : st.vfFavs;
  return {
    go,
    href,
    productLink: id => ({href: (props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang:L,view:'product',id}), go: props.go ? vfLinkHandler(props.go) : undefined}),
    shopLink: cat => ({href: (props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({lang:L,view:'shop',cat}), go: props.go ? vfLinkHandler(props.go) : undefined}),
    lang: L,
    fa,
    dir: fa ? 'rtl' : 'ltr',
    tenant: props.tenant ?? 'default',
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
    skipGo: e => {
      e.preventDefault();
      window.AG_NAV.focusHeading();
    },
    standalone: !props.store,
    vfAnnouncement: st.vfAnnouncement || '',
    menuOpen: !!st.vfMenu,
    focusAfterRemoval: (selector, index) => setTimeout(()=>{
      const targets=[...document.querySelectorAll('main '+selector)];
      const target=targets[Math.min(index,targets.length-1)]||document.querySelector('main a[href]')||document.querySelector('main h1');
      if(target){if(!target.hasAttribute('tabindex')&&target.tagName==='H1')target.setAttribute('tabindex','-1');target.focus();}
    },0),
    focus: id => setTimeout(()=>{const el=document.getElementById(id);if(el)el.focus();},0),
    openMenu: () => self.setState({
      vfMenu: true
    }),
    closeMenu: close,
    menuItems,
    hasLang: !!props.setLang,
    setLang: props.setLang,
    langOpts: [{
      id: 'en',
      label: 'EN'
    }, {
      id: 'fa',
      label: 'فا'
    }],
    waHref: VF_STORE.whatsapp,
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
