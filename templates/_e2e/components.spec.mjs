import {test, expect} from '@playwright/test';
import {contrast, backgroundBehind} from './helpers.mjs';

const FIXTURE = '/templates/_e2e/fixtures/components.html';
const LILAC_300 = 'rgb(169, 155, 221)';

test.beforeEach(async ({page}) => {
  await page.goto(FIXTURE);
  await expect(page.locator('[data-test=tabs]').getByRole('tablist')).toBeVisible();
});

// React Aria counts hover as pointer input once the mouse has moved on the page, as it always has
// for a person; Playwright's hover jumps straight onto the trigger.
const hover = async (page, locator) => {
  await page.mouse.move(1, 1);
  await locator.hover();
};

test.describe('Tooltip (WCAG 1.4.13, React Aria)', () => {
  test('describes its trigger while shown', async ({page}) => {
    const trigger = page.getByRole('button', {name: 'Save'});
    await expect(page.getByRole('tooltip')).toHaveCount(0);
    await hover(page, trigger);
    await expect(page.getByRole('tooltip')).toHaveText('Save to favourites');
    await expect(trigger).toHaveAccessibleDescription('Save to favourites');
  });

  test('shows on hover, stays while hovering the bubble, Esc dismisses it', async ({page}) => {
    const trigger = page.getByRole('button', {name: 'Save'});
    const tip = page.getByRole('tooltip');
    await hover(page, trigger);
    await expect(tip).toBeVisible();
    await tip.hover();
    await expect(tip).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(tip).toHaveCount(0);
    await page.mouse.move(0, 0);
    await hover(page, trigger);
    await expect(tip).toBeVisible();
  });

  test('shows on keyboard focus and hides on blur', async ({page}) => {
    const tip = page.getByRole('tooltip');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', {name: 'Save'})).toBeFocused();
    await expect(tip).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(tip).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(tip).toHaveCount(0);
    await page.keyboard.press('Shift+Tab');
    await expect(tip).toBeVisible();
  });

  test('a tap toggles it on touch screens', async ({browser}) => {
    const context = await browser.newContext({hasTouch: true});
    const page = await context.newPage();
    await page.goto(FIXTURE);
    const tip = page.getByRole('tooltip');
    await page.getByRole('button', {name: 'Save'}).tap();
    await expect(tip).toBeVisible();
    await page.locator('body').tap({position: {x: 5, y: 5}});
    await expect(tip).toHaveCount(0);
    await context.close();
  });
});

test.describe('Tabs (ARIA tabs pattern)', () => {
  for (const lang of ['en', 'fa']) {
    test(`arrow keys, Home and End move selection (${lang})`, async ({page}) => {
      await page.goto(FIXTURE + '?lang=' + lang);
      const tab = name => page.getByRole('tab', {name});
      const next = lang === 'fa' ? 'ArrowLeft' : 'ArrowRight';
      await tab('Orders').focus();
      await page.keyboard.press(next);
      await expect(tab('Addresses')).toBeFocused();
      await expect(tab('Addresses')).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('End');
      await expect(tab('Profile')).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press(next);
      await expect(tab('Orders')).toHaveAttribute('aria-selected', 'true');
      await page.keyboard.press('Home');
      await expect(tab('Orders')).toBeFocused();
    });
  }

  test('roving tabindex and panel linkage', async ({page}) => {
    const selected = page.locator('[data-test=tabs]').getByRole('tab', {selected: true});
    const tabs = page.locator('[data-test=tabs]');
    await expect(tabs.getByRole('tab')).toHaveCount(3);
    await expect(tabs.locator('[role=tab][tabindex="0"]')).toHaveCount(1);
    await page.getByRole('tab', {name: 'Profile'}).click();
    // The selected tab controls the visible panel, and the panel is named by that tab.
    const panelId = await selected.getAttribute('aria-controls');
    const panel = page.locator('[id="' + panelId + '"]');
    await expect(panel).toHaveAttribute('role', 'tabpanel');
    await expect(panel).toHaveAttribute('aria-labelledby', await selected.getAttribute('id'));
    await expect(page.getByRole('tabpanel', {name: 'Profile'})).toHaveText('profile panel');
  });
});

test.describe('QuantityInput (NumberField)', () => {
  for (const lang of ['en', 'fa']) {
    test(`arrows, buttons and bounds (${lang})`, async ({page}) => {
      await page.goto(FIXTURE + '?lang=' + lang);
      const count = page.getByRole('textbox', {name: 'Quantity'});
      const result = page.locator('output[data-test=quantity]');
      await expect(count).toHaveValue(lang === 'fa' ? '۲' : '2');
      await count.focus();
      await page.keyboard.press('ArrowUp');
      await expect(result).toHaveText('3');
      await expect(page.getByRole('button', {name: 'More'})).toBeDisabled();
      await page.keyboard.press('Home');
      await expect(result).toHaveText('1');
      await expect(page.getByRole('button', {name: 'Fewer'})).toBeDisabled();
      await page.getByRole('button', {name: 'More'}).click();
      await expect(result).toHaveText('2');
    });
  }
});

test.describe('RangeSlider', () => {
  for (const lang of ['en', 'fa']) {
    test(`thumbs move by step, stay a step apart and read formatValue (${lang})`, async ({
      page
    }) => {
      await page.goto(FIXTURE + '?lang=' + lang);
      const low = page.getByRole('slider', {name: 'Min price'});
      const result = page.locator('output[data-test=range]');
      await expect(low).toHaveAttribute('aria-valuetext', '20 Toman');
      await low.focus();
      await page.keyboard.press(lang === 'fa' ? 'ArrowLeft' : 'ArrowRight');
      await expect(result).toHaveText('30-80');
      await expect(low).toHaveAttribute('aria-valuetext', '30 Toman');
      await page.keyboard.press('End');
      await expect(result).toHaveText('70-80');
    });
  }
});

test.describe('Input', () => {
  test('label, hint and onChange events', async ({page}) => {
    const field = page.getByRole('textbox', {name: 'Note'});
    await expect(field).toHaveAttribute('id', 'note');
    await expect(field).toHaveAttribute('aria-describedby', 'note-hint');
    await field.fill('Roses');
    await expect(page.locator('output[data-test=note]')).toHaveText('Roses');
  });
});

test.describe('Select (React Aria listbox)', () => {
  test('keyboard opens, skips disabled options, chooses and returns focus', async ({page}) => {
    const trigger = page.locator('#city');
    await expect(trigger).toHaveText('Choose a city');
    await trigger.focus();
    await page.keyboard.press('ArrowDown');
    const list = page.getByRole('listbox');
    await expect(list).toBeVisible();
    await expect(page.getByRole('option', {name: 'Qom'})).toHaveAttribute('aria-disabled', 'true');
    await page.keyboard.press('End');
    await page.keyboard.press('Enter');
    await expect(list).toBeHidden();
    await expect(page.locator('output[data-test=city]')).toHaveText('Shiraz');
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveText('Shiraz');
    await trigger.click();
    await page.keyboard.press('Escape');
    await expect(list).toBeHidden();
    await expect(trigger).toBeFocused();
  });
});

test.describe('DatePicker (React Aria calendar)', () => {
  for (const lang of ['en', 'fa']) {
    test(`picks a day from the grid in the default calendar, before-min days are off (${lang})`, async ({
      page
    }) => {
      await page.goto(FIXTURE + '?lang=' + lang);
      const open = lang === 'fa' ? 'انتخاب از تقویم' : 'Choose a date';
      await page.getByRole('button', {name: open}).click();
      const grid = page.getByRole('grid');
      await expect(grid).toBeVisible();
      // 8 October 2026 is 16 Mehr 1405: the grid shows Mehr in Persian, October in English.
      await expect(page.locator('.ag-cal__title')).toHaveText(
        lang === 'fa' ? /۱۴۰۵ مهر/ : /October 2026/
      );
      await expect(grid.locator('[data-selected]')).toHaveText(lang === 'fa' ? '۱۶' : '8');
      // 4 October (12 Mehr) is before minDate.
      const beforeMin = new RegExp('^' + (lang === 'fa' ? '۱۲' : '4') + '$');
      await expect(
        grid.locator('.ag-cal__cell[data-disabled]').filter({hasText: beforeMin})
      ).toHaveCount(1);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(grid).toBeHidden();
      await expect(page.locator('output[data-test=date]')).toHaveText('2026-10-15');
    });
  }
});

test('DatePicker switches calendar and keeps the date', async ({page}) => {
  await page.goto(FIXTURE + '?lang=fa');
  const calendars = page.getByRole('radiogroup', {name: 'تقویم'});
  await expect(calendars.getByRole('radio', {name: 'شمسی'})).toBeChecked();
  await calendars.getByRole('radio', {name: 'میلادی'}).click();
  await expect(calendars.getByRole('radio', {name: 'میلادی'})).toBeChecked();
  await expect(page.locator('output[data-test=date]')).toHaveText('2026-10-08');
  await expect(page.getByRole('spinbutton', {name: /ماه/})).toHaveText('۱۰');
});

test.describe('RadioGroup (React Aria)', () => {
  test('one Tab stop; arrows skip disabled radios; label alone names a radio', async ({page}) => {
    const group = page.getByRole('radiogroup', {name: 'Payment'});
    const card = group.getByRole('radio', {name: 'Card', exact: true});
    await expect(card).toBeChecked();
    await expect(card).toHaveAccessibleDescription('Transfer');
    await card.focus();
    await page.keyboard.press('ArrowDown');
    await expect(group.getByRole('radio', {name: 'WhatsApp'})).toBeChecked();
    await expect(page.locator('output[data-test=pay]')).toHaveText('wa');
    // Tab leaves the group: the radios are one stop.
    await page.keyboard.press('Tab');
    await expect(group.getByRole('radio', {name: 'Card', exact: true})).not.toBeFocused();
    await expect(group.locator('input:focus')).toHaveCount(0);
    await group.getByText('Card').click();
    await expect(page.locator('output[data-test=pay]')).toHaveText('card');
  });
});

test.describe('Toast', () => {
  test('close button is a 44px target and works', async ({page}) => {
    const close = page.getByRole('button', {name: 'Dismiss'});
    const box = await close.boundingBox();
    expect(Math.round(box.width)).toBeGreaterThanOrEqual(44);
    expect(Math.round(box.height)).toBeGreaterThanOrEqual(44);
    await close.click();
    await expect(page.locator('[data-test=closed]')).toHaveText('1');
  });

  test('focus ring uses the on-inverse ring at 3:1', async ({page}) => {
    const close = page.getByRole('button', {name: 'Dismiss'});
    await close.focus();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();
    await expect(close).toHaveCSS('outline-color', LILAC_300);
    const ring = await close.evaluate(el => getComputedStyle(el).outlineColor);
    const bg = await backgroundBehind(page.locator('.ag-toast'));
    expect(contrast(ring, bg)).toBeGreaterThanOrEqual(3);
  });
});

test.describe('Reduced motion', () => {
  const tipDuration = async page => {
    await hover(page, page.getByRole('button', {name: 'Save'}));
    return page.getByRole('tooltip').evaluate(el => getComputedStyle(el).transitionDuration);
  };

  test('motion tokens keep their durations by default', async ({page}) => {
    await expect.poll(() => tipDuration(page)).toBe('0.14s, 0.14s');
  });

  test('every token-based transition becomes instant', async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await expect.poll(() => tipDuration(page)).toBe('1e-05s, 1e-05s');
    const slow = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--dur-slow').trim()
    );
    expect(slow).toBe('.01ms');
  });
});

test.describe('Dialog (React Aria modal)', () => {
  test('focus moves in and stays, Esc closes, focus returns to the opener', async ({page}) => {
    const opener = page.getByRole('button', {name: 'Delivery details'});
    await opener.click();
    const dialog = page.getByRole('dialog', {name: 'Delivery details'});
    await expect(dialog).toBeVisible();
    // Focus is on the dialog (React Aria focuses the dialog itself) or something in it.
    const focusInside = () => dialog.evaluate(el => el.contains(document.activeElement));
    await expect.poll(focusInside).toBe(true);
    // Tab cycles inside: the close button, the field and Save, never the page behind.
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      expect(await focusInside()).toBe(true);
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
  });

  test('the close button closes it and is named in the page language', async ({page}) => {
    await page.getByRole('button', {name: 'Delivery details'}).click();
    await page.getByRole('button', {name: 'Close', exact: true}).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await page.goto(FIXTURE + '?lang=fa');
    await page.getByRole('button', {name: 'Delivery details'}).click();
    // VendraProvider's language gives the built-in wording without a closeLabel prop.
    await expect(page.getByRole('dialog').getByRole('button', {name: 'بستن'})).toBeVisible();
  });
});

test.describe('Accordion (disclosure pattern)', () => {
  test('buttons expose state, control their region and toggle from the keyboard', async ({
    page
  }) => {
    const care = page.getByRole('button', {name: 'Flower care'});
    const returns = page.getByRole('button', {name: 'Returns'});
    await expect(care).toHaveAttribute('aria-expanded', 'true');
    await expect(returns).toHaveAttribute('aria-expanded', 'false');
    const panel = page.locator(`[id="${await care.getAttribute('aria-controls')}"]`);
    await expect(panel).toHaveText('Trim the stems.');
    await expect(panel).toHaveAccessibleName('Flower care');
    // Real headings, so the page outline lists each question.
    await expect(page.getByRole('heading', {name: 'Returns', level: 3})).toBeVisible();
    await returns.focus();
    await page.keyboard.press('Enter');
    await expect(returns).toHaveAttribute('aria-expanded', 'true');
    // One panel at a time unless allowMultiple.
    await expect(care).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('output[data-test=panels]')).toHaveText('returns');
    await page.keyboard.press('Space');
    await expect(returns).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('output[data-test=panels]')).toHaveText('');
  });
});

test.describe('Carousel', () => {
  for (const lang of ['en', 'fa']) {
    test(`arrows page in reading direction and disable at the ends (${lang})`, async ({page}) => {
      await page.emulateMedia({reducedMotion: 'reduce'});
      await page.goto(FIXTURE + '?lang=' + lang);
      const names = lang === 'fa' ? ['قبلی', 'بعدی'] : ['Previous', 'Next'];
      const previous = page.getByRole('button', {name: names[0], exact: true});
      const next = page.getByRole('button', {name: names[1], exact: true});
      const track = page.getByRole('region', {name: 'New arrivals'});
      await expect(previous).toBeDisabled();
      await expect(next).toBeEnabled();
      await next.click();
      await expect(previous).toBeEnabled();
      const moved = await track.evaluate(el => Math.abs(el.scrollLeft));
      expect(moved).toBeGreaterThan(100);
      for (let i = 0; i < 6 && (await next.isEnabled()); i++) await next.click();
      await expect(next).toBeDisabled();
      await previous.click();
      await expect(next).toBeEnabled();
    });
  }

  test('the track is a named, focusable region that scrolls with the keyboard', async ({page}) => {
    const track = page.getByRole('region', {name: 'New arrivals'});
    await track.focus();
    await expect(track).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
  });
});

test.describe('ChoiceGroup (React Aria radiogroup)', () => {
  test('one Tab stop; arrows move and select, skipping disabled tiles', async ({page}) => {
    const group = page.getByRole('radiogroup', {name: 'Delivery time'});
    const morning = group.getByRole('radio', {name: 'Morning'});
    const evening = group.getByRole('radio', {name: 'Evening'});
    await expect(morning).toBeChecked();
    await expect(group.getByRole('radio', {name: 'Noon'})).toBeDisabled();
    await morning.focus();
    await page.keyboard.press('ArrowDown');
    await expect(evening).toBeFocused();
    await expect(evening).toBeChecked();
    await expect(page.locator('output[data-test=slot]')).toHaveText('evening');
    // The description is read after the name, not as part of it.
    await expect(evening).toHaveAccessibleDescription('17:00–20:00');
    // Tab leaves the group: one Tab stop for the whole set.
    await page.keyboard.press('Tab');
    expect(await group.evaluate(el => el.contains(document.activeElement))).toBe(false);
  });
});

test.describe('CodeInput', () => {
  test('keeps digits only, accepts Persian digits and completes once', async ({page}) => {
    const field = page.getByRole('textbox', {name: 'Code'});
    await expect(field).toHaveAttribute('inputmode', 'numeric');
    await expect(field).toHaveAttribute('autocomplete', 'one-time-code');
    await field.pressSequentially('1a2-۳');
    await expect(page.locator('output[data-test=code]')).toHaveText('123');
    await expect(page.locator('output[data-test=completed]')).toHaveText('');
    await field.pressSequentially('۴5');
    await expect(page.locator('output[data-test=code]')).toHaveText('12345');
    await expect(page.locator('output[data-test=completed]')).toHaveText('12345');
    await field.press('End');
    await field.pressSequentially('9');
    await expect(page.locator('output[data-test=code]')).toHaveText('12345');
  });
});

test.describe('PhoneInput', () => {
  test('phone keypad, left-to-right digits and a normalised mobile number', async ({page}) => {
    const field = page.getByRole('textbox', {name: 'Phone'});
    await expect(field).toHaveAttribute('type', 'tel');
    await expect(field).toHaveAttribute('inputmode', 'tel');
    await expect(field).toHaveAttribute('dir', 'ltr');
    await field.fill('۰۹۱۲ ۱۱۱ ۲۲۳۳');
    await expect(page.locator('output[data-test=phone]')).toHaveText('09121112233 mobile');
    await field.fill('021-8888 1234');
    await expect(page.locator('output[data-test=phone]')).toHaveText('02188881234');
  });
});
