import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

const A = 'VF-7K2M4Q',
  B = 'VF-3HX9TP',
  C = 'VF-8RD5WN';
const base = '/__saved-ownership-api';
for (const lang of ['en', 'fa']) {
  for (const scenario of ['two products', 'failed load', 'late load']) {
    test(`saved error ownership preserves unresolved ${scenario} (${lang})`, async ({
      page
    }, info) => {
      const fa = lang === 'fa';
      const errors = [],
        requests = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(
        ({base, ids}) => {
          // Configure the real client's public base when it installs, before site mount.
          // No client methods, fetch, or application handlers are replaced.
          let runtime;
          Object.defineProperty(window, '__vfRuntime', {
            configurable: true,
            get: () => runtime,
            set: value => {
              runtime = value;
              const client = value.api;
              client.setBase(base);
            }
          });
          const key = 'vendra-template:/apps/storefront/app/';
          if (!sessionStorage.getItem(key)) {
            sessionStorage.setItem(
              key,
              JSON.stringify({bag: [], saved: ids, delivery: {address: 'Keep this address'}})
            );
            localStorage.setItem(
              'vendra-saved-map',
              JSON.stringify(Object.fromEntries(ids.map((id, index) => [id, 701 + index])))
            );
          }
        },
        {base, ids: [A, B, C]}
      );
      let reads = 0,
        release;
      const held = new Promise(resolve => (release = resolve));
      const list = ids => ({
        'hydra:member': [
          {
            id: 900,
            isDefault: true,
            items: ids.map(id => ({
              id:
                id === A
                  ? 701
                  : id === B
                    ? reads > 1 && scenario === 'two products'
                      ? 803
                      : 702
                    : 703,
              metadata: {slug: id}
            }))
          }
        ]
      });
      await page.route('**/__saved-ownership-api/**', async route => {
        const request = route.request(),
          method = request.method(),
          path = new URL(request.url()).pathname;
        const entry = {method, path, body: method === 'POST' ? request.postDataJSON() : null};
        requests.push(entry);
        if (method === 'GET' && path.endsWith('/wishlists')) {
          reads++;
          if (reads === 1 && scenario === 'late load') await held;
          if (reads === 1 && scenario === 'failed load') {
            entry.status = 503;
            await route.fulfill({status: 503, json: {error: 'Fixture unavailable'}});
          } else {
            entry.status = 200;
            await route.fulfill({
              json: list(reads > 1 && scenario === 'failed load' ? [A, C] : [A, B, C])
            });
          }
        } else if (method === 'DELETE') {
          entry.status = scenario === 'failed load' ? 204 : 503;
          await route.fulfill({
            status: entry.status,
            ...(entry.status === 503 ? {json: {error: 'Fixture write failure'}} : {})
          });
        } else if (method === 'POST') {
          await held;
          entry.status = 200;
          await route.fulfill({json: {id: 803}});
        } else throw new Error('Unexpected saved API request: ' + method + ' ' + path);
      });
      const card = id =>
        page
          .locator('main .ag-product')
          .filter({has: page.locator('.ag-product__name').filter({hasText: id})});
      const remove = id =>
        card(id)
          .getByRole('button', {name: fa ? 'حذف از ذخیره‌ها' : 'Remove from saved', exact: true})
          .click();
      const feedback = page.getByRole('alert').filter({
        hasText: fa
          ? 'همگام‌سازی انجام نشد؛ اطلاعات محلی حفظ شده است.'
          : 'Server sync failed; your local data is kept.'
      });
      const state = () =>
        page.evaluate(() => {
          const {bag, delivery, paymentDraft, customerId, orders} = window.__vfSite.state;
          return {bag, delivery, paymentDraft, customerId, orders};
        });
      const saved = () => page.evaluate(() => window.__vfSite.state.saved);
      const mapping = () =>
        page.evaluate(() => JSON.parse(localStorage.getItem('vendra-saved-map')));
      try {
        await openSite(page, 'saved', lang);
        await expect(card(C)).toHaveCount(1);
        const before = await state();
        if (scenario === 'two products') {
          await remove(A);
          await expect(feedback).toBeVisible();
          await remove(B);
          await expect.poll(() => requests.filter(r => r.status === 503).length).toBe(2);
          await expect(page.locator('#vf-saved-undo')).toBeFocused();
          await page.locator('#vf-saved-undo').click();
          await expect.poll(() => requests.filter(r => r.method === 'POST').length).toBe(1);
          await expect(feedback).toBeVisible();
          release();
          await expect.poll(mapping).toEqual({[A]: 701, [B]: 803, [C]: 703});
          await expect(card(B)).toHaveCount(1);
          await expect(card(A)).toHaveCount(0);
          expect(requests.find(r => r.method === 'POST').body).toEqual({
            sellableType: 'product',
            sellableId: 102,
            metadata: {slug: B}
          });
        } else {
          if (scenario === 'failed load') await expect(feedback).toBeVisible();
          await remove(B);
          await expect
            .poll(() => requests.some(r => r.method === 'DELETE' && r.status != null))
            .toBe(true);
          if (scenario === 'late load') {
            await expect(feedback).toBeVisible();
            release();
            await expect.poll(() => requests[0].status).toBe(200);
            await expect.poll(() => page.evaluate(() => window.__vfSite._savedLoading)).toBe(false);
          } else await expect.poll(mapping).toEqual({[A]: 701, [C]: 703});
          await expect(card(B)).toHaveCount(0);
          await expect(card(A)).toHaveCount(1);
        }
        // A product failure or an initial-read failure is still unresolved after that success.
        await expect(feedback).toBeVisible();
        expect(await state()).toEqual(before);
        expect(await saved()).toEqual(scenario === 'two products' ? [C, B] : [A, C]);
        await expect(card(C)).toHaveCount(1);
        const unresolved = {
          saved: await saved(),
          mapping: await mapping(),
          error: await page.evaluate(() => !!window.__vfSite.state.integrationError)
        };
        expect(unresolved.error).toBe(true);
        expect(await scanAxe(page)).toEqual([]);
        // A fresh mount with a controlled successful read clears the transient error; no writes replay.
        await page.reload();
        await expect(card(C)).toHaveCount(1);
        await expect.poll(() => reads).toBe(2);
        await expect.poll(() => page.evaluate(() => window.__vfSite._savedLoading)).toBe(false);
        await expect(feedback).toHaveCount(0);
        expect(await saved()).toEqual(scenario === 'failed load' ? [A, C] : [A, B, C]);
        expect(await mapping()).toEqual(
          scenario === 'failed load'
            ? {[A]: 701, [C]: 703}
            : {[A]: 701, [B]: scenario === 'two products' ? 803 : 702, [C]: 703}
        );
        expect(await page.evaluate(() => !!window.__vfSite.state.integrationError)).toBe(false);
        expect(requests.filter(r => r.method === 'DELETE').map(r => r.path)).toEqual(
          scenario === 'two products'
            ? [base + '/api/customers/saved-items/701', base + '/api/customers/saved-items/702']
            : [base + '/api/customers/saved-items/702']
        );
        expect(requests.filter(r => r.status === 503)).toHaveLength(
          scenario === 'two products' ? 2 : 1
        );
        expect(await state()).toEqual(before);
        expect(requests.map(r => r.method)).toEqual(
          scenario === 'two products'
            ? ['GET', 'DELETE', 'DELETE', 'POST', 'GET']
            : ['GET', 'DELETE', 'GET']
        );
        expect(errors).toEqual([]);
        expect(await scanAxe(page)).toEqual([]);
        await info.attach('saved-error-ownership', {
          body: JSON.stringify({
            lang,
            scenario,
            requests,
            unresolved,
            savedAfterReload: await saved(),
            mappingAfterReload: await mapping()
          }),
          contentType: 'application/json'
        });
      } finally {
        release();
      }
    });
  }
}
