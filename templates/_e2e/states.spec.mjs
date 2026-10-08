import {test, expect} from '@playwright/test';
import {LANGS, openSite, pinDelivery, scanAxe} from './helpers.mjs';

// Interactive states the first-load scan in storefront.spec.mjs never reaches:
// open menus and dialogs, expanded accordions, other tabs, validation errors,
// later checkout steps and the ?demo=loading|error states.
const L = {
  en: {
    menu: 'Menu',
    filters: 'Filters',
    balance: 'Balance',
    saved: 'Saved',
    addresses: 'Addresses',
    reminders: 'Reminders',
    profile: 'Profile',
    addAddr: 'Add an address',
    addReminder: 'Add a reminder',
    care: 'Care',
    send: 'Send',
    sendInquiry: 'Send inquiry',
    sendCode: 'Send code',
    next: 'Continue to payment',
    remove: 'Remove',
    place: 'I’ve paid — place order',
    verify: 'Sign in'
  },
  fa: {
    menu: 'منو',
    filters: 'فیلترها',
    balance: 'کیف پول',
    saved: 'ذخیره‌ها',
    addresses: 'آدرس‌ها',
    reminders: 'یادآورها',
    profile: 'پروفایل',
    addAddr: 'افزودن آدرس',
    addReminder: 'افزودن یادآور',
    care: 'نگهداری',
    send: 'ارسال',
    sendInquiry: 'ارسال درخواست',
    sendCode: 'ارسال کد',
    next: 'ادامه و پرداخت',
    remove: 'حذف',
    place: 'پرداخت کردم — ثبت سفارش',
    verify: 'ورود'
  }
};

const main = page => page.locator('main');
const button = (page, name) => page.getByRole('button', {name, exact: true});

// After a submit with empty fields: something must be marked invalid, and every
// invalid field must point at visible error text.
async function expectDescribedErrors(page) {
  const invalid = page.locator('main [aria-invalid="true"]');
  await expect(invalid.first()).toBeVisible();
  for (const field of await invalid.all()) {
    const ids = ((await field.getAttribute('aria-describedby')) || '').split(/\s+/).filter(Boolean);
    expect(ids.length, 'invalid field has aria-describedby').toBeGreaterThan(0);
    const texts = await Promise.all(
      ids.map(id =>
        page
          .locator(`[id="${id}"]`)
          .innerText()
          .catch(() => '')
      )
    );
    expect(texts.join('').trim(), 'error text is present').not.toBe('');
  }
}

// A modal dialog is open, labelled, and holds focus.
async function expectModal(page) {
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName(/.+/);
  await expect.poll(() => dialog.evaluate(d => d.contains(document.activeElement))).toBe(true);
}

// Valid delivery details take the delivery step on to checkout's payment step.
async function toPayment(page, t) {
  await page.fill('#vf-name', 'Shirin Ahmadi');
  await page.fill('#vf-phone', '09121234567');
  await pinDelivery(page);
  await page.fill('#vf-address', 'Plaque 12, unit 3');
  await page.fill('#vf-sender', 'Sara Karimi');
  await page.fill('#vf-sender-phone', '09121112233');
  await page.getByRole('button', {name: t.next}).locator('visible=true').first().click();
  await expect(page.locator('#vf-last4')).toBeVisible();
}

// Any five digits are accepted in the demo; this stops at the code screen.
async function toCode(page, t) {
  await page.fill('#vf-phone', '09121234567');
  await main(page).getByRole('button', {name: t.sendCode}).click();
  await expect(page.locator('#vf-code')).toBeVisible();
}

const STATES = [
  {
    name: 'mobile menu open',
    view: 'home',
    only: 'mobile',
    act: async (page, t) => {
      await button(page, t.menu).click();
      await expectModal(page);
    }
  },
  {
    name: 'shop filters dialog',
    view: 'shop',
    only: 'mobile',
    act: async (page, t) => {
      await main(page).getByRole('button', {name: t.filters}).click();
      await expectModal(page);
    }
  },
  {name: 'shop loading', view: 'shop', extra: {demo: 'loading'}},
  {name: 'shop error', view: 'shop', extra: {demo: 'error'}},
  {name: 'journal loading', view: 'journal', extra: {demo: 'loading'}},
  {name: 'post loading', view: 'post', extra: {demo: 'loading'}},
  {name: 'checkout payment failed', view: 'checkout', extra: {demo: 'error'}},
  {
    name: 'account balance',
    view: 'account',
    act: async (page, t) => {
      await page.getByRole('tab', {name: t.balance}).click();
    }
  },
  {
    name: 'account saved',
    view: 'account',
    act: async (page, t) => {
      await page.getByRole('tab', {name: t.saved}).click();
    }
  },
  {
    name: 'account addresses',
    view: 'account',
    act: async (page, t) => {
      await page.getByRole('tab', {name: t.addresses}).click();
    }
  },
  {
    name: 'account address dialog',
    view: 'account',
    act: async (page, t) => {
      await page.getByRole('tab', {name: t.addresses}).click();
      await main(page).getByRole('button', {name: t.addAddr}).click();
      await expectModal(page);
    }
  },
  {
    name: 'account reminders',
    view: 'account',
    act: async (page, t) => {
      await page.getByRole('tab', {name: t.reminders}).click();
    }
  },
  {
    name: 'account reminder dialog',
    view: 'account',
    act: async (page, t) => {
      await page.getByRole('tab', {name: t.reminders}).click();
      await main(page).getByRole('button', {name: t.addReminder}).click();
      await expectModal(page);
    }
  },
  {
    name: 'account profile',
    view: 'account',
    act: async (page, t) => {
      await page.getByRole('tab', {name: t.profile}).click();
    }
  },
  {
    name: 'faq expanded',
    view: 'faq',
    act: async page => {
      // The first answer starts open; expand a collapsed one.
      const item = main(page).locator('[aria-expanded="false"]').first();
      const id = await item.getAttribute('id');
      await item.click();
      await expect(page.locator(`[id="${id}"]`)).toHaveAttribute('aria-expanded', 'true');
    }
  },
  {
    name: 'product care expanded',
    view: 'product',
    act: async (page, t) => {
      const care = main(page).getByRole('button', {name: t.care});
      if ((await care.getAttribute('aria-expanded')) === 'true') await care.click();
      await care.click();
      await expect(care).toHaveAttribute('aria-expanded', 'true');
    }
  },
  {
    name: 'search results',
    view: 'search',
    act: async page => {
      await main(page).getByRole('button').first().click();
      await page.waitForLoadState('networkidle');
    }
  },
  {
    name: 'contact errors',
    view: 'contact',
    act: async (page, t) => {
      await main(page).getByRole('button', {name: t.send, exact: true}).click();
      await expectDescribedErrors(page);
    }
  },
  {
    name: 'weddings errors',
    view: 'weddings',
    act: async (page, t) => {
      await main(page).getByRole('button', {name: t.sendInquiry}).click();
      await expectDescribedErrors(page);
    }
  },
  {
    name: 'signin errors',
    view: 'signin',
    act: async (page, t) => {
      await main(page).getByRole('button', {name: t.sendCode}).click();
      await expectDescribedErrors(page);
    }
  },
  {name: 'bag delivery step', view: 'bag', extra: {step: 'delivery'}},
  {
    name: 'bag errors',
    view: 'bag',
    extra: {step: 'delivery'},
    act: async (page, t) => {
      // On mobile the button lives in the sticky bar outside <main>.
      await page.getByRole('button', {name: t.next}).locator('visible=true').first().click();
      await expectDescribedErrors(page);
      // Several problems: the summary that links to each one takes focus.
      await expect(page.locator('#vf-errors')).toBeFocused();
    }
  },
  {name: 'checkout payment step', view: 'bag', extra: {step: 'delivery'}, act: toPayment},
  {
    name: 'checkout payment errors',
    view: 'bag',
    extra: {step: 'delivery'},
    act: async (page, t) => {
      await toPayment(page, t);
      await page.getByRole('button', {name: t.place}).locator('visible=true').first().click();
      await expectDescribedErrors(page);
    }
  },
  {
    name: 'checkout done',
    view: 'bag',
    extra: {step: 'delivery'},
    act: async (page, t) => {
      await toPayment(page, t);
      await page.fill('#vf-last4', '6037');
      await page.getByRole('button', {name: t.place}).locator('visible=true').first().click();
      await expect(page.locator('#vf-last4')).toBeHidden();
      await expect(page.locator('main h1')).toBeFocused();
    }
  },
  {name: 'signin code step', view: 'signin', act: toCode},
  {
    name: 'signin code errors',
    view: 'signin',
    act: async (page, t) => {
      await toCode(page, t);
      await main(page).getByRole('button', {name: t.verify, exact: true}).click();
      await expectDescribedErrors(page);
    }
  },
  {
    name: 'bag empty',
    view: 'bag',
    act: async (page, t) => {
      const remove = main(page).getByRole('button', {name: t.remove, exact: true});
      while (await remove.count()) await remove.first().click();
    }
  }
];

for (const lang of LANGS) {
  for (const state of STATES) {
    test(`state: ${state.name} (${lang})`, async ({page}, info) => {
      test.skip(state.only && info.project.name !== state.only, `${state.only} only`);
      await openSite(page, state.view, lang, state.extra);
      if (state.act) await state.act(page, L[lang]);
      await page.waitForLoadState('networkidle');
      expect(await scanAxe(page)).toEqual([]);
    });
  }
}
