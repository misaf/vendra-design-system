import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent, scanAxe} from '../../../templates/_e2e/component-test.mjs';

// React Aria's modal dialog.
test('focus moves in and stays, Esc closes, focus returns to the opener', async ({page}) => {
  await openComponent(page, 'Dialog');
  const opener = page.getByRole('button', {name: 'Delivery details'});
  await opener.click();
  const dialog = page.getByRole('dialog', {name: 'Delivery details'});
  await expect(dialog).toBeVisible();
  // Focus is on the dialog (React Aria focuses the dialog itself) or something in it.
  const focusInside = () => dialog.evaluate(el => el.contains(document.activeElement));
  await expect.poll(focusInside).toBe(true);
  // Tab cycles inside: the close button, the field and Save, never the page behind.
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    expect(await focusInside()).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('the close button closes it and is named in the page language', async ({page}) => {
  await openComponent(page, 'Dialog');
  await page.getByRole('button', {name: 'Delivery details'}).click();
  await page.getByRole('button', {name: 'Close', exact: true}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await openComponent(page, 'Dialog', 'fa');
  await page.getByRole('button', {name: 'Delivery details'}).click();
  // VendraProvider's language gives the built-in wording without a closeLabel prop.
  await expect(page.getByRole('dialog').getByRole('button', {name: 'بستن'})).toBeVisible();
});

test('passes axe open, in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Dialog');
  await page.getByRole('button', {name: 'Delivery details'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(await scanAxe(page)).toEqual([]);
});
