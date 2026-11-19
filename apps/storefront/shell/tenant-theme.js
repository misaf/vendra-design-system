import {vfRuntime} from '../shared/platform/runtime.js';

let renderedTenant = '';
let reveal = () => {};

export function tenantRendered(tenant) {
  renderedTenant = tenant;
  reveal();
}

export function installTenantTheme(assetBase) {
  vfRuntime.assetBase = assetBase;
  // Loads only this tenant's stylesheet (page code calls it with ?tenant= or store-config.js). The page
  // stays hidden until the theme arrives so another brand's colours never flash, for at most 2s. The
  // build links the store's own theme in every prerendered page, so those never wait for it.
  vfRuntime.useTenant = tenant => {
    let link = /** @type {HTMLLinkElement & {vfTimer?: number}} */ (
      document.getElementById('vf-tenant-css')
    );
    const root = document.documentElement;
    if (!tenant || tenant === 'default' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tenant)) {
      if (link) {
        clearTimeout(link.vfTimer);
        link.remove();
      }
      reveal = () => {};
      root.removeAttribute('data-vf-tenant-loading');
      return;
    }
    const href = new URL(
      vfRuntime.assetBase + 'apps/storefront/design-system/tokens/tenants/' + tenant + '.css',
      location.href
    ).href;
    if (link && link.href === href) return;
    root.setAttribute('data-vf-tenant-loading', '');
    if (!link) {
      link = document.createElement('link');
      link.id = 'vf-tenant-css';
      link.rel = 'stylesheet';
    }
    const done = () => {
      clearTimeout(link.vfTimer);
      root.removeAttribute('data-vf-tenant-loading');
      reveal = () => {};
    };
    let loaded = false;
    reveal = () => {
      if (loaded && renderedTenant === tenant) done();
    };
    link.onload = () => {
      loaded = true;
      reveal();
    };
    link.onerror = () => {
      done();
      console.error('No tenant theme at ' + href);
    };
    clearTimeout(link.vfTimer);
    link.vfTimer = setTimeout(done, 2000);
    link.setAttribute('href', href);
    document.head.appendChild(link);
  };
  // Load the tenant that the client entry selected before installing the stylesheet loader.
  if (vfRuntime.tenant) vfRuntime.useTenant(vfRuntime.tenant);
}
