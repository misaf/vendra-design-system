// An API record by its IRI (e.g. /api/catalog/product-prices/201) from a list of records.
export const apiRecord = (list, iri) => {
  const id = Number(
    String(iri || '')
      .split('/')
      .pop()
  );
  return list.find(record => record.id === id) || null;
};

// How available an API Product is: 'in' stock, 'low' (at or under its stockThreshold, with `count`
// left), 'soon' (out of stock but availableSoon, with the ISO `date` it returns, or null), or 'out'.
export const stockStatus = product => {
  if (!product.inStock)
    return product.availableSoon
      ? {
          status: 'soon',
          date: product.availabilityDate ? product.availabilityDate.slice(0, 10) : null
        }
      : {status: 'out'};
  if (product.stockThreshold != null && product.quantity <= product.stockThreshold)
    return {status: 'low', count: product.quantity};
  return {status: 'in'};
};

// A photo for Picture from an API Multimedia record. `responsiveImages` maps "<width>" to a URL in the
// photo's own format and "<format> <width>" (e.g. "avif 480", "webp 960") to smaller formats;
// `customProperties` carries `width`, `height`, `placeholder` (a tiny blurred data: URI) and the alt
// text per language as `alt_en` / `alt_fa`. null without a URL.
const IMAGE_TYPES = {avif: 'image/avif', webp: 'image/webp', jpeg: 'image/jpeg', png: 'image/png'};
export const imageFromApi = (record, lang) => {
  if (!record || !record.url) return null;
  const candidates = {};
  Object.entries(record.responsiveImages || {}).forEach(([key, url]) => {
    const [format, width] = /^\d+$/.test(key) ? ['', key] : key.split(' ');
    if (!url || !/^\d+$/.test(width || '')) return;
    (candidates[format] = candidates[format] || []).push([Number(width), url]);
  });
  const srcSet = format =>
    (candidates[format] || [])
      .sort((a, b) => a[0] - b[0])
      .map(([width, url]) => url + ' ' + width + 'w')
      .join(', ');
  const sources = ['avif', 'webp']
    .filter(format => candidates[format])
    .map(format => ({type: IMAGE_TYPES[format], srcSet: srcSet(format)}));
  const custom = record.customProperties || {};
  const size = value => (/^\d+$/.test(value || '') ? Number(value) : undefined);
  const photo = {src: record.url};
  if (candidates['']) photo.srcSet = srcSet('');
  if (sources.length) photo.sources = sources;
  if (size(custom.width) && size(custom.height)) {
    photo.width = size(custom.width);
    photo.height = size(custom.height);
  }
  if (/^data:image\//.test(custom.placeholder || '')) photo.placeholder = custom.placeholder;
  if (lang && custom['alt_' + lang] != null) photo.alt = custom['alt_' + lang];
  return photo;
};

// A storefront product from an API Product, resolved against its prices, photos and categories.
// `extras` holds storefront fields the API doesn't have yet, keyed by Product.token. `images` are
// photos for Picture; each language's `alts` holds their alt text ('' when the API has none).
export const productFromApi = (product, {prices, media, categories, extras = {}, placeholder}) => {
  const extra = extras[product.token] || {};
  const price = apiRecord(prices, product.latestProductPrice);
  const category = categories.find(item => item.id === product.productCategory.id);
  const records = product.multimedia
    .map(iri => apiRecord(media, iri))
    .filter(record => record && record.url);
  const images = records.map(record => imageFromApi(record));
  const {badge, ...flags} = extra;
  const words = lang => ({
    sub: product.name[lang] || '',
    alts: records.map(record => imageFromApi(record, lang).alt ?? ''),
    ...(badge && badge[lang] ? {badge: badge[lang]} : {})
  });
  return {
    id: product.token,
    apiId: product.id,
    ...flags,
    occasions: extra.occasions || [],
    cat: category ? category.slug.en : '',
    ...(product.inStock ? {} : {inStock: false}),
    stock: stockStatus(product),
    quantity: product.quantity,
    price: price ? price.amount : null,
    image: images[0] || {src: placeholder},
    images: images.length ? images : [{src: placeholder}],
    en: words('en'),
    fa: words('fa')
  };
};
