// Renders every package component with a React 19 `ref` (an object ref, as a tenant app or a form
// library passes one) and puts the refs on window.vendraRefs for refs.spec.mjs. Each component sits
// in its own ErrorBoundary, so one failure fails only its own test.
import React from 'react';
import {createRoot} from 'react-dom/client';
import * as DS from '../../app/ds.js';
import {FieldMessage} from '../../../../packages/design-system/components/atoms/Field/Field.jsx';

const never = () => new Promise(() => {});
const tiles = {url: 'data:,', attribution: ''};
const photo =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"%3E%3Crect width="4" height="5" fill="%23d9b8a8"/%3E%3C/svg%3E';
const toasts = new DS.ToastQueue();
toasts.add({title: 'Saved'});

const samples = {
  // Form controls: the ref is the native control.
  Input: ref => <DS.Input ref={ref} label="Name" />,
  PhoneInput: ref => <DS.PhoneInput ref={ref} label="Phone" />,
  CodeInput: ref => <DS.CodeInput ref={ref} label="Code" webOtp={false} />,
  Checkbox: ref => <DS.Checkbox ref={ref} label="Gift wrap" />,
  Radio: ref => (
    <DS.RadioGroup label="Size">
      <DS.Radio ref={ref} value="s" label="Small" />
    </DS.RadioGroup>
  ),
  Switch: ref => <DS.Switch ref={ref} label="In stock only" />,
  ChoiceTile: ref => (
    <DS.ChoiceGroup label="Delivery">
      <DS.ChoiceTile ref={ref} value="today" label="Today" />
    </DS.ChoiceGroup>
  ),
  QuantityInput: ref => <DS.QuantityInput ref={ref} />,
  Select: ref => <DS.Select ref={ref} label="City" options={['Karaj', 'Tehran']} />,
  SearchField: ref => <DS.SearchField ref={ref} label="Search" />,
  // Everything else: the ref is the component's own element.
  ArchFrame: ref => <DS.ArchFrame ref={ref} />,
  Badge: ref => <DS.Badge ref={ref}>New</DS.Badge>,
  Button: ref => <DS.Button ref={ref}>Add</DS.Button>,
  ButtonLink: ref => (
    <DS.Button ref={ref} href="#shop">
      Shop
    </DS.Button>
  ),
  Card: ref => <DS.Card ref={ref}>Card</DS.Card>,
  Chip: ref => <DS.Chip ref={ref}>Roses</DS.Chip>,
  ChoiceGroup: ref => (
    <DS.ChoiceGroup ref={ref} label="Wrap">
      <DS.ChoiceTile value="paper" label="Paper" />
    </DS.ChoiceGroup>
  ),
  FieldMessage: ref => (
    <FieldMessage ref={ref} id="message">
      Hint
    </FieldMessage>
  ),
  Icon: ref => <DS.Icon ref={ref} name="heart" />,
  IconButton: ref => <DS.IconButton ref={ref} icon="heart" label="Save" />,
  LiveRegion: ref => <DS.LiveRegion ref={ref}>Updated</DS.LiveRegion>,
  Meter: ref => <DS.Meter ref={ref} label="Progress" value={40} />,
  Picture: ref => <DS.Picture ref={ref} image={photo} />,
  Price: ref => <DS.Price ref={ref} value="2,200,000 Toman" />,
  RadioGroup: ref => (
    <DS.RadioGroup ref={ref} label="Colour">
      <DS.Radio value="red" label="Red" />
    </DS.RadioGroup>
  ),
  RangeSlider: ref => <DS.RangeSlider ref={ref} label="Price" />,
  Skeleton: ref => <DS.Skeleton ref={ref} />,
  SkipLink: ref => <DS.SkipLink ref={ref}>Skip to content</DS.SkipLink>,
  Spinner: ref => <DS.Spinner ref={ref} />,
  Accordion: ref => <DS.Accordion ref={ref} items={[{id: 'a', title: 'Care', content: 'Water'}]} />,
  AddressCard: ref => <DS.AddressCard ref={ref} label="Home" line="12 Golestan St" />,
  Alert: ref => <DS.Alert ref={ref}>Saved</DS.Alert>,
  AnnouncementBar: ref => (
    <DS.AnnouncementBar ref={ref} label="News">
      Free delivery
    </DS.AnnouncementBar>
  ),
  BlogCard: ref => <DS.BlogCard ref={ref} title="Peonies" href="#post" />,
  Breadcrumb: ref => <DS.Breadcrumb ref={ref} items={[{label: 'Shop', href: '#shop'}]} />,
  CategoryCard: ref => <DS.CategoryCard ref={ref} label="Roses" href="#roses" />,
  DetailList: ref => <DS.DetailList ref={ref} rows={[{label: 'Code', value: 'VF-7K2M4Q'}]} />,
  EmptyState: ref => <DS.EmptyState ref={ref} title="Nothing here" />,
  ErrorSummary: ref => (
    <DS.ErrorSummary ref={ref} errors={[{text: 'Enter a name', target: 'name'}]} />
  ),
  FilterBar: ref => <DS.FilterBar ref={ref} filters={[{id: 'red', label: 'Red'}]} />,
  LanguageSwitch: ref => <DS.LanguageSwitch ref={ref} />,
  LineItem: ref => <DS.LineItem ref={ref} name="VF-7K2M4Q" price="2,200,000 Toman" />,
  LoadMore: ref => (
    <DS.LoadMore ref={ref} shown={12} total={40} status="12 of 40" label="Show more" />
  ),
  MenuList: ref => (
    <DS.MenuList ref={ref} label="Menu">
      <a href="#shop">Shop</a>
    </DS.MenuList>
  ),
  NavLink: ref => (
    <DS.NavLink ref={ref} href="#shop">
      Shop
    </DS.NavLink>
  ),
  OfflineNotice: ref => <DS.OfflineNotice ref={ref} />,
  OrderTimeline: ref => <DS.OrderTimeline ref={ref} steps={[{label: 'Placed'}]} />,
  Pagination: ref => <DS.Pagination ref={ref} page={1} pageCount={3} onChange={() => {}} />,
  PaymentCard: ref => <DS.PaymentCard ref={ref} cardNumber="6037 9918 1234 5678" />,
  ProductCard: ref => <DS.ProductCard ref={ref} name="VF-7K2M4Q" price="2,200,000 Toman" />,
  PromoCodeField: ref => <DS.PromoCodeField ref={ref} onApply={() => {}} />,
  ReminderRow: ref => (
    <DS.ReminderRow ref={ref} name="Rosa" day="12" month="Mehr" occasion="Birthday" />
  ),
  ResendCode: ref => <DS.ResendCode ref={ref} onResend={() => {}} />,
  SectionHeader: ref => <DS.SectionHeader ref={ref} title="New in" />,
  Stepper: ref => (
    <DS.Stepper ref={ref} steps={[{label: 'Bag'}, {label: 'Delivery'}]} current={0} />
  ),
  StockStatus: ref => <DS.StockStatus ref={ref} stock={{status: 'low', count: 2}} />,
  Tabs: ref => <DS.Tabs ref={ref} label="Account" items={[{id: 'orders', label: 'Orders'}]} />,
  Toast: ref => <DS.Toast ref={ref} title="Added to bag" />,
  Tooltip: ref => (
    <DS.Tooltip ref={ref} content="Saved items">
      <button>Saved</button>
    </DS.Tooltip>
  ),
  TrustSeal: ref => <DS.TrustSeal ref={ref} kind="enamad" href="#seal" />,
  BottomTabBar: ref => (
    <DS.BottomTabBar
      ref={ref}
      label="Main"
      items={[{id: 'bag', icon: 'shopping-bag', label: 'Bag'}]}
    />
  ),
  Carousel: ref => (
    <DS.Carousel ref={ref} label="New in">
      <span>One</span>
      <span>Two</span>
    </DS.Carousel>
  ),
  DatePicker: ref => <DS.DatePicker ref={ref} label="Delivery date" onChange={() => {}} />,
  Dialog: ref => (
    <DS.Dialog ref={ref} open inline title="Added">
      In your bag
    </DS.Dialog>
  ),
  DialogModal: ref => (
    <DS.Dialog ref={ref} open title="Added">
      In your bag
    </DS.Dialog>
  ),
  Gallery: ref => <DS.Gallery ref={ref} images={[photo, photo]} />,
  Lightbox: ref => <DS.Lightbox ref={ref} items={[{id: 1, images: [photo]}]} index={0} />,
  LocationPicker: ref => (
    <DS.LocationPicker
      ref={ref}
      id="pin"
      label="Pin"
      onChange={() => {}}
      loadLeaflet={never}
      tiles={tiles}
      center={[35.83, 50.97]}
    />
  ),
  OrderSummary: ref => (
    <DS.OrderSummary ref={ref} lines={[{name: 'VF-7K2M4Q', price: '2,200,000 Toman'}]} />
  ),
  PaymentStatus: ref => <DS.PaymentStatus ref={ref} status="paid" />,
  PlacesMap: ref => (
    <DS.PlacesMap
      ref={ref}
      id="places"
      label="Addresses"
      places={[]}
      loadLeaflet={never}
      tiles={tiles}
      center={[35.83, 50.97]}
    />
  ),
  ToastRegion: ref => <DS.ToastRegion ref={ref} queue={toasts} label="Notifications" />
};

const refs = Object.fromEntries(Object.keys(samples).map(name => [name, React.createRef()]));

function Fixture() {
  React.useEffect(() => {
    window.vendraRefs = refs;
    document.body.dataset.ready = 'true';
  }, []);
  return Object.entries(samples).map(([name, render]) => (
    <section key={name} data-sample={name}>
      <DS.ErrorBoundary title={name + ' failed'}>{render(refs[name])}</DS.ErrorBoundary>
    </section>
  ));
}

createRoot(document.getElementById('root')).render(
  <DS.VendraProvider locale="en-US">
    <Fixture />
  </DS.VendraProvider>
);
