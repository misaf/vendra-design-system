import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('an article whose heading holds the one link; the photo and arrow are decorative', async ({
  page
}) => {
  await openComponent(page, 'BlogCard');
  const article = page.getByRole('article').first();
  await expect(article.getByRole('heading', {level: 3})).toHaveText(
    'A morning at the Vendra workbench'
  );
  await expect(article.getByRole('link')).toHaveCount(1);
  await expect(article.getByRole('link')).toHaveAttribute('href', '#morning');
  await expect(article.locator('img')).toHaveAttribute('alt', '');
  await expect(article.locator('.ag-blog__cta')).toHaveAttribute('aria-hidden', 'true');
});

test('without href the title is a button; headingLevel sets the heading', async ({page}) => {
  await openComponent(page, 'BlogCard');
  await expect(page.getByRole('heading', {level: 2})).toHaveText('Five small habits');
  await page.getByRole('button', {name: 'Five small habits'}).click();
  await expect(page.locator('output[data-test=opened]')).toHaveText('habits');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'BlogCard');
});
