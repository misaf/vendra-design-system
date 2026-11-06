import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontBagSchedule({title, preparationNotice, review, day, slot}) {
  return (
    <section
      className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
      aria-labelledby="vf-when-title"
    >
      <h2
        id="vf-when-title"
        className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
      >
        <>{title}</>
      </h2>
      {preparationNotice && <p className="ag-field__hint tw:m-0">{preparationNotice}</p>}
      {review.visible && (
        <div id="vf-delivery-changed" tabIndex={-1}>
          <DS.Alert tone="warning" title={review.title}>
            {review.suggestion ? (
              <>
                <p>{review.suggestion}</p>
                <DS.Button onClick={review.onConfirm}>{review.confirmLabel}</DS.Button>
              </>
            ) : (
              <p>{review.unavailableLabel}</p>
            )}
          </DS.Alert>
        </div>
      )}
      <DS.ChoiceGroup
        legend={day.label}
        minTileWidth={104}
        value={day.value}
        onChange={day.onChange}
      >
        {day.options.map((d, $index) => (
          <React.Fragment key={$index}>
            <DS.ChoiceTile
              size="sm"
              value={d?.value}
              label={d?.label}
              description={d?.desc}
              disabled={d?.off}
            />
          </React.Fragment>
        ))}
      </DS.ChoiceGroup>
      <DS.ChoiceGroup
        legend={slot.label}
        minTileWidth={130}
        value={slot.value}
        onChange={slot.onChange}
      >
        {slot.options.map((z, $index) => (
          <React.Fragment key={$index}>
            <DS.ChoiceTile
              size="sm"
              value={z?.value}
              label={z?.label}
              description={z?.desc}
              disabled={z?.off}
            />
          </React.Fragment>
        ))}
      </DS.ChoiceGroup>
    </section>
  );
}
