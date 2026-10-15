// The storefront's service worker, registered by the counter presentation (_shared/offline.js) so
// the shop's tablet keeps working when the Wi-Fi drops: pages and API reads come from the network
// first and from the cache when it is out; the app's files and photos come from the cache first
// (their names change with their content) and are fetched once. Other sites (map tiles, WhatsApp)
// are left alone. Copied next to the built app by the Vite config.
const sw = /** @type {any} */ (self);
const CACHE = 'vf-storefront-v1';

sw.addEventListener('install', () => sw.skipWaiting());
sw.addEventListener('activate', (/** @type {any} */ event) =>
  event.waitUntil(
    caches
      .keys()
      .then(names =>
        Promise.all(
          names
            .filter(name => name.startsWith('vf-') && name !== CACHE)
            .map(name => caches.delete(name))
        )
      )
      .then(() => sw.clients.claim())
  )
);

const fromNetwork = async request => {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request, {ignoreVary: true});
    if (cached) return cached;
    throw error;
  }
};
const fromCache = async request => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
};

sw.addEventListener('fetch', (/** @type {any} */ event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== location.origin) return;
  if (request.mode === 'navigate' || url.pathname.startsWith('/api/'))
    event.respondWith(fromNetwork(request));
  else if (/\.(js|css|svg|png|jpe?g|webp|avif|woff2?)$/.test(url.pathname))
    event.respondWith(fromCache(request));
});
