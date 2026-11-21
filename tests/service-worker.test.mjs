import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {runInNewContext} from 'node:vm';

const worker = await readFile(
  new URL('../src/platform/browser/service-worker.js', import.meta.url),
  'utf8'
);

test('worker activation cleans up only its own outdated caches', async () => {
  for (const scope of ['/', '/vendra-design-system/']) {
    const prefix = 'vf-' + encodeURIComponent(scope);
    const current = [
      `${prefix}-pages-next-v1`,
      `${prefix}-files-next-v1`,
      `${prefix}-display-next-v1`
    ];
    const outdated = [`${prefix}-pages-next-v0`, `${prefix}-files-next-v0`];
    const otherScopes = ['apps/storefront/app/', '-nested/'].flatMap(path => {
      const nested = 'vf-' + encodeURIComponent(scope + path);
      return [`${nested}-pages-next-v1`, `${nested}-files-next-v1`];
    });
    const deleted = [];
    const listeners = new Map();
    runInNewContext(worker, {
      URL,
      self: {
        registration: {scope: 'https://example.test' + scope},
        addEventListener: (name, listener) => listeners.set(name, listener),
        clients: {claim: () => {}}
      },
      caches: {
        keys: async () => [...current, ...outdated, ...otherScopes, 'other-app-cache'],
        delete: async name => deleted.push(name)
      }
    });

    await listeners.get('activate')({waitUntil: cleanup => cleanup});
    assert.deepEqual(deleted, outdated, scope);
  }
});

function createOfflineWorkerEnvironment() {
  const scope = 'https://example.test/shop/';
  const location = new URL('sw.js', scope);
  const stores = new Map();
  const unavailable = new Set();
  const appScript = new URL('_next/static/display.js', scope).href;
  const document = new URL('en/presentation/', scope).href;
  const fileCount = () => stores.get('vf-%2Fshop%2F-files-next-v1').size;
  let online = true;

  function startWorker() {
    const listeners = new Map();
    const cacheKey = input => new Request(input.url ?? input).url;
    runInNewContext(worker, {
      URL,
      Response,
      location,
      self: {
        location,
        registration: {scope},
        addEventListener: (name, listener) => listeners.set(name, listener)
      },
      caches: {
        async open(name) {
          if (!stores.has(name)) stores.set(name, new Map());
          const store = stores.get(name);
          return {
            keys: async () => [...store.keys()].map(url => new Request(url)),
            match: async key => store.get(cacheKey(key))?.clone(),
            put: async (key, response) => store.set(cacheKey(key), response.clone()),
            delete: async key => store.delete(cacheKey(key))
          };
        }
      },
      async fetch(input) {
        const url = cacheKey(input);
        if (!online) throw new Error('offline');
        if (url.endsWith('/offline-manifest.json')) return Response.json([document, appScript]);
        if (unavailable.has(url)) return new Response(null, {status: 404});
        return new Response(url);
      }
    });

    return {
      async prepare(...urls) {
        let preparation;
        const statuses = [];
        listeners.get('message')({
          data: {type: 'PREPARE_DISPLAY', urls},
          ports: [{postMessage: message => statuses.push(message.status), close() {}}],
          waitUntil: work => (preparation = work)
        });
        await preparation;
        return statuses.at(-1);
      },
      async read(url, mode = 'same-origin') {
        let response;
        let update;
        listeners.get('fetch')({
          request: {method: 'GET', url, mode},
          respondWith: work => (response = work),
          waitUntil: work => (update = work)
        });
        assert.ok(response, `worker handles ${url}`);
        try {
          return await (await response).text();
        } finally {
          await update;
        }
      }
    };
  }

  return {
    scope,
    appScript,
    document,
    unavailable,
    fileCount,
    startWorker,
    offline: () => (online = false)
  };
}

test('a restarted worker protects the latest prepared display and trims obsolete files', async () => {
  const env = createOfflineWorkerEnvironment();
  const obsolete = env.scope + 'assets/obsolete.jpg';
  const active = env.scope + 'assets/active.jpg';
  const first = env.startWorker();
  assert.equal(await first.prepare(obsolete), 'ready');
  assert.equal(await first.prepare(active), 'ready');

  const restarted = env.startWorker();
  for (let i = 0; i < 400; i++) await restarted.read(`${env.scope}assets/other-${i}.jpg`);
  assert.equal(env.fileCount(), 400);

  env.offline();
  assert.equal(await restarted.read(active + '?vf-photo-revision=1'), active);
  assert.equal(await restarted.read(env.appScript), env.appScript);
  assert.equal(await restarted.read(env.document, 'navigate'), env.document);
  await assert.rejects(restarted.read(obsolete), /offline/);
});

test('a failed replacement preserves the previously prepared display', async () => {
  const env = createOfflineWorkerEnvironment();
  const active = env.scope + 'assets/active.jpg';
  const replacement = env.scope + 'assets/replacement.jpg';
  const missing = env.scope + 'assets/missing.jpg';
  env.unavailable.add(missing);
  const first = env.startWorker();
  assert.equal(await first.prepare(active), 'ready');
  assert.equal(await first.prepare(replacement, missing), 'failed');

  const restarted = env.startWorker();
  for (let i = 0; i < 400; i++) await restarted.read(`${env.scope}assets/other-${i}.jpg`);
  assert.equal(env.fileCount(), 400);

  env.offline();
  assert.equal(await restarted.read(active), active);
  await assert.rejects(restarted.read(replacement), /offline/);
});
