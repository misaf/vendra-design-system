import {latin} from '../../design-system/utils/input.js';

// A product code typed any way: case, spaces, dashes and digit scripts don't matter.
export const normalizeCode = text =>
  latin(text || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
// Text for searching, typed or indexed: Arabic letters as their Persian forms (ي ى → ی, ك → ک,
// ة ۀ → ه, أ إ آ → ا, ؤ → و, ئ → ی), no diacritics or stretching (ـ), half-spaces, zero-width
// characters and punctuation as spaces, Latin digits, lower case, one space between words.
export const normalizeSearchText = text =>
  latin(String(text ?? '').normalize('NFKC'))
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[ةۀ]/g, 'ه')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ی')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
// Searchable text as an index for matchesSearch: normalized, with its spaces removed so a query word
// may span them (دستهگل finds دسته‌گل). Build it once per product or post, not on every keystroke.
export const searchIndex = text => normalizeSearchText(text).replace(/ /g, '');
// Whether an index (searchIndex) holds every word of a query, in any order; an empty query matches nothing.
export const matchesSearch = (index, query) => {
  const words = normalizeSearchText(query).split(' ').filter(Boolean);
  return words.length > 0 && words.every(word => index.includes(word));
};
