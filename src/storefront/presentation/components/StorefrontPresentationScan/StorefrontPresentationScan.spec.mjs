import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    title: 'Scan a tag',
    body: 'Point the camera at a design tag',
    unknown: 'Unknown design code',
    blocked: 'Camera access blocked',
    close: 'Close'
  },
  fa: {
    title: 'اسکن برچسب',
    body: 'دوربین را به برچسب طرح بگیرید',
    unknown: 'کد طرح ناشناخته',
    blocked: 'دسترسی دوربین مسدود است',
    close: 'بستن'
  }
};
for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async page => {
    await openStorefrontComponent(page, 'StorefrontPresentationScan', lang);
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.getByRole('button', {name: 'Open scan', exact: true}).click();
    const dialog = page.getByRole('dialog', {name: t.title});
    await expect(dialog).toBeVisible();
    return dialog;
  };
  test(`${lang}: instructions and muted inline video preserve the page-owned camera target`, async ({
    page
  }) => {
    const dialog = await open(page);
    await expect(dialog.getByText(t.body, {exact: true})).toBeVisible();
    const video = dialog.locator('video');
    await expect(video).toHaveAttribute('id', 'vf-presentation-camera');
    await expect(video).toHaveAttribute('playsinline', '');
    expect(
      await video.evaluate(element => ({
        muted: element.muted,
        stream: element.srcObject,
        source: element.getAttribute('src'),
        autoplay: element.autoplay
      }))
    ).toEqual({muted: true, stream: null, source: null, autoplay: false});
    await expect(dialog.locator('.ag-alert')).toHaveCount(0);
    await expect(page.locator('[data-test="closes"]')).toHaveText('0');
  });
  test(`${lang}: supplied unknown and blocked warnings survive close/reopen and retain the video target`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontPresentationScan', lang);
    for (const warning of ['unknown', 'blocked', 'none']) {
      await page.getByRole('combobox', {name: 'Warning', exact: true}).selectOption(warning);
      await page.getByRole('button', {name: 'Open scan', exact: true}).click();
      const dialog = page.getByRole('dialog', {name: t.title});
      await expect(dialog.locator('#vf-presentation-camera')).toBeVisible();
      if (warning === 'none') await expect(dialog.locator('.ag-alert')).toHaveCount(0);
      else await expect(dialog.getByText(t[warning], {exact: true})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
    }
    await expect(page.locator('[data-test="closes"]')).toHaveText('3');
  });
  test(`${lang}: compact dialog contains keyboard focus, closes once and restores its trigger`, async ({
    page
  }) => {
    await page.setViewportSize({width: 390, height: 844});
    const dialog = await open(page);
    const close = dialog.getByRole('button', {name: t.close, exact: true});
    await close.focus();
    for (const key of ['Tab', 'Shift+Tab']) {
      await page.keyboard.press(key);
      expect(await dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
    }
    expect(await scanAxe(page)).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true
    );
    await close.focus();
    await page.keyboard.press('Enter');
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('[data-test="closes"]')).toHaveText('1');
    await expect(page.getByRole('button', {name: 'Open scan', exact: true})).toBeFocused();
  });
}
