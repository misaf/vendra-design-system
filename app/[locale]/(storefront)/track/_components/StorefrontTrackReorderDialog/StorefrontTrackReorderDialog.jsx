import React from 'react';
import {Alert} from '../../../../../../ui/components/Alert/Alert.jsx';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {Dialog} from '../../../../../../ui/components/Dialog/Dialog.jsx';
import {Radio} from '../../../../../../ui/components/Radio/Radio.jsx';
import {RadioGroup} from '../../../../../../ui/components/RadioGroup/RadioGroup.jsx';

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
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button disabled={confirm.disabled} onClick={confirm.onClick}>
            {confirm.label}
          </Button>
        </>
      }
    >
      {choice.visible ? (
        <RadioGroup legend={choice.legend} value={choice.value} onChange={choice.onChange}>
          <Radio value="add" label={choice.add.label} description={choice.add.description} />
          <Radio
            value="replace"
            label={choice.replace.label}
            description={choice.replace.description}
          />
        </RadioGroup>
      ) : (
        <p>{intro}</p>
      )}
      {changes.length > 0 && (
        <Alert tone="warning">
          <ul>
            {changes.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </Alert>
      )}
      {empty.visible && <p>{empty.message}</p>}
    </Dialog>
  );
}
