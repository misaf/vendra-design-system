// Vendra API client (from uploads/openapi docs.json, v1.0.0). No auth on these endpoints.
// base = '' → demo mode: nothing is sent, calls resolve as if they succeeded.
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
  const req = async (method, path, body) => {
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
      } catch (_) {}
      throw e;
    }
    return r.status === 204 ? null : r.json().catch(() => null);
  };
  const map = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch (e) {
      return {};
    }
  };
  const setMap = m => {
    try {
      localStorage.setItem(KEY, JSON.stringify(m));
    } catch (e) {}
  };
  // Product slug -> numeric catalog id. Fill p.apiId when the catalog comes from GET /api/catalog/products.
  const pid = slug => {
    const p = VF_PRODUCTS.find(x => x.id === slug);
    return p && p.apiId;
  };
  // POST /api/customers/saved-items  {sellableType, sellableId, metadata}
  A.saveItem = async slug => {
    const id = pid(slug);
    if (!A.live || id == null) return null;
    const r = await req('POST', '/api/customers/saved-items', {
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
  };
  // DELETE /api/customers/saved-items/{id}
  A.unsaveItem = async slug => {
    const m = map();
    const sid = m[slug];
    if (!A.live || sid == null) return null;
    await req('DELETE', '/api/customers/saved-items/' + sid);
    delete m[slug];
    setMap(m);
    return true;
  };
  // GET /api/customers/wishlists -> default list's items -> product slugs
  A.loadSaved = async () => {
    if (!A.live) return null;
    const r = await req('GET', '/api/customers/wishlists');
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
  // POST /api/support/inquiries {name,email,message,phone,occasion,preferredLocale} -> 204 (throttled)
  A.inquiry = async body => {
    if (!A.live) {
      await new Promise(r => setTimeout(r, 600));
      return null;
    }
    return req('POST', '/api/support/inquiries', body);
  };
  // POST /api/marketing/newsletter-subscriptions {email, name} -> 204
  A.newsletter = async (email, name) => {
    if (!A.live) {
      await new Promise(r => setTimeout(r, 600));
      return null;
    }
    return req('POST', '/api/marketing/newsletter-subscriptions', {email, name: name || null});
  };
  // Language for all processing (orders, reminders, SMS, WhatsApp, email, receipts) = the account setting, never the page language.
  // PATCH /api/customers/me {preferredLocale} when the customer changes it in Profile. Guests: the page language at checkout.
  A.preferredLocale = () =>
    vfAccountLocale() || (document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'fa');
  window.AG_API = window.VF_API = A;
})();
