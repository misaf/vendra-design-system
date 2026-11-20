// Browser lifecycle for storefront pages: analytics, document updates, focus and announcements.
import {vfBrandHead} from '../../domain/brand.js';
import {VF_PRODUCTS, vfFindProduct} from '../../domain/catalog.js';
import {vfLocale} from '../../domain/store-config.js';
import {vfRuntime} from '../platform/runtime.js';
import {vfReportLists} from './list-tracking.js';
import {VF_NAV} from './page-focus.js';
import {vfPageHead} from './page-metadata.js';
import {useLifecycle} from './page-state.js';
import {vfPageRoute} from './routing.js';
import {VF_SEO} from './seo.js';
import {vfTenant} from './tenant.js';

// What every storefront page does around its own logic: send the page's analytics events (its own
// view event and the product lists it rendered: list-tracking.js), and once each render settles set the document language and
// direction, move focus to a new heading and announce it, and update <head> (title, alternates).
export function useStorefrontPage(page) {
  useLifecycle(page, {
    didMount() {
      vfRuntime.restoreSession?.();
      vfRuntime.rendered = 'hydrated';
      const route = vfPageRoute(page.props);
      const event = {product: 'view_item', bag: 'view_cart', checkout: 'begin_checkout'}[
        page._vfPage
      ];
      if (event)
        vfRuntime.track.event(
          event,
          page._vfPage === 'product'
            ? {items: [vfRuntime.track.item(vfFindProduct(route.id) || VF_PRODUCTS[0])]}
            : {}
        );
      vfReportLists(page);
      vfAnnounce(page);
    },
    didUpdate() {
      vfReportLists(page);
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
    const locale = vfLocale(page.props.lang);
    const lang = locale.code;
    document.documentElement.lang = lang;
    document.documentElement.dir = locale.dir;
    document.documentElement.dataset.lang = lang;
    const h = /** @type {HTMLElement} */ (document.querySelector('main h1'));
    const tenant = vfTenant(page.props.tenant);
    if (!page.props.updateHead) vfBrandHead(tenant, lang);
    if (!h) return;
    const title = h.innerText.replace(/\s+/g, ' ').trim();
    const identity = title + lang + tenant;
    // The head follows the route, not only the heading: a shop whose filters change keeps its h1
    // but gains or loses noindex, its canonical and its alternates. syncHead only writes changes.
    const head = vfPageHead(page, title);
    if (page.props.updateHead) page.props.updateHead(head);
    else VF_SEO.syncHead(head);
    if (identity === page._vfTitle) return;
    page._vfTitle = identity;
    // On the first view of a document, leave focus at the top so Tab reaches the
    // skip link and header; the browser already reads the new page. Only later
    // views (in-site navigation, a replaced h1) move focus and announce.
    if (vfRuntime.viewed) {
      // Keep an explicitly focused field or recovery control (e.g. Undo after the last bag item
      // disappears). The changed heading is still announced and its SEO is updated.
      VF_NAV.focusHeading({preserveFocus: true});
      if (page.props.store && page.props.store.announce) page.props.store.announce(title);
      else
        page.setState({
          vfAnnouncement: title
        });
    }
    vfRuntime.viewed = true;
  }, 40);
}
