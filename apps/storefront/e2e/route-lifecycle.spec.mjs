import {test, expect} from '@playwright/test';
import {openSite, openFooterGroup, pageChunk, routePayload, siteUrl} from './helpers.mjs';

test.use({reducedMotion: 'reduce'});

async function hold(page, pattern) {
  let release, started;
  const pending = new Promise(resolve => {
    release = resolve;
  });
  const requested = new Promise(resolve => {
    started = resolve;
  });
  await page.route(pattern, async route => {
    started();
    await pending;
    await route.continue();
  });
  return {
    requested,
    release,
    async complete() {
      const response = page.waitForResponse(response => pattern.test(response.url()));
      release();
      const loaded = await response;
      expect(loaded.ok()).toBe(true);
      await page.evaluate(
        () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
      );
    }
  };
}

async function record(page, info, phase) {
  await info.attach(phase, {
    body: JSON.stringify(
      await page.evaluate(() => ({
        url: location.href,
        at: performance.now(),
        mainCount: document.querySelectorAll('#main').length,
        heading: document.querySelector('main h1')?.textContent,
        focused: document.activeElement?.tagName,
        headingFocused: document.activeElement === document.querySelector('main h1'),
        lang: document.documentElement.lang
      })),
      null,
      2
    ),
    contentType: 'application/json'
  });
}

async function focusedHeading(page, lang) {
  await expect(page.locator('#main')).toHaveCount(1);
  await expect(page.locator('main h1')).toBeFocused();
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(page.locator('html')).toHaveAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr');
  await page.evaluate(
    () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  );
}

for (const lang of ['en', 'fa']) {
  test(`post stays visible while its client code loads (${lang})`, async ({page}, info) => {
    const gate = await hold(page, pageChunk('post'));
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await page.goto(siteUrl('post', lang), {waitUntil: 'domcontentloaded'});
      await gate.requested;
      await expect(page.locator('main h1')).toHaveText(
        lang === 'fa' ? 'یک صبح پشت میز کار وندرا' : 'A morning at the Vendra workbench'
      );
      await expect(page.locator('#main')).toHaveCount(1);
      await expect(page.locator('#root')).toHaveAttribute('inert', '');
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await record(page, info, 'post-code-held');
      await gate.complete();
      await expect(page.locator('#root')).not.toHaveAttribute('inert', '');
      await expect.poll(() => page.evaluate(() => window.__vfRuntime.viewed)).toBe(true);
      await expect(page.locator('main h1')).not.toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.locator('.ag-skip')).toBeFocused();
      expect(errors).toEqual([]);
      await record(page, info, 'post-code-ready');
    } finally {
      gate.release();
    }
  });

  test(`initial module readiness preserves first-load focus (${lang})`, async ({page}, info) => {
    const gate = await hold(page, pageChunk('site'));
    try {
      await page.goto(siteUrl('shop', lang), {waitUntil: 'domcontentloaded'});
      await gate.requested;
      // The prerendered page stays in view and takes no input until the app mounts.
      await expect(page.locator('#main')).toHaveCount(1);
      await expect(page.locator('#root')).toHaveAttribute('inert', '');
      await record(page, info, 'initial-module-held');
      await gate.complete();
      await expect(page.locator('.vf-shop-product-grid')).toBeVisible();
      await expect(page.locator('#root')).not.toHaveAttribute('inert', '');
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect.poll(() => page.evaluate(() => window.__vfRuntime.viewed)).toBe(true);
      await expect(page.locator('main h1')).not.toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.locator('.ag-skip')).toBeFocused();
      await record(page, info, 'initial-module-ready');
    } finally {
      gate.release();
    }
  });

  test(`latest route wins while an earlier Next.js payload is held (${lang})`, async ({
    page
  }, info) => {
    const gate = await hold(page, routePayload('shop'));
    try {
      await openSite(page, 'home', lang);
      await page.evaluate(() => {
        window.__routeLifecycleDocument = true;
      });
      const original = page.url();
      const heading = await page.locator('main h1').textContent();
      await page.locator('.vf-home-arrivals .ag-sechead a[href*="/shop/"]').click();
      await gate.requested;
      await expect(page).toHaveURL(original);
      await expect(page.locator('main h1')).toHaveText(heading);
      await record(page, info, 'pending-shop-retains-home');
      const footer = await openFooterGroup(page, lang === 'fa' ? 'راهنما' : 'Help');
      await footer
        .getByRole('link', {name: lang === 'fa' ? 'پرسش‌های متداول' : 'FAQ', exact: true})
        .click();
      await expect(page).toHaveURL(/\/faq\//);
      await focusedHeading(page, lang);
      const faq = page.url();
      await gate.complete();
      await expect(page).toHaveURL(faq);
      await expect(page.locator('.vf-shop-product-grid')).toHaveCount(0);
      await focusedHeading(page, lang);
      expect(await page.evaluate(() => window.__routeLifecycleDocument)).toBe(true);
      await record(page, info, 'stale-shop-completion-ignored');
      await page.goBack();
      await expect(page.locator('.vf-home-top')).toBeVisible();
      await focusedHeading(page, lang);
      await page.goForward();
      await expect(page).toHaveURL(faq);
      await focusedHeading(page, lang);
    } finally {
      gate.release();
    }
  });

  test(`delayed invalid-policy recovery focuses the final heading (${lang})`, async ({
    page
  }, info) => {
    const gate = await hold(page, routePayload('notfound'));
    try {
      await openSite(page, 'home', lang);
      await page.evaluate(() => {
        window.__routeLifecycleDocument = true;
      });
      const original = page.url();
      // Reproduce an invalid route via the same navigation API used by the site router.
      // Simulate a stale policy link.
      await page.evaluate(() => window.__vfSite.navigate({view: 'policy', id: 'stage232-missing'}));
      await gate.requested;
      await expect(page).toHaveURL(original);
      await expect(page.locator('.vf-home-top')).toBeVisible();
      await record(page, info, 'invalid-route-module-held');
      await gate.complete();
      await expect(page.locator('.vf-notfound-message')).toBeVisible();
      await focusedHeading(page, lang);
      expect(await page.evaluate(() => window.__routeLifecycleDocument)).toBe(true);
      await record(page, info, 'invalid-route-heading-focused');
      await page.locator('.vf-notfound-message a').first().click();
      await expect(page.locator('.vf-home-top')).toBeVisible();
      await focusedHeading(page, lang);
    } finally {
      gate.release();
    }
  });
}
