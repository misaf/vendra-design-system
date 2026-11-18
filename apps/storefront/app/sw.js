// The storefront's service worker, registered by the counter presentation (shared/services/offline.js) so
// the shop's tablet keeps working when the Wi-Fi drops: pages and the public catalog reads come from
// the network first and from the cache when it is out. Hashed build assets are cached once.
// Fixed URLs, including photos, are served from cache while the network copy is revalidated.
// Other API reads (a signed-in customer's lists, orders, account) always go to the network.
// Other sites (map tiles, WhatsApp) are left alone. Copied next to the built app by the Vite config.
const sw = /** @type {any} */ (self);
// Every address under the app serves the same page, so one copy of it answers them all offline;
// files and photos are kept up to FILES_MAX, the oldest let go first, so a tablet that runs for months doesn't fill up.
const SCOPE = new URL(sw.registration.scope).pathname;
const ROOT = new URL('../../../', sw.location.href).pathname;
const CACHE_PREFIX = 'vf-' + encodeURIComponent(SCOPE);
const PAGES = CACHE_PREFIX + '-pages-v4';
const FILES = CACHE_PREFIX + '-files-v4';
const FILES_MAX = 400;
let protectedFiles = new Set();
const API_PUBLIC = /^\/api\/catalog\//;
const FILE = /\.(js|css|svg|png|jpe?g|webp|avif|woff2?)$/i;
const PHOTO = /\.(svg|png|jpe?g|webp|avif)$/i;
const immutable = url =>
  url.pathname.startsWith(ROOT + 'assets/hashed/') && /-[\w-]{8}\.[\w]+$/.test(url.pathname);
const noStore = response =>
  /(?:^|,)\s*no-store\s*(?:,|$)/i.test(response.headers.get('Cache-Control') || '');

sw.addEventListener('install', () => sw.skipWaiting());
sw.addEventListener('activate', (/** @type {any} */ event) =>
  event.waitUntil(
    caches
      .keys()
      .then(names =>
        Promise.all(
          names
            .filter(name => name.startsWith(CACHE_PREFIX) && ![PAGES, FILES].includes(name))
            .map(name => caches.delete(name))
        )
      )
      .then(() => sw.clients.claim())
  )
);

const fromNetwork = async (request, key) => {
  const cache = await caches.open(PAGES);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(key, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(key, {ignoreVary: true});
    if (cached) return cached;
    throw error;
  }
};
const trim = async cache => {
  const keys = await cache.keys();
  await Promise.all(
    keys
      .filter(key => !protectedFiles.has(key.url))
      .slice(0, Math.max(0, keys.length - FILES_MAX))
      .map(key => cache.delete(key))
  );
};
const fromFiles = (event, request, url) => {
  // A seller-triggered refresh changes the image URL in the document to bypass its decoded
  // image cache. The worker still uses the original URL for HTTP validation and offline access.
  const original = PHOTO.test(url.pathname)
    ? request.url.replace(/[?&]vf-photo-revision=\d+$/, '')
    : request.url;
  const key = original === request.url ? request : original;
  const hashed = immutable(url);
  const cache = caches.open(FILES);
  const cached = cache.then(store => store.match(key, {ignoreVary: true}));
  // Let the HTTP cache validate with ETag/Last-Modified even while its copy is fresh.
  const update = cached.then(stored =>
    stored && hashed ? null : fetch(key, {cache: hashed ? 'default' : 'no-cache'})
  );
  event.waitUntil(
    update
      .then(async response => {
        if (!response) return;
        if (noStore(response)) {
          await (await cache).delete(key);
          return;
        }
        if (!response.ok || response.status === 206) return;
        const copy = response.clone();
        const store = await cache;
        await store.put(key, copy);
        await trim(store);
      })
      .catch(() => {})
  );
  event.respondWith(cached.then(stored => stored || update));
};

sw.addEventListener('fetch', (/** @type {any} */ event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== location.origin) return;
  if (request.mode === 'navigate')
    event.respondWith(
      fromNetwork(
        request,
        url.pathname.startsWith(SCOPE) ? url.origin + SCOPE : url.origin + url.pathname
      )
    );
  else if (API_PUBLIC.test(url.pathname)) event.respondWith(fromNetwork(request, request));
  else if (url.pathname.startsWith('/api/')) return;
  else if (FILE.test(url.pathname)) fromFiles(event, request, url);
});

// Cache hashed app assets from the build manifest and explicit product photos. Never cache a
// customer API response through this channel. Await each write before reporting offline readiness.
sw.addEventListener('message', event => {
  if (event.data?.type !== 'PREPARE_DISPLAY' || !event.ports[0]) return;
  const port = event.ports[0];
  event.waitUntil(
    (async () => {
      let completed = 0;
      let total = 0;
      try {
        const manifest = await fetch(new URL('offline-manifest.json', sw.location.href), {
          cache: 'no-store'
        }).then(response => {
          if (!response.ok) throw new Error('manifest');
          return response.json();
        });
        const app = new URL('./', sw.location.href);
        if (
          (event.data.urls || []).some(
            value => new URL(value, sw.location.href).origin !== sw.location.origin
          )
        )
          throw new Error('external-photo');
        const urls = [
          ...new Set([...manifest, ...(Array.isArray(event.data.urls) ? event.data.urls : [])])
        ]
          .map(value => new URL(value, sw.location.href))
          .filter(
            url =>
              url.origin === sw.location.origin &&
              url.pathname.startsWith(ROOT) &&
              !url.pathname.startsWith('/api/') &&
              (url.pathname === app.pathname || FILE.test(url.pathname))
          );
        total = urls.length;
        if (total > FILES_MAX) throw new Error('collection-too-large');
        protectedFiles = new Set(urls.map(url => url.href));
        for (const url of urls) {
          const cache = await caches.open(url.pathname === app.pathname ? PAGES : FILES);
          const key = url.origin + url.pathname + (url.pathname === app.pathname ? '' : url.search);
          let response = immutable(url) ? await cache.match(key, {ignoreVary: true}) : null;
          if (!response) response = await fetch(url.href, {cache: 'no-cache'});
          if (noStore(response)) {
            await cache.delete(key);
            throw new Error('not-cacheable');
          }
          if (!response.ok) throw new Error('asset');
          await cache.put(key, response.clone());
          completed++;
          port.postMessage({status: 'preparing', completed, total});
        }
        await trim(await caches.open(FILES));
        port.postMessage({status: 'ready', completed, total});
      } catch {
        port.postMessage({status: 'failed', completed, total});
      } finally {
        port.close();
      }
    })()
  );
});
