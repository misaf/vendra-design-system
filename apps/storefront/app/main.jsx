// The storefront app: the click-through site, or one page on its own with ?page=<name>.
import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import './theme.js';
import './runtime.js';
import {PageError} from './PageError.jsx';
import {loadPage, reloadOnStaleFiles} from './pages.js';
import {vfAccountLocale, vfAccountPhone} from '../shared/domain/account-data.js';
import {VF_STORE, vfLanguage} from '../shared/domain/store-config.js';
import {vfHoldClock} from '../shared/platform/environment.js';
import {vfRuntime} from '../shared/platform/runtime.js';
import {vfTenant} from '../shared/services/page-lifecycle.js';
import {vfReadRoute} from '../shared/services/routing.js';
import {vfApplyTvMode} from '../shared/services/tv.js';

reloadOnStaleFiles();
vfApplyTvMode();

const query = new URLSearchParams(location.search);
const name = query.get('page') || 'site';
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
// again at the real time: page-lifecycle.js); otherwise, for a returning visitor, a query (filters,
// steps, a standalone ?page=), or the host's 404 page at another address, it renders in its place.
const prerendered =
  name === 'site' &&
  container.dataset.vfPath === location.pathname &&
  !location.search &&
  !storedState();
// The prerendered page stays in view while the app loads, but takes no clicks or typing until the
// app has it (page-lifecycle.js lifts this once the page has mounted): what is typed into a page
// that is about to be replaced, or before React listens, would be lost. Controls in a page that
// will be replaced are disabled as well, since some tools type into inert fields.
// Markup prerendered in another theme than this preview's (?tenant=) goes at once: its colours
// would show before the app re-renders it in this one.
if (
  !prerendered &&
  container.querySelector('[data-tenant]')?.getAttribute('data-tenant') !== vfTenant()
)
  container.replaceChildren();
if (container.firstChild) {
  container.inert = true;
  if (!prerendered)
    container
      .querySelectorAll('input, textarea, select, button')
      .forEach(control => control.setAttribute('disabled', ''));
}

function show(element) {
  if (prerendered) vfHoldClock(Number(container.dataset.vfTime) || Date.now());
  if (prerendered)
    hydrateRoot(container, element, {
      onRecoverableError(error) {
        console.error('Hydration failed; the page rendered again in the browser.', error);
      }
    });
  else createRoot(container).render(element);
  vfRuntime.rendered = prerendered ? 'hydrated' : 'rendered';
  // The 404 page waits to show its prerendered not-found content until the app knows the address.
  document.documentElement.removeAttribute('data-vf-routing');
}

// The page the site opens at this address loads first, so it renders at once: hydration renders
// what the prerender did, and the prerendered page stays until the app's replaces it. The account
// opens sign-in for a visitor who isn't signed in, and checkout the bag until it has what it needs
// (pages/site/logic.js), which a first-time visitor's prerendered page shows; otherwise the
// site loads what it decides on. A failure here is the site's to show.
function addressPage() {
  const view = vfReadRoute().view;
  const shown =
    view === 'account'
      ? prerendered || !vfAccountPhone()
        ? 'signin'
        : 'account'
      : view === 'checkout'
        ? prerendered
          ? 'bag'
          : null
        : view;
  return (shown && loadPage(shown)?.catch(() => {})) || Promise.resolve();
}

// A page shown on its own (?page=<name>) opens in the language asked for, as the site does: ?lang=,
// then the address's language (apps/storefront/app/fa/), then the customer's, then the page's own
// preview default. A language the store doesn't offer opens in its default one.
function standaloneLang(defaults) {
  return vfLanguage(
    query.get('lang') ||
      vfReadRoute().lang ||
      vfAccountLocale() ||
      defaults?.lang ||
      VF_STORE.languages[0]
  );
}

(loadPage(name) || loadPage('site'))
  .then(page => (name === 'site' ? addressPage().then(() => page) : page))
  .then(
    page => {
      const Page = page.default;
      const props =
        name === 'site' ? page.defaults : {...page.defaults, lang: standaloneLang(page.defaults)};
      show(<Page {...props} />);
    },
    error => {
      console.error(error);
      // Markup for a page that can't run is left behind: render the error over it.
      createRoot(container).render(<PageError />);
      container.inert = false;
      document.documentElement.removeAttribute('data-vf-routing');
    }
  );
