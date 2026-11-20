import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    viewer: 'Quiet display',
    hint: 'Tap to reveal controls',
    fallback: 'Photo unavailable',
    soldOut: 'Sold out',
    empty: 'No designs',
    tools: 'Seller tools',
    previous: 'Previous',
    next: 'Next'
  },
  fa: {
    viewer: 'نمایش آرام',
    hint: 'برای نمایش کنترل‌ها لمس کنید',
    fallback: 'عکس موجود نیست',
    soldOut: 'تمام شده',
    empty: 'طرحی نیست',
    tools: 'ابزار فروشنده',
    previous: 'قبلی',
    next: 'بعدی'
  }
};
for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async page => {
    await openStorefrontComponent(page, 'StorefrontPresentationDisplay', lang);
    return page.getByRole('region', {name: t.viewer});
  };
  const reset = async page => page.getByRole('button', {name: 'Reset events', exact: true}).click();
  const events = page => page.locator('[data-test="events"]');
  const pointer = async (display, dx, dy = 0, cancel = false) => {
    await display.dispatchEvent('pointerdown', {clientX: 160, clientY: 160});
    if (cancel) await display.dispatchEvent('pointercancel');
    await display.dispatchEvent('pointerup', {clientX: 160 + dx, clientY: 160 + dy});
  };

  test(`${lang}: single and paired photos preserve codes, sizes, captions and price overrides`, async ({
    page
  }) => {
    const display = await open(page);
    await expect(display).toHaveAttribute('tabindex', '0');
    await expect(display).toHaveAccessibleDescription(t.hint);
    const photo = display.locator('.vf-display-photo');
    await expect(photo).toHaveAttribute('sizes', '100vw');
    await expect(photo).toHaveAttribute('loading', 'eager');
    await expect(photo).toHaveAttribute('fetchpriority', 'high');
    await expect(photo).toHaveAttribute('draggable', 'false');
    await expect(display.locator('.vf-display-code')).toHaveText('VF-7K2M4Q');
    await expect(display.locator('.vf-display-code')).toHaveAttribute('dir', 'ltr');
    await expect(display.locator('.ag-price')).toHaveText('2,000,000');
    await page.getByRole('combobox', {name: 'Variant', exact: true}).selectOption('pair');
    await expect(display.locator('.vf-display-code')).toHaveText(['VF-7K2M4Q', 'VF-8P3N5R']);
    await expect(display.locator('.vf-display-media')).toHaveClass(/--pair/);
    for (const image of await photo.all()) await expect(image).toHaveAttribute('sizes', '50vw');
    await expect(display.getByText(t.soldOut, {exact: true})).toBeVisible();
    await expect(display.locator('.ag-price')).toHaveText(['2,000,000', '3,000,000']);
    await page.getByLabel('Prices', {exact: true}).uncheck();
    await expect(display.locator('.ag-price')).toHaveCount(0);
    await page.getByLabel('Prices', {exact: true}).check();
    await page.getByRole('combobox', {name: 'Caption', exact: true}).selectOption('code');
    await expect(display.locator('.ag-price')).toHaveCount(0);
    await expect(display.locator('figcaption')).toHaveCount(2);
    await page.getByRole('combobox', {name: 'Caption', exact: true}).selectOption('photo');
    await expect(display.locator('figcaption')).toHaveCount(0);
    await expect(display.locator('.vf-display-product--photo')).toHaveCount(2);
  });

  test(`${lang}: image load waits for decode; decode and network failures report supplied keys`, async ({
    page
  }) => {
    const display = await open(page);
    await expect(events(page)).toContainText('loaded:first-photo');
    await expect(events(page)).toContainText('loaded:preload-photo');
    const preload = display.locator('.vf-display-preload');
    await expect(preload).toHaveAttribute('aria-hidden', 'true');
    await expect(preload.locator('img')).toHaveAttribute('alt', '');
    await reset(page);
    const photo = display.locator('.vf-display-photo');
    await photo.evaluate(image => {
      image.decode = () =>
        new Promise(resolve => {
          window.resolveFixtureDecode = resolve;
        });
      image.dispatchEvent(new Event('load'));
    });
    await expect(events(page)).toHaveText('[]');
    await page.evaluate(() => window.resolveFixtureDecode());
    await expect(events(page)).toHaveText('["loaded:first-photo"]');
    await reset(page);
    await photo.evaluate(image => {
      image.decode = () => Promise.reject(new Error('Fixture decode failure'));
      image.dispatchEvent(new Event('load'));
    });
    await expect(events(page)).toHaveText('["failed:first-photo"]');
    await reset(page);
    await photo.evaluate(image => image.dispatchEvent(new Event('error')));
    await preload.locator('img').evaluate(image => image.dispatchEvent(new Event('error')));
    await expect(events(page)).toHaveText('["failed:first-photo","failed:preload-photo"]');
    await reset(page);
    await page.getByRole('button', {name: 'Replace preload', exact: true}).click();
    await expect(events(page)).toHaveText('["loaded:preload-photo"]');
  });

  test(`${lang}: tablet swipes respect direction, thresholds and cancellation without revealing controls`, async ({
    page
  }) => {
    const display = await open(page);
    await expect(events(page)).toContainText('loaded:preload-photo');
    await reset(page);
    await pointer(display, -48);
    await pointer(display, 48);
    await expect(events(page)).toHaveText(
      lang === 'fa' ? '["previous","next"]' : '["next","previous"]'
    );
    await expect(display).toHaveAttribute('data-controls', 'false');
    await reset(page);
    await pointer(display, -47);
    await pointer(display, -60, 70);
    await pointer(display, -60, 0, true);
    await display.dispatchEvent('pointerup', {clientX: 0, clientY: 160});
    await expect(events(page)).toHaveText('[]');
    await expect(display).toHaveAttribute('data-controls', 'false');
    await pointer(display, 0);
    await expect(display).toHaveAttribute('data-controls', 'true');
    await display.getByRole('button', {name: t.next, exact: true}).click();
    await display.getByRole('button', {name: t.previous, exact: true}).focus();
    await page.keyboard.press('Enter');
    await expect(events(page)).toHaveText('["next","previous"]');
  });

  test(`${lang}: keyboard reveal expires, resets on interaction and clears its timer on unmount`, async ({
    page
  }) => {
    const display = await open(page);
    await page.clock.install({time: new Date('2026-11-17T12:00:00Z')});
    await page.clock.pauseAt(new Date('2026-11-17T12:00:01Z'));
    await page.evaluate(() => {
      const originalSet = window.setTimeout.bind(window);
      const originalClear = window.clearTimeout.bind(window);
      const pending = new Set();
      window.fixtureRevealTimers = pending;
      window.setTimeout = (callback, delay, ...args) => {
        const id = originalSet(() => {
          pending.delete(id);
          callback(...args);
        }, delay);
        if (delay === 4000) pending.add(id);
        return id;
      };
      window.clearTimeout = id => {
        pending.delete(id);
        originalClear(id);
      };
    });
    const next = display.getByRole('button', {name: t.next, exact: true});
    await expect(next).toBeHidden();
    await display.focus();
    await page.keyboard.press('Enter');
    await expect(next).toBeVisible();
    await page.clock.runFor(3000);
    await page.keyboard.press('Space');
    await page.clock.runFor(3999);
    await expect(next).toBeVisible();
    await page.clock.runFor(1);
    await expect(next).toBeHidden();
    await page.keyboard.press('Enter');
    expect(await page.evaluate(() => window.fixtureRevealTimers.size)).toBe(1);
    await page.getByRole('button', {name: 'Toggle display', exact: true}).click();
    await expect(display).toHaveCount(0);
    expect(await page.evaluate(() => window.fixtureRevealTimers.size)).toBe(0);
    await page.clock.runFor(5000);
    await page.getByRole('button', {name: 'Toggle display', exact: true}).click();
    await expect(display).toHaveAttribute('data-controls', 'false');
  });

  test(`${lang}: TV keys open tools without tablet navigation or child-key double activation`, async ({
    page
  }) => {
    const display = await open(page);
    await expect(events(page)).toContainText('loaded:preload-photo');
    await page.getByRole('combobox', {name: 'Mode', exact: true}).selectOption('tv');
    await reset(page);
    await display.focus();
    await page.keyboard.press('Enter');
    await page.keyboard.press('Space');
    await expect(events(page)).toHaveText('["tools","tools"]');
    await expect(display).toHaveAttribute('data-controls', 'false');
    await expect(display.locator('.vf-display-navigation')).toHaveCount(0);
    await reset(page);
    await pointer(display, -60);
    await expect(events(page)).toHaveText('[]');
    const tools = display.getByRole('button', {name: t.tools, exact: true});
    await tools.focus();
    await page.keyboard.press('Enter');
    await expect(events(page)).toHaveText('["tools"]');
  });

  test(`${lang}: photo fallback and empty display retain accessible tools at compact size`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    const display = await open(page);
    await display.focus();
    await page.keyboard.press('Enter');
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('combobox', {name: 'Variant', exact: true}).selectOption('fallback');
    await expect(display.getByRole('img', {name: t.fallback, exact: true})).toBeVisible();
    await expect(display.locator('.vf-display-photo')).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('combobox', {name: 'Variant', exact: true}).selectOption('empty');
    await expect(display.getByText(t.empty, {exact: true})).toBeVisible();
    await expect(display.locator('.vf-display-navigation')).toHaveCount(0);
    await expect(display.locator('figure')).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
  });
}
