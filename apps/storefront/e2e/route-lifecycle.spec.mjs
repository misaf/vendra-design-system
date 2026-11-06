import {test, expect} from '@playwright/test';
import {openSite, openFooterGroup, siteUrl} from './helpers.mjs';

const SITE_CODE = /pages\/site\/Page\.jsx|\/page-site-[\w-]+\.js/;
const POST_CODE = /pages\/post\/Page\.jsx|\/page-post-[\w-]+\.js/;
const SHOP_CODE = /pages\/shop\/Page\.jsx|\/page-shop-[\w-]+\.js/;
const NOTFOUND_CODE = /pages\/notfound\/Page\.jsx|\/page-notfound-[\w-]+\.js/;
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
      // Await the actual requested ESM module's evaluation, including its imports. This shares
      // the browser module cache with loadPage and does not replace its implementation/options.
      await page.evaluate(url => import(url).then(() => {}), loaded.url());
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
  test(`post waits for evaluation after its successful HTTP response (${lang})`, async ({
    page
  }, info) => {
    const pending = new Set();
    const completed = [];
    const errors = [];
    page.on('request', request => pending.add(new URL(request.url()).pathname));
    page.on('requestfinished', request => {
      pending.delete(new URL(request.url()).pathname);
      if (POST_CODE.test(request.url()))
        completed.push({path: new URL(request.url()).pathname, at: performance.now()});
    });
    page.on('requestfailed', request => pending.delete(new URL(request.url()).pathname));
    page.on('pageerror', error => errors.push(error.message));
    await page.clock.setFixedTime(new Date('2026-10-05T09:00:00+03:30'));
    await page.addInitScript(() => {
      window.__postEvaluationGate = new Promise(resolve => {
        window.__releasePostEvaluation = resolve;
      });
      window.__postEvaluationStarted = false;
      window.__postEvaluationFinished = false;
    });
    await page.route(POST_CODE, async route => {
      const response = await route.fetch();
      expect(response.status()).toBe(200);
      // Keep the real imports/exports. HTTP completes, but ESM evaluation must still wait.
      const body =
        (await response.text()) +
        `
window.__postEvaluationStarted = true;
await window.__postEvaluationGate;
window.__postEvaluationFinished = true;
`;
      await route.fulfill({response, body});
    });
    const response = page.waitForResponse(response => POST_CODE.test(response.url()));
    try {
      await page.goto(siteUrl('post', lang));
      await expect.poll(() => page.evaluate(() => window.__postEvaluationStarted)).toBe(true);
      await page.waitForTimeout(500);
      const deadlineAt = performance.now();
      const loaded = await response;
      expect(loaded.status()).toBe(200);
      expect(await loaded.finished()).toBeNull();
      expect(completed).toHaveLength(1);
      expect(completed[0].at).toBeLessThan(deadlineAt);
      const deadline = await page.evaluate(() => ({
        at: performance.now(),
        main: document.querySelectorAll('#main').length,
        lang: document.documentElement.lang,
        started: window.__postEvaluationStarted,
        finished: window.__postEvaluationFinished,
        statusCount: document.querySelectorAll('[role=status]').length
      }));
      // In the production build the prerendered post stays in view (inert) with its language; the
      // dev server's plain page is empty and English until the post renders.
      const build = process.env.E2E_TARGET === 'build';
      expect(deadline).toMatchObject({
        main: build ? 1 : 0,
        lang: build ? lang : 'en',
        started: true,
        finished: false
      });
      await info.attach('post-evaluation-deadline', {
        body: JSON.stringify({deadline, completed, pending: [...pending]}, null, 2),
        contentType: 'application/json'
      });
      await page.evaluate(() => window.__releasePostEvaluation());
      await expect(page.locator('#main')).toBeVisible();
      await expect(page.locator('main h1')).toHaveText(
        lang === 'fa' ? 'یک صبح پشت میز کار وندرا' : 'A morning at the Vendra workbench'
      );
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      expect(await page.evaluate(() => window.__postEvaluationFinished)).toBe(true);
      await expect.poll(() => page.evaluate(() => window.__vfRuntime.viewed)).toBe(true);
      await expect(page.locator('main h1')).not.toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.locator('.ag-skip')).toBeFocused();
      expect(errors).toEqual([]);
      await record(page, info, 'post-evaluation-released');
    } finally {
      await page.evaluate(() => window.__releasePostEvaluation?.()).catch(() => {});
    }
  });

  test(`initial module readiness preserves first-load focus (${lang})`, async ({page}, info) => {
    const gate = await hold(page, SITE_CODE);
    try {
      await page.goto(siteUrl('shop', lang), {waitUntil: 'domcontentloaded'});
      await gate.requested;
      if (process.env.E2E_TARGET === 'build') {
        // The prerendered page stays in view, taking no input until the app has it.
        await expect(page.locator('#main')).toHaveCount(1);
        await expect(page.locator('#root')).toHaveAttribute('inert', '');
      } else await expect(page.locator('#main')).toHaveCount(0);
      await record(page, info, 'initial-module-held');
      await gate.complete();
      await expect(page.locator('.vf-shop-product-grid')).toBeVisible();
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

  test(`latest route wins while an earlier page module is held (${lang})`, async ({page}, info) => {
    const gate = await hold(page, SHOP_CODE);
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
    const gate = await hold(page, NOTFOUND_CODE);
    try {
      await openSite(page, 'home', lang);
      await page.evaluate(() => {
        window.__routeLifecycleDocument = true;
      });
      const original = page.url();
      // Reproduce an invalid route via the same navigation API used by the site router.
      // This is diagnostic route input, not a claim that the UI advertises a broken link.
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
