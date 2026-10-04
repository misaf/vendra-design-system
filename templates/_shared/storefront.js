// Shared navigation, shell labels, responsive behavior and page focus.
// Page-specific copy and behavior stay in each Storefront*.dc.html file.
const VF_FA_DIGITS = s => String(s).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const VF_MONEY = (n, fa) => window.AG_FORMAT.money(n, {
  lang: fa ? 'fa' : 'en'
});
const VF_ROUTES = ['account', 'bag', 'checkout', 'contact', 'faq', 'home', 'journal', 'notfound', 'policy', 'post', 'product', 'saved', 'search', 'shop', 'signin', 'track', 'weddings'];
const VF_ROUTE_EXTRA = {
  product: {
    id: 'ivory'
  },
  post: {
    post: 'morning-at-the-studio'
  }
};
// Keep template-only shopping parameters out of the core design-system router.
function vfReadRoute(search = location.search) {
  window.AG_SEO.register(...VF_ROUTES);
  const route = window.AG_SEO.readRoute(search), query = new URLSearchParams(search);
  if (route.view === 'product' && !VF_PRODUCTS.some(p => p.id === route.id || (p.id === 'ivory' && route.id === 'ivory-classic'))) route.view = 'notfound';
  if (route.view === 'shop') {
    route.cat = ['bouquets','boxes','orchids','bridal'].includes(route.cat) ? route.cat : 'all';
    route.sort = ['low','high'].includes(query.get('sort')) ? query.get('sort') : 'featured';
    route.filters = [...new Set((query.get('filters') || '').split(',').filter(id => ['under3','same','roses'].includes(id)))].sort();
  }
  return route;
}
function vfRouteParams(route) {
  const query = new URLSearchParams(window.AG_SEO.routeParams(route));
  if (route.view === 'shop') {
    if (route.cat === 'all') query.delete('cat');
    if (['low','high'].includes(route.sort)) query.set('sort', route.sort);
    const filters = (route.filters || []).filter(id => ['under3','same','roses'].includes(id));
    if (filters.length) query.set('filters', [...new Set(filters)].sort().join(','));
  }
  return '?' + query.toString();
}
function vfLinkHandler(go) {
  return window.AG_SEO.linkHandler((route, event) => go(vfReadRoute(new URL(event.currentTarget.href, location.href).search)));
}
function vfPageRoute(props) { return props.routeInfo || vfReadRoute(); }
const VF_SHELL = {
  en: {
    brand: 'Vendra Florist',
    home: 'Home',
    shop: 'Shop',
    weddings: 'Weddings',
    journal: 'Journal',
    search: 'Search',
    account: 'Account',
    bag: 'Bag',
    wa: 'WhatsApp',
    menu: 'Menu',
    mainNav: 'Main',
    visit: 'Visit',
    address: 'Azimiyeh, Karaj',
    hours: 'Daily 08:00–22:00',
    contact: 'Contact',
    photo: 'Bouquet photo',
    save: 'Save',
    saved: 'Saved',
    track: 'Track an order',
    closeMenu: 'Close menu',
    waLong: 'Order on WhatsApp',
    langL: 'Language',
    faq: 'FAQ',
    skip: 'Skip to main content'
  },
  fa: {
    brand: 'گل‌فروشی وندرا',
    home: 'خانه',
    shop: 'فروشگاه',
    weddings: 'عروسی',
    journal: 'دفترچه',
    search: 'جستجو',
    account: 'حساب',
    bag: 'سبد',
    wa: 'واتساپ',
    menu: 'منو',
    mainNav: 'منوی اصلی',
    visit: 'آدرس',
    address: 'کرج، عظیمیه',
    hours: 'همه‌روزه \u2068۰۸:۰۰\u2069 تا \u2068۲۲:۰۰\u2069',
    contact: 'تماس',
    photo: 'عکس دسته‌گل',
    save: 'ذخیره',
    saved: 'ذخیره‌ها',
    track: 'پیگیری سفارش',
    closeMenu: 'بستن منو',
    waLong: 'سفارش در واتساپ',
    langL: 'زبان',
    faq: 'پرسش‌های متداول',
    skip: 'رفتن به محتوای اصلی'
  }
};
// Shared lifecycle for standalone templates and pages inside the click-through site.
class VFPage extends DCLogic {
  componentDidMount() {
    this._vfMedia = window.matchMedia('(max-width:767px)');
    this._vfResize = () => this.setState({
      vfMobile: this._vfMedia.matches
    });
    this._vfMedia.addEventListener('change', this._vfResize);
    this._vfResize();
    this._vfAnnounce();
  }
  componentDidUpdate() {
    this._vfAnnounce();
  }
  componentWillUnmount() {
    this._vfMedia && this._vfMedia.removeEventListener('change', this._vfResize);
    clearTimeout(this._vfTimer);
  }
  _vfAnnounce() {
    clearTimeout(this._vfTimer);
    this._vfTimer = setTimeout(() => {
      const h = document.querySelector('main h1');
      if (!h) return;
      const title = h.innerText.replace(/\s+/g, ' ').trim();
      if (title === this._vfTitle) return;
      this._vfTitle = title;
      window.AG_NAV.focusHeading();
      if (this.props.store && this.props.store.announce) this.props.store.announce(title);else this.setState({
        vfAnnouncement: title
      });
      const lang = this.props.lang === 'fa' ? 'fa' : 'en';
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
      document.documentElement.dataset.lang = lang;
      const url = location.href;
      window.AG_SEO.syncHead({
        title: title + ' · ' + VF_SHELL[lang].brand,
        description: title,
        url,
        locale: lang,
        noindex: window.AG_SEO.isNoindex(this._vfPage) || this._vfPage === 'signin',
        alternates: Object.fromEntries(['en','fa'].map(lang => [lang,
          (this.props.go ? '' : '../storefront-site/StorefrontSite.dc.html') + vfRouteParams({...VF_ROUTE_EXTRA[this._vfPage], ...vfPageRoute(this.props),view:this._vfPage,lang})]))
      });
    }, 40);
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
    waHref: 'https://wa.me/989129333034',
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
      href: 'https://wa.me/989129333034',
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
