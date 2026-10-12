// The storefront's styles and tenant theme. The design system's styles, Tailwind and the pages' custom
// CSS are imported (Vite bundles them, fonts included); the active tenant's theme loads on demand,
// after them, because tenant rules match :root's specificity.
import '../../styles.css';
import '../_runtime/tailwind.css';
import '../_runtime/custom.css';

// Product images, map scripts and tenant themes sit under this root (the build copies them).
// The dev server serves the repo root and the build keeps the same paths, both at the base URL.
window.VF_ASSET_BASE = new URL(import.meta.env.BASE_URL, location.href).href;

// Loads only this tenant's stylesheet (page code calls it with ?tenant= or store-config.js). The page
// stays hidden until the theme arrives so another brand's colours never flash, for at most 2s.
window.VF_USE_TENANT = tenant => {
  let link = document.getElementById('vf-tenant-css');
  if (!tenant || tenant === 'default' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tenant)) {
    if (link) link.remove();
    return;
  }
  const href = window.VF_ASSET_BASE + 'tokens/tenants/' + tenant + '.css';
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
if (window.VF_TENANT) window.VF_USE_TENANT(window.VF_TENANT);
