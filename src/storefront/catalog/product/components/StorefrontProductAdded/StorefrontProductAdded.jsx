import React from 'react';
import {Button} from '../../../../../design-system/components/Button/Button.jsx';
import {Dialog} from '../../../../../design-system/components/Dialog/Dialog.jsx';
import {OrderSummary} from '../../../../../design-system/components/OrderSummary/OrderSummary.jsx';

// undo ({label, onClick}) is optional: it reverses the add and closes the panel.
export function StorefrontProductAdded({
  open,
  onClose,
  lines,
  sums,
  checkout,
  labels,
  undo = null
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={labels.title}
      closeLabel={labels.close}
      maxWidth={440}
    >
      <div className="vf-product-added tw:flex tw:flex-col tw:gap-5">
        <OrderSummary lines={lines} sums={sums} />
        <div className="tw:flex tw:flex-col tw:gap-2">
          <Button
            variant="primary"
            size="lg"
            block={true}
            iconEnd="arrow-right"
            href={checkout.href}
            onClick={checkout.onClick}
            autoFocus={true}
            className="vf-product-added-checkout"
          >
            <>{labels.checkout}</>
          </Button>
          <Button variant="ghost" size="lg" block={true} onClick={onClose}>
            <>{labels.continue}</>
          </Button>
          {undo ? (
            <Button
              variant="ghost"
              size="lg"
              block={true}
              iconStart="undo-2"
              onClick={undo.onClick}
              className="vf-product-added-undo"
            >
              <>{undo.label}</>
            </Button>
          ) : null}
        </div>
      </div>
    </Dialog>
  );
}
