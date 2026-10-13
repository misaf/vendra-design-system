import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

// The ARIA tabs pattern, on React Aria.
for (const lang of ['en', 'fa'])
  test(`arrow keys, Home and End move selection (${lang})`, async ({page}) => {
    await openComponent(page, 'Tabs', lang);
    const tab = name => page.getByRole('tab', {name});
    const next = lang === 'fa' ? 'ArrowLeft' : 'ArrowRight';
    await tab('Orders').focus();
    await page.keyboard.press(next);
    await expect(tab('Addresses')).toBeFocused();
    await expect(tab('Addresses')).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('End');
    await expect(tab('Profile')).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press(next);
    await expect(tab('Orders')).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Home');
    await expect(tab('Orders')).toBeFocused();
  });

test('roving tabindex and panel linkage', async ({page}) => {
  await openComponent(page, 'Tabs');
  const selected = page.getByRole('tab', {selected: true});
  await expect(page.getByRole('tab')).toHaveCount(3);
  await expect(page.locator('[role=tab][tabindex="0"]')).toHaveCount(1);
  await page.getByRole('tab', {name: 'Profile'}).click();
  // The selected tab controls the visible panel, and the panel is named by that tab.
  const panelId = await selected.getAttribute('aria-controls');
  const panel = page.locator('[id="' + panelId + '"]');
  await expect(panel).toHaveAttribute('role', 'tabpanel');
  await expect(panel).toHaveAttribute('aria-labelledby', await selected.getAttribute('id'));
  await expect(page.getByRole('tabpanel', {name: 'Profile'})).toHaveText('profile panel');
  await expect(page.getByRole('tablist', {name: 'Account'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Tabs');
});
