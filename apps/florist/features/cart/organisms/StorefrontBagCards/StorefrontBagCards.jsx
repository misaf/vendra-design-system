import React from 'react';
import * as DS from '../../../../shell/ds.js';

export function StorefrontBagCards({labels, notice, lines}) {
  return (
    <section
      className="vf-bag-delivery tw:flex tw:flex-col tw:gap-4h"
      aria-labelledby="vf-cards-title"
    >
      <div className="tw:flex tw:flex-col tw:gap-1">
        <h2
          id="vf-cards-title"
          className="vf-bag-delivery-title tw:m-0 tw:font-display tw:font-medium tw:text-xl! tw:leading-tight tw:tracking-display tw:[text-transform:var(--display-case)]"
        >
          <>{labels.title}</>
        </h2>
        <p className="ag-field__hint tw:m-0">
          <>{labels.hint}</>
        </p>
      </div>
      {notice.message && (
        <DS.Alert
          tone="neutral"
          title={notice.message}
          action={
            <DS.Button
              variant="secondary"
              size="sm"
              onClick={notice.onUndo}
              aria-label={notice.undoLabel}
            >
              {labels.undo}
            </DS.Button>
          }
        />
      )}
      {lines.map((c, index) => {
        const compact = c?.hasCard && labels.edit && c.value?.trim() && !c.error;
        return (
          <div className="vf-bag-card" key={c.id ?? index}>
            {c?.hasCard && (
              <div className={compact ? 'vf-bag-card-editor--compact' : undefined}>
                <DS.Input
                  id={c.id}
                  value={c.value}
                  onChange={c.setCard}
                  error={c.error}
                  required={true}
                  maxLength={200}
                  label={c.label}
                  hint={c.detail}
                  multiline={true}
                  rows={3}
                />
                {compact && (
                  <DS.Button
                    className="vf-bag-card-edit"
                    variant="ghost"
                    size="sm"
                    aria-label={labels.edit + ' ' + c.label}
                    onClick={() => document.getElementById(c.id)?.focus()}
                  >
                    {labels.edit}
                  </DS.Button>
                )}
              </div>
            )}
            {c?.noCard ? (
              <>
                <div className="tw:flex tw:items-center tw:justify-between tw:gap-3 tw:flex-wrap tw:py-2 tw:[border-top:1px_solid_var(--border-subtle)]">
                  <span className="tw:flex tw:flex-col">
                    <span className="tw:font-medium">
                      <>{c?.name}</>
                    </span>
                    <span className="tw:text-sm tw:text-quiet">
                      <>{c?.detail}</>
                    </span>
                  </span>
                  <DS.Button
                    id={c.addButtonId}
                    variant="secondary"
                    size="sm"
                    iconStart="plus"
                    aria-label={c?.addAria}
                    onClick={c?.add}
                  >
                    <>{c?.addLabel}</>
                  </DS.Button>
                </div>
              </>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
