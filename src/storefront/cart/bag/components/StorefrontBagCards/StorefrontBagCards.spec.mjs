import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    title: 'Gift cards',
    first: 'Card message for VF-7K2M4Q',
    second: 'Card message for VF-3P8R1T',
    required: 'Enter a card message',
    add: 'Add card to VF-3P8R1T',
    added: 'A card was added to VF-3P8R1T',
    undo: 'Undo adding the card to VF-3P8R1T'
  },
  fa: {
    title: 'کارت‌های هدیه',
    first: 'پیام کارت VF-7K2M4Q',
    second: 'پیام کارت VF-3P8R1T',
    required: 'پیام کارت را وارد کنید',
    add: 'افزودن کارت به VF-3P8R1T',
    added: 'کارت به VF-3P8R1T اضافه شد',
    undo: 'واگرد افزودن کارت به VF-3P8R1T'
  }
};

for (const lang of ['en', 'fa']) {
  const t = copy[lang];

  test(`${lang}: named card section has a controlled required message with a limit`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontBagCards', lang);
    const section = page.getByRole('region', {name: t.title});
    const message = section.getByRole('textbox', {name: t.first});
    await expect(message).toHaveAttribute('required', '');
    await expect(message).toHaveAttribute('aria-invalid', 'true');
    await expect(message).toHaveAccessibleDescription(t.required);
    await expect(message).toHaveAttribute('maxlength', '200');
    await expect(message).toHaveAttribute('rows', '3');
    await message.fill('Happy birthday!');
    await expect(message).toHaveValue('Happy birthday!');
    await expect(page.locator('[data-test="first-message"]')).toHaveText('Happy birthday!');
    await expect(section.getByText(t.required, {exact: true})).toHaveCount(0);
  });

  test(`${lang}: add and undo callbacks switch only the matching card line`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontBagCards', lang);
    const first = page.getByRole('textbox', {name: t.first});
    const second = page.getByRole('textbox', {name: t.second});
    await first.fill('Keep this message');
    await expect(second).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.undo, exact: true})).toHaveCount(0);
    await page.getByRole('button', {name: t.add, exact: true}).click();
    await expect(page.getByRole('button', {name: t.add, exact: true})).toHaveCount(0);
    await expect(page.getByText(t.added, {exact: true})).toBeVisible();
    await second.fill('Thank you!');
    await expect(page.locator('[data-test="second-message"]')).toHaveText('Thank you!');
    await page.getByRole('button', {name: t.undo, exact: true}).click();
    await expect(second).toHaveCount(0);
    await expect(page.getByText(t.added, {exact: true})).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.add, exact: true})).toHaveAttribute(
      'id',
      'add-card-second'
    );
    await expect(first).toHaveValue('Keep this message');
  });

  test(`${lang}: initial and added-card states pass axe`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontBagCards', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('button', {name: t.add, exact: true}).click();
    await expect(page.getByRole('textbox', {name: t.second})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
  });
}
