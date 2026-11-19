import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';

const copy = {
  en: {
    removed: 'VF-7K2M4Q was removed',
    undo: 'Undo removal',
    title: 'Your bag is',
    accent: 'empty',
    body: 'Choose a design to start again.',
    recover: 'Restore sample bag',
    restored: 'Bag restored',
    showRemoved: 'Show removal notice',
    showEmpty: 'Show empty bag'
  },
  fa: {
    removed: 'VF-7K2M4Q حذف شد',
    undo: 'واگرد حذف',
    title: 'سبد شما',
    accent: 'خالی است',
    body: 'برای شروع دوباره یک طرح انتخاب کنید.',
    recover: 'بازیابی سبد نمونه',
    restored: 'سبد بازیابی شد',
    showRemoved: 'نمایش پیام حذف',
    showEmpty: 'نمایش سبد خالی'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: final-item removal notice and Undo remain available alongside the empty state`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagFeedback', lang);
    await expect(page.getByText(t.removed, {exact: true})).toBeVisible();
    await expect(page.getByRole('heading', {level: 1})).toContainText(t.title);
    const undo = page.getByRole('button', {name: t.undo, exact: true});
    await expect(undo).toHaveAttribute('id', 'vf-bag-undo');
    await expect(undo).toHaveAttribute('data-vf-keep-focus', 'true');
    await undo.click();
    await expect(page.locator('[data-test="action"]')).toHaveText('undo');
    await expect(page.getByRole('heading', {level: 1})).toHaveCount(0);
    await expect(undo).toHaveCount(0);
    await expect(page.getByText(t.restored, {exact: true})).toBeVisible();
  });

  test(`${lang}: empty heading/body and recovery action use their supplied content/callback`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagFeedback', lang);
    const heading = page.getByRole('heading', {level: 1});
    await expect(heading).toContainText(t.title);
    await expect(heading).toContainText(t.accent);
    await expect(page.getByText(t.body, {exact: true})).toBeVisible();
    const recover = page.getByRole('button', {name: t.recover, exact: true});
    await recover.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test="action"]')).toHaveText('recover');
    await expect(heading).toHaveCount(0);
    await expect(page.getByText(t.restored, {exact: true})).toBeVisible();
  });

  test(`${lang}: combined, empty-only and removal-only states pass axe`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontBagFeedback', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.showRemoved, exact: true}).uncheck();
    await expect(page.getByRole('button', {name: t.undo, exact: true})).toHaveCount(0);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('checkbox', {name: t.showRemoved, exact: true}).check();
    await page.getByRole('checkbox', {name: t.showEmpty, exact: true}).uncheck();
    await expect(page.getByRole('heading', {level: 1})).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.undo, exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
}
