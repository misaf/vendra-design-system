# ReminderRow

Occasion reminder in the account's Reminders tab. Compute the date with `dates.nextYearly({cal,m,d})`.

```jsx
<ReminderRow
  name="Mum"
  day="9"
  month="Mehr"
  occasion="Birthday"
  occasionIcon="cake"
  before="3 days before"
  channel="sms"
  altDate="1 Oct"
  when="in 3 days"
  soon
  on
  onToggle={setOn}
  onEdit={edit}
  onDelete={del}
  sendHref="?view=gifts&m=1"
  sendOnClick={navigate}
  labels={{
    paused: 'Paused',
    sendFlowers: 'Send flowers',
    reminderFor: 'Reminder for {name}',
    edit: 'Edit reminder for {name}',
    delete: 'Delete reminder for {name}'
  }}
/>
```

- Arched date tile (day + month); dimmed to 60% when paused — the text beside it stays full contrast.
- "Send flowers" (an `<a href>`) only when `soon` (≤ 7 days) and on.
- The Switch is named "Reminder for {name}"; edit/delete are named per reminder.
- Wraps on narrow widths (container query < 560px): the controls drop below the text.

## Usage

**Use when:** One saved occasion reminder in Account → Reminders.

**Don’t use when:** Don’t use for order history or one-off notifications (Toast).
