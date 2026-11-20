import {VF_PRODUCTS, vfProductId} from '../../../storefront/catalog/catalog.js';

const KEY = 'vendra-saved-map';

/**
 * @param {{live: boolean}} client
 * @param {ReturnType<typeof import('./request.js').createRequest>} request
 */
export function createSavedItems(client, request) {
  const map = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
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
  const writeSaved = (slug, change) => {
    const previous = savedWrites.get(slug) || Promise.resolve();
    const next = previous.catch(() => {}).then(change);
    savedWrites.set(slug, next);
    const clear = () => {
      if (savedWrites.get(slug) === next) savedWrites.delete(slug);
    };
    next.then(clear, clear);
    return next;
  };
  // POST /api/customers/saved-items  {sellableType, sellableId, metadata}
  const saveItem = slug =>
    writeSaved(slug, async () => {
      const id = pid(slug);
      if (!client.live || id == null) return null;
      const r = await request('POST', '/api/customers/saved-items', {
        sellableType: 'product',
        sellableId: id,
        metadata: {
          slug
        }
      });
      const m = map();
      if (r && r.id != null) {
        m[slug] = r.id;
        setMap(m);
      }
      return r;
    });
  // DELETE /api/customers/saved-items/{id}
  const unsaveItem = slug =>
    writeSaved(slug, async () => {
      const m = map();
      const sid = m[slug];
      if (!client.live || sid == null) return null;
      await request('DELETE', '/api/customers/saved-items/' + sid);
      const latest = map();
      delete latest[slug];
      setMap(latest);
      return true;
    });
  // GET /api/customers/wishlists -> default list's items -> product slugs
  const loadSaved = async () => {
    if (!client.live) return null;
    const r = await request('GET', '/api/customers/wishlists');
    const lists = (r && (r['hydra:member'] || r.member || r.data)) || [];
    const w = lists.find(l => l.isDefault) || lists[0];
    if (!w) return [];
    const m = map();
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
