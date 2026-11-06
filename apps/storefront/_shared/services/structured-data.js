// schema.org structured data (JSON-LD) for storefront pages: the product and its offer, the
// breadcrumb trail, the studio as a Florist, the FAQ and journal articles. Pages put the objects in
// `page.head.structuredData`; VF_SEO writes them into the prerendered <head> (headHtml) and keeps
// them current in the browser (syncHead). Every value comes from the store's data passed in or from
// VF_STORE, so a tenant's own catalogue, address and hours show up without code changes.
import {vfAbsoluteUrl} from '../platform/environment.js';
import {VF_STORE} from '../domain/store-config.js';
import {vfRouteUrl} from './routing.js';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const SCHEMA = 'https://schema.org/';
// The storefront's stock statuses (commerce.stockStatus) as schema.org availability.
const AVAILABILITY = {
  in: 'InStock',
  low: 'LimitedAvailability',
  soon: 'BackOrder',
  out: 'OutOfStock'
};

// The store's home page in `lang`, as an absolute URL when the build knows its origin.
const homeUrl = lang => vfAbsoluteUrl(vfRouteUrl({lang, view: 'home'}));
const absolute = urls => [...new Set(urls.map(vfAbsoluteUrl).filter(Boolean))];

// A Toman amount in an ISO 4217 currency: the store's active one, with Toman (IRT, not an ISO code)
// written as Rial (10 Rial to the Toman).
export function vfOfferPrice(toman, store = VF_STORE) {
  const code = store.currency === 'IRT' ? 'IRR' : store.currency;
  const currency =
    store.currency === 'IRT'
      ? {rate: 10, decimals: 0}
      : store.currencies[store.currency] || {rate: 1, decimals: 0};
  return {price: (toman * currency.rate).toFixed(currency.decimals), priceCurrency: code};
}

// The studio as a schema.org Florist (a LocalBusiness): name, address, map point, phone, opening
// hours (with dated exceptions such as holidays) and social profiles, from the store's settings.
export function vfFloristData(lang, store = VF_STORE) {
  const hours = store.hours || {week: [], exceptions: []};
  return {
    '@type': 'Florist',
    '@id': homeUrl(lang) + '#store',
    name: store.brand[lang],
    url: homeUrl(lang),
    telephone: store.phone,
    ...(store.email && {email: store.email}),
    ...(store.address && {
      address: {'@type': 'PostalAddress', streetAddress: store.address[lang]}
    }),
    ...(store.studio && {
      geo: {'@type': 'GeoCoordinates', latitude: store.studio.lat, longitude: store.studio.lng}
    }),
    openingHoursSpecification: (hours.week || []).map(run => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: run.days.map(day => SCHEMA + DAYS[day]),
      opens: run.opens,
      closes: run.closes
    })),
    // A closed day is written as opening and closing at midnight, as schema.org asks.
    ...(hours.exceptions?.length && {
      specialOpeningHoursSpecification: hours.exceptions.map(day => ({
        '@type': 'OpeningHoursSpecification',
        validFrom: day.date,
        validThrough: day.date,
        opens: day.closed ? '00:00' : day.opens,
        closes: day.closed ? '00:00' : day.closes
      }))
    }),
    ...(store.instagram?.url && {sameAs: [store.instagram.url]})
  };
}

// A trail of {name, url} as a schema.org BreadcrumbList; the last item (this page) may have no url.
export function vfBreadcrumbData(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && {item: vfAbsoluteUrl(item.url)})
    }))
  };
}

// A product as a schema.org Product with one Offer. Its name is the product code (Product.token),
// as everywhere in the storefront; the description and category are the localized ones.
export function vfProductData(
  {product, lang, url, images, description, category},
  store = VF_STORE
) {
  const stock = product.stock || {status: 'in'};
  return {
    '@type': 'Product',
    name: product.id,
    sku: product.id,
    ...(description && {description}),
    ...(category && {category}),
    image: absolute(images),
    url: vfAbsoluteUrl(url),
    offers: {
      '@type': 'Offer',
      url: vfAbsoluteUrl(url),
      ...vfOfferPrice(product.price, store),
      availability: SCHEMA + (AVAILABILITY[stock.status] || 'InStock'),
      ...(stock.status === 'soon' && stock.date && {availabilityStarts: stock.date}),
      itemCondition: SCHEMA + 'NewCondition',
      seller: {'@id': homeUrl(lang) + '#store', '@type': 'Florist', name: store.brand[lang]}
    }
  };
}

// Question groups ([{items: [{title, content}]}]) as one schema.org FAQPage.
export function vfFaqData(groups) {
  return {
    '@type': 'FAQPage',
    mainEntity: groups.flatMap(group =>
      group.items.map(item => ({
        '@type': 'Question',
        name: item.title,
        acceptedAnswer: {'@type': 'Answer', text: item.content}
      }))
    )
  };
}

// A journal post as a schema.org Article, published by the store.
export function vfArticleData(
  {headline, description, image, published, url, lang},
  store = VF_STORE
) {
  const publisher = {'@type': 'Organization', name: store.brand[lang], url: homeUrl(lang)};
  return {
    '@type': 'Article',
    headline,
    ...(description && {description}),
    image: absolute([image]),
    ...(published && {datePublished: published}),
    inLanguage: lang,
    mainEntityOfPage: vfAbsoluteUrl(url),
    author: publisher,
    publisher
  };
}
