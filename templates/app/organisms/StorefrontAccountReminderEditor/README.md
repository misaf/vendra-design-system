# StorefrontAccountReminderEditor

Composes controlled reminder name/occasion/yearly-date/lead-time/channel fields from explicit descriptors. Preserves name/date IDs, error props, options/values/callbacks, DatePicker yearly/language/disabled/hint/labels props and field order. Returns a fragment so the shared dialog owns spacing.

View retains reminder-branch visibility and descriptor mapping. StorefrontAccountEditorDialog owns shared dialog, storage alert, error summary and save/cancel markup. Account/shared logic retains drafts, calendar/date rules, fixed/movable occasion dates, lead-time conversion, validation/focus, customer scope, mutations and persistence; package DatePicker retains calendar interaction. No state, effects, browser APIs or reminder rules belong here.

Verify bilingual name validation/focus, editable calendars/dates, fixed/movable date locking/hints, lead-time/channel choices, edit/save/cancel and storage retry, persisted reminders, touch/keyboard use, rotation, overflow and accessibility against the previous version.
