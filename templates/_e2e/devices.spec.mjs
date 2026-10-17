import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

test.beforeEach(({}, info) => {
  test.skip(
    !['touch-phone', 'tablet', 'tv'].includes(info.project.name),
    'dedicated device projects'
  );
});

for (const lang of ['en', 'fa']) {
  test(`device layout and input (${lang})`, async ({page}, info) => {
    await page.addInitScript(
      mode =>
        localStorage.setItem(
          'vf-presentation',
          JSON.stringify({displayMode: mode, displayLayout: 'pair'})
        ),
      info.project.name === 'tv' ? 'tv' : 'tablet'
    );
    await openSite(page, 'presentation', lang);
    await expect(page.locator('.vf-display-photo').first()).toBeVisible();
    const first = await page.locator('.vf-display-code').first().textContent();
    if (info.project.name === 'tv')
      await page.keyboard.press(lang === 'en' ? 'ArrowRight' : 'ArrowLeft');
    else {
      const session = await page.context().newCDPSession(page);
      const {width, height} = page.viewportSize();
      const x = lang === 'en' ? width * 0.8 : width * 0.2;
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{x, y: height / 2}]
      });
      for (let step = 1; step <= 8; step++)
        await session.send('Input.dispatchTouchEvent', {
          type: 'touchMove',
          touchPoints: [{x: x + ((width - 2 * x) * step) / 8, y: height / 2}]
        });
      await session.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
    }
    await expect(page.locator('.vf-display-code').first()).not.toHaveText(first);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)).toBe(0);
    await page.setViewportSize({width: 390, height: 844});
    await expect(page.locator('.vf-display-photo')).toHaveCount(1);
  });
}

test('first visit prepares offline shell and a full collection survives reconnect and update', async ({
  page,
  context
}) => {
  test.skip(process.env.E2E_TARGET !== 'build', 'service worker is production only');
  await openSite(page, 'presentation', 'en');
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-offline-status="ready"]')).toBeVisible({timeout: 60000});
  await page.keyboard.press('Escape');
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('.vf-display-photo').first()).toBeVisible();
  const seen = new Set();
  for (let index = 0; index < 12; index++) {
    const previous = await page.locator('.vf-display-code').first().textContent();
    seen.add(previous);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.vf-display-code').first()).not.toHaveText(previous);
    await expect(page.locator('.vf-display-photo').first()).toBeVisible();
    expect(
      await page
        .locator('.vf-display-photo')
        .first()
        .evaluate(image => image.complete && image.naturalWidth > 0)
    ).toBe(true);
  }
  expect(seen.size).toBe(6);
  await context.setOffline(false);
  await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).update());
  await expect(page.locator('.vf-display-photo').first()).toBeVisible();
  await page.reload();
  await expect(page.locator('.vf-display-photo').first()).toBeVisible();
});

test('a new service worker activates without interrupting an open display', async ({
  page
}, info) => {
  test.skip(
    process.env.E2E_TARGET !== 'build' || info.project.name !== 'tv',
    'one production update check'
  );
  await openSite(page, 'presentation', 'en');
  await page.keyboard.press('Enter');
  await expect(page.locator('[data-offline-status="ready"]')).toBeVisible({timeout: 60000});
  await page.keyboard.press('Escape');
  const code = await page.locator('.vf-display-code').textContent();
  const workerPath = fileURLToPath(new URL('../_app-build/templates/app/sw.js', import.meta.url));
  const original = await fs.readFile(workerPath, 'utf8');
  try {
    await fs.writeFile(workerPath, original + '\n// test revision ' + Date.now());
    await page.evaluate(async () => {
      const changed = new Promise(resolve =>
        navigator.serviceWorker.addEventListener('controllerchange', resolve, {once: true})
      );
      await (await navigator.serviceWorker.getRegistration()).update();
      await changed;
    });
    await expect(page.locator('.vf-display-code')).toHaveText(code);
    await expect(page.locator('.vf-display-photo')).toBeVisible();
  } finally {
    await fs.writeFile(workerPath, original);
  }
});

test('a setup link can be reviewed on a fresh device before applying its preferences', async ({
  page,
  browser
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('vf-presentation', JSON.stringify({displayMode: 'tv'}))
  );
  await openSite(page, 'presentation', 'en');
  await page.keyboard.press('Enter');
  await page.getByRole('button', {name: 'Set up this display', exact: true}).click();
  await page.getByText('Transfer display setup', {exact: true}).click();
  const link = await page
    .getByRole('link', {name: 'Open shareable setup link', exact: true})
    .getAttribute('href');
  const destination = await browser.newContext();
  try {
    const next = await destination.newPage();
    await next.goto(link);
    await expect(next.locator('.vf-display')).toHaveAttribute('data-mode', 'tablet');
    await next.keyboard.press('Enter');
    await next.getByRole('button', {name: 'Review shared setup', exact: true}).click();
    await next.getByText('Transfer display setup', {exact: true}).click();
    await next.getByRole('button', {name: 'Apply setup', exact: true}).click();
    expect(
      await next.evaluate(() => JSON.parse(localStorage.getItem('vf-presentation')).displayMode)
    ).toBe('tv');
  } finally {
    await destination.close();
  }
});
