import '../../../guidelines/card-runtime.js';
const {
  Tooltip,
  IconButton,
  Tabs,
  Toast,
  QuantityInput,
  RangeSlider,
  Input,
  Select,
  DatePicker,
  RadioGroup,
  Radio
} = window.VendraDesignSystem;
const lang = new URLSearchParams(location.search).get('lang') === 'fa' ? 'fa' : 'en';
document.documentElement.lang = lang;
document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
const items = [
  {id: 'orders', label: 'Orders'},
  {id: 'addresses', label: 'Addresses'},
  {id: 'profile', label: 'Profile'}
];
function App() {
  const [tab, setTab] = React.useState('orders');
  const [closed, setClosed] = React.useState(0);
  const [quantity, setQuantity] = React.useState(2);
  const [price, setPrice] = React.useState([20, 80]);
  const [note, setNote] = React.useState('');
  const [city, setCity] = React.useState('');
  const [day, setDay] = React.useState('2026-10-08');
  const [pay, setPay] = React.useState('card');
  return (
    <>
      <section data-test="tooltip">
        <Tooltip content="Save to favourites">
          <IconButton icon="heart" label="Save" variant="outline" />
        </Tooltip>{' '}
        <button type="button">After</button>
      </section>
      <section data-test="tabs">
        <Tabs items={items} value={tab} onChange={setTab} label="Account">
          {tab} panel
        </Tabs>
      </section>
      <section data-test="quantity">
        <QuantityInput
          value={quantity}
          min={1}
          max={3}
          onChange={setQuantity}
          labels={{dec: 'Fewer', inc: 'More', value: 'Quantity'}}
        />
        <output data-test="quantity">{quantity}</output>
      </section>
      <section data-test="range">
        <RangeSlider
          min={0}
          max={100}
          step={10}
          value={price}
          onChange={setPrice}
          formatValue={v => v + ' Toman'}
          labels={{min: 'Min price', max: 'Max price'}}
          label="Price"
        />
        <output data-test="range">{price.join('-')}</output>
      </section>
      <section data-test="input">
        <Input id="note" label="Note" hint="Optional" value={note} onChange={setNote} />
        <output data-test="note">{note}</output>
      </section>
      <section data-test="select">
        <Select
          id="city"
          label="City"
          placeholder="Choose a city"
          value={city}
          onChange={setCity}
          options={['Karaj', 'Tehran', {value: 'qom', label: 'Qom', disabled: true}, 'Shiraz']}
        />
        <output data-test="city">{city}</output>
      </section>
      <section data-test="date">
        <DatePicker
          id="when"
          lang={lang}
          label="Delivery"
          value={day}
          onChange={setDay}
          minDate="2026-10-05"
          years={2}
        />
        <output data-test="date">{day}</output>
      </section>
      <section data-test="radios">
        <RadioGroup legend="Payment" name="pay" value={pay} onChange={setPay}>
          <Radio value="card" label="Card" description="Transfer" />
          <Radio value="cod" label="Cash" disabled />
          <Radio value="wa" label="WhatsApp" />
        </RadioGroup>
        <output data-test="pay">{pay}</output>
      </section>
      <section data-test="toast">
        <Toast
          title="Added to your bag"
          message="Wild Meadow · Generous"
          onClose={() => setClosed(c => c + 1)}
        />
        <output data-test="closed">{closed}</output>
      </section>
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
