import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`reminder validation focuses the editor and a saved reminder survives reload (${lang})`, async ({
    page
  }) => {
    await openSite(page, 'account', lang, {tab: 'reminders'});
    const add = page.locator('#vf-add-reminder');
    await add.click();
    const dialog = page.getByRole('dialog');
    const save = dialog.getByRole('button', {name: fa ? 'ذخیره' : 'Save', exact: true});
    await save.click();
    const name = dialog.locator('#vf-reminder-name');
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(name).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await name.fill('Account editor reminder');
    await save.click();
    await expect(dialog).toHaveCount(0);
    await expect(add).toBeFocused();
    await page.reload();
    await expect(page.getByRole('tabpanel')).toContainText('Account editor reminder');
  });
}
