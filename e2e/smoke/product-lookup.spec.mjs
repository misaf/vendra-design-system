import {expect, test} from '@playwright/test';

const base = process.env.VF_BASE_PATH || '';
const localized = {
  en: {
    direction: 'ltr',
    catalog: 'Flower catalog',
    name: 'Garden roses',
    description: 'A bouquet of fresh roses.',
    richDescription: ['Cut fresh each morning.', 'Arrange in a clean vase.'],
    price: '240,000 Toman',
    priceUnavailable: 'Price unavailable',
    orderingUnavailable: 'Online ordering is unavailable.',
    missing: 'Page not found',
    failure: 'The catalog is temporarily unavailable.',
    retry: 'Try again'
  },
  fa: {
    direction: 'rtl',
    catalog: 'فهرست گل‌ها',
    name: 'رزهای باغی',
    description: 'دسته‌گلی از رزهای تازه.',
    richDescription: ['هر صبح تازه چیده می‌شوند.', 'در گلدان تمیز بچینید.'],
    price: '۲۴۰٬۰۰۰ تومان',
    priceUnavailable: 'قیمت در دسترس نیست',
    orderingUnavailable: 'ثبت سفارش آنلاین در دسترس نیست.',
    missing: 'صفحه پیدا نشد',
    failure: 'فهرست محصولات موقتاً در دسترس نیست.',
    retry: 'تلاش دوباره'
  }
};

for (const [locale, strings] of Object.entries(localized)) {
  const productPath = code => base + '/' + locale + '/product/' + code + '/';

  test('shows the current price on the product page in ' + locale, async ({page}) => {
    const response = await page.goto(productPath('PRICED-' + locale));
    expect(response.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('html')).toHaveAttribute('dir', strings.direction);
    await expect(page.getByRole('heading', {level: 1})).toHaveText(strings.name);
    await expect(page.getByText(strings.description, {exact: true})).toBeVisible();
    await expect(page.getByText(strings.price, {exact: true})).toBeVisible();
  });

  test('shows an existing product with no current price in ' + locale, async ({page}) => {
    const response = await page.goto(productPath('UNPRICED-' + locale));
    expect(response.status()).toBe(200);
    await expect(page.getByRole('heading', {level: 1})).toHaveText(strings.name);
    await expect(page.getByText(strings.priceUnavailable, {exact: true})).toBeVisible();
    await expect(page.getByText(strings.orderingUnavailable, {exact: true})).toBeVisible();
    await expect(page.getByRole('button')).toHaveCount(0);
  });

  test(
    'opens a product with localized description paragraphs from the catalog in ' + locale,
    async ({page}) => {
      const response = await page.goto(`${base}/${locale}/shop/`);
      expect(response.status()).toBe(200);
      const heading = page.getByRole('heading', {level: 1});
      await expect(heading).toHaveText(strings.catalog);
      const product = page.getByRole('link', {name: strings.name});
      await expect(product).toHaveAttribute('href', productPath('RICH-' + locale));
      await expect(page.getByText(strings.price, {exact: false})).toBeVisible();
      await product.click();
      await expect(heading).toHaveText(strings.name);
      const paragraphs = page.getByRole('paragraph');
      for (const text of strings.richDescription) {
        await expect(paragraphs.and(page.getByText(text, {exact: true}))).toBeVisible();
      }
      const otherLocale = locale === 'en' ? 'fa' : 'en';
      await expect(page.getByText(localized[otherLocale].richDescription[0])).toHaveCount(0);
    }
  );

  if (locale === 'fa') {
    test('shows the English document when the Persian description is absent', async ({page}) => {
      const response = await page.goto(productPath('ENGLISH-ONLY-' + locale));
      expect(response.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', 'fa');
      for (const text of localized.en.richDescription) {
        const paragraph = page.getByRole('paragraph').and(page.getByText(text, {exact: true}));
        await expect(paragraph).toBeVisible();
        await expect(paragraph).toHaveAttribute('lang', 'en');
      }
    });
  }

  test('returns HTTP 404 for a missing product in ' + locale, async ({page}) => {
    const response = await page.goto(productPath('MISSING-' + locale));
    expect(response.status()).toBe(404);
    await expect(page.getByRole('heading', {level: 1})).toHaveText(strings.missing);
  });

  for (const [failure, description] of [
    ['ERROR', 'an upstream 503'],
    ['TIMEOUT', 'a backend timeout']
  ]) {
    test(
      'retries the product lookup after ' + description + ' in ' + locale,
      async ({page}, info) => {
        const path = productPath([failure, locale, info.repeatEachIndex, info.retry].join('-'));
        const response = await page.goto(path);
        expect(response.status()).toBe(200);
        const heading = page.getByRole('heading', {level: 1});
        await expect(heading).toHaveText(strings.failure);
        const retry = page.getByRole('link', {name: strings.retry});
        await expect(retry).toHaveAttribute('href', path);
        await retry.click();
        await expect(heading).toHaveText(strings.name);
        await expect(page.getByText(strings.price, {exact: true})).toBeVisible();
      }
    );
  }
}
