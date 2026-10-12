// StorefrontAccount: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <main id="main" tabIndex={-1} className="vf-form tw:mx-auto">
            <div className="vf-account-header tw:flex tw:justify-between tw:gap-4 tw:flex-wrap tw:items-end tw:mb-5h">
              <div className="vf-account-heading tw:flex tw:flex-col tw:gap-3">
                <div className="vf-account-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                  <>{v.t?.hello}</>
                </div>
                <h1>
                  <>{v.t?.accA} </>
                  <em className="vf-account-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                    <>{v.t?.accB}</>
                  </em>
                </h1>
              </div>
              <DS.Button variant="ghost" iconStart="log-out" onClick={v.signOut}>
                <>{v.t?.signOut}</>
              </DS.Button>
            </div>
            <DS.Tabs
              variant="pill"
              items={v.tabItems}
              value={v.tab}
              onChange={v.setTab}
              label={v.t?.accA}
              listClassName="vf-account-tabs tw:mb-6 tw:overflow-x-auto tw:[scrollbar-width:none]"
              panelClassName="vf-account-panel"
            >
              {v.isOrders ? (
                <>
                  <div className="vf-account-orders-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
                    {list(v.orders).map((o, $index) => (
                      <React.Fragment key={$index}>
                        <DS.Card padding={20}>
                          <div className="vf-account-order-body tw:flex tw:flex-col tw:gap-3">
                            <div className="tw:flex tw:justify-between tw:items-center tw:gap-3">
                              <span dir="ltr" className="vf-account-order-number tw:font-medium">
                                <>{o?.id}</>
                              </span>
                              <DS.Badge tone={o?.tone}>
                                <>{o?.status}</>
                              </DS.Badge>
                            </div>
                            <div className="vf-account-order-meta tw:text-sm tw:text-quiet">
                              <>{o?.meta}</>
                            </div>
                            <div className="vf-account-order-total tw:font-medium">
                              <>{o?.total}</>
                            </div>
                            <div>
                              <DS.Button variant="secondary" size="sm" href={o?.href}>
                                <>{o?.cta}</>
                              </DS.Button>
                            </div>
                          </div>
                        </DS.Card>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.isBalance ? (
                <>
                  <div className="vf-account-balance tw:flex tw:flex-col tw:gap-6 tw:max-w-[760px]">
                    <DS.Card padding={24}>
                      <div className="tw:flex tw:flex-col tw:gap-2">
                        <span id="vf-balance-label" className="tw:text-sm tw:text-quiet">
                          <>{v.t?.balance?.title}</>
                        </span>
                        <span
                          id="vf-balance-amount"
                          aria-labelledby="vf-balance-label vf-balance-amount"
                          className="tw:text-2xl tw:font-medium"
                        >
                          <>{v.balance?.amount}</>
                        </span>
                        <p className="vf-account-balance-status tw:m-0 tw:text-sm tw:text-secondary tw:max-w-measure tw:text-pretty">
                          <>{v.balance?.status}</>
                        </p>
                      </div>
                    </DS.Card>
                    <section
                      aria-labelledby="vf-topup-title"
                      className="tw:flex tw:flex-col tw:gap-4 tw:max-w-[520px]"
                    >
                      <h2 id="vf-topup-title" className="tw:m-0 tw:text-xl">
                        <>{v.t?.balance?.topUp}</>
                      </h2>
                      <div
                        role="group"
                        aria-label={v.t?.balance?.quick}
                        className="tw:flex tw:gap-2 tw:flex-wrap"
                      >
                        {list(v.balance?.presets).map((v, $index) => (
                          <React.Fragment key={$index}>
                            <DS.Chip
                              selected={v?.pressed}
                              aria-pressed={v?.pressed}
                              onClick={v?.pick}
                            >
                              <>{v?.label}</>
                            </DS.Chip>
                          </React.Fragment>
                        ))}
                      </div>
                      <DS.Input
                        id="vf-topup-amount"
                        label={v.t?.balance?.amount}
                        value={v.balance?.value}
                        onChange={v.balance?.set}
                        hint={v.balance?.hint}
                        error={v.balance?.error}
                        inputMode="numeric"
                        dir="ltr"
                        autoComplete="off"
                      />
                      <div>
                        <DS.Button
                          variant="primary"
                          iconStart="banknote"
                          onClick={v.balance?.submit}
                          loading={v.balance?.busy}
                          disabled={v.balance?.busy}
                        >
                          <>{v.balance?.payLabel}</>
                        </DS.Button>
                      </div>
                      {v.balance?.busy ? (
                        <>
                          <p role="status" className="tw:m-0 tw:text-sm">
                            <>{v.t?.balance?.processing}</>
                          </p>
                        </>
                      ) : null}
                      {v.balance?.done ? (
                        <>
                          <p
                            id="vf-topup-done"
                            tabIndex={-1}
                            role="status"
                            className="tw:m-0 tw:text-sm tw:font-medium"
                          >
                            <>{v.balance?.done}</>
                          </p>
                        </>
                      ) : null}
                      <p className="tw:m-0 tw:text-sm tw:text-quiet">
                        <>{v.t?.balance?.demo}</>
                      </p>
                    </section>
                    <section
                      aria-labelledby="vf-balance-history"
                      className="tw:flex tw:flex-col tw:gap-3"
                    >
                      <h2 id="vf-balance-history" className="tw:m-0 tw:text-xl">
                        <>{v.t?.balance?.history}</>
                      </h2>
                      {v.balance?.noHistory ? (
                        <>
                          <p className="tw:m-0 tw:text-secondary">
                            <>{v.t?.balance?.noHistory}</>
                          </p>
                        </>
                      ) : null}
                      {v.balance?.hasHistory ? (
                        <>
                          <ul className="vf-account-balance-history tw:list-none tw:m-0 tw:p-0 tw:flex tw:flex-col">
                            {list(v.balance?.history).map((h, $index) => (
                              <React.Fragment key={$index}>
                                <li className="tw:flex tw:justify-between tw:items-baseline tw:gap-4 tw:py-3 tw:[border-top:1px_solid_var(--border-subtle)]">
                                  <div className="tw:flex tw:flex-col tw:gap-1">
                                    <span className="tw:font-medium">
                                      <>{h?.label}</>
                                    </span>
                                    <span className="tw:text-sm tw:text-quiet">
                                      <>{h?.date}</>
                                    </span>
                                  </div>
                                  <span
                                    className="vf-account-balance-amount tw:font-medium tw:whitespace-nowrap"
                                    data-tone={h?.tone}
                                  >
                                    <>{h?.amount}</>
                                  </span>
                                </li>
                              </React.Fragment>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </section>
                  </div>
                </>
              ) : null}
              {v.isSaved ? (
                <>
                  {v.hasSaved ? (
                    <>
                      <div className="vf-account-saved-grid vf-product-grid tw:grid tw:[grid-template-columns:repeat(auto-fill,minmax(max(150px,calc((100%_-_72px)_/_4)),1fr))] tw:gap-y-7 tw:gap-x-5">
                        {list(v.savedItems).map((p, $index) => (
                          <React.Fragment key={$index}>
                            <DS.ProductCard
                              images={p?.images}
                              name={p?.name}
                              subtitle={p?.sub}
                              price={p?.price}
                              badge={p?.badge}
                              badgeTone="accent"
                              frame="soft"
                              placeholder={v.t?.photo}
                              favLabel={v.t?.unsave}
                              favorite={true}
                              onFavorite={p?.remove}
                              href={p?.href}
                            />
                          </React.Fragment>
                        ))}
                      </div>
                    </>
                  ) : null}
                  {v.noSaved ? (
                    <>
                      <div className="vf-account-saved-empty tw:flex tw:flex-col tw:items-center tw:gap-4h tw:py-6 tw:px-0">
                        <DS.EmptyState
                          icon="heart"
                          title={v.t?.savedEmptyA}
                          titleAccent={v.t?.savedEmptyB}
                          body={v.t?.savedEmptyP}
                        />
                        <DS.Button variant="primary" href={v.href?.shop}>
                          <>{v.t?.browse}</>
                        </DS.Button>
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
              {v.isAddresses ? (
                <>
                  {v.placesMap ? (
                    <>
                      <DS.PlacesMap
                        id="vf-account-map"
                        className="tw:mb-4"
                        label={v.t?.mapL}
                        places={v.placesView?.places}
                        height={260}
                        loadLeaflet={v.placesView?.load}
                        tiles={v.placesView?.tiles}
                        center={v.placesView?.center}
                        zoom={v.placesView?.zoom}
                        onFail={v.placesView?.fail}
                      />
                    </>
                  ) : null}
                  <div className="vf-account-addresses-grid tw:grid tw:gap-4 tw:[grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
                    {list(v.addresses).map((a, $index) => (
                      <React.Fragment key={$index}>
                        <DS.AddressCard
                          label={a?.label}
                          line={a?.line}
                          recipient={a?.recipient}
                          phone={a?.phone}
                          zone={a?.zone}
                          isDefault={a?.isDefault}
                          onMakeDefault={a?.makeDefault}
                          onEdit={a?.edit}
                          onDelete={a?.remove}
                          labels={v.addrLabels}
                        />
                      </React.Fragment>
                    ))}
                    <button
                      id="vf-add-address"
                      type="button"
                      onClick={v.addAddress}
                      className="vf-account-add-address tw:min-h-[180px] tw:[border:1.5px_dashed_var(--border-input)] tw:rounded-md tw:bg-transparent tw:text-body tw:[font-family:inherit] tw:[line-height:inherit] tw:text-base tw:flex tw:items-center tw:justify-center tw:gap-2 tw:cursor-pointer tw:hover:bg-sunken"
                    >
                      <>
                        {'+ '}
                        {v.t?.addAddr}
                      </>
                    </button>
                  </div>
                </>
              ) : null}
              {v.isReminders ? (
                <>
                  <div className="vf-account-loyalty tw:flex tw:flex-col tw:gap-3 tw:max-w-[760px]">
                    <div>
                      <DS.Button id="vf-add-reminder" iconStart="plus" onClick={v.addReminder}>
                        <>{v.editor?.addReminder}</>
                      </DS.Button>
                    </div>
                    {v.noReminders ? (
                      <>
                        <p>
                          <>{v.editor?.empty}</>
                        </p>
                      </>
                    ) : null}
                    {v.coming ? (
                      <>
                        <DS.Alert tone="neutral" title={v.editor?.coming}>
                          <>
                            {v.coming?.name}
                            {' \u00b7 '}
                            {v.coming?.when}
                          </>
                        </DS.Alert>
                      </>
                    ) : null}
                    <p className="vf-account-intro tw:text-secondary tw:m-0 tw:max-w-measure tw:text-md tw:leading-body tw:text-pretty">
                      <>{v.t?.remP}</>
                    </p>
                    {list(v.reminders).map((r, $index) => (
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
                          sendHref={v.href?.shop}
                          labels={v.remLabels}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                </>
              ) : null}
              {v.isProfile ? (
                <>
                  <div className="vf-account-profile tw:flex tw:flex-col tw:gap-4 tw:max-w-[520px]">
                    <DS.Input
                      id="vf-pname"
                      label={v.t?.name}
                      value={v.profile?.name}
                      onChange={v.setProfile?.name}
                      autoComplete="name"
                    />
                    <DS.Input
                      id="vf-pphone"
                      label={v.t?.phone}
                      value={v.profile?.phone}
                      dir="ltr"
                      disabled={true}
                      hint={v.t?.phoneHint}
                    />
                    <DS.Input
                      id="vf-pemail"
                      value={v.profile?.email}
                      onChange={v.setProfile?.email}
                      error={v.emailError}
                      label={v.t?.email}
                      type="email"
                      dir="ltr"
                      hint={v.t?.emailHint}
                    />
                    <DS.Select
                      id="vf-plang"
                      label={v.t?.alang}
                      hint={v.t?.alangHint}
                      value={v.profile?.locale}
                      onChange={v.setProfile?.locale}
                      options={v.langOptions}
                    />
                    <DS.Switch
                      label={v.t?.sms}
                      checked={v.profile?.sms}
                      onChange={v.setProfile?.sms}
                    />
                    <div>
                      <DS.Button variant="primary" onClick={v.saveProfile}>
                        <>{v.t?.saveP}</>
                      </DS.Button>
                    </div>
                  </div>
                </>
              ) : null}
            </DS.Tabs>
            <p role="status" className="tw:text-sm tw:text-secondary">
              <>{v.notice}</>
            </p>
            <DS.Dialog open={v.formOpen} title={v.formTitle} onClose={v.closeForm}>
              <div className="tw:flex tw:flex-col tw:gap-4">
                {v.isAddress ? (
                  <>
                    <DS.Input
                      id="vf-address-label"
                      label={v.editor?.label}
                      value={v.form?.label}
                      onChange={v.set?.label}
                    />
                    <DS.Select
                      label={v.editor?.zone}
                      value={v.form?.zone}
                      options={v.zoneOptions}
                      onChange={v.set?.zone}
                    />
                    <div className="vf-account-pin tw:flex tw:flex-col tw:gap-2">
                      {v.mapOk ? (
                        <>
                          <DS.LocationPicker
                            id="vf-address-map"
                            compact={true}
                            label={v.editor?.pin}
                            status={v.pinStatus}
                            error={v.pinError}
                            value={v.form?.location}
                            onChange={v.map?.change}
                            loadLeaflet={v.map?.load}
                            tiles={v.map?.tiles}
                            center={v.map?.center}
                            zoom={v.map?.zoom}
                            locateLabel={v.editor?.locate}
                            onLocateError={v.map?.locateError}
                            onFail={v.map?.fail}
                          />
                        </>
                      ) : null}
                      {v.mapFailed ? (
                        <>
                          <span className="ag-field__label">
                            <>{v.editor?.pin}</>
                          </span>
                          <p className="ag-field__hint tw:m-0">
                            <>{v.editor?.mapFailed}</>
                          </p>
                        </>
                      ) : null}
                    </div>
                    <DS.Input
                      id="vf-address-line"
                      label={v.editor?.address}
                      multiline={true}
                      value={v.form?.line}
                      onChange={v.set?.line}
                      error={v.errors?.line}
                      autoComplete="street-address"
                    />
                    <DS.Input
                      label={v.editor?.recipient}
                      value={v.form?.recipient}
                      onChange={v.set?.recipient}
                      autoComplete="name"
                    />
                    <DS.PhoneInput
                      id="vf-address-phone"
                      label={v.editor?.phone}
                      value={v.form?.phone}
                      onChange={v.set?.phone}
                      error={v.errors?.phone}
                    />
                  </>
                ) : null}
                {v.isReminder ? (
                  <>
                    <DS.Input
                      id="vf-reminder-name"
                      label={v.editor?.reminderName}
                      value={v.form?.name}
                      onChange={v.set?.name}
                      error={v.errors?.name}
                    />
                    <DS.Select
                      label={v.editor?.occasion}
                      options={v.occasionOptions}
                      value={v.form?.occ}
                      onChange={v.setOccasion}
                    />
                    <DS.DatePicker
                      id="vf-reminder-date"
                      yearly={true}
                      lang={v.lang}
                      label={v.editor?.date}
                      value={v.dateValue}
                      onChange={v.setDate}
                      disabled={v.dateLocked}
                      hint={v.dateHint}
                      labels={v.dateLabels}
                    />
                    <DS.Select
                      label={v.editor?.before}
                      options={v.beforeOptions}
                      value={v.form?.before}
                      onChange={v.setBefore}
                    />
                    <DS.Select
                      label={v.editor?.via}
                      options={v.channelOptions}
                      value={v.form?.channel}
                      onChange={v.set?.channel}
                    />
                  </>
                ) : null}
                <div className="tw:flex tw:gap-3">
                  <DS.Button onClick={v.saveForm}>
                    <>{v.editor?.save}</>
                  </DS.Button>
                  <DS.Button variant="ghost" onClick={v.closeForm}>
                    <>{v.editor?.cancel}</>
                  </DS.Button>
                </div>
              </div>
            </DS.Dialog>
          </main>
        </>
      }
      sticky={<></>}
    />
  );
}
