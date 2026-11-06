# Field

Shared plumbing for form controls; Input, Select, Checkbox, Radio, ChoiceGroup and DatePicker are built on it. Use it when you build a new control so labels, hints and errors behave the same everywhere.

```jsx
const {fieldId, messageId, message, controlProps} = useField({id, hint, error});
<div className="ag-field">
  <label className="ag-field__label" htmlFor={fieldId}>
    {label}
  </label>
  <input id={fieldId} {...rest} {...controlProps} />
  <FieldMessage id={messageId} error={!!error}>
    {message}
  </FieldMessage>
</div>;
```

- `useField` returns the control id, the message id and `controlProps` (`aria-invalid`, `aria-describedby`, `aria-errormessage`). An error replaces the hint.
- `FieldMessage` renders the hint or error under the control (`.ag-field__hint`, red with `error`).
- `Field.css` holds `.ag-field` (label/control/message stack), `.ag-fieldset` and `.ag-input`, the bordered shell of Input and Select.

## Usage

**Use when:** Building a new form control, so its label, hint and error are wired like every other control.

**Don’t use when:** Don’t use it in page markup for an ordinary field; use Input, Select, Checkbox, Radio or ChoiceGroup.
