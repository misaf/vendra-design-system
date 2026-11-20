import type {RootAttributes} from '../../utils/root-attributes.js';

export interface PaymentCardProps extends Omit<
  RootAttributes<HTMLDivElement>,
  'children' | 'onCopy'
> {
  /** The outer element. */
  ref?: React.Ref<HTMLDivElement>;
  /** Raw digits (Latin or Persian); grouped in 4s, always LTR */
  cardNumber: string;
  holder?: string;
  bank?: string;
  /** Pre-formatted amount, e.g. "۴٬۶۰۰٬۰۰۰ تومان" */
  amount?: string;
  labels?: {
    card?: string;
    holder?: string;
    bank?: string;
    amount?: string;
    copy?: string;
    copied?: string;
  };
  /** Called with the digits after copying */
  onCopy?: (digits: string) => void;
  className?: string;
}
export declare function PaymentCard(props: PaymentCardProps): React.JSX.Element;
