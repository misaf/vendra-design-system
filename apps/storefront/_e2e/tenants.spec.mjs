import {test, expect} from '@playwright/test';
import {TENANTS, openSite} from './helpers.mjs';

test.beforeEach(({}, info) =>
  test.skip(info.project.name !== 'desktop', 'token checks do not depend on the viewport')
);

// Records what each frame showed: 'hidden' or the shell's background colour (once it exists).
async function recordFrames(page) {
  await page.addInitScript(() => {
    window.__vfFrames = [];
    const tick = () => {
      // The page's own code loads on demand, so it may still be hidden before the shell exists.
      const el = document.querySelector('.vf-shell-container');
      if (document.body && getComputedStyle(document.body).visibility === 'hidden')
        window.__vfFrames.push('hidden');
      else if (el) window.__vfFrames.push(getComputedStyle(el).backgroundColor);
      if (window.__vfFrames.length < 120) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

// Every visible frame had the final page colour: no flash of the default theme.
async function expectNoThemeFlash(page) {
  const final = await page
    .locator('.vf-shell-container')
    .evaluate(el => getComputedStyle(el).backgroundColor);
  const seen = [...new Set(await page.evaluate(() => window.__vfFrames))].filter(
    f => f !== 'hidden'
  );
  expect(seen).toEqual([final]);
}

// A storefront downloads only its own theme, after styles.css.
for (const tenant of ['default', ...TENANTS, 'not-a-tenant']) {
  test(`storefront loads only its own theme (?tenant=${tenant})`, async ({page}) => {
    const requested = [];
    page.on('request', r => {
      if (r.url().includes('/tokens/tenants')) requested.push(r.url().split('/tokens/')[1]);
    });
    await recordFrames(page);
    await openSite(page, 'home', 'en', {tenant});
    const expected = TENANTS.includes(tenant) ? tenant : 'default';
    expect(requested).toEqual(expected === 'default' ? [] : [`tenants/${expected}.css`]);
    await expect(page.locator('.vf-shell-container')).toHaveAttribute('data-tenant', expected);
    // The tenant's rules come after every other stylesheet (they match :root's specificity).
    if (expected !== 'default')
      expect(
        await page.evaluate(() => {
          // The app's stylesheets: Vite's injected styles in dev, linked files in the build.
          const sheets = [
            ...document.head.querySelectorAll('link[rel=stylesheet], style[data-vite-dev-id]')
          ];
          return sheets.at(-1)?.id === 'vf-tenant-css';
        })
      ).toBe(true);
    await expectNoThemeFlash(page);
  });
}

// On a slow connection the page stays hidden until the theme arrives.
for (const tenant of TENANTS) {
  test(`slow theme file never shows the default colours (${tenant})`, async ({page}) => {
    await page.route('**/tokens/tenants/*.css', async route => {
      await new Promise(r => setTimeout(r, 800));
      await route.continue();
    });
    await recordFrames(page);
    await openSite(page, 'home', 'en', {tenant});
    await expect(page.locator('body')).toBeVisible();
    expect(await page.evaluate(() => window.__vfFrames)).toContain('hidden');
    await expectNoThemeFlash(page);
  });
}
