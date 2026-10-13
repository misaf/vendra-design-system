import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('an ordered list: done steps say so, the current step is marked', async ({page}) => {
  await openComponent(page, 'OrderTimeline');
  const progress = page.getByRole('list', {name: 'Order progress'});
  await expect(progress.getByRole('listitem')).toHaveCount(4);
  await expect(progress.getByRole('listitem').first()).toContainText('Placed — done');
  await expect(progress.locator('[aria-current=step]')).toContainText('On the way');
  await expect(
    page.getByRole('list', {name: 'Finished order'}).locator('[aria-current]')
  ).toHaveCount(0);
});

test('a cancelled order shows no timeline', async ({page}) => {
  await openComponent(page, 'OrderTimeline');
  await expect(page.getByRole('list', {name: 'Cancelled order'})).toHaveCount(0);
});

test('"done" follows the page language', async ({page}) => {
  await openComponent(page, 'OrderTimeline', 'fa');
  await expect(
    page.getByRole('list', {name: 'Order progress'}).getByRole('listitem').first()
  ).toContainText('انجام شد');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'OrderTimeline');
});
