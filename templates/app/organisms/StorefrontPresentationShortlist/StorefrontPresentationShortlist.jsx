import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontPresentationShortlist({
  open,
  items,
  showPrices,
  labels,
  renderLabel,
  onClose,
  onClear,
  onSend
}) {
  return (
    <DS.Dialog
      open={open}
      onClose={onClose}
      title={labels.title}
      maxWidth={1100}
      footer={
        items.length ? (
          <>
            <DS.Button variant="secondary" onClick={onClear}>
              <>{labels.clear}</>
            </DS.Button>
            <DS.Button variant="primary" iconStart="send" onClick={onSend}>
              <>{labels.sendShortlist}</>
            </DS.Button>
          </>
        ) : null
      }
    >
      {items.length ? (
        <ul className="tw:list-none tw:m-0 tw:p-0 tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
          {items.map(item => (
            <li key={item.id} className="tw:flex tw:flex-col tw:gap-2 tw:text-body">
              <span className="tw:block tw:[aspect-ratio:4/5] tw:rounded-md tw:overflow-hidden tw:bg-muted">
                <DS.Picture
                  image={item.image}
                  sizes="(max-width: 767px) 50vw, 25vw"
                  className="tw:w-full tw:h-full tw:object-cover tw:block"
                />
              </span>
              <span className="tw:flex tw:flex-col tw:gap-1">
                {renderLabel(item)}
                {showPrices ? <DS.Price value={item.price} size="md" /> : null}
              </span>
              <span className="tw:flex tw:gap-2">
                <DS.Button variant="secondary" size="sm" onClick={item.show}>
                  <>{labels.show}</>
                </DS.Button>
                <DS.Button variant="ghost" size="sm" onClick={item.remove}>
                  <>{labels.remove}</>
                </DS.Button>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="tw:m-0">
          <>{labels.empty}</>
        </p>
      )}
    </DS.Dialog>
  );
}
