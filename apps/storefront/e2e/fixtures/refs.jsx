// Shared package fixture for DOM attribute and React 19 ref tests. Each component sits in
// its own ErrorBoundary so a single render failure doesn't break the rest of the fixture.
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
  Input: props => <DS.Input {...props} label="Name" />,
  PhoneInput: props => <DS.PhoneInput {...props} label="Phone" />,
  CodeInput: props => <DS.CodeInput {...props} label="Code" webOtp={false} />,
  Checkbox: props => <DS.Checkbox {...props} label="Gift wrap" />,
  Radio: props => (
    <DS.RadioGroup label="Size">
      <DS.Radio {...props} value="s" label="Small" />
    </DS.RadioGroup>
  ),
  Switch: props => <DS.Switch {...props} label="In stock only" />,
  ChoiceTile: props => (
    <DS.ChoiceGroup label="Delivery">
      <DS.ChoiceTile {...props} value="today" label="Today" />
    </DS.ChoiceGroup>
  ),
  QuantityInput: props => <DS.QuantityInput {...props} />,
  Select: props => <DS.Select {...props} label="City" options={['Karaj', 'Tehran']} />,
  SearchField: props => <DS.SearchField {...props} label="Search" />,
  // Everything else: the ref is the component's own element.
  ArchFrame: props => <DS.ArchFrame {...props} />,
  Badge: props => <DS.Badge {...props}>New</DS.Badge>,
  Button: props => <DS.Button {...props}>Add</DS.Button>,
  ButtonLink: props => (
    <DS.Button {...props} href="#shop">
      Shop
    </DS.Button>
  ),
  Card: props => <DS.Card {...props}>Card</DS.Card>,
  Chip: props => <DS.Chip {...props}>Roses</DS.Chip>,
  ChoiceGroupWrapped: props => (
    <DS.ChoiceGroup {...props} hint="Choose one" label="Wrap">
      <DS.ChoiceTile value="paper" label="Paper" />
    </DS.ChoiceGroup>
  ),
  ChoiceGroup: props => (
    <DS.ChoiceGroup {...props} label="Wrap">
      <DS.ChoiceTile value="paper" label="Paper" />
    </DS.ChoiceGroup>
  ),
  FieldMessage: props => <FieldMessage {...props}>Hint</FieldMessage>,
  Icon: props => <DS.Icon {...props} name="heart" />,
  IconButton: props => <DS.IconButton {...props} icon="heart" label="Save" />,
  LiveRegion: props => <DS.LiveRegion {...props}>Updated</DS.LiveRegion>,
  Meter: props => <DS.Meter {...props} label="Progress" value={40} />,
  Picture: props => <DS.Picture {...props} image={photo} />,
  Price: props => <DS.Price {...props} value="2,200,000 Toman" />,
  RadioGroupWrapped: props => (
    <DS.RadioGroup {...props} legend="Colour" hint="Choose one" aria-describedby="group-details">
      <DS.Radio value="red" label="Red" />
      <span id="group-details">Available colours</span>
    </DS.RadioGroup>
  ),
  RadioGroup: props => (
    <DS.RadioGroup {...props} label="Colour">
      <DS.Radio value="red" label="Red" />
    </DS.RadioGroup>
  ),
  RangeSlider: props => <DS.RangeSlider {...props} label="Price" />,
  SkeletonCard: props => <DS.Skeleton {...props} shape="card" />,
  SkeletonCircle: props => <DS.Skeleton {...props} shape="circle" />,
  Skeleton: props => <DS.Skeleton {...props} />,
  SkipLink: props => <DS.SkipLink {...props}>Skip to content</DS.SkipLink>,
  SpinnerDecorative: props => <DS.Spinner {...props} decorative />,
  Spinner: props => <DS.Spinner {...props} />,
  Accordion: props => (
    <DS.Accordion
      {...props}
      aria-labelledby="component-SectionHeader"
      items={[{id: 'a', title: 'Care', content: 'Water'}]}
    />
  ),
  AddressCard: props => <DS.AddressCard {...props} label="Home" line="12 Golestan St" />,
  Alert: props => (
    <DS.Alert {...props} tone="danger" role="note" aria-describedby="tenant-details">
      Saved
    </DS.Alert>
  ),
  AnnouncementBar: props => (
    <DS.AnnouncementBar {...props} label="News">
      Free delivery
    </DS.AnnouncementBar>
  ),
  BlogCard: props => <DS.BlogCard {...props} title="Peonies" href="#post" />,
  Breadcrumb: props => <DS.Breadcrumb {...props} items={[{label: 'Shop', href: '#shop'}]} />,
  CategoryButton: props => <DS.CategoryCard {...props} label="Roses" onClick={() => {}} />,
  CategoryCard: props => <DS.CategoryCard {...props} label="Roses" href="#roses" />,
  DetailList: props => <DS.DetailList {...props} rows={[{label: 'Code', value: 'VF-7K2M4Q'}]} />,
  EmptyState: props => <DS.EmptyState {...props} title="Nothing here" />,
  ErrorSummary: props => (
    <DS.ErrorSummary {...props} errors={[{text: 'Enter a name', target: 'name'}]} />
  ),
  FilterBar: props => <DS.FilterBar {...props} filters={[{id: 'red', label: 'Red'}]} />,
  LanguageSwitch: props => <DS.LanguageSwitch {...props} />,
  LineItem: props => <DS.LineItem {...props} name="VF-7K2M4Q" price="2,200,000 Toman" />,
  LoadMore: props => (
    <DS.LoadMore {...props} shown={12} total={40} status="12 of 40" label="Show more" />
  ),
  MenuList: props => (
    <DS.MenuList {...props} label="Menu">
      <a href="#shop">Shop</a>
    </DS.MenuList>
  ),
  NavLink: props => (
    <DS.NavLink {...props} href="#shop">
      Shop
    </DS.NavLink>
  ),
  OfflineNotice: props => <DS.OfflineNotice {...props} />,
  OrderTimeline: props => <DS.OrderTimeline {...props} steps={[{label: 'Placed'}]} />,
  Pagination: props => <DS.Pagination {...props} page={1} pageCount={3} onChange={() => {}} />,
  PaymentCard: props => <DS.PaymentCard {...props} cardNumber="6037 9918 1234 5678" />,
  ProductCard: props => <DS.ProductCard {...props} name="VF-7K2M4Q" price="2,200,000 Toman" />,
  PromoCodeField: props => <DS.PromoCodeField {...props} onApply={() => {}} />,
  ReminderRow: props => (
    <DS.ReminderRow {...props} name="Rosa" day="12" month="Mehr" occasion="Birthday" />
  ),
  ResendCode: props => <DS.ResendCode {...props} onResend={() => {}} />,
  SectionHeader: props => <DS.SectionHeader {...props} title="New in" />,
  StepperCompact: props => <DS.Stepper {...props} compact steps={[{label: 'Bag'}]} />,
  Stepper: props => (
    <DS.Stepper {...props} steps={[{label: 'Bag'}, {label: 'Delivery'}]} current={0} />
  ),
  StockStatus: props => <DS.StockStatus {...props} stock={{status: 'low', count: 2}} />,
  Tabs: props => (
    <DS.Tabs
      {...props}
      aria-labelledby="component-SectionHeader"
      items={[{id: 'orders', label: 'Orders'}]}
    />
  ),
  Toast: props => (
    <DS.Toast {...props} title="Added to bag" message="Ready" aria-describedby="tenant-details" />
  ),
  Tooltip: props => (
    <DS.Tooltip {...props} content="Saved items">
      <button>Saved</button>
    </DS.Tooltip>
  ),
  TrustSeal: props => <DS.TrustSeal {...props} kind="enamad" href="#seal" />,
  BottomTabBar: props => (
    <DS.BottomTabBar
      {...props}
      label="Main"
      items={[{id: 'bag', icon: 'shopping-bag', label: 'Bag'}]}
    />
  ),
  Carousel: props => (
    <DS.Carousel {...props} label="New in">
      <span>One</span>
      <span>Two</span>
    </DS.Carousel>
  ),
  DatePickerYearly: props => (
    <DS.DatePicker {...props} yearly label="Birthday" onChange={() => {}} />
  ),
  DatePicker: props => <DS.DatePicker {...props} label="Delivery date" onChange={() => {}} />,
  Dialog: props => (
    <DS.Dialog {...props} open inline title="Added">
      In your bag
    </DS.Dialog>
  ),
  DialogModal: props => (
    <DS.Dialog {...props} open title="Added" aria-describedby="tenant-details">
      <p id="tenant-details">In your bag</p>
    </DS.Dialog>
  ),
  Gallery: props => <DS.Gallery {...props} images={[photo, photo]} />,
  Lightbox: props => <DS.Lightbox {...props} items={[{id: 1, images: [photo]}]} index={0} />,
  LocationPicker: props => (
    <DS.LocationPicker
      {...props}
      label="Pin"
      onChange={() => {}}
      loadLeaflet={never}
      tiles={tiles}
      center={[35.83, 50.97]}
    />
  ),
  OrderSummary: props => (
    <DS.OrderSummary {...props} lines={[{name: 'VF-7K2M4Q', price: '2,200,000 Toman'}]} />
  ),
  PaymentStatus: props => <DS.PaymentStatus {...props} status="paid" />,
  PlacesMap: props => (
    <DS.PlacesMap
      {...props}
      label="Addresses"
      places={[]}
      loadLeaflet={never}
      tiles={tiles}
      center={[35.83, 50.97]}
    />
  ),
  ToastRegion: props => <DS.ToastRegion {...props} queue={toasts} label="Notifications" />
};

const refs = Object.fromEntries(Object.keys(samples).map(name => [name, React.createRef()]));

function Fixture() {
  React.useEffect(() => {
    window.vendraRefs = refs;
    document.body.dataset.ready = 'true';
  }, []);
  return Object.entries(samples).map(([name, render]) => (
    <section key={name} data-sample={name}>
      <DS.ErrorBoundary title={name + ' failed'}>
        {render({
          ref: refs[name],
          id: 'component-' + name,
          'data-testid': 'component-' + name,
          'data-analytics': name
        })}
      </DS.ErrorBoundary>
    </section>
  ));
}

createRoot(document.getElementById('root')).render(
  <DS.VendraProvider locale="en-US">
    <Fixture />
  </DS.VendraProvider>
);
