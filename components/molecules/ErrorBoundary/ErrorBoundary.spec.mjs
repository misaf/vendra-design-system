import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

for (const [lang, title, retry] of [
  ['en', 'This part of the page didn’t load.', 'Try again'],
  ['fa', 'این بخش از صفحه بارگذاری نشد.', 'تلاش دوباره']
])
  test(`a failed part becomes a note and the page carries on (${lang})`, async ({page}) => {
    await openComponent(page, 'ErrorBoundary', lang);
    const note = page.locator('.default [role=status]');
    await expect(note).toContainText(title);
    await expect(page.locator('.around')).toBeVisible();
    await expect(page.locator('[data-test=reported]')).toHaveText('No price for VF-7K2M4Q');
    await expect(page.getByRole('button', {name: retry})).toBeVisible();
  });

test('Try again renders the part afresh; still failing, the note stays', async ({page}) => {
  await openComponent(page, 'ErrorBoundary');
  await page.getByRole('button', {name: 'Try again'}).click();
  await expect(page.getByRole('button', {name: 'Try again'})).toBeVisible();
  await page.getByRole('button', {name: 'Fix it'}).click();
  await page.getByRole('button', {name: 'Try again'}).click();
  await expect(page.locator('.part')).toHaveText('Recently viewed');
});

test('a new resetKey clears the failure', async ({page}) => {
  await openComponent(page, 'ErrorBoundary');
  await page.getByRole('button', {name: 'Fix it'}).click();
  await expect(page.locator('.part')).toHaveCount(0);
  await page.getByRole('button', {name: 'New product'}).click();
  await expect(page.locator('.part')).toHaveText('Recently viewed');
});

test('a custom fallback gets retry', async ({page}) => {
  await openComponent(page, 'ErrorBoundary');
  await expect(page.getByRole('button', {name: 'Custom retry'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'ErrorBoundary');
});
