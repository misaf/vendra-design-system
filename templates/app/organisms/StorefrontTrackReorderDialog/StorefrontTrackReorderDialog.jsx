import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontTrackReorderDialog({
  open,
  onClose,
  title,
  cancelLabel,
  confirm,
  choice,
  intro,
  changes,
  empty
}) {
  return (
    <DS.Dialog
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <DS.Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </DS.Button>
          <DS.Button disabled={confirm.disabled} onClick={confirm.onClick}>
            {confirm.label}
          </DS.Button>
        </>
      }
    >
      {choice.visible ? (
        <DS.RadioGroup legend={choice.legend} value={choice.value} onChange={choice.onChange}>
          <DS.Radio value="add" label={choice.add.label} description={choice.add.description} />
          <DS.Radio
            value="replace"
            label={choice.replace.label}
            description={choice.replace.description}
          />
        </DS.RadioGroup>
      ) : (
        <p>{intro}</p>
      )}
      {changes.length > 0 && (
        <DS.Alert tone="warning">
          <ul>
            {changes.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </DS.Alert>
      )}
      {empty.visible && <p>{empty.message}</p>}
    </DS.Dialog>
  );
}
