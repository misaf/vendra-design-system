// React 19 refs: every package component takes `ref` as a prop. Form controls hand over their
// native control (so a form library can focus an invalid field), the rest their own element. The
// host page (fixtures/refs.jsx) renders each component with an object ref.
import {test, expect} from '@playwright/test';

const expected = {
  Input: 'input',
  PhoneInput: 'input[type=tel]',
  CodeInput: 'input[autocomplete=one-time-code]',
  Checkbox: 'input[type=checkbox]',
  Radio: 'input[type=radio]',
  Switch: 'input[role=switch]',
  ChoiceTile: 'input[type=radio]',
  QuantityInput: 'input.ag-qty__val',
  Select: 'button.ag-select__trigger',
  SearchField: 'input[type=search]',
  ArchFrame: 'div.ag-arch',
  Badge: 'span.ag-badge',
  Button: 'button.ag-btn',
  ButtonLink: 'a.ag-btn',
  Card: 'div.ag-card',
  Chip: 'button.ag-chip',
  ChoiceGroup: '[role=radiogroup].ag-choices',
  FieldMessage: 'span.ag-field__hint',
  Icon: 'span.ag-icon',
  IconButton: 'button.ag-iconbtn[title=Save]',
  LiveRegion: 'div[role=status]',
  Meter: 'div[role=meter]',
  Picture: 'img',
  Price: 'span.ag-price',
  RadioGroup: '[role=radiogroup].ag-radios',
  RangeSlider: 'div.ag-range',
  Skeleton: 'div.ag-skel-lines',
  SkipLink: 'a.ag-skip',
  Spinner: 'span.ag-spinner',
  Accordion: 'div.ag-acc',
  AddressCard: 'div.ag-addr',
  Alert: 'div.ag-alert',
  AnnouncementBar: 'div.ag-announce',
  BlogCard: 'article.ag-blog',
  Breadcrumb: 'nav.ag-crumbs',
  CategoryCard: 'a.ag-cat',
  DetailList: 'dl.ag-dl',
  EmptyState: 'div.ag-empty',
  ErrorSummary: 'div.ag-error-summary',
  FilterBar: 'div.ag-filterbar',
  LanguageSwitch: 'div.ag-lang',
  LineItem: 'div.ag-linewrap',
  LoadMore: 'div.ag-loadmore',
  MenuList: 'nav.ag-menu',
  NavLink: 'a.ag-nav',
  OfflineNotice: 'div.ag-offline',
  OrderTimeline: 'ol.ag-otl',
  Pagination: 'nav.ag-pages',
  PaymentCard: 'div.ag-pay',
  ProductCard: 'div.ag-product',
  PromoCodeField: 'div.ag-promo',
  ReminderRow: 'div.ag-remwrap',
  ResendCode: 'div.ag-resend',
  SectionHeader: 'div.ag-sechead',
  Stepper: 'ol.ag-steps',
  StockStatus: 'span.ag-stock',
  Tabs: 'div.ag-tabs-root',
  Toast: 'div.ag-toast',
  Tooltip: 'span.ag-tip',
  TrustSeal: 'a.ag-seal',
  BottomTabBar: 'nav.ag-tabbar',
  DatePicker: 'fieldset.ag-date',
  Dialog: '[role=dialog].ag-dialog',
  DialogModal: '[role=dialog].ag-dialog__frame',
  Gallery: 'div[aria-roledescription=carousel]',
  Lightbox: '[role=dialog].ag-lightbox__frame',
  LocationPicker: 'div.ag-location',
  OrderSummary: 'section.ag-osum',
  PaymentStatus: 'div.ag-payment-status',
  PlacesMap: 'div.ag-map',
  ToastRegion: 'div.ag-toast-region'
};

test.beforeEach(async ({page}) => {
  await page.goto('/apps/florist/e2e/fixtures/refs.html');
  await expect(page.locator('body')).toHaveAttribute('data-ready', 'true');
});

for (const [name, selector] of Object.entries(expected))
  test(name + ' hands its ref ' + selector, async ({page}) => {
    const found = await page.evaluate(
      ([name, selector]) => {
        const node = window.vendraRefs[name].current;
        return node ? {matches: node.matches(selector), html: node.outerHTML.slice(0, 160)} : null;
      },
      [name, selector]
    );
    expect(found, name + ' ref is empty').not.toBeNull();
    expect(found.matches, found.html).toBe(true);
  });

test('Carousel hands its scroll handle', async ({page}) => {
  const handle = await page.evaluate(() => {
    const carousel = window.vendraRefs.Carousel.current;
    return {
      scroll:
        typeof carousel?.scrollNext === 'function' && typeof carousel.scrollPrev === 'function',
      element: !!carousel?.element?.matches('div')
    };
  });
  expect(handle).toEqual({scroll: true, element: true});
});

test('every component renders without failing', async ({page}) => {
  await expect(page.getByText(/ failed$/)).toHaveCount(0);
});
