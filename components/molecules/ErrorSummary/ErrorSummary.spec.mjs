import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

for (const [lang, several, single] of [
  ['en', 'Check 3 details to continue.', 'Check this detail to continue.'],
  ['fa', '۳ مورد را بررسی کنید تا ادامه دهید.', 'این مورد را بررسی کنید تا ادامه دهید.']
])
  test(`counts what to fix in the page's language (${lang})`, async ({page}) => {
    await openComponent(page, 'ErrorSummary', lang);
    await page.getByRole('button', {name: 'Send'}).click();
    await expect(page.locator('.several [role=alert]')).toContainText(several);
    await expect(page.locator('.single [role=alert]')).toContainText(single);
    await expect(page.locator('.ag-error-summary')).toHaveCount(2);
  });

test('takes focus when it appears, and each link focuses its field', async ({page}) => {
  await openComponent(page, 'ErrorSummary');
  await page.getByRole('button', {name: 'Send'}).click();
  const summary = page.locator('.several');
  await expect(summary).toBeFocused();
  await summary.getByRole('link', {name: 'Enter a mobile number.'}).click();
  await expect(page.getByLabel('Mobile')).toBeFocused();
  await expect(page.getByLabel('Mobile')).toBeInViewport();
  // A group's link focuses the first control inside it.
  await summary.getByRole('link', {name: 'Choose a delivery time.'}).click();
  await expect(page.getByRole('radio', {name: 'Morning'})).toBeFocused();
  // From the keyboard too.
  await summary.getByRole('link', {name: 'Enter your name.'}).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Name')).toBeFocused();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'ErrorSummary');
});
