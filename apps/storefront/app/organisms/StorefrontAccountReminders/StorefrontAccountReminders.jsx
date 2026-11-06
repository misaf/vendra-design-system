import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontAccountReminders({
  add,
  showEmpty,
  emptyText,
  coming,
  comingTitle,
  intro,
  reminders,
  shopHref,
  labels
}) {
  return (
    <div className="vf-account-loyalty tw:flex tw:flex-col tw:gap-3 tw:max-w-wide">
      <div>
        <DS.Button id="vf-add-reminder" iconStart="plus" onClick={add.onClick}>
          <>{add.label}</>
        </DS.Button>
      </div>
      {showEmpty ? (
        <>
          <p>
            <>{emptyText}</>
          </p>
        </>
      ) : null}
      {coming ? (
        <>
          <DS.Alert tone="neutral" title={comingTitle}>
            <>
              {coming?.name}
              {' \u00b7 '}
              {coming?.when}
            </>
          </DS.Alert>
        </>
      ) : null}
      <p className="vf-account-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
        <>{intro}</>
      </p>
      {reminders.map((r, $index) => (
        <React.Fragment key={$index}>
          <DS.ReminderRow
            name={r?.name}
            day={r?.day}
            month={r?.month}
            occasion={r?.occasion}
            occasionIcon={r?.icon}
            before={r?.before}
            channel={r?.channel}
            soon={r?.soon}
            on={r?.on}
            onToggle={r?.toggle}
            onEdit={r?.edit}
            onDelete={r?.remove}
            altDate={r?.altDate}
            when={r?.when}
            sendHref={shopHref}
            labels={labels}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
