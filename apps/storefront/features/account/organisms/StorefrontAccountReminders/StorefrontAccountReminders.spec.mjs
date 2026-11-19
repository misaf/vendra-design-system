import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          add: 'افزودن مناسبت',
          empty: 'یادآوری ذخیره نشده است.',
          coming: 'مناسبت بعدی',
          intro: 'زمان یادآوری را انتخاب کنید.',
          first: 'تولد مینا',
          second: 'سالگرد استودیو',
          when: 'فردا',
          occasion: 'تولد',
          before: 'یک روز قبل با پیامک',
          month: 'آبان',
          altDate: '17 November',
          paused: 'یادآور متوقف',
          send: 'انتخاب گل',
          toggle: 'اطلاع برای ',
          edit: 'ویرایش ',
          remove: 'حذف '
        }
      : {
          add: 'Add an occasion',
          empty: 'No reminders saved.',
          coming: 'Coming up next',
          intro: 'Choose when we remind you.',
          first: 'Mina birthday',
          second: 'Studio anniversary',
          when: 'Tomorrow',
          occasion: 'Birthday',
          before: 'One day before by SMS',
          month: 'November',
          altDate: '26 Aban',
          paused: 'Reminder paused',
          send: 'Choose flowers',
          toggle: 'Notify for ',
          edit: 'Edit ',
          remove: 'Remove '
        };
  test(
    'reminders forward content, row-specific edits and toggles (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountReminders', lang);
      const rows = page.locator('.ag-remwrap');
      await expect(rows).toHaveCount(2);
      for (const [index, id, name] of [
        [0, 'first', t.first],
        [1, 'second', t.second]
      ]) {
        const row = rows.nth(index);
        for (const text of [
          name,
          t.occasion,
          t.before,
          t.altDate,
          String(17 + index) + ' ' + t.month
        ])
          await expect(row).toContainText(text);
        await row.getByRole('button', {name: t.edit + name, exact: true}).click();
        await expect(page.locator('[data-test=action]')).toHaveText('edit:' + id);
        const remove = row.getByRole('button', {name: t.remove + name, exact: true});
        await remove.focus();
        await page.keyboard.press('Enter');
        await expect(page.locator('[data-test=action]')).toHaveText('delete:' + id);
      }
      const first = rows.nth(0).getByRole('switch', {name: t.toggle + t.first});
      const second = rows.nth(1).getByRole('switch', {name: t.toggle + t.second});
      await expect(first).toBeChecked();
      await expect(second).not.toBeChecked();
      await expect(rows.nth(0).getByRole('link', {name: t.send})).toBeVisible();
      await expect(rows.nth(1).getByText(t.paused, {exact: true})).toBeVisible();
      await first.focus();
      await page.keyboard.press('Space');
      await expect(first).not.toBeChecked();
      await expect(page.locator('[data-test=action]')).toHaveText('toggle:first:false');
      await expect(rows.nth(0).getByRole('link', {name: t.send})).toHaveCount(0);
      await expect(rows.nth(0).getByText(t.paused, {exact: true})).toBeVisible();
      await second.focus();
      await page.keyboard.press('Space');
      await expect(second).toBeChecked();
      await expect(page.locator('[data-test=action]')).toHaveText('toggle:second:true');
      await expect(first).not.toBeChecked();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('reminder upcoming notice and soon-row shop destination (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountReminders', lang);
    await expect(page.getByText(t.coming, {exact: true})).toBeVisible();
    await expect(page.getByText(t.first + ' · ' + t.when, {exact: true})).toBeVisible();
    await expect(page.getByText(t.intro, {exact: true})).toBeVisible();
    const send = page.getByRole('link', {name: t.send});
    await expect(send).toHaveCount(1);
    await expect(send).toHaveAttribute('href', '#shop');
    await send.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#shop$/);
    await page.getByRole('checkbox', {name: 'Upcoming notice'}).uncheck();
    await expect(page.getByText(t.coming, {exact: true})).toHaveCount(0);
    await expect(page.locator('.ag-remwrap')).toHaveCount(2);
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'reminders empty and independent notice retain add target at compact width (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontAccountReminders', lang);
      await page.getByRole('checkbox', {name: 'Empty collection'}).check();
      await expect(page.locator('.ag-remwrap')).toHaveCount(0);
      await expect(page.getByText(t.empty, {exact: true})).toBeVisible();
      await expect(page.getByText(t.coming, {exact: true})).toBeVisible();
      await page.getByRole('checkbox', {name: 'Upcoming notice'}).uncheck();
      const add = page.getByRole('button', {name: t.add});
      await expect(add).toHaveAttribute('id', 'vf-add-reminder');
      await add.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('add');
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty collection'}).uncheck();
      await expect(page.locator('.ag-remwrap')).toHaveCount(2);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
