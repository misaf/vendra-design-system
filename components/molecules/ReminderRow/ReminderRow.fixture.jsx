import React from 'react';
import {ReminderRow} from './ReminderRow.jsx';

export function Fixture() {
  const [on, setOn] = React.useState(true);
  const [action, setAction] = React.useState('');
  return (
    <div style={{maxWidth: 640}}>
      <ReminderRow
        name="Sara"
        day="12"
        month="Oct"
        occasion="Birthday"
        before="3 days before, by SMS"
        when="In 5 days"
        soon
        on={on}
        onToggle={setOn}
        onEdit={() => setAction('edit')}
        onDelete={() => setAction('delete')}
        sendHref="#shop"
      />
      <output data-test="action">{action}</output>
    </div>
  );
}
