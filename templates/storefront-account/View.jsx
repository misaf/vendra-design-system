// StorefrontAccount: the page inside the storefront shell.
import React from 'react';
import * as DS from '../app/ds.js';
import {list} from '../app/runtime.js';
import {StorefrontAccountLayout} from '../app/layouts/StorefrontAccountLayout/StorefrontAccountLayout.jsx';
import {StorefrontAccountOrders} from '../app/organisms/StorefrontAccountOrders/StorefrontAccountOrders.jsx';
import {StorefrontAccountBalanceOverview} from '../app/organisms/StorefrontAccountBalanceOverview/StorefrontAccountBalanceOverview.jsx';
import {StorefrontAccountTopUp} from '../app/organisms/StorefrontAccountTopUp/StorefrontAccountTopUp.jsx';
import {StorefrontAccountBalanceHistory} from '../app/organisms/StorefrontAccountBalanceHistory/StorefrontAccountBalanceHistory.jsx';
import {StorefrontAccountSaved} from '../app/organisms/StorefrontAccountSaved/StorefrontAccountSaved.jsx';
import {StorefrontAccountAddresses} from '../app/organisms/StorefrontAccountAddresses/StorefrontAccountAddresses.jsx';
import {StorefrontAccountReminders} from '../app/organisms/StorefrontAccountReminders/StorefrontAccountReminders.jsx';
import {StorefrontAccountProfile} from '../app/organisms/StorefrontAccountProfile/StorefrontAccountProfile.jsx';
import {StorefrontAccountAddressEditor} from '../app/organisms/StorefrontAccountAddressEditor/StorefrontAccountAddressEditor.jsx';
import {Shell} from '../app/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <>
          <StorefrontAccountLayout
            heading={
              <>
                <div className="vf-account-eyebrow tw:text-xs tw:font-medium tw:tracking-eyebrow tw:uppercase tw:text-quiet">
                  <>{v.t?.hello}</>
                </div>
                <h1>
                  <>{v.t?.accA} </>
                  <em className="vf-account-accent tw:[font-style:var(--accent-font-style)] tw:[font-weight:var(--accent-font-weight)]! tw:text-accent">
                    <>{v.t?.accB}</>
                  </em>
                </h1>
              </>
            }
            actions={
              <>
                <DS.Button variant="ghost" iconStart="log-out" onClick={v.signOut}>
                  <>{v.t?.signOut}</>
                </DS.Button>
              </>
            }
            notices={
              <>{v.saveError && !v.formOpen && <DS.Alert tone="danger" title={v.saveError} />}</>
            }
            tabs={
              <>
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
                      <StorefrontAccountOrders orders={list(v.orders)} />
                    </>
                  ) : null}
                  {v.isBalance ? (
                    <>
                      <div className="vf-account-balance tw:flex tw:flex-col tw:gap-6 tw:max-w-wide">
                        <StorefrontAccountBalanceOverview
                          title={v.t?.balance?.title}
                          amount={v.balance?.amount}
                          status={v.balance?.status}
                        />
                        <StorefrontAccountTopUp
                          title={v.t?.balance?.topUp}
                          quickLabel={v.t?.balance?.quick}
                          presets={list(v.balance?.presets)}
                          amount={{
                            label: v.t?.balance?.amount,
                            value: v.balance?.value,
                            onChange: v.balance?.set,
                            hint: v.balance?.hint,
                            error: v.balance?.error
                          }}
                          payment={{
                            label: v.balance?.payLabel,
                            onClick: v.balance?.submit,
                            busy: v.balance?.busy,
                            processing: v.t?.balance?.processing,
                            done: v.balance?.done
                          }}
                          demo={v.t?.balance?.demo}
                        />
                        {v.checkoutReturn && (
                          <DS.Button
                            variant="secondary"
                            href={v.checkoutHref}
                            iconStart="arrow-left"
                          >
                            {v.t.balance.backToCheckout}
                          </DS.Button>
                        )}
                        <StorefrontAccountBalanceHistory
                          title={v.t?.balance?.history}
                          showEmpty={v.balance?.noHistory}
                          emptyText={v.t?.balance?.noHistory}
                          showHistory={v.balance?.hasHistory}
                          entries={list(v.balance?.history)}
                        />
                      </div>
                    </>
                  ) : null}
                  {v.isSaved ? (
                    <>
                      <StorefrontAccountSaved
                        showItems={v.hasSaved}
                        showEmpty={v.noSaved}
                        items={list(v.savedItems)}
                        labels={{
                          photo: v.t?.photo,
                          remove: v.t?.unsave,
                          emptyTitle: v.t?.savedEmptyA,
                          emptyAccent: v.t?.savedEmptyB,
                          emptyBody: v.t?.savedEmptyP,
                          browse: v.t?.browse
                        }}
                        shopHref={v.href?.shop}
                      />
                    </>
                  ) : null}
                  {v.isAddresses ? (
                    <>
                      <StorefrontAccountAddresses
                        map={{
                          visible: v.placesMap,
                          label: v.t?.mapL,
                          places: v.placesView?.places,
                          loadLeaflet: v.placesView?.load,
                          tiles: v.placesView?.tiles,
                          center: v.placesView?.center,
                          zoom: v.placesView?.zoom,
                          onFail: v.placesView?.fail
                        }}
                        addresses={list(v.addresses)}
                        labels={v.addrLabels}
                        add={{label: v.t?.addAddr, onClick: v.addAddress}}
                      />
                    </>
                  ) : null}
                  {v.isReminders ? (
                    <>
                      <StorefrontAccountReminders
                        add={{label: v.editor?.addReminder, onClick: v.addReminder}}
                        showEmpty={v.noReminders}
                        emptyText={v.editor?.empty}
                        coming={v.coming}
                        comingTitle={v.editor?.coming}
                        intro={v.t?.remP}
                        reminders={list(v.reminders)}
                        shopHref={v.href?.shop}
                        labels={v.remLabels}
                      />
                    </>
                  ) : null}
                  {v.isProfile ? (
                    <>
                      <StorefrontAccountProfile
                        problems={v.profileProblems}
                        name={{
                          label: v.t?.name,
                          value: v.profile?.name,
                          onChange: v.setProfile?.name
                        }}
                        phone={{
                          label: v.t?.phone,
                          value: v.profile?.phone,
                          hint: v.t?.phoneHint
                        }}
                        email={{
                          label: v.t?.email,
                          value: v.profile?.email,
                          onChange: v.setProfile?.email,
                          error: v.emailError,
                          hint: v.t?.emailHint
                        }}
                        language={{
                          label: v.t?.alang,
                          hint: v.t?.alangHint,
                          value: v.profile?.locale,
                          onChange: v.setProfile?.locale,
                          options: v.langOptions
                        }}
                        sms={{
                          label: v.t?.sms,
                          checked: v.profile?.sms,
                          onChange: v.setProfile?.sms
                        }}
                        save={{label: v.t?.saveP, onClick: v.saveProfile}}
                      />
                    </>
                  ) : null}
                </DS.Tabs>
              </>
            }
            feedback={
              <>
                <p role="status" className="tw:text-sm tw:text-secondary">
                  <>{v.notice}</>
                </p>
              </>
            }
            dialog={
              <>
                <DS.Dialog open={v.formOpen} title={v.formTitle} onClose={v.closeForm}>
                  <div className="tw:flex tw:flex-col tw:gap-4">
                    {v.saveError && <DS.Alert tone="danger" title={v.saveError} />}
                    <DS.ErrorSummary id="vf-editor-errors" errors={v.editorProblems} />
                    {v.isAddress ? (
                      <>
                        <StorefrontAccountAddressEditor
                          label={{
                            label: v.editor?.label,
                            value: v.form?.label,
                            onChange: v.set?.label
                          }}
                          zone={{
                            label: v.editor?.zone,
                            value: v.form?.zone,
                            options: v.zoneOptions,
                            onChange: v.set?.zone
                          }}
                          pin={{
                            visible: v.mapOk,
                            failed: v.mapFailed,
                            label: v.editor?.pin,
                            status: v.pinStatus,
                            error: v.pinError,
                            value: v.form?.location,
                            onChange: v.map?.change,
                            loadLeaflet: v.map?.load,
                            tiles: v.map?.tiles,
                            center: v.map?.center,
                            zoom: v.map?.zoom,
                            locateLabel: v.editor?.locate,
                            onLocateError: v.map?.locateError,
                            onFail: v.map?.fail,
                            failureText: v.editor?.mapFailed
                          }}
                          address={{
                            label: v.editor?.address,
                            value: v.form?.line,
                            onChange: v.set?.line,
                            error: v.errors?.line
                          }}
                          recipient={{
                            label: v.editor?.recipient,
                            value: v.form?.recipient,
                            onChange: v.set?.recipient
                          }}
                          phone={{
                            label: v.editor?.phone,
                            value: v.form?.phone,
                            onChange: v.set?.phone,
                            error: v.errors?.phone
                          }}
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
              </>
            }
          />
        </>
      }
      sticky={<></>}
    />
  );
}
