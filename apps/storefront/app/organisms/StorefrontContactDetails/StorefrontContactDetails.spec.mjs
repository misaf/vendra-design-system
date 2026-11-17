import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe, stubMapTiles} from '../../../e2e/component-test.mjs';
test.beforeEach(({page}) => stubMapTiles(page));
for (const lang of ['en', 'fa']) {
  const t =
    lang === 'fa'
      ? {
          address: 'نشانی',
          addressValue: 'کرج، خیابان باغ، پلاک ۱۲',
          hours: 'ساعت کار',
          hoursValue: 'هر روز، ۹ تا ۱۸',
          open: 'اکنون باز است',
          closed: 'اکنون بسته است',
          detail: 'بازدید با هماهنگی قبلی.',
          phone: 'تماس با استودیو',
          whatsapp: 'واتساپ',
          instagram: 'اینستاگرام',
          map: 'نقشه استودیو',
          marker: 'باز کردن نشان استودیو',
          studio: 'استودیو وندرا',
          directions: 'مسیریابی',
          failed: 'نقشه در دسترس نیست. از نشانی و مسیریابی استفاده کنید.'
        }
      : {
          address: 'Address',
          addressValue: '12 Garden Street, Karaj',
          hours: 'Hours',
          hoursValue: 'Daily, 9–18',
          open: 'Open now',
          closed: 'Closed now',
          detail: 'Visits by appointment.',
          phone: 'Call the studio',
          whatsapp: 'WhatsApp',
          instagram: 'Instagram',
          map: 'Studio map',
          marker: 'Open studio pin',
          studio: 'Vendra studio',
          directions: 'Get directions',
          failed: 'Map unavailable. Use the address and directions.'
        };
  test('contact detail rows, status and secondary lines update (' + lang + ')', async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontContactDetails', lang);
    await expect(page.getByRole('term')).toHaveText([t.address, t.hours]);
    await expect(page.getByText(t.addressValue, {exact: true})).toBeVisible();
    await expect(page.getByText(t.hoursValue, {exact: true})).toBeVisible();
    await expect(page.getByText(t.detail, {exact: true})).toBeVisible();
    const status = page.locator('.vf-contact-status');
    await expect(status).toHaveText(t.open);
    await expect(status).toHaveAttribute('data-open', 'true');
    await page.getByRole('checkbox', {name: 'Studio closed'}).check();
    await expect(status).toHaveText(t.closed);
    await expect(status).toHaveAttribute('data-open', 'false');
    await page.getByRole('checkbox', {name: 'Show status and details'}).uncheck();
    await expect(status).toHaveCount(0);
    await expect(page.getByText(t.detail, {exact: true})).toHaveCount(0);
    await expect(page.getByText(t.hoursValue, {exact: true})).toBeVisible();
  });
  test(
    'contact channel destinations and independently optional actions (' + lang + ')',
    async ({page}) => {
      await openStorefrontComponent(page, 'StorefrontContactDetails', lang);
      for (const [name, href] of [
        [t.whatsapp, 'https://wa.me/989120000000'],
        [t.instagram, 'https://instagram.com/']
      ]) {
        const link = page.getByRole('link', {name, exact: true});
        await expect(link).toHaveAttribute('href', href);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
      await expect(page.getByRole('link', {name: t.phone, exact: true})).toHaveAttribute(
        'href',
        'tel:+989120000000'
      );
      const directions = page.getByRole('list', {name: t.directions, exact: true});
      await expect(directions.getByRole('link')).toHaveText(['Neshan', 'Balad']);
      for (const [name, href] of [
        ['Neshan', 'https://neshan.org/'],
        ['Balad', 'https://balad.ir/']
      ]) {
        const link = directions.getByRole('link', {name, exact: true});
        await expect(link).toHaveAttribute('href', href);
        await expect(link).toHaveAttribute('target', '_blank');
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      }
      await page.getByRole('checkbox', {name: 'Show WhatsApp'}).uncheck();
      await expect(page.getByRole('link', {name: t.whatsapp, exact: true})).toHaveCount(0);
      await expect(page.getByRole('link', {name: t.instagram, exact: true})).toBeVisible();
      await page.getByRole('checkbox', {name: 'Show Instagram'}).uncheck();
      await expect(page.getByRole('link', {name: t.instagram, exact: true})).toHaveCount(0);
      await expect(directions).toBeVisible();
      await page.getByRole('checkbox', {name: 'Show directions'}).uncheck();
      await expect(directions).toHaveCount(0);
      await expect(page.getByRole('link', {name: t.phone, exact: true})).toBeVisible();
      await expect(page.getByRole('region', {name: t.map, exact: true})).toBeVisible();
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    'contact local map marker callbacks, empty places and visibility (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontContactDetails', lang);
      const map = page.getByRole('region', {name: t.map, exact: true});
      await expect(map).toHaveAttribute('id', 'vf-contact-map');
      await expect(map).toHaveAttribute('dir', 'ltr');
      await expect(map.locator('.ag-place-label')).toHaveText([t.studio]);
      const marker = map.getByRole('button', {name: t.marker, exact: true});
      await marker.click();
      await expect(page.locator('[data-test=selected]')).toHaveText('1');
      await marker.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-test=selected]')).toHaveText('2');
      await page.keyboard.press('Space');
      await expect(page.locator('[data-test=selected]')).toHaveText('3');
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty places'}).check();
      await expect(map.locator('.ag-place-marker')).toHaveCount(0);
      await expect(map).toBeVisible();
      await page.getByRole('checkbox', {name: 'Show map'}).uncheck();
      await expect(map).toHaveCount(0);
      await expect(page.getByRole('list', {name: t.directions, exact: true})).toBeVisible();
      await expect(page.locator('[data-test=failed]')).toHaveText('0');
    }
  );
  test(
    'contact map load failure preserves usable details and directions (' + lang + ')',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      await openStorefrontComponent(page, 'StorefrontContactDetails', lang);
      await expect(page.locator('.ag-place-label')).toHaveText([t.studio]);
      await expect(page.locator('.leaflet-zoom-anim')).toHaveCount(0);
      await page.getByRole('button', {name: 'Fail map loader'}).click();
      await expect(page.locator('[data-test=failed]')).toHaveText('1');
      await expect(page.getByText(t.failed, {exact: true})).toBeVisible();
      await expect(page.getByRole('region', {name: t.map, exact: true})).toHaveCount(0);
      await expect(page.getByText(t.addressValue, {exact: true})).toBeVisible();
      await expect(page.getByRole('link', {name: t.phone, exact: true})).toBeVisible();
      await expect(
        page.getByRole('list', {name: t.directions, exact: true}).getByRole('link')
      ).toHaveCount(2);
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
      await expect(page.locator('[data-test=selected]')).toHaveText('0');
    }
  );
}
