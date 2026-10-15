import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`display presets start on a product without the catalog (${lang})`, async ({page}) => {
    await openSite(page, 'presentation', lang);
    await expect(page.locator('.vf-display-photo')).toBeVisible();
    await expect(page.locator('.vf-presentation-bar')).toBeHidden();
    await expect(page.locator('.vf-presentation-tile').first()).toBeHidden();
    expect(await scanAxe(page)).toEqual([]);
  });
}

test('TV preset plays immediately and persists across reload', async ({page}) => {
  await page.clock.install();
  await page.addInitScript(() =>
    localStorage.setItem('vf-presentation', JSON.stringify({displayMode: 'tv', slideSeconds: 6}))
  );
  await openSite(page, 'presentation', 'en');
  await expect(page.locator('.vf-display-caption')).toContainText('VF-7K2M4Q');
  await page.clock.runFor(6_100);
  await expect(page.locator('.vf-display-caption')).toContainText('VF-3HX9TP');
  await expect(page.locator('.vf-display-navigation')).toHaveCount(0);
  await page.reload();
  await expect(page.locator('.vf-display-photo')).toBeVisible();
});

for (const lang of ['en', 'fa']) {
  test(`seller tools stay in a drawer and return focus when closed (${lang})`, async ({page}) => {
    await openSite(page, 'presentation', lang);
    const tools = lang === 'en' ? 'Seller tools' : 'ابزار فروشنده';
    const browse = lang === 'en' ? 'Browse designs' : 'مرور طرح‌ها';
    await expect(page.getByRole('button', {name: browse, exact: true})).toHaveCount(0);
    await page.locator('.vf-display').press('Enter');
    await page.getByRole('button', {name: tools, exact: true}).click();
    await expect(page.getByRole('dialog', {name: tools})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', {name: tools, exact: true})).toBeFocused();
    await page.locator('.vf-display').press('Enter');
    await page.getByRole('button', {name: tools, exact: true}).click();
    await page.getByRole('button', {name: browse, exact: true}).click();
    await expect(page.getByRole('searchbox')).toBeFocused();
    await expect(page.locator('.vf-display')).toHaveCount(0);
  });
}

for (const lang of ['en', 'fa']) {
  test(`quiet navigation changes products without revealing controls (${lang})`, async ({page}) => {
    await page.clock.install();
    await openSite(page, 'presentation', lang);
    const stage = page.locator('.vf-display');
    await stage.press(lang === 'en' ? 'ArrowRight' : 'ArrowLeft');
    await expect(page.locator('.vf-display-caption')).toContainText('VF-3HX9TP');
    await expect(stage).toHaveAttribute('data-controls', 'false');
    const box = await stage.boundingBox();
    const y = box.y + box.height / 2;
    const from = lang === 'en' ? 0.8 : 0.2,
      to = 1 - from;
    await page.mouse.move(box.x + box.width * from, y);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * to, y, {steps: 8});
    await page.mouse.up();
    await expect(page.locator('.vf-display-caption')).toContainText('VF-8RD5WN');
    await expect(stage).toHaveAttribute('data-controls', 'false');
    await stage.click({position: {x: 10, y: 10}});
    await expect(stage).toHaveAttribute('data-controls', 'true');
    await page.clock.runFor(4100);
    await expect(stage).toHaveAttribute('data-controls', 'false');
    await stage.press('Tab');
    await expect(
      page.getByRole('button', {
        name: lang === 'en' ? 'Seller tools' : 'ابزار فروشنده',
        exact: true
      })
    ).toBeFocused();
    await expect(page.locator('.vf-display-tools')).toHaveCSS('opacity', '1');
  });
}

test('paired products fit a landscape screen and return to one in portrait', async ({
  page
}, info) => {
  await page.addInitScript(() =>
    localStorage.setItem('vf-presentation', JSON.stringify({displayLayout: 'pair'}))
  );
  await page.setViewportSize({width: 1280, height: 720});
  await openSite(page, 'presentation', 'en');
  await expect(page.locator('.vf-display-photo')).toHaveCount(2);
  const photos = page.locator('.vf-display-photo');
  await expect(photos.first()).toHaveCSS('object-fit', 'contain');
  const first = await photos.nth(0).boundingBox(),
    second = await photos.nth(1).boundingBox();
  expect(first.x + first.width).toBeLessThan(second.x);
  expect(first.y).toBeGreaterThan(0);
  if (info.project.name === 'desktop')
    await expect(page).toHaveScreenshot('presentation-paired-en.png');
  await page.locator('.vf-display').press('ArrowRight');
  await expect(page.locator('.vf-display-caption').first()).toContainText('VF-8RD5WN');
  await page.setViewportSize({width: 390, height: 844});
  await expect(photos).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
});

for (const mode of ['photo', 'code', 'price']) {
  test(`caption preset ${mode} controls only the intended information`, async ({page}) => {
    await page.addInitScript(
      captionMode =>
        localStorage.setItem('vf-presentation', JSON.stringify({captionMode, displayMode: 'tv'})),
      mode
    );
    await openSite(page, 'presentation', 'fa');
    await expect(page.locator('.vf-display-caption')).toHaveCount(mode === 'photo' ? 0 : 1);
    await expect(page.locator('.vf-display-caption .ag-price')).toHaveCount(
      mode === 'price' ? 1 : 0
    );
    if (mode !== 'photo') await expect(page.locator('.vf-display-code')).toHaveText('VF-7K2M4Q');
    expect(await scanAxe(page)).toEqual([]);
  });
}

test('hidden prices override a caption preset that would otherwise show them', async ({page}) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'vf-presentation',
      JSON.stringify({captionMode: 'price', showPrices: false})
    )
  );
  await openSite(page, 'presentation', 'en');
  await expect(page.locator('.vf-display-code')).toHaveText('VF-7K2M4Q');
  await expect(page.locator('.vf-display-caption .ag-price')).toHaveCount(0);
});

test('TV slideshow honors a longer dwell and pauses in seller dialogs', async ({page}) => {
  const start = new Date('2026-10-15T09:00:00Z');
  await page.clock.install({time: start});
  await page.addInitScript(() =>
    localStorage.setItem('vf-presentation', JSON.stringify({displayMode: 'tv', slideSeconds: 15}))
  );
  await openSite(page, 'presentation', 'en');
  await page.locator('.vf-display').press('Enter');
  await page.getByRole('button', {name: 'Seller tools', exact: true}).click();
  await page.clock.pauseAt(new Date(start.getTime() + 60000));
  await page.keyboard.press('Escape');
  await page.clock.runFor(14900);
  await expect(page.locator('.vf-display-caption')).toContainText('VF-7K2M4Q');
  await page.clock.runFor(200);
  await expect(page.locator('.vf-display-caption')).toContainText('VF-3HX9TP');
  await page.locator('.vf-display').press('Enter');
  await page.getByRole('button', {name: 'Seller tools', exact: true}).click();
  await page.clock.runFor(45000);
  await expect(page.locator('.vf-display-caption')).toContainText('VF-3HX9TP');
  await page.keyboard.press('Escape');
  await page.clock.runFor(15100);
  await expect(page.locator('.vf-display-caption')).toContainText('VF-8RD5WN');
});
