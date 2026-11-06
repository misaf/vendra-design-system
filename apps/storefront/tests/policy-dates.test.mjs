// Every policy document has its own valid "Last updated" date, formatted per language.
import assert from 'node:assert/strict';
import {VF_POLICY_UPDATED} from '../pages/policy/copy.js';
import {VF_POLICIES} from '../shared/services/routing.js';
import {dates} from '../../../packages/design-system/components/utils/dates.js';

assert.deepEqual(
  Object.keys(VF_POLICY_UPDATED).sort(),
  [...VF_POLICIES].sort(),
  'each policy document has exactly one date'
);
for (const id of VF_POLICIES) {
  const iso = VF_POLICY_UPDATED[id];
  assert.match(iso, /^\d{4}-\d{2}-\d{2}$/, `${id}: ISO date`);
  const date = dates.fromIso(iso);
  assert.equal(dates.iso(date), iso, `${id}: a real calendar date`);
  assert.ok(dates.fullDate(date, dates.locale('en')), `${id}: English date`);
  assert.match(
    dates.fullDate(date, dates.locale('fa')),
    /^[۰-۹]+ \S+ [۰-۹]{4}$/,
    `${id}: Jalali date`
  );
}
assert.equal(dates.fullDate(dates.fromIso('2026-10-01'), dates.locale('en')), '1 October 2026');
assert.equal(dates.fullDate(dates.fromIso('2026-10-01'), dates.locale('fa')), '۹ مهر ۱۴۰۵');
console.log(`Passed own update dates for ${VF_POLICIES.length} policy documents.`);
