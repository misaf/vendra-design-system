// Vendra API client (from uploads/openapi docs.json, v1.0.0). No auth on these endpoints.
// base = '' → demo mode: nothing is sent, calls resolve as if they succeeded.
import {vfAccountLocale} from '../account-data.js';
import {VF_PRODUCTS, vfProductId} from '../catalog.js';
import {VF_STORE} from '../store-config.js';
(() => {
  const KEY = 'vendra-saved-map';
  if (window.VF_API) return;
  const A = {
    base: VF_STORE.apiBase || '',
    setBase(b) {
      A.base = (b || '').replace(/\/$/, '');
    },
    get live() {
      return !!A.base;
    }
  };
  const request = async (method, path, body) => {
    const r = await fetch(A.base + path, {
      method,
      headers: {
        Accept: 'application/ld+json',
        ...(body
          ? {
              'Content-Type': 'application/json'
            }
          : {})
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include'
    });
    if (!r.ok) {
      const e = /** @type {Error & {status?: number, body?: any}} */ (
        new Error('HTTP ' + r.status)
      );
      e.status = r.status;
      try {
        e.body = await r.json();
      } catch {}
      throw e;
    }
    return r.status === 204 ? null : r.json().catch(() => null);
  };
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
  A.saveItem = slug =>
    writeSaved(slug, async () => {
      const id = pid(slug);
      if (!A.live || id == null) return null;
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
  A.unsaveItem = slug =>
    writeSaved(slug, async () => {
      const m = map();
      const sid = m[slug];
      if (!A.live || sid == null) return null;
      await request('DELETE', '/api/customers/saved-items/' + sid);
      const latest = map();
      delete latest[slug];
      setMap(latest);
      return true;
    });
  // GET /api/customers/wishlists -> default list's items -> product slugs
  A.loadSaved = async () => {
    if (!A.live) return null;
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
  // GET /api/catalog/products -> {token: {inStock, quantity}}: what is in stock now, for screens that
  // stay open all day (the counter presentation). null in demo mode.
  A.loadStock = async () => {
    if (!A.live) return null;
    const r = await request('GET', '/api/catalog/products?itemsPerPage=200');
    const products = (r && (r['hydra:member'] || r.member || r.data)) || [];
    return Object.fromEntries(
      products
        .filter(product => product.token)
        .map(product => [
          product.token,
          {inStock: product.inStock !== false, quantity: product.quantity ?? null}
        ])
    );
  };
  // POST /api/sales/checkout {cartToken, currencyCode, gateway, paymentReference, …} (vfCheckoutRequest)
  A.checkout = async body => {
    if (!A.live) return null;
    return request('POST', '/api/sales/checkout', body);
  };
  // POST /api/support/inquiries {name,email,message,phone,occasion,preferredLocale} -> 204 (throttled)
  A.inquiry = async body => {
    if (!A.live) {
      await new Promise(r => setTimeout(r, 600));
      return null;
    }
    return request('POST', '/api/support/inquiries', body);
  };
  // POST /api/marketing/newsletter-subscriptions {email, name} -> 204
  A.newsletter = async (email, name) => {
    if (!A.live) {
      await new Promise(r => setTimeout(r, 600));
      return null;
    }
    return request('POST', '/api/marketing/newsletter-subscriptions', {email, name: name || null});
  };
  // Language for all processing (orders, reminders, SMS, WhatsApp, email, receipts) = the account setting, never the page language.
  // Changing it in Profile should save it to the account once the API has a profile endpoint (templates/API.md B12).
  // Guests: the page language at checkout.
  A.preferredLocale = () =>
    vfAccountLocale() || (document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fa');
  window.VF_API = A;
})();
