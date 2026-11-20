// GSM-7 basic set (no curly quotes, dashes or emoji) → 160 chars / 153 per part. Anything else → UCS-2: 70 / 67.
const GSM =
  /^[A-Za-z0-9 \n\r@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\[~\]|€]*$/;
export const smsInfo = text => {
  const gsm = GSM.test(text);
  const n = [...text].length + (gsm ? (text.match(/[\^{}\\\[~\]|€]/g) || []).length : 0);
  const one = gsm ? 160 : 70,
    part = gsm ? 153 : 67;
  return {
    encoding: gsm ? 'GSM-7' : 'UCS-2',
    chars: n,
    parts: n <= one ? 1 : Math.ceil(n / part),
    limit: one
  };
};
