import type {LiveCatalogProduct} from '../product';
import type {
  ProductDetailsData,
  ProductLocale
} from '../product/components/StorefrontProductHeading/ProductDetails';

export function localized(values: Record<string, unknown> | undefined, lang: ProductLocale) {
  const value = values?.[lang] ?? values?.en ?? values?.fa;
  return typeof value === 'string' ? value : '';
}

type DescriptionNode = {type: string; content?: unknown; text?: unknown};

function isDescriptionNode(value: unknown): value is DescriptionNode {
  return !!value && typeof value === 'object' && 'type' in value && typeof value.type === 'string';
}

function descriptionText(value: unknown): string {
  if (!isDescriptionNode(value)) return '';
  if (value.type === 'text' && typeof value.text === 'string') return value.text;
  if (value.type === 'hardBreak') return ' ';
  return Array.isArray(value.content) ? value.content.map(descriptionText).join('') : '';
}

function descriptionParagraphs(value: unknown): string[] {
  if (!isDescriptionNode(value)) return [];
  if (['paragraph', 'heading', 'text'].includes(value.type)) return [descriptionText(value)];
  return Array.isArray(value.content) ? value.content.flatMap(descriptionParagraphs) : [];
}

function productDescription(values: Record<string, unknown> | undefined, lang: ProductLocale) {
  const locales: ProductLocale[] = [lang, 'en', 'fa'];
  const language = locales.find(locale => values?.[locale] != null);
  if (!language) return null;
  const value = values?.[language];
  const paragraphs =
    typeof value === 'string'
      ? [value]
      : isDescriptionNode(value) && value.type === 'doc'
        ? descriptionParagraphs(value)
        : [];
  return {locale: language, paragraphs: paragraphs.filter(text => text.trim())};
}

export function liveProductDetails(
  product: LiveCatalogProduct,
  price: string,
  locale: ProductLocale
): ProductDetailsData {
  return {
    name: localized(product.name, locale) || product.token,
    price,
    description: productDescription(product.description, locale)
  };
}
