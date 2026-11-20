import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {runInNewContext} from 'node:vm';

const worker = await readFile(new URL('../next/sw.js', import.meta.url), 'utf8');

test('worker activation cleans up only its own outdated caches', async () => {
  for (const scope of ['/', '/vendra-design-system/']) {
    const prefix = 'vf-' + encodeURIComponent(scope);
    const current = [`${prefix}-pages-next-v1`, `${prefix}-files-next-v1`];
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
