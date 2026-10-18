import {test, expect} from '@playwright/test';
import {openSite, choiceTile, scanAxe} from './helpers.mjs';

function amount(text) {
  return Number(text.replace(/[۰-۹]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)).replace(/\D/g, ''));
}

for (const lang of ['en', 'fa']) {
  test(`product price stays distinct from the configured total (${lang})`, async ({page}, info) => {
    const fa = lang === 'fa';
    await openSite(page, 'product', lang);
    const unit = page.locator('.vf-product-price .ag-price__now');
    const total = page.locator(
      info.project.name === 'mobile' ? '.vf-product-mobile-total' : '.vf-product-selection-total'
    );
    const expectAmounts = async (each, all) => {
      await expect.poll(async () => amount(await unit.textContent())).toBe(each);
      await expect
        .poll(async () => amount(await total.locator('.ag-price__now').textContent()))
        .toBe(all);
    };
    await expect(page.locator('.vf-product-unit-label')).toHaveText(
      fa ? 'هر عدد، بدون اقلام اضافه' : 'Per item, before extras'
    );
    await expectAmounts(4100000, 4100000);
    await choiceTile(page.locator('.vf-product-sizes'), fa ? /^کلاسیک/ : /^Classic/).click();
    await expectAmounts(4900000, 4900000);
    const card = page.getByRole('checkbox', {name: fa ? /کارت دست/ : /Handwritten card/});
    const vase = page.getByRole('checkbox', {name: fa ? /گلدان شیشه/ : /Glass vase/});
    await page.locator('label.ag-check').filter({has: card}).click();
    await expectAmounts(4900000, 5050000);
    await page.locator('label.ag-check').filter({has: vase}).click();
    await expectAmounts(4900000, 5700000);
    await page.getByRole('button', {name: fa ? 'بیشتر' : 'More', exact: true}).click();
    await expectAmounts(4900000, 11400000);
    await expect(total).toContainText(fa ? 'جمع · ۲ عدد' : 'Total · 2 items');
    await expect(page.locator('.vf-product-total-hint')).toHaveText(
      fa
        ? 'با اقلام اضافه انتخاب‌شده. هزینه ارسال هنگام ثبت سفارش محاسبه می‌شود.'
        : 'Selected extras included. Delivery calculated at checkout.'
    );
    await page.locator('label.ag-check').filter({has: card}).click();
    await page.locator('label.ag-check').filter({has: vase}).click();
    await expectAmounts(4900000, 9800000);
    await page.locator('label.ag-check').filter({has: card}).click();
    await expectAmounts(4900000, 10100000);
    const add = page.getByRole('button', {
      name: fa ? 'افزودن به سبد' : 'Add to bag',
      exact: true
    });
    await add.click();
    const confirmation = page.getByRole('dialog', {
      name: fa ? 'به سبد شما اضافه شد' : 'Added to your bag'
    });
    await expect(confirmation).toBeVisible();
    await expect(confirmation.locator('.ag-osum__name')).toHaveText('VF-7K2M4Q');
    expect(amount(await confirmation.locator('.ag-osum__total').textContent())).toBe(10100000);
    expect(await scanAxe(page)).toEqual([]);

    await openSite(page, 'product', lang, {id: 'VF-8RD5WN'});
    await expect(page.locator('.vf-product-unit-label')).toHaveText(
      fa ? 'هر عدد، بدون اقلام اضافه' : 'Per item, before extras'
    );
    await expect(vase).toHaveCount(0);
    await expectAmounts(3400000, 3400000);
    await expect(page.locator('.vf-product-total-hint')).toHaveText(
      fa ? 'هزینه ارسال هنگام ثبت سفارش محاسبه می‌شود.' : 'Delivery calculated at checkout.'
    );
  });
}
