// Vendra API client (from uploads/openapi docs.json, v1.0.0). No auth on these endpoints.
// base = '' → demo mode: nothing is sent, calls resolve as if they succeeded.
import {vfAccountLocale, vfCustomerId} from '../../domain/account-data.js';
import {VF_PRODUCTS, vfProductId} from '../../domain/catalog.js';
import {VF_STORE} from '../../domain/store-config.js';
import {
  vfCheckoutResultFromApi,
  vfGatewayRedirect,
  vfPaymentFromApi
} from '../../domain/payment-api.js';
// Creates the client; shared/services/integrations/runtime.js installs it as vfRuntime.api in the
// browser only (the build's prerender, app/entry-server.jsx, calls no API).
/** @returns {import('../../platform/runtime.js').VfApi} */
export function vfCreateApi() {
  const KEY = 'vendra-saved-map';
  /** @type {any} */
  const A = {
    base: VF_STORE.apiBase || '',
    setBase(b) {
      A.base = (b || '').replace(/\/$/, '');
    },
    get live() {
      return !!A.base;
    }
  };
  // How long a request may take before it is abandoned. Writes get longer than reads, because a
  // checkout or an inquiry does more work on the server.
  A.timeouts = {read: 10000, write: 20000};
  // Every failure carries `kind`: 'offline' (the device was offline, so nothing was sent), 'timeout'
  // (no answer in time), 'network' (the connection failed) or 'http' (the server answered with an
  // error `status`). After a timeout or a network failure the server may still have done the work,
  // so callers must not say it failed for certain.
  const failure = (kind, message, extra = {}) =>
    Object.assign(
      /** @type {Error & {kind: string, status?: number, body?: any}} */ (new Error(message)),
      {kind},
      extra
    );
  const request = async (method, path, body, {idempotencyKey = ''} = {}) => {
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    let timedOut = false;
    const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
    const timer = setTimeout(
      () => {
        timedOut = true;
        controller?.abort();
      },
      method === 'GET' ? A.timeouts.read : A.timeouts.write
    );
    try {
      let r;
      try {
        r = await fetch(A.base + path, {
          method,
          headers: {
            Accept: 'application/ld+json',
            ...(body ? {'Content-Type': 'application/json'} : {}),
            ...(idempotencyKey ? {'Idempotency-Key': idempotencyKey} : {})
          },
          body: body ? JSON.stringify(body) : undefined,
          credentials: 'include',
          signal: controller?.signal
        });
      } catch (error) {
        const message = (error && error.message) || 'Network error';
        throw timedOut
          ? failure('timeout', 'Request timed out')
          : failure(offline ? 'offline' : 'network', message);
      }
      if (!r.ok) {
        const e = failure('http', 'HTTP ' + r.status, {status: r.status});
        try {
          e.body = await r.json();
        } catch {}
        throw e;
      }
      return r.status === 204 ? null : await r.json().catch(() => null);
    } finally {
      clearTimeout(timer);
    }
  };
  // Idempotency keys for requests that create something (an order, an inquiry). Resending the same
  // body under the same scope reuses its key, also after a reload or from another tab, so a server
  // that already handled it returns the first result instead of creating a second one
  // (apps/storefront/API.md, B37). The key is dropped once the server confirms; a changed body gets a new
  // one. Only a hash of the body is stored.
  const KEYS = 'vendra-idempotency';
  const hash = text => {
    let h1 = 0xdeadbeef,
      h2 = 0x41c6ce57;
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      h1 = Math.imul(h1 ^ c, 2654435761);
      h2 = Math.imul(h2 ^ c, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
  };
  const uuid = () => {
    const c = globalThis.crypto;
    if (c && typeof c.randomUUID === 'function') return c.randomUUID();
    const b = new Uint8Array(16);
    if (c && typeof c.getRandomValues === 'function') c.getRandomValues(b);
    else for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;
    const x = [...b].map(v => v.toString(16).padStart(2, '0')).join('');
    return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`;
  };
  // This page's keys, the source of truth whenever the last write to storage failed (for example a
  // full quota), so a retry on this page still reuses its key.
  const memoryKeys = {};
  let stored = true;
  const readKeys = () => {
    if (!stored) return {...memoryKeys};
    try {
      return JSON.parse(localStorage.getItem(KEYS) || '{}') || {};
    } catch {
      return {...memoryKeys};
    }
  };
  const writeKeys = keys => {
    Object.keys(memoryKeys).forEach(scope => delete memoryKeys[scope]);
    Object.assign(memoryKeys, keys);
    try {
      localStorage.setItem(KEYS, JSON.stringify(keys));
      stored = true;
    } catch {
      stored = false;
    }
  };
  A.idempotencyKey = (scope, body) => {
    const fingerprint = hash(JSON.stringify(body ?? null));
    const keys = readKeys();
    const kept = keys[scope];
    if (kept && kept.fingerprint === fingerprint && kept.key) return kept.key;
    const key = uuid();
    writeKeys({...keys, [scope]: {fingerprint, key}});
    return key;
  };
  const settleKey = (scope, key) => {
    const keys = readKeys();
    if (keys[scope]?.key !== key) return;
    delete keys[scope];
    writeKeys(keys);
  };
  const create = async (scope, path, body) => {
    const key = A.idempotencyKey(scope, body);
    const result = await request('POST', path, body, {idempotencyKey: key});
    settleKey(scope, key);
    return result;
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
  // -> the created order: {number, totals, redirect} (vfCheckoutResultFromApi; API.md B3, B30).
  // Sent with an Idempotency-Key per customer and order content, so retrying after a lost answer
  // never places the order twice.
  A.checkout = async body => {
    if (!A.live) return null;
    return vfCheckoutResultFromApi(
      await create('checkout:' + vfCustomerId(), '/api/sales/checkout', body)
    );
  };
  // GET /api/sales/orders?number=… -> the order's online payment {status, reference, amount}, asked
  // after the bank sends the customer back, in any tab (API.md B30). null in demo mode or when the
  // API doesn't know the order; a status it doesn't report is pending, never paid.
  A.orderPayment = async number => {
    if (!A.live || !number) return null;
    const r = await request('GET', '/api/sales/orders?number=' + encodeURIComponent(number));
    const orders = (r && (r['hydra:member'] || r.member || r.data)) || (r && r.number ? [r] : []);
    const order = orders.find(item => item && item.number === number);
    return order ? vfPaymentFromApi(order) : null;
  };
  // POST /api/sales/payments {orderNumber} -> a new attempt for the same order after a failed or
  // cancelled payment: where to send the browser (API.md B30, "Pay again"). Never a second order.
  A.payAgain = async number => {
    if (!A.live || !number) return null;
    const r = await request('POST', '/api/sales/payments', {orderNumber: number});
    return vfGatewayRedirect(r && (r.payment || r));
  };
  // POST /api/support/inquiries {name,email,message,phone,occasion,preferredLocale} -> 204 (throttled)
  A.inquiry = async body => {
    if (!A.live) {
      await new Promise(r => setTimeout(r, 600));
      return null;
    }
    return create('inquiry', '/api/support/inquiries', body);
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
  // Changing it in Profile should save it to the account once the API has a profile endpoint (apps/storefront/API.md B12).
  // Guests: the page language at checkout.
  A.preferredLocale = () =>
    vfAccountLocale() || (document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fa');
  return A;
}
