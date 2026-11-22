import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    photos: 'Design photos',
    fullScreen: 'View fullscreen',
    first: 'Photo 1 of 2',
    second: 'Photo 2 of 2',
    close: 'Close',
    previous: 'Previous',
    next: 'Next'
  },
  fa: {
    photos: 'عکس‌های طرح',
    fullScreen: 'نمایش تمام‌صفحه',
    first: 'عکس 1 از 2',
    second: 'عکس 2 از 2',
    close: 'بستن',
    previous: 'قبلی',
    next: 'بعدی'
  }
};
for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async page => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStorefrontComponent(page, 'StorefrontProductGallery', lang);
    return page.getByRole('region', {name: t.photos});
  };
  test(`${lang}: gallery preserves supplied slide labels, responsive photos and priority`, async ({
    page
  }) => {
    const gallery = await open(page);
    await expect(gallery).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(gallery.getByRole('group')).toHaveCount(2);
    await expect(gallery.getByRole('group').nth(0)).toHaveAccessibleName(t.first);
    await expect(gallery.getByRole('group').nth(1)).toHaveAccessibleName(t.second);
    const photos = gallery.getByRole('img');
    await expect(photos).toHaveCount(2);
    await expect(photos.nth(0)).toHaveAttribute('alt', 'VF-7K2M4Q 1');
    await expect(photos.nth(1)).toHaveAttribute('alt', 'VF-7K2M4Q 2');
    for (const photo of await photos.all())
      await expect(photo).toHaveAttribute('sizes', '(max-width: 767px) 100vw, 50vw');
    await expect(photos.first()).toHaveAttribute('loading', 'eager');
    await expect(photos.nth(1)).toHaveAttribute('loading', 'lazy');
    await expect(gallery.locator('.ag-gallery__track')).toHaveCSS('aspect-ratio', '4 / 5');
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
  test(`${lang}: fullscreen opens the selected gallery photo and restores the trigger focus`, async ({
    page
  }) => {
    const gallery = await open(page);
    await gallery.getByRole('button', {name: t.second, exact: true}).focus();
    await page.keyboard.press('Enter');
    await expect(gallery.getByRole('button', {name: t.second, exact: true})).toHaveAttribute(
      'aria-current',
      'true'
    );
    await page.getByRole('button', {name: t.fullScreen, exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.photos});
    await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'VF-7K2M4Q 2');
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.fullScreen, exact: true})).toBeFocused();
    await page.keyboard.press('Space');
    await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'VF-7K2M4Q 2');
    await dialog.getByRole('button', {name: t.close, exact: true}).click();
    await expect(dialog).toHaveCount(0);
  });
  test(`${lang}: fullscreen navigation respects RTL and keeps its position separate from the gallery`, async ({
    page
  }) => {
    await open(page);
    await page.getByRole('button', {name: t.fullScreen, exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.photos});
    await expect(dialog.getByRole('button', {name: t.previous, exact: true})).toBeDisabled();
    await page.keyboard.press(lang === 'fa' ? 'ArrowLeft' : 'ArrowRight');
    await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'VF-7K2M4Q 2');
    await expect(dialog.getByRole('button', {name: t.next, exact: true})).toBeDisabled();
    await page.keyboard.press(lang === 'fa' ? 'ArrowLeft' : 'ArrowRight');
    await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'VF-7K2M4Q 2');
    await page.keyboard.press('Escape');
    await page.getByRole('button', {name: t.fullScreen, exact: true}).click();
    await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'VF-7K2M4Q 1');
    await expect(dialog.getByRole('button', {name: t.previous, exact: true})).toBeDisabled();
  });
  test(`${lang}: changing the product resets the gallery and fullscreen entry`, async ({page}) => {
    const gallery = await open(page);
    const secondDot = gallery.getByRole('button', {name: t.second, exact: true});
    await secondDot.click();
    await expect(secondDot).toHaveAttribute('aria-current', 'true');
    await page.getByRole('button', {name: 'Change product', exact: true}).click();
    await expect(gallery.getByRole('button', {name: t.first, exact: true})).toHaveAttribute(
      'aria-current',
      'true'
    );
    await expect
      .poll(() =>
        gallery.locator('.ag-gallery__track').evaluate(element => Math.abs(element.scrollLeft))
      )
      .toBeLessThan(1);
    await expect(gallery.getByRole('img').first()).toHaveAttribute('alt', 'VF-8P3N5R 1');
    await page.getByRole('button', {name: t.fullScreen, exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.photos});
    await expect(dialog.getByRole('img')).toHaveAttribute('alt', 'VF-8P3N5R 1');
    await page.keyboard.press('Escape');
    await page.getByLabel('Single photo', {exact: true}).check();
    await expect(gallery.getByRole('img')).toHaveCount(1);
    await expect(gallery.getByRole('button')).toHaveCount(0);
  });
  test(`${lang}: gallery and fullscreen pass compact axe and retain focus within the viewer`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    await open(page);
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    await page.getByRole('button', {name: t.fullScreen, exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.photos});
    await expect(dialog).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await dialog.getByRole('button', {name: t.close, exact: true}).focus();
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  });
}
