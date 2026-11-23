import {vfBrand, vfBrandUrl} from '../store/brand.js';
import {VF_STORE, vfLocale} from '../store/store-config.js';
import {VF_SHELL} from './shell.js';
import {
  VF_ROUTE_EXTRA,
  vfCanonicalRoute,
  vfPageRoute,
  vfRouteRefined,
  vfRouteUrl
} from './routing.js';
import {VF_SEO} from './seo.js';
import {vfTenant} from '../../platform/tenant/tenant.js';

// Build metadata for both the Next.js export and browser navigation. A page can supply its own
// preview image, price and structured data. Canonical and alternate URLs come from the route.
export function vfPageHead(page, heading, head = page.head || {}) {
  const lang = vfLocale(page.props.lang).code;
  const tenant = vfTenant(page.props.tenant);
  const image = head.image?.src
    ? head.image
    : {
        src: vfBrandUrl(vfBrand(tenant).ogImage?.[lang] || `assets/social/og-default-${lang}.png`),
        alt: VF_SHELL[lang].brand,
        width: 1200,
        height: 630
      };
  const view = page._vfPage;
  const route = {...VF_ROUTE_EXTRA[view], ...vfPageRoute(page.props), view};
  const canonical = vfCanonicalRoute(route);
  return {
    title: heading + ' · ' + VF_SHELL[lang].brand,
    description: head.description || heading,
    image: image.src,
    imageAlt: image.alt,
    imageWidth: image.width,
    imageHeight: image.height,
    price: head.price,
    url: ['notfound', 'error'].includes(view) ? undefined : vfRouteUrl({...canonical, lang}),
    locale: lang,
    type: head.type || 'website',
    structuredData: head.structuredData,
    noindex: VF_SEO.isNoindex(view) || view === 'signin' || vfRouteRefined(route),
    alternates: Object.fromEntries(
      VF_STORE.languages.map(language => [language, vfRouteUrl({...canonical, lang: language})])
    )
  };
}
