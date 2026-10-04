Grid wrapper for ChoiceTile — handles radiogroup semantics and arrow-key navigation (RTL-aware). See ChoiceTile.

`legend="Delivery time"` renders `<fieldset><legend>` (legend labels the radiogroup). `hint` / `error` sit under the tiles and are linked to the radiogroup (`aria-describedby`, `aria-invalid`, `aria-errormessage`).

## Usage
**Use when:** One-of-few choices shown as tiles: delivery slot, size, card type.

**Don’t use when:** Don’t use for more than ~6 options (Select) or multiple selection (Checkbox / Tag).
