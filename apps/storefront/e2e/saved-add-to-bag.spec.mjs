import {test, expect} from '@playwright/test';
import {openSite, scanAxe} from './helpers.mjs';

// Saved cards: a design without sizes adds straight to the bag (with the added panel and Undo),
// a design with sizes goes to its product page to choose one, and a sold-out design can't be added.
for (const lang of ['en', 'fa']) {
  test(`saved cards add to the bag, choose a size or show sold out (${lang})`, async ({page}) => {
    const fa = lang === 'fa';
    await openSite(page, 'saved', lang, {ids: 'VF-7K2M4Q,VF-3HX9TP,VF-6MT3VY'});
    const card = id => page.locator('main .vf-saved-card', {hasText: id});
    await expect(page.locator('main .vf-saved-card')).toHaveCount(3);

    // Sold out: a disabled button, no add.
    const soldOut = card('VF-6MT3VY').locator('.vf-saved-bag-action');
    await expect(soldOut).toHaveText(fa ? 'ناموجود' : 'Sold out');
    await expect(soldOut).toBeDisabled();

    // Sizes: a link to the product page.
    const choose = card('VF-7K2M4Q').getByRole('link', {
      // The code is bidi-isolated (U+2066…U+2069) so it reads correctly in Persian.
      name: `\u2066VF-7K2M4Q\u2069: ${fa ? 'انتخاب اندازه' : 'choose size'}`
    });
    await expect(choose).toHaveAttribute('href', /\/product\/VF-7K2M4Q\//);

    // No sizes: adds one, opens the added panel, tracked as the saved list.
    const bagLine = () =>
      page.evaluate(() => window.__vfSite.state.bag.find(line => line.id === 'VF-3HX9TP') ?? null);
    const before = await page.evaluate(
      () => window.VF_TRACK.log.filter(event => event.event === 'add_to_cart').length
    );
    const add = card('VF-3HX9TP').getByRole('button', {
      name: `\u2066VF-3HX9TP\u2069: ${fa ? 'افزودن به سبد' : 'add to bag'}`
    });
    await add.click();
    const dialog = page.getByRole('dialog', {
      name: fa ? 'به سبد شما اضافه شد' : 'Added to your bag'
    });
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('VF-3HX9TP');
    await expect
      .poll(() =>
        page.evaluate(() => window.VF_TRACK.log.filter(event => event.event === 'add_to_cart'))
      )
      .toHaveLength(before + 1);
    expect(
      await page.evaluate(
        () => window.VF_TRACK.log.filter(event => event.event === 'add_to_cart').at(-1).items[0]
      )
    ).toMatchObject({item_id: 'VF-3HX9TP', item_list_name: 'saved', quantity: 1});
    expect(await scanAxe(page)).toEqual([]);

    // Undo takes it back out of the bag and returns focus to the card's button.
    await dialog.getByRole('button', {name: fa ? 'بازگردانی' : 'Undo', exact: true}).click();
    await expect(dialog).toHaveCount(0);
    await expect(add).toBeFocused();
    await expect.poll(bagLine).toBeNull();

    // Keep shopping leaves the line in the bag.
    await add.click();
    await dialog.getByRole('button', {name: fa ? 'ادامه خرید' : 'Keep shopping'}).click();
    await expect(dialog).toHaveCount(0);
    await expect.poll(bagLine).toMatchObject({qty: 1});
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  });
}
