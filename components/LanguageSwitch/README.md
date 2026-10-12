# LanguageSwitch

EN / فا segmented toggle for the header. Consumers set `lang` + `dir` on the root when it changes. Each language is a React Aria ToggleButton (`aria-pressed`) marked with its own `lang`.

```jsx
<LanguageSwitch
  value={lang}
  label={fa ? 'زبان' : 'Language'}
  onChange={l => {
    setLang(l);
    const h = document.documentElement;
    h.lang = h.dataset.lang = l;
    h.dir = l === 'fa' ? 'rtl' : 'ltr';
  }}
/>
```

## Usage

**Use when:** EN/FA toggle in the header and footer.

**Don’t use when:** Don’t use for other binary settings (Switch / Tabs).
