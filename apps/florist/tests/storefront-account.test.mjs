import assert from 'node:assert/strict';
import vm from 'node:vm';
import {loadPage} from './page-script.mjs';

for (const lang of ['en', 'fa']) {
  const {logic: account, ctx: c} = loadPage('account', {lang});
  c.setTimeout = () => 0;
  const storage = new Map([['vf-account-phone', '09120000000']]);
  c.localStorage = {
    getItem: key => storage.get(key) || null,
    setItem: (key, value) => storage.set(key, value)
  };
  account.renderVals().setProfile.name('First edit');
  account.renderVals().saveProfile();
  const read = () => vm.runInContext("vfAccountLoad('09120000000')", c);
  const before = read().wallet.balance;
  account.renderVals().setProfile.name('New name');
  vm.runInContext("vfWalletChange('09120000000', 1000000, {kind: 'topup'})", c);
  const external = read();
  external.profile.email = 'newer@example.com';
  external.addresses.push({...external.addresses[0], id: 'new-address', isDefault: false});
  vm.runInContext('vfAccountSave', c)('09120000000', external);
  account.renderVals().saveProfile();
  assert.equal(
    read().wallet.balance,
    before + 1000000,
    'profile saves preserve newer wallet writes'
  );
  assert.equal(read().profile.name, 'New name');
  assert.equal(read().profile.email, 'newer@example.com', 'untouched profile fields stay current');
  assert.ok(read().addresses.some(address => address.id === 'new-address'));
  const reminder = account.renderVals().reminders[0];
  const updated = read();
  updated.reminders.push({...updated.reminders[0], id: 'new-reminder'});
  vm.runInContext('vfAccountSave', c)('09120000000', updated);
  reminder.toggle(false);
  assert.ok(
    read().reminders.some(item => item.id === 'new-reminder'),
    'reminder edits preserve concurrent additions'
  );
  assert.equal(read().wallet.balance, before + 1000000);
}
console.log('Passed account updates against newer wallet, profile, address and reminder data.');

// Sign-in greets by the account's own first name; with none it never falls back to a sample name,
// and a first sign-in is a welcome rather than a welcome back.
for (const lang of ['en', 'fa']) {
  const signIn = (storage, phone = '09121112233') => {
    const {logic, ctx: c} = loadPage('signin', {lang});
    c.setTimeout = () => 0;
    c.localStorage = {
      getItem: key => (storage.has(key) ? storage.get(key) : null),
      setItem: (key, value) => storage.set(key, value),
      removeItem: key => storage.delete(key)
    };
    c.vfRuntime.track.event = () => {};
    logic.renderVals().setPhone(phone);
    logic.renderVals().send();
    logic.renderVals().completeCode('12345');
    return {vals: logic.renderVals(), ctx: c};
  };
  const sample = {en: 'Shirin', fa: 'شیرین'};
  const greeting = vals => vals.okTitle + ' ' + vals.okAccent;
  const storage = new Map();
  const first = signIn(storage);
  assert.equal(first.vals.isOk, true);
  assert.ok(!greeting(first.vals).includes(sample.en) && !greeting(first.vals).includes(sample.fa));
  assert.equal(
    greeting(first.vals),
    {en: 'You’re signed in.', fa: 'وارد شدید.'}[lang],
    'a new unnamed account is not welcomed back'
  );
  assert.ok(first.vals.namePrompt, 'an unnamed account is invited to add a name');
  assert.ok(first.vals.namePrompt.href.includes('tab=profile'));
  const returning = signIn(storage);
  assert.equal(greeting(returning.vals), {en: 'Welcome back.', fa: 'خوش برگشتید.'}[lang]);
  assert.ok(!greeting(returning.vals).includes(sample.en));
  const account = vm.runInContext("vfAccountLoad('09121112233')", returning.ctx);
  account.profile.name = 'Dariush Kamali';
  vm.runInContext('vfAccountSave', returning.ctx)('09121112233', account);
  const named = signIn(storage);
  assert.equal(
    greeting(named.vals),
    {en: 'Welcome back, Dariush.', fa: 'خوش برگشتید، Dariush.'}[lang]
  );
  assert.equal(named.vals.namePrompt, null);
  // A first sign-in with the checkout name is a named welcome.
  const fresh = new Map();
  const {logic, ctx: c} = loadPage('signin', {
    lang,
    store: {lastOrder: {delivery: {sender: 'Mina Rad', senderPhone: '09124445566'}}}
  });
  c.setTimeout = () => 0;
  c.localStorage = {
    getItem: key => (fresh.has(key) ? fresh.get(key) : null),
    setItem: (key, value) => fresh.set(key, value),
    removeItem: key => fresh.delete(key)
  };
  c.vfRuntime.track.event = () => {};
  logic.renderVals().send();
  logic.renderVals().completeCode('12345');
  assert.equal(greeting(logic.renderVals()), {en: 'Welcome, Mina.', fa: 'خوش آمدید، Mina.'}[lang]);
}
console.log('Passed sign-in greetings for new, returning, named and unnamed accounts.');

// Sign-out removes every stored account and the customer's private records from this browser (#145).
{
  const {ctx: c} = loadPage('account', {lang: 'en'});
  const area = map => ({
    getItem: key => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: key => map.delete(key),
    key: index => [...map.keys()][index] ?? null,
    get length() {
      return map.size;
    }
  });
  const local = new Map([
    ['vf-consent', 'essential'],
    ['vendra-recently-viewed', '["VF-7K2M4Q"]']
  ]);
  const session = new Map([['vf-online-payment:guest', '{"id":"VN-GUEST"}']]);
  c.localStorage = area(local);
  c.sessionStorage = area(session);
  vm.runInContext('vfAccountLogin', c)('0912 000 0000', 'en');
  vm.runInContext('vfAccountSave', c)('09121112233', {profile: {}, addresses: [], reminders: []});
  local.set('vf-newsletter', 'customer@example.com');
  local.set('vendra-saved-map', '{"VF-7K2M4Q":7}');
  session.set('vf-online-payment:09120000000', '{"id":"VN-PRIVATE"}');
  assert.ok(local.has('vf-account:09120000000'));
  vm.runInContext('vfAccountSignOut()', c);
  assert.deepEqual(
    [...local.keys()].filter(key => key.startsWith('vf-account')),
    [],
    'no vf-account* key remains after sign-out'
  );
  assert.equal(local.has('vf-newsletter'), false);
  assert.equal(local.has('vendra-saved-map'), false);
  assert.equal(session.has('vf-online-payment:09120000000'), false);
  assert.equal(local.get('vf-consent'), 'essential', 'device settings stay');
  assert.ok(session.has('vf-online-payment:guest'), "a guest's own payment record stays");
  assert.equal(vm.runInContext('vfAccountPhone()', c), '');
}
console.log('Passed sign-out removing stored accounts and private records.');
