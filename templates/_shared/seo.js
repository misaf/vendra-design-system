// Routing and <head> helpers for the storefront (VF_SEO).
// URL scheme: <app base><lang>/<screen>/<id>/ — for example /templates/app/en/product/VF-7K2M4Q/,
// /templates/app/fa/shop/boxes/ or /templates/app/en/journal/<postId>/. Every path ends in a slash,
// so a static host serves each one from its own index.html. The path says which page it is; the
// query only carries state on that page (filters, sorting, steps), added by routing.js.
export const VF_SEO = (() => {
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
    'notfound',
    'error',
    'presentation'
  ]);
  const LANGUAGES = ['en', 'fa'];
  // The screen's one path segment after its name, and the route key it fills.
  const SEGMENT = {
    product: 'id',
    post: 'post',
    moment: 'm',
    track: 'id',
    shop: 'cat',
    policy: 'id'
  };
  // Screens whose path name differs from the screen: a journal post sits under the journal.
  const PATH_NAME = {post: 'journal'};
  const NUMERIC = new Set(['m']); // keys whose ids are numeric → digits only
  const REQUIRED = {product: 'id', post: 'post', moment: 'm'}; // screen → key it can't render without
  const SAFE = /^[\w:-]{1,40}$/,
    DIGITS = /^\d{1,40}$/;
  const register = (...names) => names.forEach(n => SAFE.test(n) && SCREENS.add(n));
  const setNumeric = keys => {
    NUMERIC.clear();
    keys.forEach(k => NUMERIC.add(k));
  };
  const valid = (k, v) => SAFE.test(v) && (!NUMERIC.has(k) || DIGITS.test(v));
  // The path the storefront app is served at: templates/app/ under the build's base URL
  // (app/theme.js sets VF_ASSET_BASE), or under the site root where that is not set.
  const appBase = () => {
    try {
      return new URL('templates/app/', window.VF_ASSET_BASE).pathname;
    } catch {
      return '/templates/app/';
    }
  };
  // Whether a URL is a page of the storefront app (not a file next to it, or another site).
  const inApp = url => {
    try {
      const target = new URL(url, location.href);
      return (
        target.origin === location.origin &&
        target.pathname.startsWith(appBase()) &&
        !/\.\w+$/.test(target.pathname)
      );
    } catch {
      return false;
    }
  };

  // Parse a URL's path (default: this page's). Invalid or extra segments, an unknown screen, or a
  // screen missing its required id make the route "notfound"; the language is kept either way.
  const readRoute = (url = location.pathname + location.search) => {
    const r = {view: 'notfound'};
    let path;
    try {
      path = new URL(url, location.href).pathname;
    } catch {
      return r;
    }
    const root = appBase();
    if (!path.startsWith(root)) return r;
    let parts;
    try {
      parts = path.slice(root.length).split('/').filter(Boolean).map(decodeURIComponent);
    } catch {
      return r;
    }
    if (parts[0] === 'index.html') parts.shift();
    if (LANGUAGES.includes(parts[0])) r.lang = parts.shift();
    const name = parts.shift();
    if (name == null) r.view = 'home';
    else if (name === 'journal' && parts.length) r.view = 'post';
    else if (SAFE.test(name) && SCREENS.has(name) && !PATH_NAME[name]) r.view = name;
    else return r;
    const key = SEGMENT[r.view];
    if (parts.length) {
      const value = parts.shift();
      if (!key || !valid(key, value) || parts.length) return {...r, view: 'notfound'};
      r[key] = value;
    }
    if (REQUIRED[r.view] && !r[REQUIRED[r.view]]) r.view = 'notfound';
    return r;
  };
  // State → "<app base><lang>/<screen>/<id>/". Home has no screen segment; invalid values are left out.
  const routePath = (state = {}) => {
    const parts = [];
    if (LANGUAGES.includes(state.lang)) parts.push(state.lang);
    if (state.view && state.view !== 'home' && SAFE.test(state.view)) {
      parts.push(PATH_NAME[state.view] || state.view);
      const key = SEGMENT[state.view],
        value = key == null ? null : state[key];
      if (value != null && value !== '' && valid(key, String(value))) parts.push(String(value));
    }
    return appBase() + parts.map(part => encodeURIComponent(part) + '/').join('');
  };
  const hrefFor = (state = {}, screen = 'home', extra = {}) =>
    routePath({lang: state.lang, view: screen, ...extra});
  const isNoindex = view => NOINDEX.has(view);

  const abs = u => {
    try {
      return u ? new URL(u, location.href).href : undefined;
    } catch {
      return undefined;
    }
  };
  const upsert = (sel, tag, attrs) => {
    let element = document.head.querySelector(sel);
    if (!element) {
      element = document.createElement(tag);
      element.setAttribute('data-ag-seo', '');
      document.head.appendChild(element);
    }
    for (const k in attrs) element.setAttribute(k, attrs[k]);
    return element;
  };
  const drop = sel => document.head.querySelectorAll(sel).forEach(element => element.remove());
  const meta = (key, name, content) =>
    content == null || content === ''
      ? drop('meta[' + key + '="' + name + '"]')
      : upsert('meta[' + key + '="' + name + '"]', 'meta', {[key]: name, content});
  const LOCALE = {en: 'en_US', fa: 'fa_IR'};
  // Sets <title>, description, og:*, twitter:*, canonical, hreflang en/fa/x-default and robots.
  // `alternates` holds the page in each language the store offers; x-default is the English one, or
  // the only one.
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
    const other = locale === 'fa' ? 'en' : 'fa';
    meta('property', 'og:locale:alternate', alternates[other] ? LOCALE[other] : null);
    meta('name', 'twitter:card', img ? 'summary_large_image' : 'summary');
    meta('name', 'twitter:title', title);
    meta('name', 'twitter:description', description);
    meta('name', 'twitter:image', img);
    if (href) upsert('link[rel="canonical"]', 'link', {rel: 'canonical', href});
    else drop('link[rel="canonical"]');
    for (const h of ['en', 'fa', 'x-default']) {
      const u = abs(
        h === 'x-default'
          ? alternates['x-default'] || alternates.en || alternates.fa
          : alternates[h]
      );
      const sel = 'link[rel="alternate"][hreflang="' + h + '"]';
      if (u && !noindex) upsert(sel, 'link', {rel: 'alternate', hreflang: h, href: u});
      else drop(sel);
    }
    meta('name', 'robots', noindex ? 'noindex, follow' : null);
  };
  const S = {
    SCREENS,
    NOINDEX,
    REQUIRED,
    register,
    setNumeric,
    appBase,
    inApp,
    readRoute,
    routePath,
    hrefFor,
    isNoindex,
    syncHead
  };
  return S;
})();
