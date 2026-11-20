import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent, scanAxe} from '../../../../../e2e/component-test.mjs';

test.beforeEach(({page}) => openComponent(page, 'Button'));

test('a button presses with click, Enter and Space', async ({page}) => {
  const add = page.getByRole('button', {name: 'Add to bag'});
  await expect(add).toHaveAttribute('type', 'button');
  await add.click();
  await add.press('Enter');
  await add.press('Space');
  await expect(page.locator('output[data-test=presses]')).toHaveText('3');
});

test('href makes it a link; a new tab gets noopener', async ({page}) => {
  await expect(page.getByRole('link', {name: 'Shop'})).toHaveAttribute('href', '#shop');
  const whatsapp = page.getByRole('link', {name: 'WhatsApp'});
  await expect(whatsapp).toHaveAttribute('target', '_blank');
  await expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
});

test('loading keeps the label, announces loadingLabel and cannot be pressed', async ({page}) => {
  const pay = page.getByRole('button', {name: /Pay/});
  await expect(pay).toContainText('Pay');
  await expect(page.getByRole('status').filter({hasText: 'Paying…'})).toHaveCount(1);
  await expect(pay).toHaveAttribute('aria-disabled', 'true');
});

test('disabled: a button is disabled; a link loses its href', async ({page}) => {
  await expect(page.getByRole('button', {name: 'Sold out'})).toBeDisabled();
  const unavailable = page.getByText('Unavailable');
  await expect(unavailable).not.toHaveAttribute('href');
  await expect(unavailable).toHaveAttribute('aria-disabled', 'true');
});

for (const lang of ['en', 'fa']) {
  test(`link callbacks cancel pointer and keyboard navigation exactly once (${lang})`, async ({
    page
  }) => {
    await openComponent(page, 'Button', lang);
    const before = page.url();
    const link = page.getByRole('link', {name: 'Handled link', exact: true});
    await link.click();
    await expect(page.locator('[data-test="link-clicks"]')).toHaveText('1');
    expect(page.url()).toBe(before);
    await link.focus();
    await link.press('Enter');
    await expect(page.locator('[data-test="link-clicks"]')).toHaveText('2');
    expect(page.url()).toBe(before);
  });

  test(`link callbacks can allow native navigation and plain links still navigate (${lang})`, async ({
    page
  }) => {
    await openComponent(page, 'Button', lang);
    await page.getByRole('checkbox', {name: 'Allow link navigation', exact: true}).check();
    await page.getByRole('link', {name: 'Handled link', exact: true}).press('Enter');
    await expect(page).toHaveURL(/#handled$/);
    await expect(page.locator('[data-test="link-clicks"]')).toHaveText('1');
    await page.getByRole('link', {name: 'Shop', exact: true}).press('Enter');
    await expect(page).toHaveURL(/#shop$/);
    await expect(page.locator('[data-test="link-clicks"]')).toHaveText('1');
  });
}

test('disabled and pending link callbacks stay suppressed', async ({page}) => {
  for (const name of ['Unavailable', 'Pending link']) {
    const link = page.getByRole('link', {name, exact: true});
    await expect(link).not.toHaveAttribute('href');
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await link.evaluate(element => element.click());
  }
  await expect(page.locator('[data-test="blocked-clicks"]')).toHaveText('0');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Button');
});

for (const lang of ['en', 'fa']) {
  test(`pending announcements stay accessible after completion (${lang})`, async ({page}) => {
    await openComponent(page, 'Button', lang);
    const send = page.getByRole('button', {name: /^Send request/});
    await send.press('Enter');
    await expect(send).toHaveAttribute('aria-disabled', 'true');
    await expect(send).toBeFocused();
    await expect(page.getByRole('status').filter({hasText: 'Sending request…'})).toHaveCount(1);
    await page.getByRole('button', {name: 'Complete request', exact: true}).click();
    await expect(send).toHaveCount(0);
    await expect(page.locator('output[data-test=requests]')).toHaveText('1');
    expect(await scanAxe(page)).toEqual([]);
    await expect(page.locator('[data-live-announcer] [aria-labelledby]')).toHaveCount(0);
  });
}

test('pending blocks pointer, keyboard and implicit submission, then recovers', async ({page}) => {
  const send = page.getByRole('button', {name: /^Send request/});
  await send.press('Enter');
  await expect(send).toBeFocused();
  await expect(send).toHaveAttribute('type', 'button');
  const submitted = await page.locator('output[data-test=submissions]').textContent();
  await send.press('Enter');
  await send.press('Space');
  await send.evaluate(button => button.click());
  await page.getByRole('textbox', {name: 'Request note'}).press('Enter');
  await expect(page.locator('output[data-test=requests]')).toHaveText('1');
  await expect(page.locator('output[data-test=submissions]')).toHaveText(submitted);
  await page.locator('form').evaluate(form => {
    const other = document.createElement('button');
    other.type = 'submit';
    other.textContent = 'Other submit';
    form.append(other);
  });
  const other = page.getByRole('button', {name: 'Other submit', exact: true});
  await other.click();
  await expect(page.locator('output[data-test=submissions]')).toHaveText(
    String(Number(submitted) + 1)
  );
  await other.evaluate(button => button.remove());
  await page.getByRole('button', {name: 'Fail request', exact: true}).click();
  await expect(send).not.toHaveAttribute('aria-disabled', 'true');
  await expect(send).toHaveAttribute('type', 'submit');
  await send.click();
  await expect(page.locator('output[data-test=requests]')).toHaveText('2');
});
