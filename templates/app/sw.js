// The storefront's service worker, registered by the counter presentation (_shared/offline.js) so
// the shop's tablet keeps working when the Wi-Fi drops: pages and the public catalog reads come from
// the network first and from the cache when it is out; the app's files and photos come from the
// cache first (their names change with their content) and are fetched once. Nothing personal is
// kept: other API reads (a signed-in customer's lists, orders, account) always go to the network.
// Other sites (map tiles, WhatsApp) are left alone. Copied next to the built app by the Vite config.
const sw = /** @type {any} */ (self);
// Pages are kept one per path (the app is one page whatever its query); files and photos up to
// FILES_MAX, the oldest let go first, so a tablet that runs for months doesn't fill up.
const SCOPE = new URL(sw.registration.scope).pathname;
const CACHE_PREFIX = 'vf-' + encodeURIComponent(SCOPE);
const PAGES = CACHE_PREFIX + '-pages-v3';
const FILES = CACHE_PREFIX + '-files-v3';
const FILES_MAX = 400;
const API_PUBLIC = /^\/api\/catalog\//;

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
    keys.slice(0, Math.max(0, keys.length - FILES_MAX)).map(key => cache.delete(key))
  );
};
const fromCache = async request => {
  const cache = await caches.open(FILES);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone()).then(() => trim(cache));
  return response;
};

sw.addEventListener('fetch', (/** @type {any} */ event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== location.origin) return;
  if (request.mode === 'navigate')
    event.respondWith(fromNetwork(request, url.origin + url.pathname));
  else if (API_PUBLIC.test(url.pathname)) event.respondWith(fromNetwork(request, request));
  else if (url.pathname.startsWith('/api/')) return;
  else if (/\.(js|css|svg|png|jpe?g|webp|avif|woff2?)$/.test(url.pathname))
    event.respondWith(fromCache(request));
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
        const root = new URL('../../', sw.location.href).pathname;
        const urls = [
          ...new Set([...manifest, ...(Array.isArray(event.data.urls) ? event.data.urls : [])])
        ]
          .map(value => new URL(value, sw.location.href))
          .filter(
            url =>
              url.origin === sw.location.origin &&
              url.pathname.startsWith(root) &&
              (url.pathname === app.pathname ||
                /\.(js|css|svg|png|jpe?g|webp|avif|woff2?)$/.test(url.pathname))
          );
        total = urls.length;
        for (const url of urls) {
          const cache = await caches.open(url.pathname === app.pathname ? PAGES : FILES);
          const key = url.origin + url.pathname + (url.pathname === app.pathname ? '' : url.search);
          let response = url.pathname === app.pathname ? null : await cache.match(key);
          if (!response) response = await fetch(url.href, {cache: 'reload'});
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
