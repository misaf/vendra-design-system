// Routing and <head> helpers for the storefront (window.AG_SEO). Pages load this
// before shared-logic.js.
// URL scheme: ?lang=en|fa&view=<screen>&id=<productId>&cat=<category>&post=<postId>&m=<momentId>
(() => {
  const SCREENS = new Set([
    'home',
    'shop',
    'product',
    'bag',
    'checkout',
    'contact',
    'search',
    'gifts',
    'moment',
    'saved',
    'track',
    'custom',
    'account',
    'journal',
    'post',
    'care',
    'faq'
  ]);
  const NOINDEX = new Set([
    'bag',
    'checkout',
    'confirm',
    'account',
    'track',
    'saved',
    'search',
    'notfound'
  ]);
  const PARAMS = ['id', 'cat', 'post', 'm'];
  const NUMERIC = new Set(['m']); // params whose ids are numeric → digits only
  const REQUIRED = {product: 'id', post: 'post', moment: 'm'}; // screen → param it can't render without
  const OPTIONAL = {track: 'id'}; // track: optional order number (?view=track&id=VB-10491), SAFE pattern; no id → order lookup / not-found state. Stays noindex.
  const SAFE = /^[\w:-]{1,40}$/,
    DIGITS = /^\d{1,40}$/;
  const register = (...names) => names.forEach(n => SAFE.test(n) && SCREENS.add(n));
  const setNumeric = keys => {
    NUMERIC.clear();
    keys.forEach(k => NUMERIC.add(k));
  };
  const valid = (k, v) => SAFE.test(v) && (!NUMERIC.has(k) || DIGITS.test(v));

  // Parse location.search. Invalid values are dropped; an unknown view — or a view missing its required id — becomes "notfound".
  const readRoute = (search = location.search) => {
    const q = new URLSearchParams(search);
    const r = {};
    const l = q.get('lang');
    if (l === 'en' || l === 'fa') r.lang = l;
    const v = q.get('view');
    r.view = v == null || v === '' ? 'home' : SAFE.test(v) && SCREENS.has(v) ? v : 'notfound';
    for (const k of PARAMS) {
      const x = q.get(k);
      if (x != null && x !== '' && valid(k, x)) r[k] = x;
    }
    if (REQUIRED[r.view] && !r[REQUIRED[r.view]]) r.view = 'notfound';
    return r;
  };
  // State → "?lang=…&view=…". Home omits view; unknown keys and invalid values are ignored.
  const routeParams = (state = {}) => {
    const q = new URLSearchParams();
    if (state.lang === 'en' || state.lang === 'fa') q.set('lang', state.lang);
    if (state.view && state.view !== 'home' && SAFE.test(state.view)) q.set('view', state.view);
    for (const k of PARAMS) {
      const x = state[k];
      if (x != null && x !== '' && valid(k, String(x))) q.set(k, String(x));
    }
    const s = q.toString();
    return s ? '?' + s : '?';
  };
  const hrefFor = (state = {}, screen = 'home', extra = {}) =>
    routeParams({lang: state.lang, view: screen, ...extra});
  // One click handler for every internal <a href>. Modified / middle clicks and target=_blank fall through to the browser.
  const linkHandler = go => e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return;
    const a = e.currentTarget;
    if (!a || !a.href || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || u.pathname !== location.pathname) return;
    e.preventDefault();
    go(readRoute(u.search), e);
  };
  const isNoindex = view => NOINDEX.has(view);

  const abs = u => {
    try {
      return u ? new URL(u, location.href).href : undefined;
    } catch {
      return undefined;
    }
  };
  const upsert = (sel, tag, attrs) => {
    let el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement(tag);
      el.setAttribute('data-ag-seo', '');
      document.head.appendChild(el);
    }
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };
  const drop = sel => document.head.querySelectorAll(sel).forEach(el => el.remove());
  const meta = (key, name, content) =>
    content == null || content === ''
      ? drop('meta[' + key + '="' + name + '"]')
      : upsert('meta[' + key + '="' + name + '"]', 'meta', {[key]: name, content});
  const LOCALE = {en: 'en_US', fa: 'fa_IR'};
  // Sets <title>, description, og:*, twitter:*, canonical, hreflang en/fa/x-default and robots.
  /** @param {{title?: string, description?: string, image?: string, url?: string, locale?: string, type?: string, alternates?: Record<string, string>, noindex?: boolean}} [head] */
  const syncHead = ({
    title,
    description,
    image,
    url,
    locale = 'en',
    type = 'website',
    alternates = {},
    noindex = false
  } = {}) => {
    if (title) document.title = title;
    const img = abs(image),
      href = abs(url);
    meta('name', 'description', description);
    meta('property', 'og:title', title);
    meta('property', 'og:description', description);
    meta('property', 'og:image', img);
    meta('property', 'og:url', href);
    meta('property', 'og:type', type);
    meta('property', 'og:locale', LOCALE[locale] || locale);
    meta('property', 'og:locale:alternate', LOCALE[locale === 'fa' ? 'en' : 'fa']);
    meta('name', 'twitter:card', img ? 'summary_large_image' : 'summary');
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', img);
    if (href) upsert('link[rel="canonical"]', 'link', {rel: 'canonical', href});
    else drop('link[rel="canonical"]');
    for (const h of ['en', 'fa', 'x-default']) {
      const u = abs(h === 'x-default' ? alternates['x-default'] || alternates.en : alternates[h]);
      const sel = 'link[rel="alternate"][hreflang="' + h + '"]';
      if (u && !noindex) upsert(sel, 'link', {rel: 'alternate', hreflang: h, href: u});
      else drop(sel);
    }
    meta('name', 'robots', noindex ? 'noindex, follow' : null);
  };
  const S = {
    SCREENS,
    NOINDEX,
    OPTIONAL,
    REQUIRED,
    register,
    setNumeric,
    readRoute,
    routeParams,
    hrefFor,
    linkHandler,
    isNoindex,
    syncHead
  };
  window.AG_SEO = S;
  if (typeof module !== 'undefined' && module.exports) module.exports = S;
})();
