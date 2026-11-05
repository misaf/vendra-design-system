// Routing and <head> helpers for the storefront (VF_SEO).
// URL scheme: <app base><lang>/<screen>/<id>/ — for example /apps/storefront/app/en/product/VF-7K2M4Q/,
// /apps/storefront/app/fa/shop/boxes/ or /apps/storefront/app/en/journal/<postId>/. Every path ends in a slash,
// so a static host serves each one from its own index.html. The path says which page it is; the
// query only carries state on that page (filters, sorting, steps), added by routing.js.
import {vfAbsoluteUrl, vfAssetBase, vfLocation} from './environment.js';

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
  // The path the storefront app is served at: apps/storefront/app/ under the build's base path
  // (environment.js), or under the site root where that is not set (a relative asset base).
  const appBase = () => {
    const base = vfAssetBase();
    if (!/^(\/|\w+:)/.test(base)) return '/apps/storefront/app/';
    return new URL('apps/storefront/app/', new URL(base, vfLocation())).pathname;
  };
  // Whether a URL is a page of the storefront app (not a file next to it, or another site).
  const inApp = url => {
    try {
      const here = vfLocation();
      const target = new URL(url, here);
      return (
        target.origin === here.origin &&
        target.pathname.startsWith(appBase()) &&
        !/\.\w+$/.test(target.pathname)
      );
    } catch {
      return false;
    }
  };

  // Parse a URL's path (default: this page's). Invalid or extra segments, an unknown screen, or a
  // screen missing its required id make the route "notfound"; the language is kept either way.
  const readRoute = (url = vfLocation().pathname + vfLocation().search) => {
    const r = {view: 'notfound'};
    let path;
    try {
      path = new URL(url, vfLocation()).pathname;
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

  const LOCALE = {en: 'en_US', fa: 'fa_IR'};
  // The head tags for a page: <title>, description, og:*, twitter:*, canonical, hreflang en/fa/
  // x-default and robots, as {title, meta: [{key, name, content}], links: [{rel, hreflang?, href}]}.
  // Pure: the browser applies them (syncHead) and the build writes them into each page (headHtml).
  // `alternates` holds the page in each language the store offers; x-default is the English one, or
  // the only one. URLs are read against the page's address.
  /** @param {{title?: string, description?: string, image?: string, url?: string, locale?: string, type?: string, alternates?: Record<string, string>, noindex?: boolean}} [head] */
  const headTags = ({
    title,
    description,
    image,
    url,
    locale = 'en',
    type = 'website',
    alternates = {},
    noindex = false
  } = {}) => {
    const img = vfAbsoluteUrl(image),
      href = vfAbsoluteUrl(url);
    const other = locale === 'fa' ? 'en' : 'fa';
    const meta = [
      ['name', 'description', description],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:image', img],
      ['property', 'og:url', href],
      ['property', 'og:type', type],
      ['property', 'og:locale', LOCALE[locale] || locale],
      ['property', 'og:locale:alternate', alternates[other] ? LOCALE[other] : null],
      ['name', 'twitter:card', img ? 'summary_large_image' : 'summary'],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', img],
      ['name', 'robots', noindex ? 'noindex, follow' : null]
    ].map(([key, name, content]) => ({key, name, content}));
    const links = [];
    if (href) links.push({rel: 'canonical', href});
    for (const hreflang of ['en', 'fa', 'x-default']) {
      const alternate = vfAbsoluteUrl(
        hreflang === 'x-default'
          ? alternates['x-default'] || alternates.en || alternates.fa
          : alternates[hreflang]
      );
      if (alternate && !noindex) links.push({rel: 'alternate', hreflang, href: alternate});
    }
    return {title, meta, links};
  };

  const escape = value =>
    String(value).replace(
      /[&<>"]/g,
      character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[character]
    );
  // headTags as HTML, for the build's static pages. Each tag carries data-ag-seo, as syncHead's do.
  /** @param {Parameters<typeof headTags>[0]} [head] */
  const headHtml = head => {
    const tags = headTags(head);
    return [
      ...(tags.title ? ['<title>' + escape(tags.title) + '</title>'] : []),
      ...tags.meta
        .filter(tag => tag.content != null && tag.content !== '')
        .map(
          tag =>
            '<meta ' +
            tag.key +
            '="' +
            escape(tag.name) +
            '" content="' +
            escape(tag.content) +
            '" data-ag-seo>'
        ),
      ...tags.links.map(
        link =>
          '<link rel="' +
          link.rel +
          '"' +
          (link.hreflang ? ' hreflang="' + link.hreflang + '"' : '') +
          ' href="' +
          escape(link.href) +
          '" data-ag-seo>'
      )
    ].join('\n');
  };

  // Applies headTags to this document: sets each tag, and removes the ones this page has none of.
  /** @param {Parameters<typeof headTags>[0]} [head] */
  const syncHead = head => {
    const tags = headTags(head);
    if (tags.title) document.title = tags.title;
    const upsert = (selector, tag, attributes) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement(tag);
        element.setAttribute('data-ag-seo', '');
        document.head.appendChild(element);
      }
      for (const key in attributes) element.setAttribute(key, attributes[key]);
    };
    const drop = selector =>
      document.head.querySelectorAll(selector).forEach(element => element.remove());
    for (const {key, name, content} of tags.meta) {
      const selector = 'meta[' + key + '="' + name + '"]';
      if (content == null || content === '') drop(selector);
      else upsert(selector, 'meta', {[key]: name, content});
    }
    const canonical = tags.links.find(link => link.rel === 'canonical');
    if (canonical) upsert('link[rel="canonical"]', 'link', canonical);
    else drop('link[rel="canonical"]');
    for (const hreflang of ['en', 'fa', 'x-default']) {
      const selector = 'link[rel="alternate"][hreflang="' + hreflang + '"]';
      const alternate = tags.links.find(link => link.hreflang === hreflang);
      if (alternate) upsert(selector, 'link', alternate);
      else drop(selector);
    }
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
    headTags,
    headHtml,
    syncHead
  };
  return S;
})();
