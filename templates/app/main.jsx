// The storefront app: the click-through site, or one page on its own with ?page=<name>.
import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import './theme.js';
import './runtime.js';
import {PageError} from './PageError.jsx';
import {loadPage, reloadOnStaleFiles} from './pages.js';
import {vfHoldClock} from '../_shared/environment.js';
import {vfReadRoute} from '../_shared/routing.js';
import {vfApplyTvMode} from '../_shared/tv.js';

reloadOnStaleFiles();
vfApplyTvMode();

const name = new URLSearchParams(location.search).get('page') || 'site';
const container = document.getElementById('root');

// Whether this browser holds any of the storefront's own state (bag, saved items, customer, consent,
// language, display settings...): keys starting vf- or vendra.
function storedState() {
  try {
    return [localStorage, sessionStorage].some(storage =>
      Object.keys(storage).some(key => /^(vf-|vendra)/.test(key))
    );
  } catch {
    return true;
  }
}

// The build prerenders each address as a first-time visitor sees it, with no query (data-vf-path on
// #root names the address, data-vf-time the moment it rendered at). React adopts that markup
// (hydration) when this visit is exactly that, rendering at that moment first (the page then renders
// again at the real time: page-lifecycle.js);
// otherwise, for a returning visitor, a query (filters, steps, a standalone ?page=), or the host's
// 404 page at another address, it renders afresh over it.
const prerendered =
  name === 'site' &&
  container.dataset.vfPath === location.pathname &&
  !location.search &&
  !storedState();
// Markup this visit won't adopt goes at once, so nothing types into or clicks a page that is about to
// be replaced; the page then renders as it always has.
if (!prerendered) container.replaceChildren();

function show(element) {
  if (prerendered) vfHoldClock(Number(container.dataset.vfTime) || Date.now());
  if (prerendered)
    hydrateRoot(container, element, {
      onRecoverableError(error) {
        console.error('Hydration failed; the page rendered again in the browser.', error);
      }
    });
  else createRoot(container).render(element);
  window.VF_RENDERED = prerendered ? 'hydrated' : 'rendered';
  // The 404 page waits to show its prerendered not-found content until the app knows the address.
  document.documentElement.removeAttribute('data-vf-routing');
}

// The address's own page loads first, so hydration renders it at once, as the prerender did (the
// account opens sign-in for a visitor who isn't signed in). A failure there is the site's to show.
function addressPage() {
  const view = vfReadRoute().view;
  const views = view === 'account' ? ['account', 'signin'] : [view];
  return Promise.all(views.map(view => loadPage(view)?.catch(() => {})));
}

(loadPage(name) || loadPage('site'))
  .then(page => (name === 'site' ? addressPage().then(() => page) : page))
  .then(
    page => {
      const Page = page.default;
      show(<Page {...page.defaults} />);
    },
    error => {
      console.error(error);
      // Markup for a page that can't run is left behind: render the error over it.
      createRoot(container).render(<PageError />);
      document.documentElement.removeAttribute('data-vf-routing');
    }
  );
