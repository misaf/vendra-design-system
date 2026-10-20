import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

for (const [lang, loading] of [
  ['en', 'Loading'],
  ['fa', 'در حال بارگذاری']
])
  test(`a polite status named in the page language (${lang})`, async ({page}) => {
    await openComponent(page, 'Spinner', lang);
    await expect(page.getByRole('status').first()).toHaveText(loading);
    await expect(page.getByRole('status').nth(1)).toHaveText('Loading delivery times');
  });

test('decorative leaves no status and hides the ring', async ({page}) => {
  await openComponent(page, 'Spinner');
  await expect(page.getByRole('status')).toHaveCount(2);
  await expect(page.locator('.decorative')).toHaveAttribute('aria-hidden', 'true');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Spinner');
});
