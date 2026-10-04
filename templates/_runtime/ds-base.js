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
  for (const url of [new URL('styles.css', assetRoot), new URL('tailwind.css', runtimeRoot)]) {
    if (Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(link => link.href === url.href)) continue;
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = url.href;
    document.head.appendChild(link);
  }
  // Imported pages reuse the same design-system bundle and styles.
  if (window.VendraDesignSystem_f4f210 || document.querySelector('script[data-vf-bundle]')) return;
  const s = document.createElement('script');
  s.src = new URL('_ds_bundle.js', assetRoot).href;
  s.setAttribute('data-vf-bundle', '');
  s.onerror = () => console.error('ds-base.js: failed to load ' + s.src + ' — if this is a consuming project, point the base line in ds-base.js at the bound _ds/<folder> tree relative to this page (e.g. _ds/<folder> at the project root, ../_ds/<folder> one level down); in a fresh design system this can just mean the bundle is not compiled yet');
  document.head.appendChild(s);
})();
