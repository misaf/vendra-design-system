// Storefront metadata tags and their HTML and DOM renderers.
import {vfAbsoluteUrl} from '../../platform/browser/environment.js';
import {LOCALES} from '../../design-system/utils/locales.js';

export const VF_SEO = (() => {
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
  const isNoindex = view => NOINDEX.has(view);
  const LANGUAGES = Object.keys(LOCALES);

  // Open Graph locales from the language tags: en-US → en_US.
  const LOCALE = Object.fromEntries(
    Object.values(LOCALES).map(locale => [locale.code, locale.tag.replace('-', '_')])
  );
  // The head tags for a page: <title>, description, og:*, twitter:*, canonical, hreflang en/fa/
  // x-default and robots, as {title, meta: [{key, name, content}], links: [{rel, hreflang?, href}]}.
  // Pure: the browser applies them (syncHead) and the build writes them into each page (headHtml).
  // `alternates` holds the page in each language the store offers; x-default is the English one, or
  // the only one. URLs are read against the page's address. `imageAlt`, `imageWidth` and
  // `imageHeight` describe the preview image; `price` ({price, priceCurrency}, ISO 4217, as
  // structured-data.js vfOfferPrice) adds a product's product:price:* tags. `structuredData` lists the
  // page's schema.org objects (structured-data.js); they come back as one JSON-LD @graph, or null.
  /** @param {{title?: string, description?: string, image?: string, imageAlt?: string, imageWidth?: number, imageHeight?: number, price?: {price: string, priceCurrency: string}, url?: string, locale?: string, type?: string, alternates?: Record<string, string>, noindex?: boolean, structuredData?: object[]}} [head] */
  const headTags = ({
    title,
    description,
    image,
    imageAlt,
    imageWidth,
    imageHeight,
    price,
    url,
    locale = 'en',
    type = 'website',
    alternates = {},
    noindex = false,
    structuredData = []
  } = {}) => {
    const img = vfAbsoluteUrl(image),
      href = vfAbsoluteUrl(url);
    // Open Graph names one alternate: the first other language the page has.
    const other = LANGUAGES.find(language => language !== locale && alternates[language]);
    const meta = [
      ['name', 'description', description],
      ['property', 'og:title', title],
      ['property', 'og:description', description],
      ['property', 'og:image', img],
      ['property', 'og:image:alt', img ? imageAlt : null],
      ['property', 'og:image:width', img && imageWidth ? String(imageWidth) : null],
      ['property', 'og:image:height', img && imageHeight ? String(imageHeight) : null],
      ['property', 'og:url', href],
      ['property', 'og:type', type],
      ['property', 'og:locale', LOCALE[locale] || locale],
      ['property', 'og:locale:alternate', alternates[other] ? LOCALE[other] : null],
      ['name', 'twitter:card', img ? 'summary_large_image' : 'summary'],
      ['name', 'twitter:title', title],
      ['name', 'twitter:description', description],
      ['name', 'twitter:image', img],
      ['name', 'twitter:image:alt', img ? imageAlt : null],
      ['property', 'product:price:amount', price ? price.price : null],
      ['property', 'product:price:currency', price ? price.priceCurrency : null],
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
    const graph = noindex ? [] : structuredData.filter(Boolean);
    const jsonLd = graph.length
      ? // Inside <script>: "<" is escaped, so no text in the data can close the element.
        JSON.stringify({'@context': 'https://schema.org', '@graph': graph}).replace(/</g, '\\u003c')
      : null;
    return {title, meta, links, jsonLd};
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
      ),
      ...(tags.jsonLd
        ? ['<script type="application/ld+json" data-ag-seo>' + tags.jsonLd + '</script>']
        : [])
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
    const jsonLd = 'script[type="application/ld+json"][data-ag-seo]';
    if (tags.jsonLd) {
      upsert(jsonLd, 'script', {type: 'application/ld+json'});
      const script = document.head.querySelector(jsonLd);
      if (script.textContent !== tags.jsonLd) script.textContent = tags.jsonLd;
    } else drop(jsonLd);
  };
  return {isNoindex, headTags, headHtml, syncHead};
})();
