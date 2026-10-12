// Responsive state, heading focus, announcements and SEO for storefront pages.
// Shared lifecycle for standalone templates and pages inside the click-through site.
import {VF_TENANT_SLUGS} from '../_runtime/tenant-slugs.js';
import {VF_PRODUCTS, vfFindProduct} from './catalog.js';
import {vfMobile} from './delivery.js';
import {VF_ROUTE_EXTRA, vfPageRoute, vfRouteParams} from './routing.js';
import {VF_STORE} from './store-config.js';
import {VF_SHELL} from './translations/shell.js';
import {VF_SEO} from './seo.js';
import {useLifecycle} from './page-state.js';
import {VF_NAV} from './page-focus.js';

// The tenant theme: ?tenant=<slug> for previews, otherwise this store's own (store-config.js).
export function vfTenant() {
  const asked = new URLSearchParams(location.search).get('tenant');
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
// arrives asynchronously, so whichever of the two runs second does the loading.
export function vfApplyTenant(tenant) {
  if (window.VF_TENANT === tenant) return;
  window.VF_TENANT = tenant;
  if (window.VF_USE_TENANT) window.VF_USE_TENANT(tenant);
}
// What every storefront page does around its own logic: track the phone breakpoint (vfMobile), send
// the page-view analytics event, and once each render settles set the document language and
// direction, move focus to a new heading and announce it, and update <head> (title, alternates).
export function useStorefrontPage(page) {
  useLifecycle(page, {
    didMount() {
      page._vfMedia = window.matchMedia('(max-width:767px)');
      page._vfResize = () =>
        page.setState({
          vfMobile: page._vfMedia.matches
        });
      page._vfMedia.addEventListener('change', page._vfResize);
      page._vfResize();
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
      page._vfMedia && page._vfMedia.removeEventListener('change', page._vfResize);
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
    if (!h) return;
    const title = h.innerText.replace(/\s+/g, ' ').trim();
    if (title === page._vfTitle) return;
    page._vfTitle = title;
    // On the first view of a document, leave focus at the top so Tab reaches the
    // skip link and header; the browser already reads the new page. Only later
    // views (in-site navigation, a replaced h1) move focus and announce.
    if (window.VF_VIEWED) {
      // A form field the page has just focused (e.g. "Track another order") keeps focus; the heading is still announced.
      const field =
        document.activeElement &&
        document.activeElement.closest('main') &&
        document.activeElement.matches('input, select, textarea');
      if (!field) VF_NAV.focusHeading();
      if (page.props.store && page.props.store.announce) page.props.store.announce(title);
      else
        page.setState({
          vfAnnouncement: title
        });
    }
    window.VF_VIEWED = true;
    const url = location.href;
    VF_SEO.syncHead({
      title: title + ' · ' + VF_SHELL[lang].brand,
      description: title,
      url,
      locale: lang,
      noindex: VF_SEO.isNoindex(page._vfPage) || page._vfPage === 'signin',
      alternates: Object.fromEntries(
        ['en', 'fa'].map(lang => [
          lang,
          (page.props.go ? '' : '../app/') +
            vfRouteParams({
              ...VF_ROUTE_EXTRA[page._vfPage],
              ...vfPageRoute(page.props),
              view: page._vfPage,
              lang
            })
        ])
      )
    });
  }, 40);
}
