import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe, stubMapTiles} from '../../../../e2e/component-test.mjs';

test.beforeEach(({page}) => stubMapTiles(page));
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          title: 'نشانی‌های ذخیره‌شده',
          home: 'خانه',
          office: 'دفتر',
          homeLine: 'خیابان باغ ۱۰',
          officeLine: 'خیابان رز ۲۰',
          recipient: 'مینا',
          zone: 'منطقه مرکزی',
          add: 'افزودن نشانی',
          failed: 'نقشه در دسترس نیست؛ از کارت نشانی استفاده کنید.',
          edit: 'ویرایش ',
          remove: 'حذف ',
          primary: 'نشانی اصلی',
          makeDefault: 'انتخاب به‌عنوان اصلی'
        }
      : {
          title: 'Saved addresses',
          home: 'Home',
          office: 'Office',
          homeLine: '10 Garden Street',
          officeLine: '20 Rose Avenue',
          recipient: 'Mina',
          zone: 'Central zone',
          add: 'Add an address',
          failed: 'Map unavailable; use the address cards.',
          edit: 'Edit ',
          remove: 'Delete ',
          primary: 'Primary address',
          makeDefault: 'Use as primary'
        };
  test(
    'addresses forward row content and isolated edit/delete/default actions (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontAccountAddresses', lang);
      const cards = page.locator('.ag-addr');
      await expect(cards).toHaveCount(2);
      for (const [index, id, label, line] of [
        [0, 'home', t.home, t.homeLine],
        [1, 'office', t.office, t.officeLine]
      ]) {
        const card = cards.nth(index);
        await expect(card).toContainText(label);
        await expect(card).toContainText(line);
        await expect(card).toContainText(t.recipient);
        await expect(card).toContainText(t.zone);
        await expect(card.getByText('09123456789', {exact: true})).toHaveAttribute('dir', 'ltr');
        await card.getByRole('button', {name: t.edit + label, exact: true}).click();
        await expect(page.locator('[data-test=action]')).toHaveText('edit:' + id);
        const remove = card.getByRole('button', {name: t.remove + label, exact: true});
        await remove.focus();
        await page.keyboard.press('Enter');
        await expect(page.locator('[data-test=action]')).toHaveText('delete:' + id);
      }
      await expect(cards.nth(0).getByText(t.primary, {exact: true})).toBeVisible();
      await expect(cards.nth(0).getByRole('button', {name: t.makeDefault})).toHaveCount(0);
      await cards.nth(1).getByRole('button', {name: t.makeDefault}).click();
      await expect(page.locator('[data-test=action]')).toHaveText('default:office');
      await expect(cards.nth(1).getByText(t.primary, {exact: true})).toBeVisible();
      await expect(cards.nth(0).getByRole('button', {name: t.makeDefault})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test('addresses map markers forward selection (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountAddresses', lang);
    const map = page.getByRole('region', {name: t.title});
    await expect(map).toHaveAttribute('id', 'vf-account-map');
    await expect(map).toHaveAttribute('dir', 'ltr');
    await expect(map.locator('.ag-place-label')).toHaveText([t.home, t.office]);
    await map.getByRole('button', {name: t.office, exact: true}).click();
    await expect(page.locator('[data-test=action]')).toHaveText('map:office');
    await map.getByRole('button', {name: t.home, exact: true}).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-test=action]')).toHaveText('map:home');
    expect(await scanAxe(page)).toEqual([]);
  });
  test(
    'addresses loader failure reaches owner and leaves card actions usable (' + lang + ')',
    async ({page}) => {
      await page.route('**/_vendor/leaflet/leaflet.js', route => route.abort());
      await openStorefrontComponent(page, 'StorefrontAccountAddresses', lang);
      await expect(page.locator('[data-test=action]')).toHaveText('map:failed');
      await expect(page.getByText(t.failed, {exact: true})).toBeVisible();
      await expect(page.locator('#vf-account-map')).toHaveCount(0);
      await page.getByRole('button', {name: t.edit + t.office, exact: true}).click();
      await expect(page.locator('[data-test=action]')).toHaveText('edit:office');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'addresses empty collection keeps add target and compact containment (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontAccountAddresses', lang);
      await page.getByRole('checkbox', {name: 'Show map'}).uncheck();
      await page.getByRole('checkbox', {name: 'Empty collection'}).check();
      await expect(page.locator('.ag-addr')).toHaveCount(0);
      await expect(page.locator('#vf-account-map')).toHaveCount(0);
      const add = page.getByRole('button', {name: '+ ' + t.add, exact: true});
      await expect(add).toHaveAttribute('id', 'vf-add-address');
      await expect(add).toHaveAttribute('type', 'button');
      await add.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=action]')).toHaveText('add');
      await page.getByRole('checkbox', {name: 'Empty collection'}).uncheck();
      await expect(page.locator('.ag-addr')).toHaveCount(2);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      expect(await scanAxe(page)).toEqual([]);
    }
  );
}
