import {Button} from '../../design-system/components/atoms/Button/Button.jsx';
import {ProductCard} from '../../design-system/components/molecules/ProductCard/ProductCard.jsx';
import {VendraProvider} from '../../design-system/components/VendraProvider/VendraProvider.jsx';

export const App = () => (
  <VendraProvider locale="fa-IR">
    <Button>خرید</Button>
    <ProductCard name="VF-9FA2KE" price="۲٬۲۰۰٬۰۰۰ تومان" />
  </VendraProvider>
);

// @ts-expect-error Invalid component variants must remain rejected by component declarations.
export const invalid = <Button variant="unknown" />;
