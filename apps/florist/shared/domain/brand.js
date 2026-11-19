// Asset paths are relative to the deployment root, including deployments in a subdirectory.
import {VF_TENANT_BRANDS} from '../../_runtime/tenant-slugs.js';
import {VF_STORE} from './store-config.js';
import {vfAssetBase} from '../platform/environment.js';

/** @typedef {{src: string, width: number, height: number, alt?: {en: string, fa: string}}} BrandImage */
/** @typedef {{favicon16?: string, favicon: string, apple: string, app192: string, app512: string, maskable: string}} BrandIcons */
/** @typedef {{shortName?: {en: string, fa: string}, logo?: BrandImage, logoMark?: BrandImage, logoOnDark?: BrandImage, icons?: BrandIcons, ogImage?: {en: string, fa: string}}} BrandAssets */
/** @returns {BrandAssets} */
export function vfBrand(tenant) {
  return {...VF_TENANT_BRANDS[tenant], ...(tenant === VF_STORE.tenant ? VF_STORE.brandAssets : {})};
}
// A relative asset path starts at the deployment's asset base (environment.js), the same path on the
// server and in the browser, so prerendered logos hydrate unchanged.
export function vfBrandUrl(src) {
  return /^([a-z][\w+.-]*:|\/)/i.test(src) ? src : vfAssetBase() + src;
}

// The browser-tab icons (16 and 32 px), the home-screen icon and the web app manifest. A tenant with
// icons of its own but no 16 px favicon gets none: browsers scale its 32 px icon instead of showing
// the shared default.
/** @returns {{rel: string, href: string, sizes?: string, type?: string}[]} */
export function vfBrandLinks(tenant, lang) {
  const icons = vfBrand(tenant).icons;
  const favicon16 = icons ? icons.favicon16 : 'assets/icons/favicon-16.png';
  return [
    ...(favicon16 ? [{rel: 'icon', sizes: '16x16', type: 'image/png', href: favicon16}] : []),
    {
      rel: 'icon',
      sizes: '32x32',
      type: 'image/png',
      href: icons?.favicon || 'assets/icons/favicon-32.png'
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: icons?.apple || 'assets/icons/apple-touch-icon.png'
    },
    {rel: 'manifest', href: `assets/tenants/${tenant}/manifest-${lang}.webmanifest`}
  ].map(link => ({...link, href: vfBrandUrl(link.href)}));
}

// The same links as HTML, written into the build's static pages so browsers find them before the
// app starts.
export function vfBrandHtml(tenant, lang) {
  const escape = value =>
    String(value).replace(
      /[&<>"]/g,
      character => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[character]
    );
  return vfBrandLinks(tenant, lang)
    .map(
      link =>
        '<link ' +
        Object.entries(link)
          .map(([key, value]) => key + '="' + escape(value) + '"')
          .join(' ') +
        '>'
    )
    .join('\n');
}

// Replace existing links too: switching tenants must never leave the previous florist's icons.
export function vfBrandHead(tenant, lang) {
  const links = vfBrandLinks(tenant, lang);
  if (!links.some(link => link.sizes === '16x16'))
    document.head.querySelector('link[rel="icon"][sizes="16x16"]')?.remove();
  for (const attributes of links) {
    const selector =
      `link[rel="${attributes.rel}"]` +
      (attributes.rel === 'icon' ? `[sizes="${attributes.sizes}"]` : '');
    const existing = document.head.querySelector(selector);
    const link = existing || document.createElement('link');
    for (const [key, value] of Object.entries(attributes)) link.setAttribute(key, value);
    if (!existing) document.head.append(link);
  }
}
