/** @param {ReturnType<typeof import('./request.js').createRequest>} request */
export function createIdempotentSubmission(request) {
  // Idempotency keys for requests that create something (an order, an inquiry). Resending the same
  // body under the same scope reuses its key, also after a reload or from another tab, so a server
  // that already handled it returns the first result instead of creating a second one
  // (docs/API.md, B37). The key is dropped once the server confirms; a changed body gets a new
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
  const idempotencyKey = (scope, body) => {
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
  const submit = async (scope, path, body, decode = result => result) => {
    const key = idempotencyKey(scope, body);
    const result = decode(await request('POST', path, body, {idempotencyKey: key}));
    settleKey(scope, key);
    return result;
  };
  return {idempotencyKey, submit};
}
