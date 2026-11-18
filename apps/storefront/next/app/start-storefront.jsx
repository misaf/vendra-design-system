import React from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {PageError} from '../../app/PageError.jsx';
import {loadPage} from '../../app/pages.js';
import {installTenantTheme} from '../../app/tenant-theme.js';
import {VF_STORE, vfLanguage} from '../../shared/domain/store-config.js';
import {vfAccountLocale, vfAccountPhone} from '../../shared/domain/account-data.js';
import {vfHoldClock} from '../../shared/platform/environment.js';
import {vfRuntime} from '../../shared/platform/runtime.js';
import {vfTenant} from '../../shared/services/page-lifecycle.js';
import {vfReadRoute} from '../../shared/services/routing.js';
import {vfApplyTvMode} from '../../shared/services/tv.js';
import '../../app/runtime.js';

function storedState() {
  try {
    return [localStorage, sessionStorage].some(storage =>
      Object.keys(storage).some(key => /^(vf-|vendra)/.test(key))
    );
  } catch {
    return true;
  }
}

async function loadStorefront(query, route, hydrate) {
  const name = query.get('page') || 'site';
  const preview = name !== 'site' && loadPage(name);
  if (preview) {
    const {default: Page, defaults} = await preview;
    const lang = vfLanguage(query.get('lang') || route.lang || vfAccountLocale() || defaults?.lang);
    return <Page {...defaults} lang={lang} />;
  }

  // Preload the first screen so the first render can adopt the server's markup.
  const view =
    route.view === 'account' && !vfAccountPhone()
      ? 'signin'
      : route.view === 'checkout'
        ? hydrate
          ? 'bag'
          : null
        : route.view;
  const [{default: Page, defaults}] = await Promise.all([
    import('../../pages/site/Page.jsx'),
    view && loadPage(view)?.catch(() => {})
  ]);
  return <Page {...defaults} />;
}

export async function startStorefront(container, active) {
  if (!container || !active()) return;
  installTenantTheme(process.env.NEXT_PUBLIC_VF_BASE_PATH + '/');
  if (process.env.NODE_ENV === 'development') window.__vfDevStore = VF_STORE;
  vfRuntime.offlineDisplay = process.env.NODE_ENV === 'production';
  vfApplyTvMode();

  const query = new URLSearchParams(location.search);
  const preview = container.parentElement?.dataset;
  const hydrate =
    process.env.NODE_ENV === 'production' &&
    preview?.vfPath === location.pathname &&
    !location.search &&
    !storedState();

  if (!hydrate && container.querySelector('[data-tenant]')?.dataset.tenant !== vfTenant())
    container.replaceChildren();

  if (!hydrate)
    container
      .querySelectorAll('input, textarea, select, button')
      .forEach(control => control.setAttribute('disabled', ''));

  let page;
  try {
    page = await loadStorefront(query, vfReadRoute(), hydrate);
  } catch (error) {
    if (!active()) return;
    console.error(error);
    const root = createRoot(container);
    root.render(<PageError />);
    container.removeAttribute('inert');
    return root;
  }
  if (!active()) return;

  vfRuntime.rendered = hydrate ? 'hydrated' : 'rendered';
  if (hydrate) {
    vfHoldClock(Number(preview.vfTime));
    return hydrateRoot(container, page, {
      onRecoverableError(error) {
        console.error('Hydration failed; the page rendered again in the browser.', error);
      }
    });
  }
  const root = createRoot(container);
  root.render(page);
  return root;
}
