// Sample product categories, shaped like the Vendra API's ProductCategory. Catalog data and the
// category names (translations/categories.js) both read them, so they load before either.
// GET /api/catalog/product-categories
export const VF_API_PRODUCT_CATEGORIES = [
  {
    id: 11,
    name: {en: 'Bouquets', fa: 'دسته‌گل'},
    slug: {en: 'bouquets', fa: 'دسته-گل'},
    description: {},
    position: 1,
    active: true
  },
  {
    id: 12,
    name: {en: 'Flower boxes', fa: 'باکس گل'},
    slug: {en: 'boxes', fa: 'باکس-گل'},
    description: {},
    position: 2,
    active: true
  },
  {
    id: 13,
    name: {en: 'Orchids', fa: 'ارکیده'},
    slug: {en: 'orchids', fa: 'ارکیده'},
    description: {},
    position: 3,
    active: true
  },
  {
    id: 14,
    name: {en: 'Bridal', fa: 'دسته‌گل عروس'},
    slug: {en: 'bridal', fa: 'دسته-گل-عروس'},
    description: {},
    position: 4,
    active: true
  }
];
