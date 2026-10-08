// Sample bank prefixes and card configuration; adapt from your payment provider.
(() => {
  const D = {};
  D.banks = [
    ['603799', 'Bank Melli', 'بانک ملی'],
    ['610433', 'Bank Mellat', 'بانک ملت'],
    ['991975', 'Bank Mellat', 'بانک ملت'],
    ['603769', 'Bank Saderat', 'بانک صادرات'],
    ['627353', 'Bank Tejarat', 'بانک تجارت'],
    ['585983', 'Bank Tejarat', 'بانک تجارت'],
    ['502229', 'Bank Pasargad', 'بانک پاسارگاد'],
    ['639347', 'Bank Pasargad', 'بانک پاسارگاد'],
    ['621986', 'Saman Bank', 'بانک سامان'],
    ['622106', 'Parsian Bank', 'بانک پارسیان'],
    ['639194', 'Parsian Bank', 'بانک پارسیان'],
    ['589210', 'Bank Sepah', 'بانک سپه'],
    ['603770', 'Bank Keshavarzi', 'بانک کشاورزی'],
    ['639217', 'Bank Keshavarzi', 'بانک کشاورزی'],
    ['504172', 'Resalat Bank', 'بانک رسالت'],
    ['628023', 'Bank Maskan', 'بانک مسکن'],
    ['627412', 'Eghtesad Novin', 'بانک اقتصاد نوین'],
    ['627488', 'Karafarin Bank', 'بانک کارآفرین'],
    ['502908', 'Tosee Taavon', 'بانک توسعه تعاون'],
    ['627648', 'Tosee Saderat', 'بانک توسعه صادرات'],
    ['505785', 'Iran Zamin', 'بانک ایران زمین'],
    ['636214', 'Bank Ayandeh', 'بانک آینده'],
    ['502806', 'Bank Shahr', 'بانک شهر'],
    ['502938', 'Bank Day', 'بانک دی'],
    ['639607', 'Sarmayeh Bank', 'بانک سرمایه'],
    ['627381', 'Bank Ansar', 'بانک انصار'],
    ['636795', 'Central Bank', 'بانک مرکزی']
  ];
  D.bankOf = card => {
    const b = D.banks.find(x => vfLatin(card).replace(/\D/g, '').startsWith(x[0]));
    return b
      ? {
          en: b[1],
          fa: b[2]
        }
      : {
          en: 'Bank card',
          fa: 'کارت بانکی'
        };
  };
  D.luhn = n => {
    n = vfLatin(n).replace(/\D/g, '');
    if (n.length !== 16) return false;
    let s = 0;
    for (let i = 0; i < 16; i++) {
      let v = +n[i];
      if (i % 2 === 0) {
        v *= 2;
        if (v > 9) v -= 9;
      }
      s += v;
    }
    return s % 10 === 0;
  };
  D.setPayCard = ({cardNumber, holderEn, holderFa, sheba}) => {
    const n = vfLatin(cardNumber || '')
      .replace(/\D/g, '')
      .slice(0, 16);
    Object.assign(VF_STORE.payment, {
      card: n.replace(/(\d{4})(?=\d)/g, '$1 '),
      holder: {
        en: holderEn || '',
        fa: holderFa || holderEn || ''
      },
      bank: D.bankOf(n),
      sheba: (sheba || '').replace(/\s/g, '').toUpperCase(),
      cardValid: D.luhn(n)
    });
  };
  window.VF_PAYMENT = D;
})();
