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
  },
  {
    id: 15,
    name: {en: 'Roses', fa: 'گل رز'},
    slug: {en: 'rose-bouquets', fa: 'دسته-گل-رز'},
    description: {},
    position: 5,
    active: true
  },
  {
    id: 16,
    name: {en: 'Baskets', fa: 'سبد گل'},
    slug: {en: 'baskets', fa: 'سبد-گل'},
    description: {},
    position: 6,
    active: true
  },
  {
    id: 17,
    name: {en: 'Plants', fa: 'گیاهان'},
    slug: {en: 'plants', fa: 'گیاهان'},
    description: {},
    position: 7,
    active: true
  },
  {
    id: 18,
    name: {en: 'Dried flowers', fa: 'گل خشک'},
    slug: {en: 'dried', fa: 'گل-خشک'},
    description: {},
    position: 8,
    active: true
  },
  {
    id: 19,
    name: {en: 'Wreaths', fa: 'تاج گل'},
    slug: {en: 'wreaths', fa: 'تاج-گل'},
    description: {},
    position: 9,
    active: true
  },
  {
    id: 20,
    name: {en: 'Table flowers', fa: 'گل میز'},
    slug: {en: 'table', fa: 'گل-میز'},
    description: {},
    position: 10,
    active: true
  },
  {
    id: 21,
    name: {en: 'Wedding cars', fa: 'ماشین عروس'},
    slug: {en: 'wedding-cars', fa: 'ماشین-عروس'},
    description: {},
    position: 11,
    active: true
  },
  {
    id: 22,
    name: {en: 'Gift boxes', fa: 'باکس هدیه'},
    slug: {en: 'gifts', fa: 'باکس-هدیه'},
    description: {},
    position: 12,
    active: true
  }
];

// The active categories' English slugs in the store's order: the shop's category filter and its
// ?cat= values.
export const VF_CATEGORY_SLUGS = VF_API_PRODUCT_CATEGORIES.filter(category => category.active)
  .sort((a, b) => a.position - b.position)
  .map(category => category.slug.en);
