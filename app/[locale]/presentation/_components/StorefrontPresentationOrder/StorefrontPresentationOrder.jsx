import React from 'react';
import {Button} from '../../../../../components/ui/components/Button/Button.jsx';
import {Dialog} from '../../../../../components/ui/components/Dialog/Dialog.jsx';
import {LineItem} from '../../../../../components/ui/patterns/molecules/LineItem/LineItem.jsx';
import {Price} from '../../../../../components/ui/patterns/atoms/Price/Price.jsx';

export function StorefrontPresentationOrder({
  open,
  lines,
  showPrices,
  total,
  canHandOver,
  labels,
  formatQuantity,
  onClose,
  onClear,
  onHandOver
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={labels.title}
      maxWidth={560}
      footer={
        lines.length ? (
          <>
            <Button variant="secondary" onClick={onClear}>
              <>{labels.clear}</>
            </Button>
            {canHandOver ? (
              <Button variant="primary" iconStart="send" onClick={onHandOver}>
                <>{labels.handOver}</>
              </Button>
            ) : null}
          </>
        ) : null
      }
    >
      {lines.length ? (
        <div className="tw:flex tw:flex-col tw:gap-3 tw:text-body">
          {lines.map(line => (
            <LineItem
              key={line.id}
              image={line.image}
              name={line.name}
              meta={line.meta}
              price={showPrices ? line.price : ''}
              quantity={line.quantity}
              onQuantityChange={line.setQuantity}
              onRemove={line.remove}
              formatQuantity={formatQuantity}
            />
          ))}
          {showPrices ? (
            <div className="tw:flex tw:justify-between tw:font-medium tw:pt-2 tw:[border-top:1px_solid_var(--border-subtle)]">
              <span>
                <>{labels.total}</>
              </span>
              <Price value={total} size="md" />
            </div>
          ) : null}
        </div>
      ) : (
        <p className="tw:m-0">
          <>{labels.empty}</>
        </p>
      )}
    </Dialog>
  );
}
