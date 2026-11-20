import {Button} from '../../src/design-system/components/Button/Button.jsx';
import {ProductCard} from '../../src/design-system/components/ProductCard/ProductCard.jsx';
import {VendraProvider} from '../../src/design-system/components/VendraProvider/VendraProvider.jsx';
import {commerce, type Totals} from '../../src/storefront/commerce/commerce.js';

export const App = () => (
  <VendraProvider locale="fa-IR">
    <Button>خرید</Button>
    <ProductCard name="VF-9FA2KE" price="۲٬۲۰۰٬۰۰۰ تومان" />
  </VendraProvider>
);

// @ts-expect-error Invalid component variants must remain rejected by component declarations.
export const invalid = <Button variant="unknown" />;

declare const totals: Totals;
const labels = {
  sub: 'Subtotal',
  discount: 'Discount',
  fee: 'Delivery',
  free: 'Free',
  total: 'Total'
};
commerce.summaryRows(
  totals,
  '',
  {...labels, balanceDiscount: 'Balance discount · {percent}%'},
  String
);
// @ts-expect-error Summary callers must supply localized balance discount wording.
commerce.summaryRows(totals, '', labels, String);
