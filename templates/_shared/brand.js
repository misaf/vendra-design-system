// Asset paths are relative to the deployment root, including deployments in a subdirectory.
import {VF_TENANT_BRANDS} from '../_runtime/tenant-slugs.js';
import {VF_STORE} from './store-config.js';

/** @typedef {{src: string, width: number, height: number, alt?: {en: string, fa: string}}} BrandImage */
/** @typedef {{logo?: BrandImage, logoMark?: BrandImage, logoOnDark?: BrandImage, icons?: {favicon: string, apple: string, app192: string, app512: string, maskable: string}, ogImage?: {en: string, fa: string}}} BrandAssets */
/** @returns {BrandAssets} */
export function vfBrand(tenant) {
  return {...VF_TENANT_BRANDS[tenant], ...(tenant === VF_STORE.tenant ? VF_STORE.brandAssets : {})};
}
export function vfBrandUrl(src) {
  return new URL(src, new URL(window.VF_ASSET_BASE || '../../', location.href)).href;
}

// Replace existing links too: switching tenants must never leave the previous florist's icons.
export function vfBrandHead(tenant, lang) {
  const icons = vfBrand(tenant).icons;
  for (const [rel, src, size] of [
    ['icon', icons?.favicon || 'assets/icons/favicon-32.png', '32x32'],
    ['apple-touch-icon', icons?.apple || 'assets/icons/apple-touch-icon.png', '180x180'],
    ['manifest', `assets/tenants/${tenant}/manifest-${lang}.webmanifest`, '']
  ]) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.append(link);
    }
    link.setAttribute('href', vfBrandUrl(src));
    if (size) link.setAttribute('sizes', size);
  }
}
