import {VF_PRODUCTS, vfFindProduct} from '../storefront/catalog/catalog.js';
import {VF_API_PRODUCTS} from '../storefront/catalog/sample-catalog.js';
import {VF_MONEY} from '../storefront/pricing/formatting.js';

/** @typedef {import('../storefront/catalog/product/components/StorefrontProductHeading/ProductDetails').ProductLocale} ProductLocale */
/** @typedef {import('../storefront/catalog/product/components/StorefrontProductHeading/ProductDetails').ProductDetailsData} ProductDetailsData */

const descriptions = new Map(VF_API_PRODUCTS.map(({token, description}) => [token, description]));

export function demoProductCodes() {
  return VF_PRODUCTS.map(({id}) => id);
}

/** @param {string} code
 * @param {ProductLocale} locale
 */
export function readDemoProduct(code, locale) {
  const product = vfFindProduct(code);
  if (!product) return null;
  const description = descriptions.get(product.id)?.[locale];
  /** @type {ProductDetailsData} */
  const details = {
    name: product.id,
    price: VF_MONEY(product.price, locale === 'fa'),
    description: description ? {locale, paragraphs: [description]} : null
  };
  return {product, details};
}
