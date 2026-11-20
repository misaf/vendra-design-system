import React from 'react';
import {StorefrontJournalHeading} from './StorefrontJournalHeading.jsx';
const copy = {
  en: {
    eyebrow: 'From the studio',
    title: 'Our',
    accent: 'journal',
    group: 'Journal categories',
    categories: ['All stories', 'Flower care', 'Studio life']
  },
  fa: {
    eyebrow: 'از استودیو',
    title: 'مجله',
    accent: 'ما',
    group: 'دسته‌های مجله',
    categories: ['همه داستان‌ها', 'نگهداری گل', 'زندگی استودیو']
  }
};
export function Fixture({lang}) {
  const [selected, setSelected] = React.useState(0);
  const [empty, setEmpty] = React.useState(false);
  const [minimal, setMinimal] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const t = copy[lang];
  const record = event => setEvents(current => [...current, event]);
  return (
    <>
      <button type="button" onClick={() => setSelected(2)}>
        Supply studio selection
      </button>
      <label>
        <input type="checkbox" checked={empty} onChange={event => setEmpty(event.target.checked)} />
        Empty categories
      </label>
      <label>
        <input
          type="checkbox"
          checked={minimal}
          onChange={event => setMinimal(event.target.checked)}
        />
        Minimal heading
      </label>
      <span data-test="events" style={{overflowWrap: 'anywhere'}}>
        {JSON.stringify(events)}
      </span>
      <main>
        <StorefrontJournalHeading
          eyebrow={minimal ? undefined : t.eyebrow}
          title={t.title}
          accent={minimal ? undefined : t.accent}
          categoriesLabel={t.group}
          categories={
            empty
              ? []
              : t.categories.map((label, index) => ({
                  label,
                  on: selected === index,
                  pick: () => {
                    record('pick:' + index);
                    setSelected(index);
                  }
                }))
          }
          onCategoryFocus={event => record('focus:' + event.target.textContent)}
        />
      </main>
    </>
  );
}
