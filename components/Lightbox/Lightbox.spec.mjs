import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent, scanAxe} from '../../templates/_e2e/component-test.mjs';

const open = async (page, lang = 'en') => {
  await openComponent(page, 'Lightbox', lang);
  await page.getByRole('button', {name: 'Show designs'}).click();
  const viewer = page.getByRole('dialog');
  await expect(viewer).toBeVisible();
  return viewer;
};

test('a named modal; the buttons and arrow keys move through the items, Esc closes and focus returns', async ({
  page
}) => {
  const viewer = await open(page);
  await expect(viewer).toHaveAccessibleName('Photo viewer');
  await expect(viewer.getByText('1 of 3')).toBeVisible();
  await expect(viewer.getByRole('button', {name: 'Previous'})).toBeDisabled();
  await viewer.getByRole('button', {name: 'Next'}).click();
  await expect(viewer.getByText('2 of 3')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(viewer.getByText('3 of 3')).toBeVisible();
  await expect(viewer.getByRole('button', {name: 'Next'})).toBeDisabled();
  await page.keyboard.press('ArrowLeft');
  await expect(viewer.getByText('VF-2', {exact: true})).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByRole('button', {name: 'Show designs'})).toBeFocused();
});

test('dots move through an item’s photos; actions get the item on screen', async ({page}) => {
  const viewer = await open(page);
  await viewer.getByRole('button', {name: 'Photo 2 of 2'}).click();
  await expect(viewer.getByRole('img')).toHaveAttribute('alt', 'VF-1 photo 2');
  await expect(viewer.getByRole('button', {name: 'Photo 2 of 2'})).toHaveAttribute(
    'aria-current',
    'true'
  );
  await viewer.getByRole('button', {name: 'Next'}).click();
  await expect(viewer.getByRole('img')).toHaveAttribute('alt', 'VF-2 photo 1');
  await viewer.getByRole('button', {name: 'Send'}).click();
  await expect(page.locator('[data-test=sent]')).toHaveText('VF-2');
});

test('in Persian: its own wording, Persian digits and mirrored arrow keys', async ({page}) => {
  const viewer = await open(page, 'fa');
  await expect(viewer).toHaveAccessibleName('نمایشگر عکس');
  await expect(viewer.getByText('۱ از ۳')).toBeVisible();
  // In RTL the next item is to the left.
  await page.keyboard.press('ArrowLeft');
  await expect(viewer.getByText('۲ از ۳')).toBeVisible();
  await viewer.getByRole('button', {name: 'بستن'}).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('a sideways swipe moves to the next item', async ({page}) => {
  const viewer = await open(page);
  const stage = viewer.locator('.ag-lightbox__stage');
  const box = await stage.boundingBox();
  const y = box.y + box.height / 2;
  await stage.dispatchEvent('pointerdown', {clientX: box.x + box.width * 0.7, clientY: y});
  await stage.dispatchEvent('pointerup', {clientX: box.x + box.width * 0.2, clientY: y});
  await expect(viewer.getByText('2 of 3')).toBeVisible();
});

test('passes axe closed and open, in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Lightbox');
  for (const lang of ['en', 'fa']) {
    await open(page, lang);
    expect(await scanAxe(page), lang).toEqual([]);
  }
});
