// One element per component export, with fixed props, for the hydration test: the spec renders
// them with react-dom/server in Node and the fixture hydrates the result in the browser, both from
// dist/. Plain ES module with no JSX, so Node and Vite both load it; it is given the package
// (`ds`) and React instead of importing them, so each side passes its own copy.
const PROPS = {
  Icon: {name: 'flower-2'},
  IconButton: {icon: 'heart', label: 'Save'},
  PaymentStatus: {
    status: 'pending',
    amount: '۲٬۴۰۰٬۰۰۰ تومان',
    orderNumber: 'VN-10522',
    onCheckAgain() {},
    supportHref: 'tel:+989121234567'
  },
  Picture: {
    image: {
      src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"/%3E',
      placeholder:
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 5"/%3E',
      sources: [{type: 'image/avif', srcSet: 'data:image/avif;base64,AAAA 480w'}],
      width: 4,
      height: 5
    },
    alt: 'Roses',
    priority: true
  },
  ResendCode: {seconds: 60, onResend() {}},
  Price: {value: '۴۹۰٬۰۰۰ تومان', compareAt: '۵۶۰٬۰۰۰ تومان'},
  Pagination: {page: 5, pageCount: 12, href: page => '?page=' + page},
  FilterBar: {
    filters: [
      {id: 'occasion', label: 'Anniversary', onRemove() {}},
      {id: 'stock', label: 'In stock only', onRemove() {}}
    ],
    onClearAll() {}
  },
  TrustSeal: {kind: 'enamad', href: 'https://enamad.ir/'},
  StockStatus: {stock: {status: 'soon', date: '2026-10-12'}},
  Breadcrumb: {items: [{label: 'Shop', href: '?view=shop'}, {label: 'Orchids'}]},
  Meter: {label: 'Free delivery', value: 3, maxValue: 5},
  ProductCard: {name: 'VF-9FA2KE', price: '2,200,000 Toman', href: '?view=product'},
  SearchField: {label: 'Search'},
  Spinner: {label: 'Loading'}
};
// Parts that only exist inside their group render inside it.
const GROUPS = {ChoiceTile: 'ChoiceGroup', Radio: 'RadioGroup'};

// The capitalised function exports (ToastQueue is a class, MessagesContext a context).
export function componentNames(ds) {
  return Object.keys(ds).filter(
    name =>
      /^[A-Z][a-z]/.test(name) &&
      typeof ds[name] === 'function' &&
      !/^class\b/.test(Function.prototype.toString.call(ds[name]))
  );
}

// Every component inside VendraProvider and an element carrying the page's lang, as an app has.
export function componentSamples(ds, React, lang) {
  const h = React.createElement;
  const queue = new ds.ToastQueue();
  const element = name => {
    const props = {...(PROPS[name] || {}), ...(name === 'ToastRegion' ? {queue} : {})};
    if (GROUPS[name]) return h(ds[GROUPS[name]], {label: 'Group'}, h(ds[name], {value: 'a'}));
    return h(ds[name], props);
  };
  return h(
    ds.VendraProvider,
    {locale: lang === 'fa' ? 'fa-IR' : 'en-US'},
    h(
      'div',
      {lang, dir: lang === 'fa' ? 'rtl' : 'ltr'},
      componentNames(ds).map(name =>
        h('section', {key: name, 'data-component': name}, element(name))
      )
    )
  );
}
