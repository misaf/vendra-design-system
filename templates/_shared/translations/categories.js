// Shared category names; product IDs and filter behavior stay in page logic.
const VF_CATEGORY_COPY = {
  en: {
    all: 'All',
    bouquets: 'Bouquets',
    boxes: 'Flower boxes',
    orchids: 'Orchids',
    bridal: 'Bridal'
  },
  fa: {
    all: 'همه',
    bouquets: 'دسته‌گل',
    boxes: 'باکس گل',
    orchids: 'ارکیده',
    bridal: 'دسته‌گل عروس'
  }
};

// One product of each category, used as its kind ("Flower box · Roses · satin").
const VF_CATEGORY_ITEM = {
  en: {bouquets: 'Bouquet', boxes: 'Flower box', orchids: 'Orchid', bridal: 'Bridal bouquet'},
  fa: {bouquets: 'دسته‌گل', boxes: 'باکس گل', orchids: 'ارکیده', bridal: 'دسته‌گل عروس'}
};

// Occasions the shop filters by; products list theirs in catalog.js. (Reminder dates are VF_OCCASIONS in account-data.js.)
const VF_SHOP_OCCASIONS = ['birthday', 'anniversary', 'thanks', 'sympathy'];
const VF_SHOP_OCCASION_COPY = {
  en: {
    all: 'All occasions',
    birthday: 'Birthday',
    anniversary: 'Anniversary',
    thanks: 'Thank you',
    sympathy: 'Sympathy'
  },
  fa: {
    all: 'همه مناسبت‌ها',
    birthday: 'تولد',
    anniversary: 'سالگرد ازدواج',
    thanks: 'تشکر',
    sympathy: 'تسلیت'
  }
};
