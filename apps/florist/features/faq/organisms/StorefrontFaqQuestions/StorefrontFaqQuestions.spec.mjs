import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../e2e/component-test.mjs';
for (const lang of ['en', 'fa']) {
  const titles = lang === 'en' ? ['Delivery', 'Orders'] : ['ارسال', 'سفارش‌ها'];
  const questions =
    lang === 'en'
      ? ['When will it arrive?', 'Where do you deliver?', 'Can I change my order?', 'Can I cancel?']
      : [
          'چه زمانی می‌رسد؟',
          'به کجا ارسال می‌کنید؟',
          'می‌توانم سفارش را تغییر دهم؟',
          'می‌توانم لغو کنم؟'
        ];
  const open = async page => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openStorefrontComponent(page, 'StorefrontFaqQuestions', lang);
    return page.locator('main');
  };
  test(
    lang + ': ordered named sections, heading levels and supplied default disclosure',
    async ({page}) => {
      const main = await open(page);
      await expect(main.getByRole('heading', {level: 2})).toHaveText(titles);
      await expect(main.getByRole('heading', {level: 3})).toHaveText(questions);
      for (let i = 0; i < 2; i++) {
        const section = main.getByRole('region', {name: titles[i], exact: true});
        await expect(section).toHaveAttribute(
          'aria-labelledby',
          i === 0 ? 'delivery-heading' : 'orders-heading'
        );
        await expect(section.getByRole('button')).toHaveCount(2);
      }
      const buttons = main.getByRole('button');
      for (let i = 0; i < 4; i++)
        await expect(buttons.nth(i)).toHaveAttribute('aria-expanded', String(i === 0));
      const arrival = main.getByRole('region', {name: questions[0], exact: true});
      await expect(arrival).toContainText(
        lang === 'en'
          ? 'Choose a delivery window in your bag.'
          : 'بازه ارسال را در سبد انتخاب کنید.'
      );
      const controlled = await buttons.first().getAttribute('aria-controls');
      await expect(arrival).toHaveAttribute('id', controlled);
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    lang +
      ': each group expands independently while keyboard activation keeps one answer per group',
    async ({page}) => {
      const main = await open(page);
      const buttons = main.getByRole('button');
      await buttons.nth(2).focus();
      await page.keyboard.press('Enter');
      await expect(buttons.nth(2)).toHaveAttribute('aria-expanded', 'true');
      await expect(buttons.first()).toHaveAttribute('aria-expanded', 'true');
      await buttons.nth(1).click();
      await expect(buttons.first()).toHaveAttribute('aria-expanded', 'false');
      await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
      await expect(buttons.nth(2)).toHaveAttribute('aria-expanded', 'true');
      await expect(main.getByRole('region', {name: questions[1], exact: true})).toContainText(
        lang === 'en'
          ? 'We deliver within the supplied studio area.'
          : 'در محدوده تعیین‌شده استودیو ارسال می‌کنیم.'
      );
      await buttons.nth(3).focus();
      await page.keyboard.press('Space');
      await expect(buttons.nth(2)).toHaveAttribute('aria-expanded', 'false');
      await expect(buttons.nth(3)).toHaveAttribute('aria-expanded', 'true');
      await page.keyboard.press('Space');
      await expect(buttons.nth(3)).toHaveAttribute('aria-expanded', 'false');
      await expect(buttons.nth(1)).toHaveAttribute('aria-expanded', 'true');
      expect(await scanAxe(page)).toEqual([]);
    }
  );
  test(
    lang +
      ': supplied answer updates retain disclosure and answer links use native keyboard navigation',
    async ({page}) => {
      const main = await open(page);
      await page.getByRole('checkbox', {name: 'Replacement answer', exact: true}).check();
      await expect(main.getByRole('region', {name: questions[0], exact: true})).toContainText(
        lang === 'en'
          ? 'Your selected delivery window is confirmed.'
          : 'بازه ارسال انتخابی شما تایید شده است.'
      );
      await expect(main.getByRole('button').first()).toHaveAttribute('aria-expanded', 'true');
      await main.getByRole('button').nth(2).click();
      const contact = main.getByRole('link', {
        name: lang === 'en' ? 'Contact the studio' : 'تماس با استودیو',
        exact: true
      });
      await expect(contact).toHaveAttribute('href', '#contact');
      await contact.focus();
      await page.keyboard.press('Enter');
      await expect.poll(() => page.evaluate(() => location.hash)).toBe('#contact');
    }
  );
  test(
    lang + ': compact single, empty-items and empty-group inputs preserve supplied structure',
    async ({page}) => {
      await page.setViewportSize({width: 390, height: 844});
      const main = await open(page);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('combobox', {name: 'Groups', exact: true}).selectOption('one');
      await expect(main.locator('section')).toHaveCount(1);
      await expect(main.getByRole('heading', {level: 2})).toHaveText([titles[0]]);
      await expect(main.getByRole('button')).toHaveCount(2);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('combobox', {name: 'Groups', exact: true}).selectOption('no-items');
      await expect(main.locator('section')).toHaveCount(1);
      await expect(main.getByRole('heading', {level: 2})).toHaveText([titles[0]]);
      await expect(main.getByRole('button')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
      await page.getByRole('combobox', {name: 'Groups', exact: true}).selectOption('empty');
      await expect(main.locator('section')).toHaveCount(0);
      expect(await scanAxe(page)).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true
      );
    }
  );
}
