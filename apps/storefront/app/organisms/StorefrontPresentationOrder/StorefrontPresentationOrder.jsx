import React from 'react';
import * as DS from '../../ds.js';

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
    <DS.Dialog
      open={open}
      onClose={onClose}
      title={labels.title}
      maxWidth={560}
      footer={
        lines.length ? (
          <>
            <DS.Button variant="secondary" onClick={onClear}>
              <>{labels.clear}</>
            </DS.Button>
            {canHandOver ? (
              <DS.Button variant="primary" iconStart="send" onClick={onHandOver}>
                <>{labels.handOver}</>
              </DS.Button>
            ) : null}
          </>
        ) : null
      }
    >
      {lines.length ? (
        <div className="tw:flex tw:flex-col tw:gap-3 tw:text-body">
          {lines.map(line => (
            <DS.LineItem
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
              <DS.Price value={total} size="md" />
            </div>
          ) : null}
        </div>
      ) : (
        <p className="tw:m-0">
          <>{labels.empty}</>
        </p>
      )}
    </DS.Dialog>
  );
}
