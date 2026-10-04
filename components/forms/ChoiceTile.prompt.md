Selectable tile for delivery slots and zones. Selected = ink fill. Wrap in ChoiceGroup (radiogroup + arrow keys).
```jsx
<ChoiceGroup label="Delivery time" columns={2}>
  {slots.map(s=><ChoiceTile key={s.id} label={s.label} description={s.fee} selected={slot===s.id} onSelect={()=>setSlot(s.id)} />)}
</ChoiceGroup>
```

## Usage
**Use when:** Single tile inside ChoiceGroup. `disabled` for slots that are full, with the reason in `description`.

**Don’t use when:** Don’t use on its own as a button.
