import '../card-runtime.js';
const {SearchField, FilterBar, Breadcrumb, Pagination, Meter, Spinner, Button, format} = window.VendraDesignSystem;
const T = {
  en: {h: 'English', ks: 'SearchField · empty and with text', search: 'Search the shop', ph: 'Roses, peonies, a gift box…', typed: 'peony',
    kf: 'FilterBar · remove one, or clear all', filters: [['occasion', 'Anniversary'], ['price', '1,000,000 – 3,000,000 Toman'], ['stock', 'In stock only']], reset: 'Show the filters again',
    kb: 'Breadcrumb', crumbs: ['Shop', 'Flower boxes', 'Ivory Morning box'],
    kp: 'Pagination · start, middle (links) and end',
    km: 'Meter · on the way and reached', left: n => format.money(n) + ' more for free delivery in Karaj', reached: 'Free delivery in Karaj', of: (a, b) => format.money(a) + ' of ' + format.money(b),
    kspin: 'Spinner · alone and in a button', loading: 'Loading delivery times', pay: 'Paying…', payLabel: 'Pay'},
  fa: {h: 'فارسی', ks: 'جستجو · خالی و با متن', search: 'جستجو در فروشگاه', ph: 'رز، گل صدتومانی، باکس هدیه…', typed: 'صدتومانی',
    kf: 'فیلترهای فعال · حذف یکی یا همه', filters: [['occasion', 'سالگرد'], ['price', '۱٬۰۰۰٬۰۰۰ – ۳٬۰۰۰٬۰۰۰ تومان'], ['stock', 'فقط موجودها']], reset: 'نمایش دوباره فیلترها',
    kb: 'مسیر صفحه', crumbs: ['فروشگاه', 'باکس گل', 'باکس صبح عاجی'],
    kp: 'صفحه‌بندی · ابتدا، میانه (پیوند) و انتها',
    km: 'پیشرفت · در راه و کامل', left: n => format.money(n, {lang: 'fa'}) + ' تا ارسال رایگان در کرج', reached: 'ارسال رایگان در کرج', of: (a, b) => format.money(a, {lang: 'fa'}) + ' از ' + format.money(b, {lang: 'fa'}),
    kspin: 'چرخنده · تنها و در دکمه', loading: 'در حال بارگذاری زمان‌های ارسال', pay: 'در حال پرداخت…', payLabel: 'پرداخت'}
};
const threshold = 5000000;
function Side({l}) {
  const t = T[l];
  const isFa = l === 'fa';
  const [page, setPage] = React.useState(5);
  const [filterIds, setFilterIds] = React.useState(t.filters.map(([id]) => id));
  const filters = t.filters
    .filter(([id]) => filterIds.includes(id))
    .map(([id, label]) => ({id, label, onRemove: () => setFilterIds(ids => ids.filter(x => x !== id))}));
  return (
    <div lang={l} dir={isFa ? 'rtl' : 'ltr'} data-lang={isFa ? 'fa' : undefined}>
      <div className="lh">{t.h}</div>
      <div>
        <div className="k">{t.ks}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <SearchField label={t.search} placeholder={t.ph} />
          <SearchField aria-label={t.search} defaultValue={t.typed} />
        </div>
      </div>
      <div>
        <div className="k">{t.kf}</div>
        {filters.length ? (
          <FilterBar filters={filters} onClearAll={() => setFilterIds([])} />
        ) : (
          <Button variant="ghost" size="sm" onClick={() => setFilterIds(t.filters.map(([id]) => id))}>{t.reset}</Button>
        )}
      </div>
      <div>
        <div className="k">{t.kb}</div>
        <Breadcrumb items={[{label: t.crumbs[0], href: '#shop'}, {label: t.crumbs[1], href: '#boxes'}, {label: t.crumbs[2]}]} />
      </div>
      <div>
        <div className="k">{t.kp}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center'}}>
          <Pagination page={1} pageCount={3} onChange={() => {}} />
          <Pagination page={page} pageCount={12} href={n => '?page=' + n} onChange={setPage} />
          <Pagination page={12} pageCount={12} onChange={() => {}} />
        </div>
      </div>
      <div>
        <div className="k">{t.km}</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <Meter label={t.left(1200000)} value={3800000} maxValue={threshold} valueLabel={t.of(3800000, threshold)} />
          <Meter label={t.reached} value={threshold} maxValue={threshold} valueLabel={t.of(5600000, threshold)} done />
        </div>
      </div>
      <div>
        <div className="k">{t.kspin}</div>
        <div className="row">
          <Spinner label={t.loading} />
          <span style={{color: 'var(--text-accent)'}}><Spinner size={28} label={t.loading} /></span>
          <Button loading loadingLabel={t.pay}>{t.payLabel}</Button>
          <Button variant="secondary" size="sm" loading loadingLabel={t.pay}>{t.payLabel}</Button>
        </div>
      </div>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<div className="split"><Side l="en" /><Side l="fa" /></div>);
