import {VF_PRODUCTS, vfProductId} from '../../../storefront/catalog/catalog.js';
import {vfCustomerId} from '../../../storefront/customer/account-data.js';

const KEY = 'vendra-saved-map';
const OWNER_KEY = 'vendra-saved-map-owner';

/** @typedef {{customerId: string, owns: () => boolean}} SavedRequestScope */

function currentSavedScope() {
  const customerId = vfCustomerId();
  return {customerId, owns: () => vfCustomerId() === customerId};
}

/**
 * @param {{live: boolean}} client
 * @param {ReturnType<typeof import('./request.js').createRequest>} request
 */
export function createSavedItems(client, request) {
  const map = ({customerId}) => {
    try {
      const owner = localStorage.getItem(OWNER_KEY);
      if (owner != null && owner !== customerId) localStorage.removeItem(KEY);
      if (owner !== customerId) localStorage.setItem(OWNER_KEY, customerId);
      return JSON.parse(localStorage.getItem(KEY) || '{}') || {};
    } catch {
      return {};
    }
  };
  const setMap = m => {
    try {
      localStorage.setItem(KEY, JSON.stringify(m));
    } catch {}
  };
  // Product slug -> numeric catalog id. Fill p.apiId when the catalog comes from GET /api/catalog/products.
  const pid = slug => {
    const p = VF_PRODUCTS.find(x => x.id === slug);
    return p && p.apiId;
  };
  // A quick Undo must wait for this product's removal before saving it again. Keep other
  // products independent, and let the next action proceed even if an earlier request failed.
  const savedWrites = new Map();
  const writeSaved = (slug, scope, change) => {
    const key = JSON.stringify([scope.customerId, slug]);
    const previous = savedWrites.get(key) || Promise.resolve();
    const next = previous.catch(() => {}).then(() => (scope.owns() ? change() : null));
    savedWrites.set(key, next);
    const clear = () => {
      if (savedWrites.get(key) === next) savedWrites.delete(key);
    };
    next.then(clear, clear);
    return next;
  };
  // POST /api/customers/saved-items  {sellableType, sellableId, metadata}
  const saveItem = (slug, scope = currentSavedScope()) =>
    writeSaved(slug, scope, async () => {
      const id = pid(slug);
      if (!client.live || id == null) return null;
      map(scope);
      const r = await request('POST', '/api/customers/saved-items', {
        sellableType: 'product',
        sellableId: id,
        metadata: {
          slug
        }
      });
      if (!scope.owns()) return null;
      if (r && r.id != null) {
        const m = map(scope);
        m[slug] = r.id;
        setMap(m);
      }
      return r;
    });
  // DELETE /api/customers/saved-items/{id}
  const unsaveItem = (slug, scope = currentSavedScope()) =>
    writeSaved(slug, scope, async () => {
      if (!client.live) return null;
      const m = map(scope);
      const sid = m[slug];
      if (sid == null) return null;
      await request('DELETE', '/api/customers/saved-items/' + sid);
      if (!scope.owns()) return null;
      const latest = map(scope);
      delete latest[slug];
      setMap(latest);
      return true;
    });
  // GET /api/customers/wishlists -> default list's items -> product slugs
  const loadSaved = async (scope = currentSavedScope()) => {
    if (!client.live || !scope.owns()) return null;
    map(scope);
    const r = await request('GET', '/api/customers/wishlists');
    if (!scope.owns()) return null;
    const lists = (r && (r['hydra:member'] || r.member || r.data)) || [];
    const w = lists.find(l => l.isDefault) || lists[0];
    if (!w) return [];
    const m = map(scope);
    const byApi = {};
    VF_PRODUCTS.forEach(p => {
      if (p.apiId != null) byApi[p.apiId] = p.id;
    });
    const slugs = [];
    // Items saved before products were known by code carry the old slug; read them as codes.
    (w.items || []).forEach(it => {
      const raw = (it.metadata && it.metadata.slug) || byApi[it.sellableId];
      const s = raw && (vfProductId(raw) || raw);
      if (s) {
        slugs.push(s);
        m[s] = it.id;
      }
    });
    setMap(m);
    return slugs;
  };
  return {saveItem, unsaveItem, loadSaved};
}
