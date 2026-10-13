import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

for (const lang of ['en', 'fa'])
  test(`a named carousel of slides; dots go to a slide and mark the current one (${lang})`, async ({
    page
  }) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openComponent(page, 'Gallery', lang);
    const gallery = page.getByRole('region', {name: 'Product photos'});
    await expect(gallery).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(gallery.getByRole('group')).toHaveCount(3);
    const dots = gallery.getByRole('button');
    await expect(dots.first()).toHaveAttribute('aria-current', 'true');
    await gallery.getByRole('button', {name: '3 of 3'}).click();
    await expect(gallery.getByRole('button', {name: '3 of 3'})).toHaveAttribute(
      'aria-current',
      'true'
    );
    const track = gallery.locator('.ag-gallery__track');
    expect(await track.evaluate(el => Math.abs(el.scrollLeft))).toBeGreaterThan(400);
  });

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Gallery');
});
