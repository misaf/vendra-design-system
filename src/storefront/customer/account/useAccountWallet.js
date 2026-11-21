import React from 'react';
import {vfRuntime} from '../../../platform/browser/runtime.js';
import {vfAmountToInput} from '../../pricing/formatting.js';
import {vfLiveStore} from '../../store/store-config.js';
import {vfTopUpAmount, vfTopUpError, vfWalletChange} from '../wallet.js';

export function useAccountWallet({
  phone,
  topUp,
  topUpPreset,
  topUpBusy,
  doneMessage,
  setState,
  focus
}) {
  const timer = React.useRef(null);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  // Keep the preset exact when its display in a currency with decimals rounds the amount.
  const amount =
    topUpPreset != null && topUp === vfAmountToInput(topUpPreset)
      ? topUpPreset
      : vfTopUpAmount(topUp);
  const error = vfTopUpError(amount);
  // The browser wallet supports demo payments. Live top-ups require server confirmation (docs/API.md B30).
  const canTopUp = !vfLiveStore();

  return {
    amount,
    error,
    canTopUp,
    pick: value =>
      setState({topUp: vfAmountToInput(value), topUpPreset: value, topUpError: '', topUpDone: ''}),
    setAmount: value => setState({topUp: value, topUpError: '', topUpDone: ''}),
    submit: () => {
      if (topUpBusy || vfLiveStore()) return;
      if (error) {
        setState({topUpError: error, topUpDone: ''});
        focus('vf-topup-amount');
        return;
      }
      setState({topUpBusy: true, topUpDone: ''});
      timer.current = setTimeout(() => {
        const next = vfWalletChange(phone, amount, {kind: 'topup'});
        if (!next) {
          setState({topUpBusy: false, topUpError: 'storage'});
          return;
        }
        vfRuntime.track.event('top_up', {value: amount});
        setState({
          account: next,
          topUp: '',
          topUpPreset: null,
          topUpBusy: false,
          topUpDone: doneMessage(amount)
        });
        focus('vf-topup-done');
      }, 600);
    }
  };
}
