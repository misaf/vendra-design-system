// Loads this design system into the template. In a consuming project, point
// base at the bound DS folder relative to this file (e.g. '_ds/<folder>' at
// the project root, '../_ds/<folder>' one level down) — one line to edit.
(() => {
  const base = '../..';
  // Product image paths use the same editable design-system root as CSS and the bundle.
  window.VF_ASSET_BASE = new URL(base + '/', document.currentScript.src).href;
  const assetRoot = new URL(base + '/', document.currentScript.src);
  const runtimeRoot = new URL('./', document.currentScript.src);
  // styles.css imports all fonts, tokens, tenant themes and component styles.
  for (const url of [new URL('styles.css', assetRoot), new URL('tailwind.css', runtimeRoot), new URL('custom.css', runtimeRoot)]) {
    if (Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(link => link.href === url.href)) continue;
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = url.href;
    document.head.appendChild(link);
  }
  // Only the active tenant's theme is loaded (page code sets VF_TENANT from
  // ?tenant= or store-config.js). Page code may run before or after this loader,
  // so both sides call VF_USE_TENANT. tokens/tenants.css holds every tenant, for cards.
  if (!window.VF_USE_TENANT) {
    window.VF_USE_TENANT = tenant => {
      let link = document.getElementById('vf-tenant-css');
      if (!tenant || tenant === 'default' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tenant)) { if (link) link.remove(); return; }
      const href = new URL('tokens/tenants/' + tenant + '.css', assetRoot).href;
      if (link && link.href === href) return;
      // Keep the page hidden until the theme arrives so another brand's colours never
      // flash; give up after 2s so a slow or missing file cannot leave it blank.
      const root = document.documentElement;
      if (!document.getElementById('vf-tenant-wait')) {
        const style = document.createElement('style');
        style.id = 'vf-tenant-wait'; style.textContent = 'html[data-vf-tenant-loading] body{visibility:hidden}';
        document.head.appendChild(style);
      }
      root.setAttribute('data-vf-tenant-loading', '');
      const done = () => { clearTimeout(link.vfTimer); root.removeAttribute('data-vf-tenant-loading'); };
      if (!link) {
        link = document.createElement('link');
        link.id = 'vf-tenant-css'; link.rel = 'stylesheet';
        link.onerror = () => { done(); console.error('ds-base.js: no tenant theme at ' + link.href + ' — add tokens/tenants/' + tenant + '.json and run npm --prefix templates run build'); };
      }
      link.onload = done;
      clearTimeout(link.vfTimer);
      link.vfTimer = setTimeout(done, 2000);
      link.href = href;
      // After styles.css: tenant rules match :root's specificity, so they must come later.
      document.head.appendChild(link);
    };
    if (window.VF_TENANT) window.VF_USE_TENANT(window.VF_TENANT);
  }
  // Imported pages reuse the same design-system bundle and styles.
  if (window.VendraDesignSystem_f4f210 || window.VF_BUNDLE_LOADING || document.querySelector('script[data-vf-bundle]')) return;
  window.VF_BUNDLE_LOADING = true;
  const s = document.createElement('script');
  s.src = new URL('_ds_bundle.js', assetRoot).href;
  s.setAttribute('data-vf-bundle', '');
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
  // The DC runtime fetches React, and SnapScroller calls React.forwardRef while the
  // bundle evaluates, so the bundle waits for React.
  const add = () => window.React ? document.head.appendChild(s) : setTimeout(add, 10);
  add();
})();
