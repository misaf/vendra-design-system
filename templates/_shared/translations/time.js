// Shared localized delivery-window text. Parameters are the chosen start/end hours.
function vfSlotLabel(start, end, fa) {
  return fa ? '\u2068' + VF_FA_DIGITS(start) + ':۰۰\u2069 تا \u2068' + VF_FA_DIGITS(end) + ':۰۰\u2069' : start + ':00–' + end + ':00';
}
