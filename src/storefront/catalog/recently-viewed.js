import {vfStoredValue} from '../../platform/browser/environment.js';
import {vfProductId, vfProductIds} from './catalog.js';

// Recently viewed products, newest first, kept in this browser only.
export const VF_RECENT_KEY = 'vendra-recently-viewed';
export function vfRecentlyViewed() {
  try {
    const ids = JSON.parse(vfStoredValue(VF_RECENT_KEY) || '[]');
    return vfProductIds(ids);
  } catch {
    return [];
  }
}
export function vfRememberViewed(id) {
  try {
    id = vfProductId(id);
    if (id)
      localStorage.setItem(
        VF_RECENT_KEY,
        JSON.stringify([id, ...vfRecentlyViewed().filter(x => x !== id)].slice(0, 8))
      );
  } catch {}
}
