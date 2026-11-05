import {test, expect} from '@playwright/test';
import {openSite, scanAxe, siteUrl} from './helpers.mjs';

const MORNING = new Date('2026-10-05T09:00:00+03:30');
const visibleButton = (page, name) =>
  page.getByRole('button', {name, exact: true}).filter({visible: true});
async function delivery(page, fa) {
  await page.locator('#vf-name').fill('Test Recipient');
  await page.locator('#vf-phone').fill('09120000000');
  const map = page.locator('#vf-map.leaflet-container');
  await expect(map).toBeVisible();
  await map.click({position: {x: 120, y: 100}});
  await expect(page.locator('#vf-map-status')).toHaveText(/[0-9۰-۹]{2}[.٫][0-9۰-۹]/);
  await page.locator('#vf-address').fill('Test street 12, unit 3');
  await page.locator('#vf-sender').fill('Test Sender');
  await page.locator('#vf-sender-phone').fill('09121111111');
  await visibleButton(page, fa ? 'ادامه و پرداخت' : 'Continue to payment').click();
  await expect(page.locator('.vf-checkout-summary')).toBeVisible();
}
async function blockStorage(page, block) {
  await page.evaluate(block => {
    window.__vfStorageSet ||= Storage.prototype.setItem;
    Storage.prototype.setItem = block
      ? function (key, value) {
          if (key.startsWith('vf-account:'))
            throw new DOMException('Test storage failure', 'QuotaExceededError');
          return window.__vfStorageSet.call(this, key, value);
        }
      : window.__vfStorageSet;
  }, block);
}
for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`offline checkout preserves intent and reconnect waits for explicit retry (${lang})`, async ({
    page,
    context
  }, info) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page, fa);
    await page.evaluate(() => window.VF_API.setBase('/__offline-checkout-api'));
    await page
      .getByRole('radio', {name: fa ? 'پرداخت در محل' : 'Pay on delivery', exact: true})
      .press('Space');
    const requests = [],
      failures = [],
      errors = [];
    const isCheckout = request =>
      request.method() === 'POST' &&
      new URL(request.url()).pathname === '/__offline-checkout-api/api/sales/checkout';
    page.on('request', request => {
      if (isCheckout(request)) requests.push(request.postDataJSON());
    });
    page.on('requestfailed', request => {
      if (isCheckout(request)) failures.push(request.failure()?.errorText);
    });
    page.on('pageerror', error => errors.push(error.message));
    const snapshot = () =>
      page.evaluate(() => ({
        bag: window.__vfSite.state.bag,
        delivery: window.__vfSite.state.delivery,
        paymentDraft: window.__vfSite.state.paymentDraft,
        customerId: window.__vfSite.state.customerId,
        orders: window.__vfSite.state.orders,
        order: window.__vfSite.state.order,
        lastOrder: window.__vfSite.state.lastOrder
      }));
    const before = await snapshot();
    const place = () => visibleButton(page, fa ? 'تأیید سفارش نمونه' : 'Confirm demo order');
    const failure = page
      .getByRole('alert')
      .filter({hasText: fa ? 'سفارش شما ثبت نشد' : 'Your order couldn’t be sent'});
    const band = page.locator('.ag-offline');
    let release;
    const held = new Promise(resolve => (release = resolve));
    try {
      await context.setOffline(true);
      await expect(band).toContainText(fa ? 'اتصال اینترنت شما قطع است.' : 'You’re offline.');
      // No route exists yet: the browser must reject the real fetch while offline.
      await place().click();
      await expect(failure).toBeVisible();
      await expect.poll(() => failures.length).toBe(1);
      expect(failures[0]).toContain('ERR_INTERNET_DISCONNECTED');
      await expect
        .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
        .toBe(false);
      await expect(place()).toBeDisabled();
      expect(requests).toHaveLength(1);
      expect(await snapshot()).toEqual(before);
      expect(before.orders).toHaveLength(0);
      expect(before.order).toBeNull();
      await page.route('**/__offline-checkout-api/**', async route => {
        if (isCheckout(route.request())) {
          await held;
          await route.fulfill({json: null});
        } else await route.fulfill({json: {}});
      });
      // Observe two reconnects without a retry. This is bounded client observation, not a queue.
      for (let reconnect = 0; reconnect < 2; reconnect++) {
        if (reconnect) {
          await context.setOffline(true);
          await expect(band).toContainText(fa ? 'اتصال اینترنت شما قطع است.' : 'You’re offline.');
        }
        await context.setOffline(false);
        await expect(band).toHaveText(fa ? 'دوباره آنلاین هستید.' : 'You’re back online.');
        await page.clock.runFor(1000);
        await expect(failure).toBeVisible();
        await expect(place()).toBeDisabled();
        expect(requests).toHaveLength(1);
        expect(await snapshot()).toEqual(before);
      }
      await visibleButton(page, fa ? 'تلاش دوباره' : 'Try again').click();
      await expect(failure).toHaveCount(0);
      await expect(place()).toBeEnabled();
      expect(requests).toHaveLength(1);
      expect(await snapshot()).toEqual(before);
      await place().click();
      await expect.poll(() => requests.length).toBe(2);
      await expect
        .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
        .toBe(true);
      await expect(place()).toBeDisabled();
      expect(await snapshot()).toEqual(before);
      expect(requests[1]).toEqual(requests[0]);
      expect(requests[1].gateway).toBe('cod');
      release();
      await expect
        .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
        .toBe(false);
      await expect(page.getByRole('heading', {level: 1})).toContainText(fa ? 'سپاس' : 'Thank you');
      const after = await snapshot();
      expect(after.bag).toEqual([]);
      expect(after.orders).toHaveLength(1);
      expect(after.order.id).toBe(after.orders[0].id);
      expect(after.lastOrder.id).toBe(after.order.id);
      expect(after.order.customerId).toBe(before.customerId);
      expect(after.order.lines.map(line => line.qty)).toEqual(before.bag.map(line => line.qty));
      expect(after.order.delivery.address).toBe(before.delivery.address);
      expect(requests).toHaveLength(2);
      expect(failures).toHaveLength(1);
      expect(errors).toEqual([]);
      expect(await scanAxe(page)).toEqual([]);
      await info.attach('offline-checkout-recovery', {
        body: JSON.stringify({
          lang,
          requests,
          failures,
          reconnectsWithoutReplay: 2,
          orderIds: after.orders.map(order => order.id),
          preservedBeforeRetry: true
        }),
        contentType: 'application/json'
      });
    } finally {
      release();
      await context.setOffline(false);
    }
  });

  test(`late checkout responses survive repeated submission and remount (${lang})`, async ({
    page
  }, info) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page, fa);
    let release;
    const held = new Promise(resolve => (release = resolve));
    const requests = [];
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route('**/__pending-checkout-api/**', async route => {
      if (
        route.request().method() === 'POST' &&
        new URL(route.request().url()).pathname.endsWith('/api/sales/checkout')
      ) {
        requests.push(route.request().postDataJSON());
        await held;
        await route.fulfill({json: null});
      } else await route.fulfill({json: {}});
    });
    await page.evaluate(() => {
      window.VF_API.setBase('/__pending-checkout-api');
      window.__pendingSite = window.__vfSite;
      window.__pendingInput = [];
      for (const type of ['pointerdown', 'pointerup', 'click']) {
        document.addEventListener(
          type,
          event => {
            const button = event.target.closest?.('button');
            if (button)
              window.__pendingInput.push({
                type,
                trusted: event.isTrusted,
                label: button.textContent,
                disabled: button.disabled,
                pending: window.__vfSite.state.checkoutPending
              });
          },
          true
        );
      }
    });
    const place = () => visibleButton(page, fa ? 'تأیید سفارش نمونه' : 'Confirm demo order');
    const attemptAgain = async () => {
      await expect(place()).toBeDisabled();
      await place().scrollIntoViewIfNeeded();
      const box = await place().boundingBox();
      expect(box).not.toBeNull();
      // Native pointer input at the visible control: no forced locator click or private handler.
      await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, {clickCount: 2});
      await expect(place()).toBeDisabled();
      expect(requests).toHaveLength(1);
      expect(await page.evaluate(() => window.__vfSite.state.order)).toBeNull();
    };
    try {
      await page
        .getByRole('radio', {name: fa ? 'پرداخت در محل' : 'Pay on delivery', exact: true})
        .press('Space');
      const firstButton = await place().elementHandle();
      await place().click();
      await expect.poll(() => requests.length).toBe(1);
      await expect
        .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
        .toBe(true);
      await attemptAgain();
      await page
        .getByRole('link', {
          name: fa ? 'ویرایش اطلاعات ارسال' : 'Edit delivery details',
          exact: true
        })
        .click();
      expect(await firstButton.evaluate(button => button.isConnected)).toBe(false);
      await page
        .getByRole('link', {name: fa ? 'بازگشت به سبد' : 'Back to bag', exact: true})
        .click();
      await page
        .locator('.vf-bag-line')
        .first()
        .getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true})
        .click();
      await visibleButton(page, fa ? 'ادامه و ارسال' : 'Continue to delivery').click();
      await visibleButton(page, fa ? 'ادامه و پرداخت' : 'Continue to payment').click();
      await expect(page.locator('.vf-checkout-summary')).toBeVisible();
      expect(await page.evaluate(() => window.__pendingSite === window.__vfSite)).toBe(true);
      await expect
        .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
        .toBe(true);
      await attemptAgain();
      const current = await page.evaluate(() => ({
        bag: window.__vfSite.state.bag,
        delivery: window.__vfSite.state.delivery,
        paymentDraft: window.__vfSite.state.paymentDraft,
        customerId: window.__vfSite.state.customerId
      }));
      expect(current.bag[0].qty).toBe(2);
      release();
      await expect
        .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
        .toBe(false);
      await expect(place()).toBeEnabled();
      await page.clock.runFor(100);
      await expect(place()).toBeEnabled();
      expect(
        await page.evaluate(() => ({
          bag: window.__vfSite.state.bag,
          delivery: window.__vfSite.state.delivery,
          paymentDraft: window.__vfSite.state.paymentDraft,
          customerId: window.__vfSite.state.customerId
        }))
      ).toEqual(current);
      const orders = await page.evaluate(() => window.__vfSite.state.orders);
      expect(orders).toHaveLength(1);
      expect(orders[0].lines[0].qty).toBe(1);
      expect(orders[0].customerId).toBe(current.customerId);
      expect(await page.evaluate(() => window.__vfSite.state.lastOrder.id)).toBe(orders[0].id);
      expect(requests).toHaveLength(1);
      expect(errors).toEqual([]);
      await info.attach('pending-checkout-remount', {
        body: JSON.stringify({
          lang,
          requestCount: requests.length,
          remounted: true,
          currentQuantity: current.bag[0].qty,
          orderQuantity: orders[0].lines[0].qty,
          orderIds: orders.map(order => order.id)
        }),
        contentType: 'application/json'
      });
    } finally {
      release();
      await info.attach('pending-input-events', {
        body: JSON.stringify({requests, events: await page.evaluate(() => window.__pendingInput)}),
        contentType: 'application/json'
      });
    }
    const notice = page
      .getByRole('status')
      .filter({has: page.getByRole('link')})
      .filter({hasText: fa ? 'تغییرات تازه سبد' : 'newer bag changes'});
    await expect(notice).toBeVisible();
    await notice.getByRole('link', {name: fa ? 'مشاهده سفارش' : 'View order'}).click();
    await expect(page).toHaveURL(/view=track/);
    // Pending-button announcements expire after navigation; audit the settled page.
    await expect(page.locator('[data-live-announcer] [role="img"]')).toHaveCount(0, {
      timeout: 10000
    });
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`changed receipt totals require confirmation (${lang})`, async ({page}, info) => {
    await page.clock.install({time: MORNING});
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page, fa);
    await page.locator('#vf-last4').fill('1234');
    await page.locator('#vf-ref').fill('567890');
    await page
      .getByRole('link', {name: fa ? 'ویرایش اطلاعات ارسال' : 'Edit delivery details', exact: true})
      .click();
    await page.getByRole('link', {name: fa ? 'بازگشت به سبد' : 'Back to bag', exact: true}).click();
    await page
      .locator('.vf-bag-line')
      .first()
      .getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true})
      .click();
    await visibleButton(page, fa ? 'ادامه و ارسال' : 'Continue to delivery').click();
    await visibleButton(page, fa ? 'ادامه و پرداخت' : 'Continue to payment').click();
    await page.reload();
    const warning = page.locator('#vf-receipt-changed');
    await expect(warning).toBeVisible();
    await expect(page.locator('#vf-last4')).toHaveValue('1234');
    await expect(page.locator('#vf-ref')).toHaveValue('567890');
    await visibleButton(page, fa ? 'پرداخت کردم — ثبت سفارش' : 'I’ve paid — place order').click();
    await expect(warning).toBeFocused();
    expect(await page.evaluate(() => window.__vfSite.state.order)).toBeNull();
    expect(await scanAxe(page)).toEqual([]);
    await page.screenshot({
      path: `/tmp/vendra-receipt-change-${lang}-${info.project.name}.png`,
      fullPage: true
    });
    await warning
      .getByRole('button', {name: fa ? 'مبلغ جدید را بررسی کردم' : 'I’ve checked the new total'})
      .click();
    await expect(warning).toHaveCount(0);
    await visibleButton(page, fa ? 'پرداخت کردم — ثبت سفارش' : 'I’ve paid — place order').click();
    await expect.poll(() => page.evaluate(() => window.__vfSite.state.order?.ref)).toBe('567890');
  });

  test(`earlier orders remain available after reload (${lang})`, async ({page}) => {
    await openSite(page, 'account', lang);
    await page.evaluate(() => {
      const site = window.__vfSite;
      const order = {
        method: 'cod',
        status: 'received',
        createdAt: '2026-10-05T09:00:00+03:30',
        lines: site.state.bag,
        delivery: {
          ...site.state.delivery,
          name: 'Test Recipient',
          phone: '09120000000',
          senderPhone: '09121111111',
          address: 'Street 12',
          date: '2026-10-06'
        },
        totals: {sub: 8450000, fee: 0, total: 8450000}
      };
      const older = {...order, id: 'VN-20001'},
        newer = {...order, id: 'VN-20002'};
      site.setState({orders: [newer, older], lastOrder: newer, order: null});
    });
    await expect(page.locator('main')).toContainText('VN-20001');
    await expect(page.locator('main')).toContainText('VN-20002');
    await page.reload();
    await page.locator('main a[href*="id=VN-20001"]').click();
    await expect(page.locator('main')).toContainText('VN-20001');
    await expect(page).toHaveURL(/id=VN-20001/);
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`failed profile and address saves retain entries for retry (${lang})`, async ({page}) => {
    await openSite(page, 'account', lang, {tab: 'profile'});
    await page.locator('#vf-pname').fill('Keep my entry');
    await blockStorage(page, true);
    await visibleButton(page, fa ? 'ذخیره تغییرات' : 'Save changes').click();
    await expect(page.getByRole('alert')).toContainText(
      fa ? 'مرورگر نتوانست' : 'browser couldn’t save'
    );
    await expect(page.locator('#vf-pname')).toHaveValue('Keep my entry');
    await blockStorage(page, false);
    await visibleButton(page, fa ? 'ذخیره تغییرات' : 'Save changes').click();
    await expect(page.getByRole('alert')).toHaveCount(0);
    await page.getByRole('tab', {name: fa ? 'آدرس‌ها' : 'Addresses', exact: true}).click();
    await page
      .getByRole('button', {name: fa ? 'ویرایش خانه' : 'Edit Home', exact: true})
      .and(page.locator('button'))
      .click();
    const dialog = page.getByRole('dialog');
    await dialog.locator('#vf-address-line').fill('Keep this address, unit 5');
    await blockStorage(page, true);
    await dialog.getByRole('button', {name: fa ? 'ذخیره' : 'Save', exact: true}).click();
    await expect(dialog.getByRole('alert')).toContainText(
      fa ? 'مرورگر نتوانست' : 'browser couldn’t save'
    );
    await expect(dialog.locator('#vf-address-line')).toHaveValue('Keep this address, unit 5');
    expect(await scanAxe(page)).toEqual([]);
    await blockStorage(page, false);
    await dialog.getByRole('button', {name: fa ? 'ذخیره' : 'Save', exact: true}).click();
    await expect(dialog).toHaveCount(0);
  });

  test(`wallet top-up returns to the waiting checkout (${lang})`, async ({page}) => {
    await page.clock.install({time: MORNING});
    await page.addInitScript(lang => {
      localStorage.setItem('vf-account-phone', '09120000000');
      localStorage.setItem(
        'vf-account:09120000000',
        JSON.stringify({
          profile: {name: 'Test Sender', locale: lang, email: '', sms: true},
          addresses: [],
          reminders: [],
          wallet: {balance: 100000, history: []}
        })
      );
    }, lang);
    await openSite(page, 'bag', lang, {step: 'delivery'});
    await delivery(page, fa);
    await page
      .getByRole('radio', {name: fa ? 'کارت به کارت' : 'Card-to-card transfer', exact: true})
      .press('Space');
    await page.locator('#vf-last4').fill('1234');
    await page.locator('#vf-ref').fill('567890');
    await page
      .getByRole('link', {name: fa ? 'افزایش موجودی' : 'Top up your balance', exact: true})
      .click();
    await expect(page).toHaveURL(/next=checkout/);
    await page.reload();
    await page.locator('#vf-topup-amount').fill('20000000');
    await page.getByRole('button', {name: fa ? /^افزایش موجودی / : /^Top up /}).click();
    await expect(page.locator('#vf-topup-done')).toBeVisible();
    // React Aria's pending-button announcement refers to the top-up button for seven seconds.
    // Let that announcement finish while its label is still mounted before auditing the next page.
    await expect(page.locator('[data-live-announcer] [role="img"]')).toHaveCount(0, {
      timeout: 10000
    });
    await page
      .getByRole('link', {name: fa ? 'بازگشت به پرداخت' : 'Back to checkout', exact: true})
      .click();
    await expect(page.locator('#vf-last4')).toHaveValue('1234');
    await expect(page.locator('#vf-ref')).toHaveValue('567890');
    await expect(
      page.getByRole('radio', {name: fa ? 'کیف پول' : 'Account balance', exact: true})
    ).toBeEnabled();
    expect(await scanAxe(page)).toEqual([]);
  });

  for (const action of ['save', 'remove']) {
    test(`offline saved ${action} keeps local intent and reconnect does not replay (${lang})`, async ({
      page,
      context
    }, info) => {
      const target = 'VF-7K2M4Q',
        other = 'VF-3HX9TP';
      await page.clock.install({time: MORNING});
      await page.addInitScript(
        ({target, other, action}) => {
          const key = 'vendra-template:' + location.pathname;
          if (!sessionStorage.getItem(key))
            sessionStorage.setItem(
              key,
              JSON.stringify({
                saved: action === 'save' ? [other] : [target, other]
              })
            );
        },
        {target, other, action}
      );
      await openSite(
        page,
        action === 'save' ? 'product' : 'saved',
        lang,
        action === 'save' ? {id: target} : {}
      );
      const initialMap = action === 'save' ? {[other]: 702} : {[other]: 702, [target]: 701};
      await page.evaluate(initialMap => {
        localStorage.setItem('vendra-saved-map', JSON.stringify(initialMap));
        window.VF_API.setBase('/__offline-saved-api');
      }, initialMap);
      const privateState = () =>
        page.evaluate(() => ({
          bag: window.__vfSite.state.bag,
          delivery: window.__vfSite.state.delivery,
          paymentDraft: window.__vfSite.state.paymentDraft,
          customerId: window.__vfSite.state.customerId,
          orders: window.__vfSite.state.orders
        }));
      const before = await privateState();
      const saved = () => page.evaluate(() => window.__vfSite.state.saved);
      const mapping = () =>
        page.evaluate(() => JSON.parse(localStorage.getItem('vendra-saved-map')));
      const save = () => visibleButton(page, fa ? 'ذخیره این طرح' : 'Save this design');
      const card = () =>
        page
          .locator('main .ag-product')
          .filter({has: page.locator('.ag-product__name').filter({hasText: target})});
      const requests = [],
        failures = [],
        errors = [];
      const isWrite = request =>
        ['POST', 'DELETE'].includes(request.method()) &&
        new URL(request.url()).pathname.startsWith(
          '/__offline-saved-api/api/customers/saved-items'
        );
      page.on('request', request => {
        if (isWrite(request))
          requests.push({
            method: request.method(),
            path: new URL(request.url()).pathname,
            body: request.method() === 'POST' ? request.postDataJSON() : null
          });
      });
      page.on('requestfailed', request => {
        if (isWrite(request)) failures.push(request.failure()?.errorText);
      });
      page.on('pageerror', error => errors.push(error.message));
      const feedback = page.getByRole('alert').filter({
        hasText: fa
          ? 'همگام‌سازی انجام نشد؛ اطلاعات محلی حفظ شده است.'
          : 'Server sync failed; your local data is kept.'
      });
      const band = page.locator('.ag-offline');
      let release;
      const held = new Promise(resolve => (release = resolve));
      try {
        await context.setOffline(true);
        await expect(band).toContainText(fa ? 'اتصال اینترنت شما قطع است.' : 'You’re offline.');
        // No route exists for the first write: require a genuine browser network failure.
        if (action === 'save') await save().click();
        else
          await card()
            .getByRole('button', {name: fa ? 'حذف از ذخیره‌ها' : 'Remove from saved', exact: true})
            .click();
        await expect(feedback).toBeVisible();
        await expect.poll(() => failures.length).toBe(1);
        expect(failures[0]).toContain('ERR_INTERNET_DISCONNECTED');
        expect(requests).toHaveLength(1);
        expect(requests[0].method).toBe(action === 'save' ? 'POST' : 'DELETE');
        if (action === 'remove') {
          expect(requests[0].path).toBe('/__offline-saved-api/api/customers/saved-items/701');
          await expect(page.locator('#vf-saved-undo')).toBeFocused();
          await expect(card()).toHaveCount(0);
        } else await expect(save()).toHaveAttribute('aria-pressed', 'true');
        const offlineSaved = await saved();
        expect(offlineSaved.includes(target)).toBe(action === 'save');
        expect(offlineSaved).toContain(other);
        expect(await mapping()).toEqual(initialMap);
        expect(await privateState()).toEqual(before);
        await page.route('**/__offline-saved-api/**', async route => {
          if (route.request().method() === 'POST') {
            await held;
            await route.fulfill({json: {id: 803}});
          } else await route.fulfill({status: 204});
        });
        for (let reconnect = 0; reconnect < 2; reconnect++) {
          if (reconnect) await context.setOffline(true);
          if (reconnect)
            await expect(band).toContainText(fa ? 'اتصال اینترنت شما قطع است.' : 'You’re offline.');
          await context.setOffline(false);
          await expect(band).toHaveText(fa ? 'دوباره آنلاین هستید.' : 'You’re back online.');
          await page.clock.runFor(1000);
          expect(requests).toHaveLength(1);
          expect(await saved()).toEqual(offlineSaved);
          expect(await mapping()).toEqual(initialMap);
        }
        if (action === 'save') {
          // The failed POST left no server ID: toggling off is local, then on explicitly retries.
          await save().click();
          await expect(save()).toHaveAttribute('aria-pressed', 'false');
          expect(requests).toHaveLength(1);
          await expect(feedback).toBeVisible();
          await save().click();
        } else await page.locator('#vf-saved-undo').click();
        await expect.poll(() => requests.length).toBe(2);
        expect(requests[1]).toEqual({
          method: 'POST',
          path: '/__offline-saved-api/api/customers/saved-items',
          body: {sellableType: 'product', sellableId: 101, metadata: {slug: target}}
        });
        expect(await saved()).toContain(target);
        expect(await mapping()).toEqual(initialMap);
        await expect(feedback).toBeVisible();
        release();
        await expect.poll(mapping).toEqual({[other]: 702, [target]: 803});
        await expect(feedback).toHaveCount(0);
        expect((await saved()).filter(id => id === target)).toHaveLength(1);
        expect(await saved()).toContain(other);
        expect(await privateState()).toEqual(before);
        expect(requests).toHaveLength(2);
        expect(failures).toHaveLength(1);
        // Successful recovery clears this product's failure; a local no-op must not clear it.
        const integrationErrorAfterSuccess = await page.evaluate(
          () => !!window.__vfSite.state.integrationError
        );
        expect(integrationErrorAfterSuccess).toBe(false);
        await page.goto(siteUrl('saved', lang));
        await expect(card()).toHaveCount(1);
        await expect(page.locator('main .ag-product__name')).toContainText([target, other]);
        expect(await mapping()).toEqual({[other]: 702, [target]: 803});
        expect(await privateState()).toEqual(before);
        expect(errors).toEqual([]);
        expect(await scanAxe(page)).toEqual([]);
        await info.attach('offline-saved-recovery', {
          body: JSON.stringify({
            lang,
            action,
            requests,
            failures,
            reconnectsWithoutReplay: 2,
            savedAfterReload: await saved(),
            mappingAfterReload: await mapping(),
            integrationErrorAfterSuccess
          }),
          contentType: 'application/json'
        });
      } finally {
        release();
        await context.setOffline(false);
      }
    });
  }

  test(`initial saved-list loading keeps newer customer actions (${lang})`, async ({page}) => {
    await page.addInitScript(() => {
      window.VF_API = {
        live: true,
        loadSaved: () => new Promise(resolve => (window.__vfHydrateSaved = resolve)),
        saveItem: () => Promise.resolve(),
        unsaveItem: () => Promise.resolve()
      };
    });
    await openSite(page, 'product', lang, {id: 'VF-7K2M4Q'});
    await page
      .getByRole('button', {name: fa ? 'ذخیره این طرح' : 'Save this design', exact: true})
      .click();
    await page.evaluate(() => window.__vfHydrateSaved(['VF-3HX9TP']));
    await expect
      .poll(() => page.evaluate(() => window.__vfSite.state.saved.includes('VF-7K2M4Q')))
      .toBe(true);
    await expect
      .poll(() => page.evaluate(() => window.__vfSite.state.saved.includes('VF-3HX9TP')))
      .toBe(true);
  });
}

// Separate tabs share localStorage identity but retain their own session checkout histories.
async function switchCustomer(tab, lang, phone) {
  // openSite('account') seeds its own demo sign-in; preserve the tab's actual shared identity.
  await tab.goto(siteUrl('account', lang));
  await visibleButton(tab, lang === 'fa' ? 'خروج' : 'Sign out').click();
  await tab.goto(siteUrl('signin', lang));
  await tab.locator('#vf-phone').fill(phone);
  await visibleButton(tab, lang === 'fa' ? 'ارسال کد' : 'Send code').click();
  await tab.locator('#vf-code').fill('12345');
  await expect.poll(() => tab.evaluate(() => localStorage.getItem('vf-account-phone'))).toBe(phone);
}

for (const lang of ['en', 'fa']) {
  for (const outcome of ['success', 'failure']) {
    test(`two-tab customer switch isolates pending checkout ${outcome} (${lang})`, async ({
      page,
      context
    }, info) => {
      const owner = '09120000000',
        other = '09121111111',
        fa = lang === 'fa';
      await page.clock.install({time: MORNING});
      await page.addInitScript(owner => {
        if (!localStorage.getItem('vf-cross-tab-seeded')) {
          localStorage.setItem('vf-cross-tab-seeded', '1');
          localStorage.setItem('vf-account-phone', owner);
        }
        window.__identityStorageEvents = [];
        window.addEventListener('storage', event => {
          if (event.key === 'vf-account-phone')
            window.__identityStorageEvents.push({
              oldValue: event.oldValue,
              newValue: event.newValue,
              trusted: event.isTrusted
            });
        });
      }, owner);
      await openSite(page, 'bag', lang, {step: 'delivery'});
      await delivery(page, fa);
      let release, requested;
      const held = new Promise(resolve => {
        release = resolve;
      });
      const submitted = new Promise(resolve => {
        requested = resolve;
      });
      const requests = [],
        errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/__cross-tab-api/**', async route => {
        if (
          route.request().method() === 'POST' &&
          new URL(route.request().url()).pathname.endsWith('/api/sales/checkout')
        ) {
          requests.push(route.request().postDataJSON());
          requested();
          await held;
          await route.fulfill({
            status: outcome === 'success' ? 200 : 503,
            json: outcome === 'success' ? null : {message: 'Controlled checkout failure'}
          });
        } else await route.fulfill({json: {}});
      });
      await page.evaluate(() => window.VF_API.setBase('/__cross-tab-api'));
      const tab = await context.newPage();
      try {
        await openSite(tab, 'home', lang);
        await page
          .getByRole('radio', {name: fa ? 'پرداخت در محل' : 'Pay on delivery', exact: true})
          .press('Space');
        await visibleButton(page, fa ? 'تأیید سفارش نمونه' : 'Confirm demo order').click();
        await submitted;
        await expect
          .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
          .toBe(true);
        expect(requests).toHaveLength(1);
        await switchCustomer(tab, lang, other);
        await expect.poll(() => page.evaluate(() => window.__vfSite.state.customerId)).toBe(other);
        await expect(page.locator('#vf-address')).toHaveValue('');
        await expect(page.locator('#vf-name')).toHaveValue('');
        await page.locator('#vf-name').fill('Customer B recipient');
        await page.locator('#vf-address').fill('Customer B private street');
        const before = await page.evaluate(() => ({
          bag: window.__vfSite.state.bag,
          delivery: window.__vfSite.state.delivery,
          paymentDraft: window.__vfSite.state.paymentDraft,
          orders: window.__vfSite.state.orders
        }));
        expect(before.orders).toEqual([]);
        expect(before.paymentDraft.ref).toBe('');
        const switched = await page.evaluate(() => window.__identityStorageEvents);
        expect(switched).toEqual(
          expect.arrayContaining([
            {oldValue: owner, newValue: null, trusted: true},
            {oldValue: null, newValue: other, trusted: true}
          ])
        );
        release();
        await expect
          .poll(() => page.evaluate(() => window.__vfSite.state.checkoutPending))
          .toBe(false);
        expect(requests).toHaveLength(1);
        const after = await page.evaluate(owner => {
          const s = window.__vfSite.state;
          return {
            customerId: s.customerId,
            bag: s.bag,
            delivery: s.delivery,
            paymentDraft: s.paymentDraft,
            orders: s.orders,
            order: s.order,
            lastOrder: s.lastOrder,
            notice: s.checkoutNotice,
            ownerOrders: s.customers[owner]?.orders || []
          };
        }, owner);
        expect(after).toMatchObject({
          customerId: other,
          ...before,
          order: null,
          lastOrder: null,
          notice: null
        });
        expect(after.ownerOrders).toHaveLength(outcome === 'success' ? 1 : 0);
        const placed = after.ownerOrders[0];
        if (placed) {
          expect(placed.customerId).toBe(owner);
          expect(placed.delivery.address).toBe('Test street 12, unit 3');
          await expect(page.locator('main')).not.toContainText(placed.id);
        }
        await expect(page.locator('#vf-address')).toHaveValue('Customer B private street');
        await expect(page.locator('#vf-name')).toHaveValue('Customer B recipient');
        await switchCustomer(tab, lang, owner);
        await expect.poll(() => page.evaluate(() => window.__vfSite.state.customerId)).toBe(owner);
        await page.evaluate(() => window.__vfSite.navigate({view: 'account'}));
        await expect(page).toHaveURL(/view=account/);
        if (placed) await expect(page.locator('main')).toContainText(placed.id);
        await page.reload();
        await expect.poll(() => page.evaluate(() => window.__vfSite?.state.customerId)).toBe(owner);
        const restored = await page.evaluate(() => ({
          orders: window.__vfSite.state.orders,
          delivery: window.__vfSite.state.delivery
        }));
        expect(restored.orders).toHaveLength(outcome === 'success' ? 1 : 0);
        expect(restored.delivery.address).toBe('Test street 12, unit 3');
        if (placed) await expect(page.locator('main')).toContainText(placed.id);
        expect(errors).toEqual([]);
        await info.attach('two-tab-response-ownership', {
          body: JSON.stringify(
            {
              outcome,
              events: switched,
              requestCount: requests.length,
              currentCustomer: after.customerId,
              ownerOrderIds: after.ownerOrders.map(order => order.id),
              restoredOrderIds: restored.orders.map(order => order.id)
            },
            null,
            2
          ),
          contentType: 'application/json'
        });
      } finally {
        release();
        await tab.close();
      }
    });
  }
}
