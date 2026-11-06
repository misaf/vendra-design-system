// The storefront's styles and tenant theme. The design system's styles, Tailwind and the pages' custom
// CSS are imported (Vite bundles them, fonts included); the active tenant's theme loads on demand,
// after them, because tenant rules match :root's specificity.
// Tailwind first: the first stylesheet fixes the cascade-layer order, so Tailwind's layers sit under
// the package's (vendra.*), and the page CSS (in vendra.components) meets the ag-* classes on
// specificity while both still win over utilities, as the storefront was written.
import '../_runtime/tailwind.css';
import '../../../packages/design-system/styles.css';
import '../_runtime/custom.css';
import {vfRuntime} from '../shared/platform/runtime.js';

// Product images, map scripts and tenant themes sit under this root (the build copies them).
// The dev server serves the repo root and the build keeps the same paths, both at the base path,
// which the build's prerender also writes (a path, so its markup matches the browser's).
vfRuntime.assetBase = import.meta.env.BASE_URL;

// Loads only this tenant's stylesheet (page code calls it with ?tenant= or store-config.js). The page
// stays hidden until the theme arrives so another brand's colours never flash, for at most 2s. The
// build links the store's own theme in every prerendered page, so those never wait for it.
vfRuntime.useTenant = tenant => {
  let link = /** @type {HTMLLinkElement & {vfTimer?: number}} */ (
    document.getElementById('vf-tenant-css')
  );
  if (!tenant || tenant === 'default' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tenant)) {
    if (link) link.remove();
    return;
  }
  const href = new URL(
    vfRuntime.assetBase + 'packages/design-system/tokens/tenants/' + tenant + '.css',
    location.href
  ).href;
  if (link && link.href === href) return;
  const root = document.documentElement;
  if (!document.getElementById('vf-tenant-wait')) {
    const style = document.createElement('style');
    style.id = 'vf-tenant-wait';
    style.textContent = 'html[data-vf-tenant-loading] body{visibility:hidden}';
    document.head.appendChild(style);
  }
  root.setAttribute('data-vf-tenant-loading', '');
  if (!link) {
    link = document.createElement('link');
    link.id = 'vf-tenant-css';
    link.rel = 'stylesheet';
  }
  const done = () => {
    clearTimeout(link.vfTimer);
    root.removeAttribute('data-vf-tenant-loading');
  };
  link.onload = done;
  link.onerror = () => {
    done();
    console.error('No tenant theme at ' + href);
  };
  clearTimeout(link.vfTimer);
  link.vfTimer = setTimeout(done, 2000);
  link.setAttribute('href', href);
  document.head.appendChild(link);
};
// A tenant applied before this module ran (page-lifecycle.js records it) loads now.
if (vfRuntime.tenant) vfRuntime.useTenant(vfRuntime.tenant);
