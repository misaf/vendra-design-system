# StorefrontAccountReminders

Composes the reminder add action, empty/upcoming feedback, introduction and normalized ReminderRow records from explicit content/callback props. Preserves wrapper/intro classes, add ID/icon, neutral upcoming alert and separator, positional keys, reminder dates/occasion/channel/on/soon props, toggle/edit/delete callbacks and shop links. Adds no wrapper.

View retains reminder-tab visibility and list normalization. Account/shared logic retains customer scope, calendar/date calculations, ordering/upcoming selection, localized formatting, editor state/validation/focus, reminder mutations and persistence. No state, effects, browser APIs or reminder rules belong here.

Verify English/Persian populated/upcoming/paused/empty states, toggle/edit/delete/add actions, shop navigation, validation and focus return, reload/tab continuity, customer isolation, touch/keyboard use, rotation, overflow and accessibility against the previous version.
