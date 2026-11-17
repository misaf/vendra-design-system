import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../e2e/component-test.mjs';

const copy = {
  en: {
    open: 'Open setup',
    edit: 'Open settings',
    limited: 'Open without optional capabilities',
    title: 'Set up display',
    settings: 'Display settings',
    intro: 'Choose the designs for your display.',
    leave: 'Leave presentation',
    done: 'Done',
    start: 'Start display',
    saved: 'Saved collections',
    savedName: 'Studio selection',
    delete: 'Delete collection',
    mode: 'Display mode',
    tv: 'TV',
    layout: 'Display layout',
    pair: 'Paired photos',
    captions: 'Captions',
    price: 'Photo and price',
    timing: 'Slide timing',
    fifteen: '15 seconds',
    switches: [
      'Show prices',
      'Ready designs only',
      'Hide sold-out designs',
      'Keep screen awake',
      'Slideshow'
    ],
    startFull: 'Start in fullscreen',
    full: 'Fullscreen now',
    collection: 'Display collection',
    categoryMode: 'By category',
    selected: 'Selected designs',
    category: 'Display category',
    boxes: 'Boxes',
    search: 'Search designs',
    empty: 'Choose at least one design',
    name: 'Collection name',
    save: 'Save collection',
    shortlist: 'Use shortlist',
    configuration: 'Configuration transfer',
    text: 'Configuration text',
    error: 'The configuration could not be imported',
    export: 'Export configuration',
    import: 'Import configuration',
    link: 'Setup link',
    pin: 'Display PIN',
    pinSet: 'A PIN is set',
    removePin: 'Remove PIN'
  },
  fa: {
    open: 'باز کردن راه‌اندازی',
    edit: 'باز کردن تنظیمات',
    limited: 'نمایش بدون قابلیت‌های اختیاری',
    title: 'راه‌اندازی نمایش',
    settings: 'تنظیمات نمایش',
    intro: 'طرح‌های نمایشگر را انتخاب کنید.',
    leave: 'خروج از نمایش',
    done: 'تمام',
    start: 'شروع نمایش',
    saved: 'مجموعه‌های ذخیره‌شده',
    savedName: 'انتخاب استودیو',
    delete: 'حذف مجموعه',
    mode: 'حالت نمایش',
    tv: 'تلویزیون',
    layout: 'چیدمان نمایش',
    pair: 'دو عکس',
    captions: 'زیرنویس‌ها',
    price: 'عکس و قیمت',
    timing: 'زمان اسلاید',
    fifteen: '۱۵ ثانیه',
    switches: [
      'نمایش قیمت‌ها',
      'فقط طرح‌های آماده',
      'پنهان کردن طرح‌های تمام‌شده',
      'روشن نگه داشتن صفحه',
      'نمایش اسلاید'
    ],
    startFull: 'شروع تمام‌صفحه',
    full: 'تمام‌صفحه اکنون',
    collection: 'مجموعه نمایش',
    categoryMode: 'بر اساس دسته',
    selected: 'طرح‌های منتخب',
    category: 'دسته نمایش',
    boxes: 'باکس‌ها',
    search: 'جستجوی طرح‌ها',
    empty: 'حداقل یک طرح انتخاب کنید',
    name: 'نام مجموعه',
    save: 'ذخیره مجموعه',
    shortlist: 'استفاده از انتخاب‌ها',
    configuration: 'انتقال تنظیمات',
    text: 'متن تنظیمات',
    error: 'تنظیمات وارد نشد',
    export: 'خروجی تنظیمات',
    import: 'ورود تنظیمات',
    link: 'پیوند راه‌اندازی',
    pin: 'رمز نمایش',
    pinSet: 'رمز تنظیم شده است',
    removePin: 'حذف رمز'
  }
};

async function choose(page, label, value) {
  const button = page.getByRole('button', {name: new RegExp(label)});
  await button.click();
  await page.getByRole('option', {name: value, exact: true}).click();
  await expect(button).toContainText(value);
}

for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const open = async (page, name = t.open) => {
    await openStorefrontComponent(page, 'StorefrontPresentationSettings', lang);
    await page.getByRole('button', {name, exact: true}).click();
    const dialog = page.getByRole('dialog', {name: name === t.open ? t.title : t.settings});
    await expect(dialog).toBeVisible();
    return dialog;
  };

  test(`${lang}: setup/start and settings/done use their titles and callbacks`, async ({page}) => {
    let dialog = await open(page);
    await expect(dialog.getByText(t.intro, {exact: true})).toBeVisible();
    await expect(dialog.getByRole('link', {name: t.leave, exact: true})).toHaveAttribute(
      'href',
      '#home'
    );
    expect(await scanAxe(page)).toEqual([]);
    await dialog.getByRole('button', {name: t.start, exact: true}).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('[data-test="action"]')).toHaveText('start');
    await page.getByRole('button', {name: t.edit, exact: true}).click();
    dialog = page.getByRole('dialog', {name: t.settings});
    await expect(dialog.getByText(t.intro, {exact: true})).toHaveCount(0);
    await dialog.getByRole('button', {name: t.done, exact: true}).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole('button', {name: t.edit, exact: true})).toBeFocused();
  });

  test(`${lang}: display selectors and preference/fullscreen switches are controlled`, async ({
    page
  }) => {
    const dialog = await open(page);
    for (const [label, value] of [
      [t.mode, t.tv],
      [t.layout, t.pair],
      [t.captions, t.price],
      [t.timing, t.fifteen]
    ])
      await choose(page, label, value);
    await expect(page.locator('[data-test="display"]')).toHaveText(
      JSON.stringify({mode: 'tv', layout: 'pair', captionMode: 'price', slideSeconds: '15'})
    );
    for (const name of [...t.switches, t.startFull, t.full]) {
      const toggle = dialog.getByRole('switch', {name, exact: true});
      await expect(toggle).not.toBeChecked();
      await dialog.getByText(name, {exact: true}).click();
      await expect(toggle).toBeChecked();
    }
    await expect(page.locator('[data-test="toggles"]')).toHaveText(
      JSON.stringify({
        showPrices: true,
        readyOnly: true,
        hideSoldOut: true,
        keepAwake: true,
        slideshow: true
      })
    );
    await expect(page.locator('[data-test="fullscreen"]')).toHaveText(
      JSON.stringify({startChecked: true, checked: true})
    );
  });

  test(`${lang}: saved collection load/delete callbacks and disabled delete state`, async ({
    page
  }) => {
    const dialog = await open(page);
    await expect(dialog.getByRole('button', {name: t.delete, exact: true})).toBeDisabled();
    await choose(page, t.saved, t.savedName);
    await expect(page.locator('[data-test="action"]')).toHaveText('load:studio');
    await dialog.getByRole('button', {name: t.delete, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('delete');
    await expect(dialog.getByRole('button', {name: new RegExp(t.saved)})).toHaveCount(0);
    await expect(dialog.getByRole('button', {name: t.delete, exact: true})).toHaveCount(0);
  });

  test(`${lang}: category/selected controls, search, empty gating, save and shortlist callbacks`, async ({
    page
  }) => {
    const dialog = await open(page);
    await choose(page, t.collection, t.categoryMode);
    await choose(page, t.category, t.boxes);
    await expect(page.locator('[data-test="category"]')).toHaveText('boxes');
    await choose(page, t.collection, t.selected);
    await expect(dialog.getByRole('button', {name: new RegExp(t.category)})).toHaveCount(0);
    await expect(dialog.getByRole('button', {name: t.start, exact: true})).toBeDisabled();
    await expect(dialog.getByText(t.empty, {exact: true})).toBeVisible();
    expect(await scanAxe(page)).toEqual([]);
    await dialog.getByRole('searchbox', {name: t.search, exact: true}).fill('VF-3P8R1T');
    await expect(dialog.getByRole('checkbox')).toHaveCount(1);
    const product = dialog.getByRole('checkbox', {name: 'VF-3P8R1T', exact: true});
    await dialog.getByText('VF-3P8R1T', {exact: true}).click();
    await expect(product).toBeChecked();
    await expect(dialog.getByRole('button', {name: t.start, exact: true})).toBeEnabled();
    await expect(dialog.getByRole('button', {name: t.save, exact: true})).toBeDisabled();
    const name = dialog.getByRole('textbox', {name: t.name, exact: true});
    await expect(name).toHaveAttribute('maxlength', '60');
    await name.fill('My selection');
    await dialog.getByRole('button', {name: t.save, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('save:My selection:VF-3P8R1T');
    await dialog.getByRole('button', {name: t.shortlist, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('shortlist');
    await expect(dialog.getByRole('checkbox', {name: 'VF-7K2M4Q', exact: true})).toBeChecked();
    await expect(product).not.toBeChecked();
  });

  test(`${lang}: unavailable capabilities disappear and empty collections cannot start/save`, async ({
    page
  }) => {
    const dialog = await open(page, t.limited);
    for (const name of [t.startFull, t.full])
      await expect(dialog.getByRole('switch', {name, exact: true})).toHaveCount(0);
    await expect(dialog.getByRole('button', {name: t.shortlist, exact: true})).toHaveCount(0);
    await expect(dialog.getByRole('button', {name: new RegExp(t.saved)})).toHaveCount(0);
    await expect(dialog.getByRole('button', {name: t.start, exact: true})).toBeDisabled();
    await expect(dialog.getByText(t.empty, {exact: true})).toBeVisible();
    await dialog.getByRole('textbox', {name: t.name, exact: true}).fill('Empty collection');
    await expect(dialog.getByRole('button', {name: t.save, exact: true})).toBeDisabled();
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`${lang}: transfer disclosure, import errors, export and safe setup link`, async ({
    page
  }) => {
    const dialog = await open(page);
    await dialog.getByText(t.configuration, {exact: true}).click();
    const text = dialog.getByRole('textbox', {name: t.text, exact: true});
    await expect(text).toHaveAttribute('maxlength', '12000');
    await expect(dialog.getByRole('button', {name: t.import, exact: true})).toBeDisabled();
    await text.fill('invalid fixture');
    await dialog.getByRole('button', {name: t.import, exact: true}).click();
    await expect(page.locator('[data-test="action"]')).toHaveText('import');
    await expect(text).toHaveAccessibleDescription(t.error);
    expect(await scanAxe(page)).toEqual([]);
    await dialog.getByRole('button', {name: t.export, exact: true}).click();
    await expect(text).toHaveValue('fixture export');
    await expect(page.locator('[data-test="action"]')).toHaveText('export');
    await expect(dialog.getByText(t.error, {exact: true})).toHaveCount(0);
    const link = dialog.getByRole('link', {name: t.link, exact: true});
    await expect(link).toHaveAttribute('href', 'https://example.test/setup');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener');
  });

  test(`${lang}: four-digit PIN completes/removes through callbacks without Web OTP`, async ({
    page
  }) => {
    await page.addInitScript(() => {
      window.OTPCredential = function OTPCredential() {};
      window.__otpRequests = 0;
      Object.defineProperty(navigator, 'credentials', {
        value: {
          get: () => {
            window.__otpRequests++;
            return Promise.resolve({code: '9999'});
          }
        }
      });
    });
    const dialog = await open(page);
    const pin = dialog.getByRole('textbox', {name: t.pin, exact: true});
    await expect(pin).toHaveAttribute('maxlength', '4');
    await pin.fill(lang === 'fa' ? '۱۲' : '12');
    await expect(pin).toHaveValue('12');
    await expect(page.locator('[data-test="action"]')).toBeEmpty();
    expect(await page.evaluate(() => window.__otpRequests)).toBe(0);
    await pin.fill(lang === 'fa' ? '۱۲۳۴' : '1234');
    await expect(pin).toHaveCount(0);
    await expect(dialog.getByText(t.pinSet, {exact: true})).toBeVisible();
    await expect(page.locator('[data-test="action"]')).toHaveText('pin-save');
    await dialog.getByRole('button', {name: t.removePin, exact: true}).click();
    await expect(pin).toHaveValue('');
    await expect(page.locator('[data-test="action"]')).toHaveText('pin-remove');
  });
}
