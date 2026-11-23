// Browser lifecycle for storefront pages: analytics, document updates, focus and announcements.
import React from 'react';
import {vfBrandHead} from '../store/brand.js';
import {vfLocale} from '../store/store-config.js';
import {vfRuntime} from '../../platform/browser/runtime.js';
import {vfReportLists} from '../../platform/browser/list-tracking.js';
import {VF_NAV} from '../../platform/browser/page-focus.js';
import {vfPageHead} from './page-metadata.js';
import {VF_SEO} from './seo.js';
import {vfTenant} from '../../platform/tenant/tenant.js';

export function useStorefrontPage(page, pageHead) {
  const previousHeading = React.useRef(null);

  React.useEffect(() => {
    vfRuntime.restoreSession?.();
    vfRuntime.rendered = 'hydrated';
  }, [page]);

  // Report lists after they commit. Metadata and focus wait for the latest committed DOM.
  React.useEffect(() => {
    vfReportLists(page);
    const timer = setTimeout(() => vfAnnounce(page, pageHead, previousHeading), 40);
    return () => clearTimeout(timer);
  });
}
function vfAnnounce(page, pageHead, previousHeading) {
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
  const head = vfPageHead(page, title, pageHead);
  if (page.props.updateHead) page.props.updateHead(head);
  else VF_SEO.syncHead(head);
  if (identity === previousHeading.current) return;
  previousHeading.current = identity;
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
}
