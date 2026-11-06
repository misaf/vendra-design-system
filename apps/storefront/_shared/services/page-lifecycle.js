// Heading focus, announcements and SEO for storefront pages.
// Shared lifecycle for standalone templates and pages inside the click-through site.
import {vfBrand, vfBrandHead, vfBrandUrl} from '../domain/brand.js';
import {VF_TENANT_SLUGS} from '../../_runtime/tenant-slugs.js';
import {VF_PRODUCTS, vfFindProduct} from '../domain/catalog.js';
import {VF_ROUTE_EXTRA, vfPageRoute, vfRouteUrl} from './routing.js';
import {VF_STORE} from '../domain/store-config.js';
import {VF_SHELL} from '../translations/shell.js';
import {VF_SEO} from './seo.js';
import {useLifecycle} from './page-state.js';
import {VF_NAV} from './page-focus.js';
import {vfHoldClock, vfLocation, vfOnServer, vfServerPage} from '../platform/environment.js';

// The tenant theme: ?tenant=<slug> for previews, otherwise this store's own (store-config.js).
export function vfTenant() {
  const asked = vfLocation().searchParams.get('tenant');
  if (VF_TENANT_SLUGS.includes(asked)) return asked;
  return VF_TENANT_SLUGS.includes(VF_STORE.tenant) ? VF_STORE.tenant : 'default';
}

// A page's tenant: its own Theme setting when one is chosen, otherwise vfTenant().
export function vfPageTenant(props) {
  const tenant = VF_TENANT_SLUGS.includes(props.tenant) ? props.tenant : vfTenant();
  vfApplyTenant(tenant);
  return tenant;
}

// Asks app/theme.js to load this tenant's stylesheet, and only that one. The loader
// arrives asynchronously, so whichever of the two runs second does the loading. The build's prerender
// links the store's own theme in the page instead.
export function vfApplyTenant(tenant) {
  if (vfOnServer() || window.VF_TENANT === tenant) return;
  window.VF_TENANT = tenant;
  if (window.VF_USE_TENANT) window.VF_USE_TENANT(tenant);
}
// What every storefront page does around its own logic: send the page-view analytics event, and once each render settles set the document language and
// direction, move focus to a new heading and announce it, and update <head> (title, alternates).
export function useStorefrontPage(page) {
  vfServerPage(page);
  useLifecycle(page, {
    didMount() {
      // Hydrated at the moment the build rendered this page: render again at the real time, so
      // delivery days and cut-offs are the visitor's (environment.js vfNow).
      if (vfHoldClock(null)) page.setState({});
      // The app has the page: it takes clicks and typing again (app/main.jsx).
      document.getElementById('root')?.removeAttribute('inert');
      const route = vfPageRoute(page.props);
      const event = {product: 'view_item', bag: 'view_cart', checkout: 'begin_checkout'}[
        page._vfPage
      ];
      if (event)
        window.VF_TRACK.event(
          event,
          page._vfPage === 'product'
            ? {items: [window.VF_TRACK.item(vfFindProduct(route.id) || VF_PRODUCTS[0])]}
            : {}
        );
      vfAnnounce(page);
    },
    didUpdate() {
      vfAnnounce(page);
    },
    willUnmount() {
      clearTimeout(page._vfTimer);
    }
  });
}
function vfAnnounce(page) {
  clearTimeout(page._vfTimer);
  page._vfTimer = setTimeout(() => {
    // Language and direction never wait for a heading (loading states have none).
    const lang = page.props.lang === 'fa' ? 'fa' : 'en';
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.dataset.lang = lang;
    const h = /** @type {HTMLElement} */ (document.querySelector('main h1'));
    const tenant = VF_TENANT_SLUGS.includes(page.props.tenant) ? page.props.tenant : vfTenant();
    vfBrandHead(tenant, lang);
    if (!h) return;
    const title = h.innerText.replace(/\s+/g, ' ').trim();
    const identity = title + lang + tenant;
    if (identity === page._vfTitle) return;
    page._vfTitle = identity;
    // On the first view of a document, leave focus at the top so Tab reaches the
    // skip link and header; the browser already reads the new page. Only later
    // views (in-site navigation, a replaced h1) move focus and announce.
    if (window.VF_VIEWED) {
      // Keep an explicitly focused field or recovery control (e.g. Undo after the last bag item
      // disappears). The changed heading is still announced and its SEO is updated.
      VF_NAV.focusHeading({preserveFocus: true});
      if (page.props.store && page.props.store.announce) page.props.store.announce(title);
      else
        page.setState({
          vfAnnouncement: title
        });
    }
    window.VF_VIEWED = true;
    VF_SEO.syncHead(vfPageHead(page, title));
  }, 40);
}

// A page's <head> (VF_SEO.headTags): its main heading as the title, this address as the canonical
// one, the page in each of the store's languages, a preview image with its alt text and size
// (`page.head.image`, {src, alt, width, height}, set by pages with a photo of their own, otherwise the
// tenant's 1200×630 preview image), a product's price (`page.head.price`) and the page's schema.org
// data (`page.head.structuredData`, structured-data.js). The browser applies it once the page has
// rendered; the build writes it into the page's static HTML (app/entry-server.jsx).
export function vfPageHead(page, heading) {
  const lang = page.props.lang === 'fa' ? 'fa' : 'en';
  const tenant = VF_TENANT_SLUGS.includes(page.props.tenant) ? page.props.tenant : vfTenant();
  const head = page.head || {};
  const image = head.image?.src
    ? head.image
    : {
        src: vfBrandUrl(vfBrand(tenant).ogImage?.[lang] || `assets/social/og-default-${lang}.png`),
        alt: VF_SHELL[lang].brand,
        width: 1200,
        height: 630
      };
  return {
    title: heading + ' · ' + VF_SHELL[lang].brand,
    description: head.description || heading,
    image: image.src,
    imageAlt: image.alt,
    imageWidth: image.width,
    imageHeight: image.height,
    price: head.price,
    url: vfLocation().href,
    locale: lang,
    type: head.type || 'website',
    structuredData: head.structuredData,
    noindex: VF_SEO.isNoindex(page._vfPage) || page._vfPage === 'signin',
    alternates: Object.fromEntries(
      VF_STORE.languages.map(lang => [
        lang,
        vfRouteUrl({
          ...VF_ROUTE_EXTRA[page._vfPage],
          ...vfPageRoute(page.props),
          view: page._vfPage,
          lang
        })
      ])
    )
  };
}
