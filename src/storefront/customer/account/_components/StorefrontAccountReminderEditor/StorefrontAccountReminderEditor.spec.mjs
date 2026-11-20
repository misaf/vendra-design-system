import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../../e2e/component-test.mjs';

const copy = {
  en: {
    title: 'Edit reminder',
    name: 'Reminder name',
    nameError: 'Enter a reminder name',
    occasion: 'Occasion',
    anniversary: 'Anniversary',
    before: 'Remind me',
    seven: 'One week before',
    channel: 'Reminder channel',
    whatsapp: 'WhatsApp',
    month: 'Event month',
    day: 'Event day',
    nextMonth: 'November',
    nextDay: '9',
    calendar: 'Calendar',
    otherCalendar: 'Shamsi',
    lock: 'Lock the event date',
    locked: 'This occasion has a fixed date',
    save: 'Save reminder',
    cancel: 'Cancel'
  },
  fa: {
    title: 'ویرایش یادآوری',
    name: 'عنوان یادآوری',
    nameError: 'عنوان یادآوری را وارد کنید',
    occasion: 'مناسبت',
    anniversary: 'سالگرد',
    before: 'زمان یادآوری',
    seven: 'یک هفته قبل',
    channel: 'روش یادآوری',
    whatsapp: 'واتس‌اپ',
    month: 'ماه رویداد',
    day: 'روز رویداد',
    nextMonth: 'آبان',
    nextDay: '۱۷',
    calendar: 'تقویم',
    otherCalendar: 'میلادی',
    lock: 'قفل کردن تاریخ رویداد',
    locked: 'تاریخ این مناسبت ثابت است',
    save: 'ذخیره یادآوری',
    cancel: 'انصراف'
  }
};

async function choose(page, label, option) {
  const trigger = page.getByRole('button', {name: new RegExp(label)});
  await trigger.click();
  await page.getByRole('option', {name: option, exact: true}).click();
  await expect(trigger).toContainText(option);
}

for (const lang of ['en', 'fa']) {
  const t = copy[lang];
  const initialDate = lang === 'fa' ? {cal: 'j', m: 7, d: 16} : {cal: 'g', m: 10, d: 8};

  test(`${lang}: invalid name is described and linked; correcting it allows save`, async ({
    page
  }) => {
    await openStorefrontComponent(page, 'StorefrontAccountReminderEditor', lang);
    const dialog = page.getByRole('dialog', {name: t.title});
    await dialog.getByRole('button', {name: t.save, exact: true}).click();
    const name = dialog.getByRole('textbox', {name: t.name, exact: true});
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(name).toHaveAccessibleDescription(t.nameError);
    await expect(dialog.getByRole('link', {name: t.nameError, exact: true})).toHaveAttribute(
      'href',
      '#vf-reminder-name'
    );
    await dialog.getByRole('link', {name: t.nameError, exact: true}).click();
    await expect(name).toBeFocused();
    expect(await scanAxe(page)).toEqual([]);
    await name.fill('Mina birthday');
    await expect(dialog.getByText(t.nameError, {exact: true})).toHaveCount(0);
    await dialog.getByRole('button', {name: t.save, exact: true}).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.locator('[data-test="saved"]')).toHaveText(
      JSON.stringify({
        name: 'Mina birthday',
        occasion: 'birthday',
        date: initialDate,
        before: '1',
        channel: 'sms'
      })
    );
  });

  test(`${lang}: occasion, lead time and channel are controlled independently`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountReminderEditor', lang);
    await page.getByRole('textbox', {name: t.name, exact: true}).fill('Anniversary');
    await choose(page, t.occasion, t.anniversary);
    await choose(page, t.before, t.seven);
    await choose(page, t.channel, t.whatsapp);
    await page.getByRole('button', {name: t.save, exact: true}).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('[data-test="saved"]')).toHaveText(
      JSON.stringify({
        name: 'Anniversary',
        occasion: 'anniversary',
        date: initialDate,
        before: '7',
        channel: 'whatsapp'
      })
    );
  });

  test(`${lang}: yearly date uses localized month/day controls and reports calendar changes`, async ({
    page
  }) => {
    await page.clock.setFixedTime(new Date('2026-11-17T08:00:00+03:30'));
    await openStorefrontComponent(page, 'StorefrontAccountReminderEditor', lang);
    await expect(page.locator('.ag-date__grid--yearly')).toBeVisible();
    await expect(page.getByRole('spinbutton')).toHaveCount(0);
    await choose(page, t.month, t.nextMonth);
    await choose(page, t.day, t.nextDay);
    await expect(page.locator('[data-test="date"]')).toHaveText(
      JSON.stringify(lang === 'fa' ? {cal: 'j', m: 8, d: 17} : {cal: 'g', m: 11, d: 9})
    );
    const calendars = page.getByRole('radiogroup', {name: t.calendar, exact: true});
    await calendars.getByRole('radio', {name: t.otherCalendar, exact: true}).click();
    await expect(calendars.getByRole('radio', {name: t.otherCalendar, exact: true})).toBeChecked();
    await expect(page.locator('[data-test="date"]')).toContainText(
      '"cal":"' + (lang === 'fa' ? 'g' : 'j') + '"'
    );
  });

  test(`${lang}: a fixed date disables month/day controls and exposes its hint`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountReminderEditor', lang);
    await page.getByRole('button', {name: t.lock, exact: true}).click();
    for (const label of [t.month, t.day]) {
      const trigger = page.getByRole('button', {name: new RegExp(label)});
      await expect(trigger).toBeDisabled();
      await expect(trigger).toHaveAccessibleDescription(t.locked);
    }
    await expect(page.locator('[data-test="date"]')).toHaveText(JSON.stringify(initialDate));
    expect(await scanAxe(page)).toEqual([]);
  });

  test(`${lang}: default editor passes axe and cancel discards the draft`, async ({page}) => {
    await openStorefrontComponent(page, 'StorefrontAccountReminderEditor', lang);
    expect(await scanAxe(page)).toEqual([]);
    await page.getByRole('textbox', {name: t.name, exact: true}).fill('Unsaved reminder');
    await page.getByRole('button', {name: t.cancel, exact: true}).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('[data-test="saved"]')).toBeEmpty();
  });
}
