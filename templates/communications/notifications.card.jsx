import '../../guidelines/card-runtime.js';
const N = window.VF_NOTIFY;
const LABEL = {
  received: 'Order received',
  paid: 'Payment confirmed',
  ready: 'Ready — photo',
  onway: 'On its way',
  delivered: 'Delivered',
  delayed: 'Running late',
  cancelled: 'Cancelled',
  reminder: 'Occasion reminder'
};
// SAMPLE values — the backend fills these from the order / reminder record.
const VARS = {
  en: {
    first: 'Shirin',
    id: 'VN-10522',
    date: 'Fri 9 Mehr (1 Oct)',
    slot: '9:00-12:00',
    amount: '2,400,000 Toman',
    items: [{code: 'VF-7K2M4Q', qty: 2}, {code: 'VF-3HX9TP'}],
    recipient: 'Mina',
    time: '10:40',
    link: 'example.test/o/10522',
    remLink: 'example.test/r',
    wa: '0912 564 9438',
    name: 'Mum',
    occasion: 'birthday'
  },
  fa: {
    first: 'شیرین',
    id: 'VN-10522',
    date: 'جمعه ۹ مهر',
    slot: '۹ تا ۱۲',
    amount: '۲٬۴۰۰٬۰۰۰ تومان',
    items: [{code: 'VF-7K2M4Q', qty: 2}, {code: 'VF-3HX9TP'}],
    recipient: 'مینا',
    time: '10:40',
    link: 'example.test/o/10522',
    remLink: 'example.test/r',
    wa: '0912 564 9438',
    name: 'مامان',
    occasion: 'تولد'
  }
};
const KEY = 'vendra-notify-card';
function Seg({value, set, opts, label}) {
  return (
    <div>
      <label id={label}>{label}</label>
      <div className="seg" role="radiogroup" aria-labelledby={label}>
        {opts.map(([v, l]) => (
          <button key={v} role="radio" aria-checked={value === v} onClick={() => set(v)}>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
const waHtml = s =>
  s
    .split(/(\*[^*\n]+\*)/g)
    .map((p, i) =>
      p.startsWith('*') && p.endsWith('*') ? <strong key={i}>{p.slice(1, -1)}</strong> : p
    );
function App() {
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch (e) {
      return {};
    }
  })();
  const [ch, setCh] = React.useState(saved.ch || 'sms');
  React.useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ch}));
    } catch (e) {}
  }, [ch]);
  return (
    <>
      <div className="top">
        <div>
          <h1>Order notifications</h1>
          <p>
            Every message uses the customer’s <b>account language</b> (Account → Profile). Switching
            language from the site menu never changes their messages. English left, Persian right.
          </p>
        </div>
        <div className="ctl">
          <Seg
            label="Channel"
            value={ch}
            set={setCh}
            opts={[
              ['sms', 'SMS'],
              ['wa', 'WhatsApp']
            ]}
          />
        </div>
      </div>
      <div className="grid">
        {N.events.map(e => (
          <section key={e} className="ev" aria-labelledby={'h-' + e}>
            <h2 id={'h-' + e}>
              {LABEL[e]}
              <span>{e}</span>
            </h2>
            <p className="when">{N.templates.en[e].when}</p>
            <div className="pair">
              {['en', 'fa'].map(lang => {
                const r = N.render(e, {preferredLocale: lang}, VARS[lang], ch);
                const tp = N.templates[lang][e];
                const s = r.sms;
                const dir = lang === 'fa' ? 'rtl' : 'ltr';
                return (
                  <div key={lang} className="side" lang={lang} dir={dir}>
                    <div className="lk">{lang === 'fa' ? 'فارسی' : 'English'}</div>
                    <div className={'thread' + (ch === 'wa' ? ' thread--wa' : '')}>
                      <div className="from">
                        {ch === 'wa'
                          ? lang === 'fa'
                            ? 'وندرا · واتساپ'
                            : 'Vendra · WhatsApp'
                          : lang === 'fa'
                            ? 'وندرا'
                            : 'Vendra'}
                      </div>
                      <div className="bub">
                        {ch === 'wa' ? waHtml(r.text) : r.text}
                        <time>{lang === 'fa' ? '۱۰:۴۲' : '10:42'}</time>
                      </div>
                    </div>
                    <div className="meta" dir="ltr">
                      {s ? (
                        <>
                          <span className="pill">{s.chars} chars</span>
                          <span className={'pill' + (s.parts > 2 ? ' pill--warn' : '')}>
                            {s.parts} SMS part{s.parts > 1 ? 's' : ''}
                          </span>
                          <span className="pill">{s.encoding}</span>
                        </>
                      ) : (
                        <span className="pill">*bold* renders · no limit</span>
                      )}
                    </div>
                    <details>
                      <summary>{lang === 'fa' ? 'قالب' : 'Template'}</summary>
                      <pre>{tp[ch]}</pre>
                    </details>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <div className="rules">
        <div>
          <b>Which language</b>The account’s <code>preferredLocale</code>, set in Profile. Guests:
          the page language at checkout. Neither → Persian.
        </div>
        <div>
          <b>Numbers</b>Persian messages use Persian digits for dates, times and amounts. Order
          numbers, links and phone numbers stay Latin so they can be tapped and searched.
        </div>
        <div>
          <b>Product codes</b>Order, ready and on-the-way messages name the products by code (
          <code>items</code>: the order lines), so customer, florist and courier mean the same
          product. Codes stay Latin; more than three products show the first two and “+N more”.
        </div>
        <div>
          <b>SMS length</b>English stays in GSM-7 (160 per part): straight quotes, no dashes or
          emoji. Persian is UCS-2 (70 per part, 67 when split) — keep it to 2 parts.
        </div>
        <div>
          <b>Reminders</b>Promotional, so they carry an opt-out (“Reply STOP” / «لغو۱۱»). Order
          messages are transactional and don’t.
        </div>
      </div>
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
