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
  Radio,
  Dialog,
  Button,
  Accordion,
  Carousel,
  ChoiceGroup,
  ChoiceTile,
  CodeInput,
  PhoneInput,
  VendraProvider
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
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [openPanels, setOpenPanels] = React.useState(['care']);
  const [slot, setSlot] = React.useState('morning');
  const [code, setCode] = React.useState('');
  const [completed, setCompleted] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState({number: '', mobile: false});
  return (
    <VendraProvider locale={lang === 'fa' ? 'fa-IR' : 'en-US'}>
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
      <section data-test="dialog">
        <Button variant="secondary" onClick={() => setDialogOpen(true)}>
          Delivery details
        </Button>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Delivery details"
          footer={<Button onClick={() => setDialogOpen(false)}>Save</Button>}
        >
          <Input id="recipient" label="Recipient" />
        </Dialog>
      </section>
      <section data-test="accordion">
        <Accordion
          value={openPanels}
          onChange={setOpenPanels}
          items={[
            {id: 'care', title: 'Flower care', content: 'Trim the stems.'},
            {id: 'returns', title: 'Returns', content: 'Within a day.'}
          ]}
        />
        <output data-test="panels">{openPanels.join(',')}</output>
      </section>
      <section data-test="carousel" style={{maxWidth: 480}}>
        <Carousel label="New arrivals" arrows itemMin="180px" perView={2} bleed={false}>
          {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map(name => (
            <div key={name} style={{height: 60, background: 'var(--surface-muted)'}}>
              {name}
            </div>
          ))}
        </Carousel>
      </section>
      <section data-test="choices">
        <ChoiceGroup label="Delivery time" columns={3} value={slot} onChange={setSlot}>
          <ChoiceTile value="morning" label="Morning" description="09:00–12:00" />
          <ChoiceTile value="noon" label="Noon" disabled description="Closed" />
          <ChoiceTile value="evening" label="Evening" description="17:00–20:00" />
        </ChoiceGroup>
        <output data-test="slot">{slot}</output>
      </section>
      <section data-test="code">
        <CodeInput
          id="code"
          label="Code"
          value={code}
          onChange={setCode}
          onComplete={setCompleted}
        />
        <output data-test="code">{code}</output>
        <output data-test="completed">{completed}</output>
      </section>
      <section data-test="phone">
        <PhoneInput
          id="phone"
          label="Phone"
          value={phone}
          onChange={(typed, parsed) => {
            setPhone(typed);
            setPhoneNumber(parsed);
          }}
        />
        <output data-test="phone">
          {phoneNumber.number + (phoneNumber.mobile ? ' mobile' : '')}
        </output>
      </section>
    </VendraProvider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
