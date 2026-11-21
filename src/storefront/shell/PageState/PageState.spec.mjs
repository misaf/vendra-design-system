import {expect, test} from '@playwright/test';
import {openStorefrontComponent} from '../../../../e2e/component-test.mjs';

test('page state updates immediately and completion callbacks see the committed DOM', async ({
  page
}) => {
  await openStorefrontComponent(page, 'PageState');
  await page.getByRole('button', {name: 'Update twice'}).click();
  await expect(page.getByRole('status')).toHaveText(
    [
      'Immediate state 1, DOM 0',
      'Immediate state 2, DOM 0',
      'First callback saw DOM 2',
      'Second callback saw DOM 2'
    ].join(' | ')
  );
});
