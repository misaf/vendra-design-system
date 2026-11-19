# StorefrontAccountReminderEditor

Composes controlled reminder name/occasion/yearly-date/lead-time/channel fields from explicit descriptors. Preserves name/date IDs, error props, options/values/callbacks, DatePicker yearly/language/disabled/hint/labels props and field order. Returns a fragment so the shared dialog owns spacing.

View retains reminder-branch visibility and descriptor mapping. StorefrontAccountEditorDialog owns shared dialog, storage alert, error summary and save/cancel markup. Account/shared logic retains drafts, calendar/date rules, fixed/movable occasion dates, lead-time conversion, validation/focus, customer scope, mutations and persistence; package DatePicker retains calendar interaction. No state, effects, browser APIs or reminder rules belong here.

Verify bilingual name validation/focus, editable calendars/dates, fixed/movable date locking/hints, lead-time/channel choices, edit/save/cancel and storage retry, persisted reminders, touch/keyboard use, rotation, overflow and accessibility against the previous version.

`StorefrontAccountReminderEditor.spec.mjs` exercises controlled fields, name errors, yearly month/day and calendar changes, fixed-date locking, and save/cancel composition in English and Persian, with axe on default, invalid and locked states. Run with `npm run test:e2e:dev --workspace apps/storefront -- --project=storefront-components StorefrontAccountReminderEditor`. Remaining organism coverage is tracked in [#323](https://github.com/misaf/vendra-design-system/issues/323).
