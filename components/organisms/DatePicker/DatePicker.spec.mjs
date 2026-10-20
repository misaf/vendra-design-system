import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

// React Aria's DatePicker and calendar, in Shamsi and Gregorian.
for (const lang of ['en', 'fa'])
  test(`picks a day from the grid in the default calendar, before-min days are off (${lang})`, async ({
    page
  }) => {
    await openComponent(page, 'DatePicker', lang);
    const open = lang === 'fa' ? 'انتخاب از تقویم' : 'Choose a date';
    await page.getByRole('button', {name: open}).click();
    const grid = page.getByRole('grid');
    await expect(grid).toBeVisible();
    // 8 October 2026 is 16 Mehr 1405: the grid shows Mehr in Persian, October in English.
    await expect(page.locator('.ag-cal__title')).toHaveText(
      lang === 'fa' ? /۱۴۰۵ مهر/ : /October 2026/
    );
    await expect(grid.locator('[data-selected]')).toHaveText(lang === 'fa' ? '۱۶' : '8');
    // 4 October (12 Mehr) is before minDate.
    const beforeMin = new RegExp('^' + (lang === 'fa' ? '۱۲' : '4') + '$');
    await expect(
      grid.locator('.ag-cal__cell[data-disabled]').filter({hasText: beforeMin})
    ).toHaveCount(1);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(grid).toBeHidden();
    await expect(page.locator('output[data-test=date]')).toHaveText('2026-10-15');
  });

test('switches calendar and keeps the date', async ({page}) => {
  await openComponent(page, 'DatePicker', 'fa');
  const calendars = page.getByRole('radiogroup', {name: 'تقویم'});
  await expect(calendars.getByRole('radio', {name: 'شمسی'})).toBeChecked();
  await calendars.getByRole('radio', {name: 'میلادی'}).click();
  await expect(calendars.getByRole('radio', {name: 'میلادی'})).toBeChecked();
  await expect(page.locator('output[data-test=date]')).toHaveText('2026-10-08');
  await expect(page.getByRole('spinbutton', {name: /ماه/})).toHaveText('۱۰');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'DatePicker');
});
