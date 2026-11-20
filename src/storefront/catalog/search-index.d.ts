/** A product code typed any way → "VF7K2M4Q". */
export declare function normalizeCode(text: string): string;

/** Text for searching: Arabic letters as Persian (ي → ی, ك → ک, ة → ه, أ → ا …), no diacritics,
 * stretching, half-spaces or punctuation, Latin digits, lower case, single spaces. */
export declare function normalizeSearchText(text: unknown): string;

/** Searchable text as an index for `matchesSearch`: normalized, spaces removed so a query word may
 * span them (دستهگل finds دسته‌گل). Build it once per record. */
export declare function searchIndex(text: unknown): string;

/** Whether an index from `searchIndex` holds every word of `query`, in any order; an empty query matches nothing. */
export declare function matchesSearch(index: string, query: string): boolean;
