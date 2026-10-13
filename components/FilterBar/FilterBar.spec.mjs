import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

for (const [lang, group, remove, clear] of [
  ['en', 'Active filters', 'Remove {label}', 'Clear all'],
  ['fa', 'فیلترهای فعال', 'حذف {label}', 'پاک کردن همه']
])
  test(`each filter is a named remove button; focus stays in the row (${lang})`, async ({page}) => {
    await openComponent(page, 'FilterBar', lang);
    const bar = page.getByRole('group', {name: group});
    const removeButton = label => bar.getByRole('button', {name: remove.replace('{label}', label)});
    await expect(bar.getByRole('button')).toHaveCount(4);
    await expect(removeButton('Anniversary')).not.toHaveAttribute('aria-pressed');
    // The filter now in the removed one's place takes focus.
    await removeButton('Under 3M').click();
    await expect(removeButton('In stock only')).toBeFocused();
    // After the last filter, "Clear all" is in its place.
    await page.keyboard.press('Enter');
    await expect(bar.getByRole('button', {name: clear})).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(bar).toHaveCount(0);
  });

test('a label prop names the group; without onClearAll there is no "Clear all"', async ({page}) => {
  await openComponent(page, 'FilterBar');
  const flowers = page.getByRole('group', {name: 'Flowers'});
  await expect(flowers.getByRole('button')).toHaveText(['Roses']);
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'FilterBar');
});
