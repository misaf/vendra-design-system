import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const labels =
    lang === 'en'
      ? ['All stories', 'Flower care', 'Studio life']
      : ['همه داستان‌ها', 'نگهداری گل', 'زندگی استودیو'];
  const title = lang === 'en' ? 'Our journal' : 'مجله ما';
  const groupName = lang === 'en' ? 'Journal categories' : 'دسته‌های مجله';
  const open = async page => {
    await openStorefrontComponent(page, 'StorefrontJournalHeading', lang);
    return page.getByRole('group', {name: groupName, exact: true});
  };
  test(
    lang + ': heading, category order and externally supplied selection render without picking',
    async ({page}) => {
      const group = await open(page);
      await expect(page.locator('main').getByRole('heading', {level: 1})).toHaveText(title);
      await expect(
        page.getByText(lang === 'en' ? 'From the studio' : 'از استودیو', {exact: true})
      ).toBeVisible();
      await expect(group.getByRole('button')).toHaveText(labels);
      for (let i = 0; i < 3; i++)
        await expect(group.getByRole('button').nth(i)).toHaveAttribute(
          'aria-pressed',
          String(i === 0)
        );
      await page.getByRole('button', {name: 'Supply studio selection', exact: true}).click();
      for (let i = 0; i < 3; i++)
        await expect(group.getByRole('button').nth(i)).toHaveAttribute(
          'aria-pressed',
          String(i === 2)
        );
      await expect(page.locator('[data-test="events"]')).toHaveText('[]');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    lang + ': pointer and keyboard category picks remain controlled and isolated from focus',
    async ({page}) => {
      const group = await open(page);
      await group.getByRole('button').nth(1).click();
      await expect(group.getByRole('button').nth(1)).toHaveAttribute('aria-pressed', 'true');
      await group.getByRole('button').nth(2).focus();
      await page.keyboard.press('Enter');
      await expect(group.getByRole('button').nth(2)).toHaveAttribute('aria-pressed', 'true');
      await group.getByRole('button').first().focus();
      await page.keyboard.press('Space');
      await expect(group.getByRole('button').first()).toHaveAttribute('aria-pressed', 'true');
      const events = await page.locator('[data-test="events"]').textContent();
      expect(JSON.parse(events).filter(event => event.startsWith('pick:'))).toEqual([
        'pick:1',
        'pick:2',
        'pick:0'
      ]);
      expect(JSON.parse(events).filter(event => event.startsWith('focus:'))).toEqual([
        'focus:' + labels[1],
        'focus:' + labels[2],
        'focus:' + labels[0]
      ]);
    }
  );
  test(
    lang + ': compact keyboard traversal reports focused category without changing selection',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const group = await open(page);
      const buttons = group.getByRole('button');
      await buttons.first().focus();
      await page.keyboard.press('Tab');
      await expect(buttons.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(buttons.nth(2)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(buttons.nth(1)).toBeFocused();
      await expect(buttons.first()).toHaveAttribute('aria-pressed', 'true');
      await expect(buttons.nth(1)).toHaveAttribute('aria-pressed', 'false');
      await expect(page.locator('[data-test="events"]')).toHaveText(
        JSON.stringify([0, 1, 2, 1].map(i => 'focus:' + labels[i]))
      );
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
  );
  test(
    lang + ': minimal heading and empty supplied categories remain accessible',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const group = await open(page);
      await page.getByRole('checkbox', {name: 'Minimal heading', exact: true}).check();
      await expect(page.locator('main').getByRole('heading', {level: 1})).toHaveText(
        lang === 'en' ? 'Our' : 'مجله'
      );
      await expect(page.locator('main .ag-eyebrow')).toHaveCount(0);
      await expect(page.locator('main em')).toHaveCount(0);
      await page.getByRole('checkbox', {name: 'Empty categories', exact: true}).check();
      await expect(group).toHaveCount(1);
      await expect(group.getByRole('button')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('checkbox', {name: 'Empty categories', exact: true}).uncheck();
      await expect(group.getByRole('button')).toHaveText(labels);
      await expect(group.getByRole('button').first()).toHaveAttribute('aria-pressed', 'true');
    }
  );
}
