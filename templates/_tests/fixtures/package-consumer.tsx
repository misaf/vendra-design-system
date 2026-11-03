import {Button, ProductCard, VendraProvider} from '@vendra/design-system';

export const App = () => (
  <VendraProvider locale="fa-IR">
    <Button>خرید</Button>
    <ProductCard name="VF-9FA2KE" price="۲٬۲۰۰٬۰۰۰ تومان" />
  </VendraProvider>
);

// @ts-expect-error Invalid component variants must remain rejected by public declarations.
export const invalid = <Button variant="unknown" />;
// @ts-expect-error Private layer paths are not public package entry points.
import {Badge} from '@vendra/design-system/atoms/Badge';
void Badge;
