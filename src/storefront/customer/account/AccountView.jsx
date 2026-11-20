// StorefrontAccount: the page inside the storefront shell.
import React from 'react';
import {Alert} from '../../../design-system/components/Alert/Alert.jsx';
import {Button} from '../../../design-system/components/Button/Button.jsx';
import {Tabs} from '../../../design-system/components/Tabs/Tabs.jsx';
import {asList} from '../../shell/ui/as-list.js';
import {StorefrontAccountLayout} from './components/StorefrontAccountLayout/StorefrontAccountLayout.jsx';
import {StorefrontAccountOrders} from './components/StorefrontAccountOrders/StorefrontAccountOrders.jsx';
import {StorefrontAccountSaved} from './components/StorefrontAccountSaved/StorefrontAccountSaved.jsx';
import {StorefrontAccountAddresses} from './components/StorefrontAccountAddresses/StorefrontAccountAddresses.jsx';
import {StorefrontAccountReminders} from './components/StorefrontAccountReminders/StorefrontAccountReminders.jsx';
import {StorefrontAccountProfile} from './components/StorefrontAccountProfile/StorefrontAccountProfile.jsx';
import {StorefrontAccountAddressEditor} from './components/StorefrontAccountAddressEditor/StorefrontAccountAddressEditor.jsx';
import {StorefrontAccountReminderEditor} from './components/StorefrontAccountReminderEditor/StorefrontAccountReminderEditor.jsx';
import {StorefrontAccountEditorDialog} from './components/StorefrontAccountEditorDialog/StorefrontAccountEditorDialog.jsx';
import {StorefrontPageHeading} from '../../shell/components/StorefrontPageHeading/StorefrontPageHeading.jsx';
import {StorefrontAccountBalancePanel} from './components/StorefrontAccountBalancePanel/StorefrontAccountBalancePanel.jsx';
import {Shell} from '../../shell/components/Shell.jsx';

export function View({v}) {
  return (
    <Shell
      v={v}
      content={
        <StorefrontAccountLayout
          heading={
            <StorefrontPageHeading eyebrow={v.t?.hello} title={v.t?.accA} accent={v.t?.accB} />
          }
          actions={
            <Button variant="ghost" iconStart="log-out" onClick={v.signOut}>
              {v.t?.signOut}
            </Button>
          }
          notices={v.saveError && !v.formOpen && <Alert tone="danger" title={v.saveError} />}
          tabs={
            <Tabs
              variant="pill"
              items={v.tabItems}
              value={v.tab}
              onChange={v.setTab}
              label={v.t?.accA}
              listClassName="vf-account-tabs tw:mb-6 tw:overflow-x-auto tw:[scrollbar-width:none]"
              panelClassName="vf-account-panel"
            >
              {v.isOrders ? <StorefrontAccountOrders orders={asList(v.orders)} /> : null}
              {v.isBalance ? (
                <StorefrontAccountBalancePanel
                  overview={{
                    title: v.t?.balance?.title,
                    amount: v.balance?.amount,
                    status: v.balance?.status
                  }}
                  topUp={
                    v.balance?.canTopUp
                      ? {
                          title: v.t?.balance?.topUp,
                          quickLabel: v.t?.balance?.quick,
                          presets: asList(v.balance?.presets),
                          amount: {
                            label: v.t?.balance?.amount,
                            value: v.balance?.value,
                            inputMode: v.balance?.inputMode,
                            onChange: v.balance?.set,
                            hint: v.balance?.hint,
                            error: v.balance?.error
                          },
                          payment: {
                            label: v.balance?.payLabel,
                            onClick: v.balance?.submit,
                            busy: v.balance?.busy,
                            processing: v.t?.balance?.processing,
                            done: v.balance?.done
                          },
                          demo: v.t?.balance?.demo
                        }
                      : null
                  }
                  checkoutReturn={
                    v.checkoutReturn
                      ? {href: v.checkoutHref, label: v.t.balance.backToCheckout}
                      : null
                  }
                  history={{
                    title: v.t?.balance?.history,
                    showEmpty: v.balance?.noHistory,
                    emptyText: v.t?.balance?.noHistory,
                    showHistory: v.balance?.hasHistory,
                    entries: asList(v.balance?.history)
                  }}
                />
              ) : null}
              {v.isSaved ? (
                <StorefrontAccountSaved
                  showItems={v.hasSaved}
                  showEmpty={v.noSaved}
                  items={asList(v.savedItems)}
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
              ) : null}
              {v.isAddresses ? (
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
                  addresses={asList(v.addresses)}
                  labels={v.addrLabels}
                  add={{label: v.t?.addAddr, onClick: v.addAddress}}
                />
              ) : null}
              {v.isReminders ? (
                <StorefrontAccountReminders
                  add={{label: v.editor?.addReminder, onClick: v.addReminder}}
                  showEmpty={v.noReminders}
                  emptyText={v.editor?.empty}
                  coming={v.coming}
                  comingTitle={v.editor?.coming}
                  intro={v.t?.remP}
                  reminders={asList(v.reminders)}
                  shopHref={v.href?.shop}
                  labels={v.remLabels}
                />
              ) : null}
              {v.isProfile ? (
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
              ) : null}
            </Tabs>
          }
          feedback={
            <p role="status" className="tw:text-sm tw:text-secondary">
              {v.notice}
            </p>
          }
          dialog={
            <StorefrontAccountEditorDialog
              open={v.formOpen}
              title={v.formTitle}
              onClose={v.closeForm}
              saveError={v.saveError}
              problems={v.editorProblems}
              save={{label: v.editor?.save, onClick: v.saveForm}}
              cancelLabel={v.editor?.cancel}
            >
              {v.isAddress ? (
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
              ) : null}
              {v.isReminder ? (
                <StorefrontAccountReminderEditor
                  name={{
                    label: v.editor?.reminderName,
                    value: v.form?.name,
                    onChange: v.set?.name,
                    error: v.errors?.name
                  }}
                  occasion={{
                    label: v.editor?.occasion,
                    options: v.occasionOptions,
                    value: v.form?.occ,
                    onChange: v.setOccasion
                  }}
                  date={{
                    lang: v.lang,
                    label: v.editor?.date,
                    value: v.dateValue,
                    onChange: v.setDate,
                    disabled: v.dateLocked,
                    hint: v.dateHint,
                    labels: v.dateLabels
                  }}
                  before={{
                    label: v.editor?.before,
                    options: v.beforeOptions,
                    value: v.form?.before,
                    onChange: v.setBefore
                  }}
                  channel={{
                    label: v.editor?.via,
                    options: v.channelOptions,
                    value: v.form?.channel,
                    onChange: v.set?.channel
                  }}
                />
              ) : null}
            </StorefrontAccountEditorDialog>
          }
        />
      }
      sticky={<></>}
    />
  );
}
