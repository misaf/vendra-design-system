// The shared package fixture renders every component with an id and tenant data attributes.
import {test, expect} from '@playwright/test';

// A few controls and landmarks already use id for an inner element. Others put data attributes
// on a wrapper even when their ref points to a native input or trigger.
const targets = {
  Checkbox: ['input', 'label.ag-check'],
  ChoiceTile: ['input', 'label.ag-choice'],
  Radio: ['input', 'label.ag-check--radio'],
  Switch: ['input', 'label.ag-switch'],
  QuantityInput: ['input', '.ag-qty-root'],
  Select: ['button.ag-select__trigger', '.ag-select'],
  DatePicker: ['.ag-date__input', '.ag-date'],
  LocationPicker: ['.ag-map__canvas', '.ag-location'],
  PlacesMap: ['.ag-map__canvas', '.ag-map'],
  PromoCodeField: ['input', '.ag-promo'],
  SectionHeader: ['h2.ag-sechead__title', '.ag-sechead'],
  RadioGroupWrapped: ['[role=radiogroup]', 'fieldset'],
  ChoiceGroupWrapped: ['[role=radiogroup]', '.ag-field']
};

test.beforeEach(async ({page}) => {
  await page.goto('/e2e/fixtures/refs.html');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true');
});

test('package components forward IDs and data attributes to their documented elements', async ({
  page
}) => {
  const names = await page.evaluate(() => Object.keys(window.vendraRefs));
  for (const name of names) {
    const id = 'component-' + name;
    const [idTarget, dataTarget] = targets[name] ?? [];
    const match = await page.evaluate(
      ({name, id, idTarget, dataTarget}) => {
        const identified = document.querySelectorAll('#' + id);
        const marked = document.querySelectorAll('[data-testid="' + id + '"]');
        const ref = window.vendraRefs[name].current;
        const expectedRoot = name === 'Carousel' ? ref?.element?.parentElement : ref;
        return {
          id:
            identified.length === 1 &&
            (idTarget ? identified[0].matches(idTarget) : identified[0] === marked[0]),
          data:
            marked.length === 1 &&
            marked[0].dataset.analytics === name &&
            (dataTarget ? marked[0].matches(dataTarget) : marked[0] === expectedRoot)
        };
      },
      {name, id, idTarget, dataTarget}
    );
    expect.soft(match, name).toEqual({id: true, data: true});
  }
});

test('forwarded ARIA preserves roles, labels and built-in descriptions', async ({page}) => {
  const alert = page.getByTestId('component-Alert');
  await expect(alert).toHaveAttribute('role', 'alert');
  await expect(alert).toHaveAttribute('aria-describedby', 'tenant-details');

  const dialog = page.getByTestId('component-DialogModal');
  await expect(dialog).toHaveAccessibleName('Added');
  await expect(dialog).toHaveAccessibleDescription('In your bag');

  const headingId = 'component-SectionHeader';
  await expect(page.getByTestId('component-Accordion')).toHaveAttribute(
    'aria-labelledby',
    headingId
  );
  const tablist = page.getByTestId('component-Tabs').locator('[role=tablist]');
  await expect(tablist).toHaveAccessibleName('New in');

  const group = page.locator('#component-RadioGroupWrapped');
  await expect(group).toHaveAccessibleName('Colour');
  await expect(group).toHaveAccessibleDescription('Choose one Available colours');

  const toast = page.getByTestId('component-Toast');
  await expect(toast).toHaveAccessibleName('Added to bag');
  await expect(toast).toHaveAttribute('aria-describedby', /\S+ tenant-details$/);
});

test('components use aria-label when label is omitted and prefer an explicit label', async ({
  page
}) => {
  const expected = {
    AnnouncementBar: 'News',
    BottomTabBar: 'Shopping navigation',
    BottomTabBarWithLabel: 'Main',
    Gallery: 'Product photos',
    OrderTimeline: 'Order progress'
  };
  for (const [name, label] of Object.entries(expected))
    await expect.soft(page.getByTestId('component-' + name), name).toHaveAccessibleName(label);
});
